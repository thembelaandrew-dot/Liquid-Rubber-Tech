const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// Replace servicesData by adding metaTitle and metaDescription
content = content.replace(
  /id: 'roof-restoration',[\s\S]*?category: 'ROOFING & WATERPROOFING',[\s\S]*?title: 'Roof Restoration & Roof Coatings',[\s\S]*?description: '([^']+)',/g,
  `id: 'roof-restoration',
    category: 'ROOFING & WATERPROOFING',
    title: 'Roof Restoration & Roof Coatings',
    description: '$1',
    metaTitle: 'Professional Roof Restoration Services in Eswatini | Liquid Rubber Tech',
    metaDescription: 'Extend the lifespan of your roof with our premium roof restoration and protective coating systems. Request a free quote in Eswatini today.',`
);

content = content.replace(
  /id: 'roof-washing',[\s\S]*?category: 'ROOFING & WATERPROOFING',[\s\S]*?title: 'Professional Roof Washing & Cleaning',[\s\S]*?description: '([^']+)',/g,
  `id: 'roof-washing',
    category: 'ROOFING & WATERPROOFING',
    title: 'Professional Roof Washing & Cleaning',
    description: '$1',
    metaTitle: 'Roof Washing & Cleaning Services Eswatini | Remove Dirt & Moss',
    metaDescription: 'Restore the appearance of your property with professional roof cleaning and washing services in Eswatini. We remove dirt, moss, and algae effectively.',`
);

content = content.replace(
  /id: 'waterproofing',[\s\S]*?category: 'ROOFING & WATERPROOFING',[\s\S]*?title: 'Waterproofing Solutions',[\s\S]*?description: '([^']+)',/g,
  `id: 'waterproofing',
    category: 'ROOFING & WATERPROOFING',
    title: 'Waterproofing Solutions',
    description: '$1',
    metaTitle: 'Advanced Waterproofing Solutions in Eswatini | Liquid Rubber Tech',
    metaDescription: 'Stop leaks before they damage your property. We offer advanced liquid-rubber waterproofing for roofs, walls, and parapets in Eswatini.',`
);

content = content.replace(
  /id: 'gutters',[\s\S]*?category: 'ROOFING & WATERPROOFING',[\s\S]*?title: 'Gutters & Fascia Installation and Repairs',[\s\S]*?description: '([^']+)',/g,
  `id: 'gutters',
    category: 'ROOFING & WATERPROOFING',
    title: 'Gutters & Fascia Installation and Repairs',
    description: '$1',
    metaTitle: 'Gutters & Fascia Installation Eswatini | Repairs & Maintenance',
    metaDescription: 'Ensure proper water drainage with our professional gutter and fascia installation, repair, and maintenance services in Eswatini.',`
);

content = content.replace(
  /id: 'damp-wall',[\s\S]*?category: 'ROOFING & WATERPROOFING',[\s\S]*?title: 'Damp Wall Treatment',[\s\S]*?description: '([^']+)',/g,
  `id: 'damp-wall',
    category: 'ROOFING & WATERPROOFING',
    title: 'Damp Wall Treatment',
    description: '$1',
    metaTitle: 'Rising Damp & Wall Treatment Eswatini | Moisture Protection',
    metaDescription: 'Protect your property from rising damp and moisture problems. We provide effective damp wall treatments and restoration in Eswatini.',`
);

content = content.replace(
  /id: 'painting',[\s\S]*?category: 'PROPERTY FINISHING & RENOVATION',[\s\S]*?title: 'Interior & Exterior Painting',[\s\S]*?description: '([^']+)',/g,
  `id: 'painting',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Interior & Exterior Painting',
    description: '$1',
    metaTitle: 'Interior & Exterior Painting Services Eswatini | Premium Finishes',
    metaDescription: 'Transform your property with high-quality interior and exterior painting solutions. We combine aesthetics with long-lasting surface protection.',`
);

content = content.replace(
  /id: 'ceiling',[\s\S]*?category: 'PROPERTY FINISHING & RENOVATION',[\s\S]*?title: 'Ceiling Installation',[\s\S]*?description: '([^']+)',/g,
  `id: 'ceiling',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Ceiling Installation',
    description: '$1',
    metaTitle: 'Modern Ceiling Installation Eswatini | Residential & Commercial',
    metaDescription: 'Upgrade your interiors with modern ceiling installation solutions. Professional ceiling workmanship for homes and businesses in Eswatini.',`
);

content = content.replace(
  /id: 'tiling',[\s\S]*?category: 'PROPERTY FINISHING & RENOVATION',[\s\S]*?title: 'Tiling',[\s\S]*?description: '([^']+)',/g,
  `id: 'tiling',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Tiling',
    description: '$1',
    metaTitle: 'Professional Tiling Services Eswatini | Floor & Wall Tiling',
    metaDescription: 'High-quality tiling for floors, walls, bathrooms, and kitchens. Experience precision workmanship and durable, attractive finishes.',`
);

content = content.replace(
  /id: 'epoxy',[\s\S]*?category: 'PROPERTY FINISHING & RENOVATION',[\s\S]*?title: 'Epoxy Flooring',[\s\S]*?description: '([^']+)',/g,
  `id: 'epoxy',
    category: 'PROPERTY FINISHING & RENOVATION',
    title: 'Epoxy Flooring',
    description: '$1',
    metaTitle: 'Seamless Epoxy Flooring Eswatini | Durable Floor Coatings',
    metaDescription: 'Get durable and seamless epoxy flooring for residential or commercial properties. Easy-to-clean, protective floor coatings that last.',`
);

content = content.replace(
  /id: 'paving',[\s\S]*?category: 'CONSTRUCTION & MAINTENANCE',[\s\S]*?title: 'Paving & Concrete Work',[\s\S]*?description: '([^']+)',/g,
  `id: 'paving',
    category: 'CONSTRUCTION & MAINTENANCE',
    title: 'Paving & Concrete Work',
    description: '$1',
    metaTitle: 'Paving & Concrete Construction Eswatini | Driveways & Slabs',
    metaDescription: 'Expert paving and concrete construction. We build durable driveways, walkways, and concrete slabs emphasizing precision and quality.',`
);

content = content.replace(
  /id: 'plumbing',[\s\S]*?category: 'CONSTRUCTION & MAINTENANCE',[\s\S]*?title: 'Plumbing',[\s\S]*?description: '([^']+)',/g,
  `id: 'plumbing',
    category: 'CONSTRUCTION & MAINTENANCE',
    title: 'Plumbing',
    description: '$1',
    metaTitle: 'Professional Plumbing Services Eswatini | Repairs & Installations',
    metaDescription: 'Reliable plumbing installation, repair, and maintenance services. Ensure your systems function perfectly with our expert workmanship.',`
);

fs.writeFileSync('src/data.ts', content);
