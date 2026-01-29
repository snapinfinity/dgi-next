export default function robots() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://decograph.ae";
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
