const fs = require('fs');
let code = fs.readFileSync('src/pages/Contact.tsx', 'utf8');

// Insert comment before the Location map pin
code = code.replace(
  /\{ icon: MapPin, title: 'Location', lines: \['Eswatini \(Nationwide Service\)'\] \},/g,
  `{ icon: MapPin, title: 'Location', lines: ['Eswatini (Nationwide Service)'] }, // DEVELOPER NOTE: For optimal Local SEO, provide a full physical street address here if available.`
);

fs.writeFileSync('src/pages/Contact.tsx', code);
console.log('Contact.tsx updated.');
