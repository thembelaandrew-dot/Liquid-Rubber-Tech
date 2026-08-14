const fs = require('fs');
let code = fs.readFileSync('src/components/SEO.tsx', 'utf8');

code = code.replace(
  /const siteTitle = `\$\{title\} \| Liquid Rubber Tech Investments`;/,
  "const siteTitle = title.includes('Liquid Rubber') ? title : `${title} | Liquid Rubber Tech Investments`;"
);

fs.writeFileSync('src/components/SEO.tsx', code);
