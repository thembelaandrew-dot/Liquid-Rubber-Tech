const fs = require('fs');

let code = fs.readFileSync('src/data.ts', 'utf8');
const startToken = 'export const galleryData = [';
const endToken = '];';

const startIndex = code.indexOf(startToken);
const endIndex = code.indexOf(endToken, startIndex);

if (startIndex > -1 && endIndex > -1) {
  // Let's just create a new array with 9 images.
  const newArrayStr = `
  { id: 1, category: 'Waterproofing', url: 'https://i.imgur.com/QlvY66l.jpeg' },
  { id: 2, category: 'Roofing', url: 'https://i.imgur.com/A0mmQOK.jpeg' },
  { id: 3, category: 'Painting', url: 'https://i.imgur.com/acc0hyu.jpeg' },
  { id: 4, category: 'Restoration', url: 'https://i.imgur.com/7ArB8E7.jpeg' },
  { id: 5, category: 'Waterproofing', url: 'https://i.imgur.com/lcJOpKY.jpeg' },
  { id: 6, category: 'Roofing', url: 'https://i.imgur.com/vpaoSZK.jpeg' },
  { id: 7, category: 'Painting', url: 'https://i.imgur.com/qdjcEIa.jpeg' },
  { id: 8, category: 'Restoration', url: 'https://i.imgur.com/iGVxcFw.jpeg' },
  { id: 9, category: 'Waterproofing', url: 'https://i.imgur.com/UEWYH7e.jpeg' }
`;

  const newCode = code.substring(0, startIndex) + 
                  'export const galleryData = [' + 
                  newArrayStr + 
                  code.substring(endIndex);

  fs.writeFileSync('src/data.ts', newCode);
  console.log("Replaced galleryData with 9 distinct items.");
}
