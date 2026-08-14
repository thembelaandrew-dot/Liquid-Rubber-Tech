const fs = require('fs');
let code = fs.readFileSync('src/pages/ServiceDetail.tsx', 'utf8');

// Replace existing SEO block
const seoRegex = /<SEO\s+[^>]*\/>/s;
const newSEO = `<SEO 
        title={\`\${service.title} | Eswatini\`}
        description={service.description}
        image={service.image}
        url={\`https://liquidrubbertech.netlify.app/services/\${service.id}\`}
      />`;

code = code.replace(seoRegex, newSEO);
fs.writeFileSync('src/pages/ServiceDetail.tsx', code);
console.log('ServiceDetail updated.');
