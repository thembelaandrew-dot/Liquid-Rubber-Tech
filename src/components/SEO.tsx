import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  url?: string;
  image?: string;
  schema?: Record<string, any> | Record<string, any>[];
  noIndex?: boolean;
}

export default function SEO({ 
  title, 
  description, 
  type = 'website', 
  url = 'https://liquidrubbertech.co.za/', 
  image = 'https://i.imgur.com/K1Pyv2G.jpeg',
  schema,
  noIndex = false
}: SEOProps) {
  const siteTitle = title.includes('Liquid Rubber') ? title : `${title} | Liquid Rubber Tech`;

  const schemas = schema 
    ? Array.isArray(schema) 
      ? schema 
      : [schema] 
    : [];

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Robots Directive */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="Liquid Rubber Tech" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* Fallback property tags for legacy scrapers */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* JSON-LD Schema Markup */}
      {schemas.map((s, idx) => (
        <script key={idx} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
