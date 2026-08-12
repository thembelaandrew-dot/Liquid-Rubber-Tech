const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(
  "{servicesData.slice(0, 4).map((service, index) => (",
  "{servicesData.filter(s => ['roof-restoration', 'waterproofing', 'painting', 'epoxy']).map((service, index) => ("
);

fs.writeFileSync('src/pages/Home.tsx', code);
