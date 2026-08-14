const fs = require('fs');
let code = fs.readFileSync('src/components/SEO.tsx', 'utf8');

code = code.replace(
  /url = 'https:\/\/liquidrubbertech\.com'/,
  "url = 'https://liquidrubbertech.netlify.app'"
);

// Add Canonical link
code = code.replace(
  /<meta name="description" content={description} \/>/,
  `<meta name="description" content={description} />
      <link rel="canonical" href={url} />`
);

fs.writeFileSync('src/components/SEO.tsx', code);
