const fs = require('fs');
let code = fs.readFileSync('src/pages/ServiceDetail.tsx', 'utf8');

// The SEO component is already being imported since other files use it, but check if it's there
if (!code.includes('import SEO')) {
  code = code.replace(/import { Link, useParams/g, "import SEO from '../components/SEO';\nimport { Link, useParams");
}

const seoReplacement = `
  if (!service) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <SEO title="Service Not Found" description="The requested service could not be found." />
        <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
        <Link to="/services" className="text-brand-blue hover:text-brand-green">Return to Services</Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <SEO 
        title={\`\${service.title} | Eswatini\`}
        description={service.description}
        url={\`https://liquidrubbertech.netlify.app/services/\${service.id}\`}
      />
`;

// Replace `if (!service) { return ... } return ( <div className="pt-20">`
const regex = /if\s*\(!service\)\s*\{\s*return\s*\(\s*<div[^>]*>.*?<\/div>\s*\);\s*\}\s*return\s*\(\s*<div className="pt-20">/s;

if (regex.test(code)) {
  code = code.replace(regex, seoReplacement);
  fs.writeFileSync('src/pages/ServiceDetail.tsx', code);
  console.log('ServiceDetail updated.');
} else {
  console.log('Regex failed for ServiceDetail');
}

