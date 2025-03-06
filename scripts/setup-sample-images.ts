import fs from 'fs';
import path from 'path';
import https from 'https';

const images = {
  'cabo-default.jpg': 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542',
  'villas-hero.jpg': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  'yachts-hero.jpg': 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166',
  'villa-1.jpg': 'https://images.unsplash.com/photo-1613977257363-707ba9348227',
  'villa-2.jpg': 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4',
  'villa-3.jpg': 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4',
  'yacht-1.jpg': 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166',
  'yacht-2.jpg': 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166',
  'yacht-3.jpg': 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166',
};

const downloadImage = (url: string, filepath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    https
      .get(`${url}?w=1200&q=80`, (response) => {
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
};

async function setupImages() {
  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');

  // Create directories if they don't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  // Download all images
  for (const [filename, url] of Object.entries(images)) {
    const filepath = path.join(imagesDir, filename);
    console.log(`Downloading ${filename}...`);
    try {
      await downloadImage(url, filepath);
      console.log(`Successfully downloaded ${filename}`);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error);
    }
  }
}

setupImages().catch(console.error); 