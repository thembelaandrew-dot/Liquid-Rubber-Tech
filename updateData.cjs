const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');
const newItem = `  ,
  { id: 16, category: 'Painting', title: 'Exterior Painting Update', type: 'single', images: [{ stage: 'Combined', url: 'https://i.imgur.com/5c8Bx0J.jpeg' }] }
];`;
content = content.replace(/\n\];?\s*$/, newItem);
fs.writeFileSync('src/data.ts', content);
