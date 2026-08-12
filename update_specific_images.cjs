const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const imageMap = {
  'paving': 'https://i.imgur.com/Yh17Ohc.jpeg',
  'epoxy': 'https://i.imgur.com/j7WnKoC.jpeg',
  'damp-wall': 'https://i.imgur.com/MjzKqqt.jpeg',
  'painting': 'https://i.imgur.com/y6P1Mxs.png',
  'gutters': 'https://i.imgur.com/m2cYStH.png',
  'roof-restoration': 'https://i.imgur.com/tmbjtIt.png',
  'waterproofing': 'https://i.imgur.com/traTT2o.jpeg',
};

for (const [id, url] of Object.entries(imageMap)) {
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?image:\\s*')[^']+(\')`);
  code = code.replace(regex, `$1${url}$2`);
}

fs.writeFileSync('src/data.ts', code);
