const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Update Hero Heading
code = code.replace(
  "Premium Construction & <span className=\"text-gradient\">Waterproofing</span>",
  "Sealing Strength.<br/><span className=\"text-gradient\">Lasting Protection.</span>"
);

// Update Hero Subtitle
code = code.replace(
  "Advanced liquid rubber technology and expert construction finishes for residential and commercial properties in Eswatini.",
  "Professional property restoration, roofing, waterproofing, construction finishing, and maintenance company in Eswatini."
);

// Update "Why Choose Us" heading and bullets to SEAL, PROTECT, RESTORE
code = code.replace(
  "<h2 className=\"text-3xl md:text-5xl font-display font-bold mb-6\">Strong. Professional.<br/><span className=\"text-brand-green\">Built to Last.</span></h2>",
  "<h2 className=\"text-3xl md:text-5xl font-display font-bold mb-6\">SEAL. PROTECT.<br/><span className=\"text-brand-green\">RESTORE.</span></h2>"
);

code = code.replace(
  "We don't just fix problems; we engineer lasting solutions. Our advanced materials and expert application ensure your property stands strong against the elements.",
  "We engineer lasting solutions to prevent leaks, protect surfaces, and restore deteriorated properties. Our premium products and experienced team ensure your investment stands strong."
);

code = code.replace(
  "{ icon: ShieldCheck, title: 'Premium Materials', desc: 'We use industry-leading liquid rubber and epoxy compounds.' }",
  "{ icon: ShieldCheck, title: 'SEAL', desc: 'Prevent leaks and water penetration with premium liquid-rubber technology.' }"
);

code = code.replace(
  "{ icon: Zap, title: 'Rapid Execution', desc: 'Efficient project management without compromising quality.' }",
  "{ icon: Zap, title: 'PROTECT', desc: 'Protect roofs, walls, floors, and other property surfaces from damage.' }"
);

code = code.replace(
  "{ icon: Droplet, title: 'Waterproof Guarantee', desc: '100% sealed, seamless finishes that completely repel water.' }",
  "{ icon: Droplet, title: 'RESTORE', desc: 'Restore damaged, aged, dirty, or deteriorated property surfaces to their prime.' }"
);

// Update "Our Core Services"
code = code.replace(
  "Comprehensive solutions for structural integrity and aesthetic perfection.",
  "From roofing and waterproofing to property finishing and maintenance."
);

// Make sure the image shows 15-year warranty
code = code.replace(
  "<p className=\"text-3xl font-display font-bold text-brand-green\">15+</p>\n                  <p className=\"text-sm text-gray-300 font-bold tracking-wider uppercase\">Years Added Lifespan</p>",
  "<p className=\"text-3xl font-display font-bold text-brand-green\">15 Yrs</p>\n                  <p className=\"text-sm text-gray-300 font-bold tracking-wider uppercase\">Warranty on selected systems</p>"
);

fs.writeFileSync('src/pages/Home.tsx', code);
