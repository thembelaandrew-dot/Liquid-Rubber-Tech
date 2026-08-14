const fs = require('fs');
let code = fs.readFileSync('src/pages/Services.tsx', 'utf8');

code = code.replace(
  />\s*Explore Service\s*</g,
  '>Explore Service <span className="sr-only">about {service.title}</span> <'
).replace(
  />\s*View Details\s*</g,
  '>View Details <span className="sr-only">about {service.title}</span> <'
).replace(
  />\s*Learn More\s*</g,
  '>Learn More <span className="sr-only">about {service.title}</span> <'
);

fs.writeFileSync('src/pages/Services.tsx', code);
console.log('Services.tsx updated.');
