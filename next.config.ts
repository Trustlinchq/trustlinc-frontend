import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    headers: async () => [
        {
            source: "/og-image.jpg",
            headers: [
                {
                    key: "Cache-Control",
                    value: "no-store",
                },
                {
                    key: "Access-Control-Allow-Origin",
                    value: "*",
                },
            ],
        },
    ],
};

export default nextConfig;
