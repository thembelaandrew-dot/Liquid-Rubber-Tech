const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
  /<title>.*?<\/title>/s,
  `<title>Liquid Rubber Tech Investments | Eswatini</title>
    <meta name="description" content="Liquid Rubber Tech Investments provides high-end construction and waterproofing solutions in Eswatini. We protect, restore, and transform your property." />
    <meta property="og:title" content="Liquid Rubber Tech Investments | Eswatini" />
    <meta property="og:description" content="Liquid Rubber Tech Investments provides high-end construction and waterproofing solutions in Eswatini." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://liquidrubbertech.netlify.app/" />
    <meta property="og:image" content="https://i.imgur.com/K1Pyv2G.jpeg" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="Liquid Rubber Tech Investments | Eswatini" />
    <meta property="twitter:description" content="Liquid Rubber Tech Investments provides high-end construction and waterproofing solutions in Eswatini." />
    <meta property="twitter:image" content="https://i.imgur.com/K1Pyv2G.jpeg" />
    <link rel="canonical" href="https://liquidrubbertech.netlify.app/" />`
);

fs.writeFileSync('index.html', code);
console.log('index.html updated.');
