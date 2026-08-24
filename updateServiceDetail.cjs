const fs = require('fs');

let content = fs.readFileSync('src/pages/ServiceDetail.tsx', 'utf8');

content = content.replace(
  /<SEO\s+title={\`\${service.title} \| Eswatini\`}\s+description={service.description}\s+image={service.image}\s+url={\`https:\/\/liquidrubbertech.netlify.app\/services\/\${service.id}\`}\s+\/>/g,
  `<SEO 
        title={service.metaTitle || \`\${service.title} | Eswatini\`}
        description={service.metaDescription || service.description}
        image={service.image}
        url={\`https://liquidrubbertech.netlify.app/services/\${service.id}\`}
      />`
);

fs.writeFileSync('src/pages/ServiceDetail.tsx', content);
