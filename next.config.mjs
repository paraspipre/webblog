/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    APP_NAME: 'WEBBLOG',
    API_PRODUCTION: 'https://lazy-cyan-bluefish-fez.cyclic.app',
    API_DEVELOPMENT: 'http://localhost:8000',
    PRODUCTION: true,
    DOMAIN_DEVELOPMENT: 'http://localhost:3000',
    DOMAIN_PRODUCTION: 'https://webblog-iota.vercel.app',
    DISQUS_SHORTNAME: 'blog-aeur4pjckv',
    GOOGLE_CLIENT_ID: '717571023154-svs1d42j6rp05c7b8jmd6bbjs28ll20e.apps.googleusercontent.com'
  },
};


export default nextConfig;
