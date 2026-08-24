const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// Replace "Exterior Painting Update" with "Exterior Painting"
content = content.replace(/title:\s*'Exterior Painting Update'/g, "title: 'Exterior Painting'");

// Replace "Roof Restoration Update" with "Roof Restoration" (just in case)
content = content.replace(/title:\s*'Roof Restoration Update'/g, "title: 'Roof Restoration'");

fs.writeFileSync('src/data.ts', content);
