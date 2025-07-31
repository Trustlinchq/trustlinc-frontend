/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://www.trustlinc.app",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: [
        "/verify",
        "/verify/*",
        "/onboarding/*",
        "/restart-onboarding",
        "/dashboard",
        "/create-delivery",
        "/profile",
        "/my-packages",
    ],
};

export default config;
