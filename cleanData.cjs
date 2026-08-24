const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');
content = content.replace(/,\n\s*\{\s*id:\s*16,\s*category:\s*'Painting'.*?\}(?=\s*,\n\s*\{\s*id:\s*16)/g, '');
fs.writeFileSync('src/data.ts', content);
