const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(
  "<span className=\"text-gradient\">Restore &amp; Transform</span><br />\n              Your Property",
  "Sealing Strength.<br />\n              <span className=\"text-gradient\">Lasting Protection.</span>"
);

code = code.replace(
  "Sealing Strength. Lasting Protection. From leaks to complete restorations, we deliver high-end construction and waterproofing solutions built to last.",
  "Professional property restoration, roofing, waterproofing, construction finishing, and maintenance company in Eswatini."
);

fs.writeFileSync('src/pages/Home.tsx', code);
