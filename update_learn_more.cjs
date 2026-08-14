const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(
  /Learn More <ArrowRight/g,
  'Learn More <span className="sr-only">about {service.title}</span> <ArrowRight'
);

fs.writeFileSync('src/pages/Home.tsx', code);
console.log('Home.tsx updated.');
