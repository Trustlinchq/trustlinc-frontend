import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import { Toaster } from "sonner";

const ubuntu = Ubuntu({
    subsets: ["latin"],
    variable: "--font-ubuntu",
    weight: ["300", "500", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "TrustLinc | Promises Delivered, Connections Made",
    description:
        "TrustLinc is a community-powered delivery platform redefining the last mile. We transform everyday deliveries into meaningful connections—built on trust, powered by people on the move, and fulfilled with care.",
    keywords: [
        "TrustLinc",
        "peer to peer delivery",
        "Nigeria logistics",
        "community delivery",
        "last mile delivery",
        "ship packages",
        "courier earnings",
        "trust delivery",
    ],
    metadataBase: new URL("https://trustlinc.app"),
    openGraph: {
        title: "TrustLinc | Promises Delivered, Connections Made",
        description:
            "A new kind of delivery platform that connects people through trust, community, and purpose. Join the movement today.",
        url: "https://trustlinc.app",
        siteName: "TrustLinc",
        images: [
            {
                url: "https://trustlinc.app/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "TrustLinc - Promises Delivered, Connections Made",
            },
        ],
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        site: "@TrustLinchq",
        creator: "@TrustLinchq",
        title: "TrustLinc | Promises Delivered, Connections Made",
        description:
            "A people-powered last-mile delivery network built on trust and community.",
        images: ["https://trustlinc.app/opengraph-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* ✅ Explicit meta tags for maximum compatibility */}
                <meta
                    property="og:title"
                    content="TrustLinc | Promises Delivered, Connections Made"
                />
                <meta
                    property="og:description"
                    content="A new kind of delivery platform that connects people through trust, community, and purpose. Join the movement today."
                />
                <meta
                    property="og:image"
                    content="https://trustlinc.app/opengraph-image.png"
                />
                <meta property="og:url" content="https://trustlinc.app" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TrustLinc" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/png" />
                <meta
                    property="og:image:alt"
                    content="TrustLinc - Promises Delivered, Connections Made"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@TrustLinchq" />
                <meta name="twitter:creator" content="@TrustLinchq" />
                <meta
                    name="twitter:title"
                    content="TrustLinc | Promises Delivered, Connections Made"
                />
                <meta
                    name="twitter:description"
                    content="A people-powered last-mile delivery network built on trust and community."
                />
                <meta
                    name="twitter:image"
                    content="https://trustlinc.app/opengraph-image.png"
                />
                <meta name="twitter:domain" content="trustlinc.app" />
                <meta name="twitter:url" content="https://trustlinc.app" />
            </head>
            <body className={`${ubuntu.variable} font-sans antialiased`}>
                <AppHeader />
                {children}
                <Toaster richColors />
            </body>
        </html>
    );
}
