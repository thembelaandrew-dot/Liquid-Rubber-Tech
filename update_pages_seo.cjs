const fs = require('fs');

const updateSEO = (file, newTitle, newDesc, urlPath, schemaStr = null) => {
  if (!fs.existsSync(file)) return;
  let code = fs.readFileSync(file, 'utf8');
  
  // Replace existing SEO block. We will just use regex to match the <SEO ... /> block.
  // Since it can span multiple lines, we need a robust regex.
  const seoRegex = /<SEO\s+[^>]*\/>/s;
  
  let newSEO = `<SEO 
        title="${newTitle}" 
        description="${newDesc}"
        url="https://liquidrubbertech.netlify.app${urlPath}"`;
  
  if (schemaStr) {
    newSEO += `\n        schema={${schemaStr}}`;
  }
  
  newSEO += `\n      />`;

  if (seoRegex.test(code)) {
    code = code.replace(seoRegex, newSEO);
  } else {
    // If no SEO component, insert it after <div className="...">
    // Or just after the first div
    code = code.replace(/(<div[^>]*>)/, `$1\n      ${newSEO}`);
  }
  
  fs.writeFileSync(file, code);
};

// 1. Home
updateSEO(
  'src/pages/Home.tsx',
  'Waterproofing & Roof Restoration | Liquid Rubber Tech | Eswatini',
  'Liquid Rubber Tech Investments specializes in premium waterproofing, roof restoration, and high-end construction solutions across Eswatini. 100% leak-free guarantee.',
  '/',
  `{
          "@context": "https://schema.org",
          "@type": "RoofingContractor",
          "name": "Liquid Rubber Tech Investments",
          "image": "https://i.imgur.com/K1Pyv2G.jpeg",
          "description": "Premium waterproofing and roof restoration services in Eswatini.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Manzini",
            "addressRegion": "Manzini",
            "addressCountry": "SZ"
          },
          "areaServed": "Eswatini",
          "telephone": "+268-7661-0372",
          "url": "https://liquidrubbertech.netlify.app/"
        }`
);

// 2. About
updateSEO(
  'src/pages/About.tsx',
  'About Liquid Rubber Tech | Eswatini Construction Experts',
  'Learn about Liquid Rubber Tech Investments, Eswatini’s trusted experts in waterproofing, property restoration, and durable construction solutions.',
  '/about'
);

// 3. Services
updateSEO(
  'src/pages/Services.tsx',
  'Our Services | Waterproofing, Roofing & Construction | Eswatini',
  'Explore our comprehensive property services in Eswatini, including premium waterproofing, roof restorations, epoxy flooring, and full property renovations.',
  '/services'
);

// 4. Gallery
updateSEO(
  'src/pages/Gallery.tsx',
  'Project Gallery | Liquid Rubber Tech Past Work',
  'View our portfolio of completed projects in Eswatini. See the quality of our waterproofing, roofing, painting, and construction work.',
  '/gallery'
);

// 5. Contact
updateSEO(
  'src/pages/Contact.tsx',
  'Contact Liquid Rubber Tech | Get a Quote in Eswatini',
  'Contact our team for a free consultation or project quote. Nationwide service in Eswatini for residential and commercial property protection.',
  '/contact'
);

console.log("Pages updated.");
