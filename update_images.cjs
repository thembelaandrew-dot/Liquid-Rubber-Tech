const fs = require('fs');
let dataCode = fs.readFileSync('src/data.ts', 'utf8');

const serviceImages = [
  'https://i.imgur.com/hrha8p3.jpeg',
  'https://i.imgur.com/gTCSdcN.jpeg',
  'https://i.imgur.com/DjvTirP.jpeg',
  'https://i.imgur.com/IiBTEbE.jpeg',
  'https://i.imgur.com/Qf4KNJC.jpeg',
  'https://i.imgur.com/PXYY1hN.jpeg',
  'https://i.imgur.com/8ilQ3ei.jpeg',
  'https://i.imgur.com/EJ4d6aY.jpeg',
  'https://i.imgur.com/u74Wqkt.jpeg',
  'https://i.imgur.com/6Vv7Cvj.jpeg',
  'https://i.imgur.com/QlvY66l.jpeg'
];

let imageIndex = 0;
dataCode = dataCode.replace(/image:\s*'https:\/\/images\.unsplash\.com\/[^']+'/g, () => {
  const newImage = serviceImages[imageIndex];
  imageIndex++;
  return `image: '${newImage}'`;
});
fs.writeFileSync('src/data.ts', dataCode);

let aboutCode = fs.readFileSync('src/pages/About.tsx', 'utf8');
aboutCode = aboutCode.replace(
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  'https://i.imgur.com/A0mmQOK.jpeg'
);
fs.writeFileSync('src/pages/About.tsx', aboutCode);
