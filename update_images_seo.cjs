const fs = require('fs');

// 1. Home.tsx
let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');
homeCode = homeCode.replace(
  /alt="Modern Construction"/g,
  'alt="Liquid Rubber Tech team applying premium waterproofing in Eswatini"'
);
homeCode = homeCode.replace(
  /alt="Construction Work"/g,
  'alt="Completed waterproofing and roof restoration project in Eswatini" loading="lazy"'
);
fs.writeFileSync('src/pages/Home.tsx', homeCode);

// 2. About.tsx
let aboutCode = fs.readFileSync('src/pages/About.tsx', 'utf8');
aboutCode = aboutCode.replace(
  /alt="Team at work"/g,
  'alt="Liquid Rubber Tech professionals at work in Eswatini" loading="lazy"'
);
fs.writeFileSync('src/pages/About.tsx', aboutCode);

// 3. Gallery.tsx
let galleryCode = fs.readFileSync('src/pages/Gallery.tsx', 'utf8');
galleryCode = galleryCode.replace(
  /alt="Featured Work"/g,
  'alt={`${item.category} project by Liquid Rubber Tech in Eswatini`} loading="lazy"'
);
fs.writeFileSync('src/pages/Gallery.tsx', galleryCode);

// 4. Services.tsx
let servicesCode = fs.readFileSync('src/pages/Services.tsx', 'utf8');
servicesCode = servicesCode.replace(
  /alt=\{service.title\}/g,
  'alt={`${service.title} services in Eswatini`} loading="lazy"'
);
fs.writeFileSync('src/pages/Services.tsx', servicesCode);

// 5. Navbar.tsx
let navCode = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
navCode = navCode.replace(
  /alt="Liquid Rubber Tech"/g,
  'alt="Liquid Rubber Tech Logo"'
);
fs.writeFileSync('src/components/Navbar.tsx', navCode);

// 6. Footer.tsx
let footerCode = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footerCode = footerCode.replace(
  /alt="Liquid Rubber Tech"/g,
  'alt="Liquid Rubber Tech Logo" loading="lazy"'
);
fs.writeFileSync('src/components/Footer.tsx', footerCode);

console.log('Images updated.');
