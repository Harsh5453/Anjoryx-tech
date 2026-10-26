import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.anjoryx.com';
const DEFAULT_DESCRIPTION =
  'ANJORYX Technologies designs and builds modern web applications, custom software, backend systems and AI-powered automation for startups and businesses.';

export default function SEO({ title, description = DEFAULT_DESCRIPTION, path = '/', noIndex = false }) {
  const fullTitle = title
    ? `${title} | ANJORYX Technologies`
    : 'ANJORYX Technologies — Engineering the Next Era';
  const canonical = `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {noIndex && <meta name="robots" content="noindex" />}
    </Helmet>
  );
}
