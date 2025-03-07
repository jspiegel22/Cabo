import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { Villa } from '../server/data/villas';

interface ScrapedVilla {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  location: {
    area: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    squareFeet?: number;
    stories?: number;
  };
  amenities: string[];
  images: string[];
  rates: {
    seasonName: string;
    startDate: string;
    endDate: string;
    minNights: number;
    nightly: number;
  }[];
  features: string[];
}

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          response
            .pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve());
        } else {
          response.resume();
          reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
        }
      })
      .on('error', reject);
  });
}

async function scrapeVillaDetails(url: string): Promise<ScrapedVilla> {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--no-sandbox',
    ],
  });

  const page = await browser.newPage();

  // Set a realistic user agent
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  // Enable JavaScript and wait for network to be idle
  await page.setJavaScriptEnabled(true);
  
  console.log(`Navigating to ${url}...`);
  
  await page.goto(url, { 
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  // Wait for key elements to load
  await page.waitForSelector('.villa-details', { timeout: 30000 });

  const villa = await page.evaluate(() => {
    // Helper function to clean text
    const cleanText = (text: string) => text?.trim().replace(/\s+/g, ' ') || '';

    // Helper function to extract number from text
    const extractNumber = (text: string) => parseInt(text?.replace(/[^0-9.]/g, '') || '0');

    // Get villa name
    const name = document.querySelector('h1')?.textContent || '';

    // Get description
    const description = document.querySelector('.villa-description')?.textContent || '';

    // Get specs from the overview section
    const overviewText = document.querySelector('.villa-overview')?.textContent || '';
    const bedroomsMatch = overviewText.match(/(\d+)\s*bedroom/i);
    const bathroomsMatch = overviewText.match(/(\d+(?:\.\d+)?)\s*bathroom/i);
    const guestsMatch = overviewText.match(/sleeps\s*(\d+)/i);
    const squareFeetMatch = overviewText.match(/(\d+,?\d*)\s*sq\s*ft/i);

    const specs = {
      bedrooms: bedroomsMatch ? parseInt(bedroomsMatch[1]) : 0,
      bathrooms: bathroomsMatch ? parseFloat(bathroomsMatch[1]) : 0,
      maxGuests: guestsMatch ? parseInt(guestsMatch[1]) : 0,
      squareFeet: squareFeetMatch ? parseInt(squareFeetMatch[1].replace(',', '')) : undefined,
    };

    // Get amenities
    const amenities = Array.from(document.querySelectorAll('.amenities-list li')).map(
      (el) => cleanText(el.textContent || '')
    ).filter(Boolean);

    // Get images
    const images = Array.from(document.querySelectorAll('.villa-gallery img, .villa-photos img')).map(
      (img) => (img as HTMLImageElement).src
    ).filter(Boolean);

    // Get rates from the rate table
    const rates = Array.from(document.querySelectorAll('.rate-table tr')).slice(1).map((row) => {
      const cells = row.querySelectorAll('td');
      const seasonText = cleanText(cells[0]?.textContent || '');
      const dateRange = seasonText.match(/([A-Za-z]+\s+\d+)\s*-\s*([A-Za-z]+\s+\d+)/);
      const rateText = cleanText(cells[1]?.textContent || '');
      const nightlyRate = parseInt(rateText.replace(/[^0-9]/g, ''));

      return {
        seasonName: seasonText,
        startDate: dateRange ? dateRange[1] : '',
        endDate: dateRange ? dateRange[2] : '',
        minNights: 3, // Default minimum stay
        nightly: nightlyRate,
      };
    }).filter(rate => rate.seasonName && rate.nightly > 0);

    // Get location from the address or location section
    const locationText = document.querySelector('.villa-location, .address')?.textContent || '';
    const areaMatch = locationText.match(/(?:located in|in)\s+([^,\.]+)/i);
    
    const location = {
      area: areaMatch ? cleanText(areaMatch[1]) : 'Los Cabos',
    };

    // Try to get coordinates from the map
    const mapFrame = document.querySelector('.villa-map iframe');
    if (mapFrame) {
      const src = mapFrame.getAttribute('src') || '';
      const coordsMatch = src.match(/q=(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (coordsMatch) {
        location.coordinates = {
          lat: parseFloat(coordsMatch[1]),
          lng: parseFloat(coordsMatch[2]),
        };
      }
    }

    // Generate a slug from the name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return {
      name: cleanText(name),
      slug,
      description: cleanText(description),
      shortDescription: cleanText(description).split('.')[0] + '.',
      location,
      specs,
      amenities,
      images,
      rates,
      features: amenities.slice(0, 8), // Use top amenities as features
    };
  });

  await browser.close();
  return villa;
}

async function scrapeVillas() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--no-sandbox',
    ],
  });

  const page = await browser.newPage();
  
  // Set a realistic user agent
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

  console.log('Navigating to property listing page...');
  
  // Go to the villas listing page
  await page.goto('https://www.cabovillas.com/cabo-luxury-villas.asp', {
    waitUntil: 'networkidle0',
    timeout: 60000,
  });

  // Wait for property listings to load
  await page.waitForSelector('.villa-list', { timeout: 30000 });

  console.log('Extracting villa URLs...');

  // Get all villa URLs
  const villaUrls = await page.evaluate(() =>
    Array.from(document.querySelectorAll('.villa-item a[href*="villa-details"]')).map(
      (a) => new URL(a.getAttribute('href') || '', window.location.href).href
    ).filter(Boolean)
  );

  console.log(`Found ${villaUrls.length} villa URLs`);

  await browser.close();

  // Create necessary directories
  const imagesDir = path.join(process.cwd(), 'public/images/villas');
  fs.mkdirSync(imagesDir, { recursive: true });

  // Scrape details for each villa
  const villas: ScrapedVilla[] = [];
  for (const [index, url] of villaUrls.entries()) {
    try {
      console.log(`Scraping villa ${index + 1}/${villaUrls.length}: ${url}`);
      const villa = await scrapeVillaDetails(url);
      villas.push(villa);

      // Download images
      for (const [imgIndex, imageUrl] of villa.images.entries()) {
        const filename = `villa-${villa.slug}-${imgIndex + 1}.jpg`;
        const filepath = path.join(imagesDir, filename);
        
        try {
          await downloadImage(imageUrl, filepath);
          console.log(`Downloaded ${filename}`);
        } catch (error) {
          console.error(`Error downloading ${filename}:`, error);
        }
      }

      // Add a delay between requests to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
    }
  }

  // Save the scraped data
  const outputPath = path.join(process.cwd(), 'server/data/scraped-villas.json');
  fs.writeFileSync(outputPath, JSON.stringify(villas, null, 2));
  console.log(`Saved ${villas.length} villas to ${outputPath}`);
}

// Run the scraper
scrapeVillas().catch(console.error); 