const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const newServices = `import { Shield, Droplets, PaintBucket, Wrench, Grid2X2, Hammer, Box, PenTool, CloudRain, Droplet, Layers } from 'lucide-react';

export const servicesData = [
  {
    id: 'roof-restoration',
    category: 'ROOFING & WATERPROOFING',
    title: 'Roof Restoration & Roof Coatings',
    description: 'Professional roof restoration and protective coating systems designed to extend the lifespan of existing roofs.',
    icon: Shield,
    benefits: ['Extends the usable life of existing roofing systems', 'Roof surface protection', 'Protective roof coatings', 'Seamless sealing'],
    process: ['Inspection', 'Surface preparation', 'Crack & joint sealing', 'Protective roof coating application'],
    image: 'https://images.unsplash.com/photo-1632759145355-66774f76261c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'roof-washing',
    category: 'ROOFING & WATERPROOFING',
    title: 'Professional Roof Washing & Cleaning',
    description: 'Professional roof cleaning and washing services to restore the appearance and cleanliness of roofs.',
    icon: Droplets,
    benefits: ['Removal of dirt, moss, and algae', 'General roof washing', 'Roof appearance restoration', 'Healthier-looking roofs'],
    process: ['Site preparation', 'High-pressure roof cleaning', 'Moss and algae treatment', 'Final rinse and inspection'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'waterproofing',
    category: 'ROOFING & WATERPROOFING',
    title: 'Waterproofing Solutions',
    description: 'Advanced liquid-rubber waterproofing solutions for different areas of residential and commercial properties.',
    icon: CloudRain,
    benefits: ['Protection against water penetration', 'Sealing vulnerable surfaces', 'Roof, wall, parapet & concrete waterproofing', 'Durable protection against leaks'],
    process: ['Surface preparation', 'Moisture testing', 'Application of waterproof membrane', 'Curing and final inspection'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gutters',
    category: 'ROOFING & WATERPROOFING',
    title: 'Gutters & Fascia Installation and Repairs',
    description: 'Installation, repair, and maintenance of gutters and fascia systems for proper water drainage.',
    icon: Wrench,
    benefits: ['Improving roof drainage', 'Protecting buildings from water-related damage', 'Neat finishing around roof edges', 'Gutter & fascia maintenance'],
    process: ['Measurement and fabrication', 'Removal of old systems', 'Secure mounting & repairs', 'Water flow testing'],
    image: 'https://images.unsplash.com/photo-1613941785501-c8526279f649?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'damp-wall',
    category: 'ROOFING & WATERPROOFING',
    title: 'Damp Wall Treatment',
    description: 'Solutions for walls affected by rising damp and moisture problems, protecting your property.',
    icon: Droplet,
    benefits: ['Rising damp treatment', 'Moisture protection & prevention', 'Wall restoration', 'Protection against recurring dampness'],
    process: ['Identifying moisture source', 'Surface preparation', 'Treatment application', 'Restoration finishing'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'painting',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Interior & Exterior Painting',
    description: 'High-quality painting solutions for both interior and exterior areas, combining aesthetics and protection.',
    icon: PaintBucket,
    benefits: ['Property transformation', 'Surface protection', 'Decorative finishing', 'Professional painting solutions'],
    process: ['Surface sanding and cleaning', 'Masking and protection', 'Primer coat', 'Two premium top coats'],
    image: 'https://images.unsplash.com/photo-1562259929-b7e181d8d9b7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ceiling',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Ceiling Installation',
    description: 'Modern ceiling installation solutions for residential and commercial properties.',
    icon: Hammer,
    benefits: ['Modern ceiling designs', 'Interior ceiling finishing', 'Professional ceiling workmanship', 'Stylish ceiling improvements and upgrades'],
    process: ['Framework installation', 'Panel mounting', 'Joint sealing & skimming', 'Finishing & painting'],
    image: 'https://images.unsplash.com/photo-1518799175676-a0de7d853472?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tiling',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Tiling',
    description: 'Professional tiling services for residential and commercial properties.',
    icon: Grid2X2,
    benefits: ['Floor, wall, bathroom & kitchen tiling', 'Decorative tiling', 'Quality workmanship and precision', 'Attractive finishes and durability'],
    process: ['Substrate preparation', 'Layout planning', 'Tile installation', 'Tile finishing and grouting'],
    image: 'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'epoxy',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Epoxy Flooring',
    description: 'Durable and seamless epoxy flooring solutions for residential and commercial properties.',
    icon: Layers,
    benefits: ['Seamless flooring', 'Durable floor finishes', 'Easy-to-clean flooring', 'Protective floor coatings'],
    process: ['Diamond grinding surface', 'Crack repair', 'Epoxy floor installation', 'Top clear coat sealing'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'paving',
    category: 'CONSTRUCTION & MAINTENANCE',
    title: 'Paving & Concrete Work',
    description: 'Professional paving and concrete construction work, emphasizing precision and durability.',
    icon: Box,
    benefits: ['Driveways & walkways', 'Concrete slabs & finishing', 'Quality workmanship', 'Professional finishing'],
    process: ['Surface preparation and grading', 'Base layer compaction', 'Paver laying or concrete pouring', 'Finishing and sealing'],
    image: 'https://images.unsplash.com/photo-1584988701980-60b73b22b9aa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'plumbing',
    category: 'CONSTRUCTION & MAINTENANCE',
    title: 'Plumbing',
    description: 'Plumbing installation, repair, and maintenance services focusing on reliability and professional workmanship.',
    icon: PenTool,
    benefits: ['Plumbing installations & repairs', 'Plumbing maintenance & system servicing', 'Pipework', 'Reliability and properly functioning systems'],
    process: ['System diagnostics', 'Pipe repair or routing', 'Fixture installation', 'Testing and maintenance'],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  }
];`;

const replacement = newServices;
const originalImports = "import { Shield, Droplets, PaintBucket, Wrench, Grid2X2, Hammer, Box, PenTool } from 'lucide-react';\n\nexport const servicesData = [";
const endIndex = code.indexOf('export const galleryData');
const originalServices = code.substring(0, endIndex);
code = code.replace(originalServices, newServices + "\n\n");
fs.writeFileSync('src/data.ts', code);
