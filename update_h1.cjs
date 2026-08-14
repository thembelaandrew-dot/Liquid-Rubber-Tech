const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(
  /We Protect, <br \/>\s*Sealing Strength\.<br \/>\s*<span className="text-gradient">Lasting Protection\.<\/span>/,
  `Liquid Rubber Tech<br />
              <span className="text-gradient">Waterproofing in Eswatini.</span>`
);

fs.writeFileSync('src/pages/Home.tsx', code);
console.log('H1 updated.');
