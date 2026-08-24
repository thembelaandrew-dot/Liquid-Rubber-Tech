const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// Find all matches of id 16
const regex = /,\s*\{\s*id:\s*16,\s*category:\s*'Painting'.*?\}/g;
content = content.replace(regex, ''); // remove all

// Put one back at the end of galleryData
content = content.replace(/\];\s*export const testimonials/, `,
  { id: 16, category: 'Painting', title: 'Exterior Painting Update', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/5c8Bx0J.jpeg' }] }
];\nexport const testimonials`);

fs.writeFileSync('src/data.ts', content);
