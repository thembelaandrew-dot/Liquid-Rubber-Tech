const fs = require('fs');
let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');

homeCode = homeCode.replace(
  'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&w=2000&q=80',
  'https://i.imgur.com/7ArB8E7.jpeg'
);
fs.writeFileSync('src/pages/Home.tsx', homeCode);
