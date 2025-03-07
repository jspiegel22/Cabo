import fs from 'fs';
import path from 'path';
import https from 'https';

const images = {
  'cabo-default.jpg': 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542',
  'villas-hero.jpg': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  'yachts-hero.jpg': 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166',
  'adventures-hero.jpg': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
  'restaurants-hero.jpg': 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88',
  'villa-1.jpg': 'https://images.unsplash.com/photo-1613977257363-707ba9348227',
  'villa-2.jpg': 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4',
  'villa-3.jpg': 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4',
  'yacht-1.jpg': 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166',
  'yacht-2.jpg': 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166',
  'yacht-3.jpg': 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166',
  'adventure-1.jpg': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
  'adventure-2.jpg': 'https://images.unsplash.com/photo-1533130061792-64b345e4a833',
  'adventure-3.jpg': 'https://images.unsplash.com/photo-1602088113235-229c19758e9f',
  'restaurant-1.jpg': 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88',
  'restaurant-2.jpg': 'https://images.unsplash.com/photo-1535850579364-952ef600d22e',
  'restaurant-3.jpg': 'https://images.unsplash.com/photo-1544148103-0773bf10d330',
  'restaurant-4.jpg': 'https://images.unsplash.com/photo-1544148103-0773bf10d330',
  'restaurant-5.jpg': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
  'restaurant-6.jpg': 'https://images.unsplash.com/photo-1559339352-11d035aa65de',
  'guides/dining-guide-cover.jpg': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
  'guides/wine-guide-cover.jpg': 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
  'guides/reservation-guide-cover.jpg': 'https://images.unsplash.com/photo-1592861956120-e524fc739696',
  'reviews/sunset-monalisa-1.jpg': 'https://images.unsplash.com/photo-1544148103-0773bf10d330',
  'reviews/sunset-monalisa-2.jpg': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
  'reviews/el-farallon-1.jpg': 'https://images.unsplash.com/photo-1559339352-11d035aa65de',
  'avatars/sarah-m.jpg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  'avatars/james-k.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
  // Villa Vista Ballena Images
  'villas/vista-ballena/main.jpg': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  'villas/vista-ballena/living.jpg': 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
  'villas/vista-ballena/pool.jpg': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  'villas/vista-ballena/kitchen.jpg': 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
  'villas/vista-ballena/master.jpg': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3',
  'villas/vista-ballena/theater.jpg': 'https://images.unsplash.com/photo-1593784991095-a205069470b6',
  'villas/vista-ballena/gym.jpg': 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f',
  // Additional Villa Images
  'villas/casa-mar/main.jpg': 'https://images.unsplash.com/photo-1613977257363-707ba9348227',
  'villas/casa-mar/pool.jpg': 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4',
  'villas/casa-mar/beach.jpg': 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f',
  'villas/casa-mar/dining.jpg': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3',
  'villas/villa-serena/main.jpg': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  'villas/villa-serena/infinity.jpg': 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4',
  'villas/villa-serena/lounge.jpg': 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
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

  // Create base directories if they don't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
  }

  // Create subdirectories
  const subdirs = ['guides', 'reviews', 'avatars'];
  for (const subdir of subdirs) {
    const subdirPath = path.join(imagesDir, subdir);
    if (!fs.existsSync(subdirPath)) {
      fs.mkdirSync(subdirPath);
    }
  }

  // Download all images
  for (const [filename, url] of Object.entries(images)) {
    const filepath = path.join(imagesDir, filename);
    
    // Create parent directory if it doesn't exist
    const parentDir = path.dirname(filepath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    
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