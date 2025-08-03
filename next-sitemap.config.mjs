/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://www.trustlinc.app",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: [
        "/verify",
        "/verify/*",
        "/welcome",
        "/welcome/*",
        "/login-verify",
        "/onboarding/*",
        "/restart-onboarding",
        "/shipper/dashboard",
        "/shipper/notifications",
        "/shipper/create-delivery",
        "/dashboard",
        "/create-delivery",
        "/profile",
        "/my-packages",
    ],
};

export default config;
