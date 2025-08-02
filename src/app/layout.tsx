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

// Simplified metadata object to avoid conflicts with explicit meta tags
export const metadata: Metadata = {
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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* HTML Meta Tags - from opengraph.xyz */}
                <title>TrustLinc | Promises Delivered, Connections Made</title>
                <meta
                    name="description"
                    content="A people-powered last-mile delivery network built on trust and community."
                />

                {/* Facebook Meta Tags - from opengraph.xyz */}
                <meta property="og:url" content="https://trustlinc.app/" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="TrustLinc | Promises Delivered, Connections Made"
                />
                <meta
                    property="og:description"
                    content="A people-powered last-mile delivery network built on trust and community."
                />
                <meta
                    property="og:image"
                    content="https://opengraph.b-cdn.net/production/images/2f603b9a-716a-469a-9922-3b6ab6ebf3e9.png?token=km3PA9L_H5_xRaknjvnYniGPc4_fJfRziqxTFonOIg0&height=630&width=1200&expires=33290097346"
                />

                {/* Twitter Meta Tags - from opengraph.xyz */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="trustlinc.app" />
                <meta property="twitter:url" content="https://trustlinc.app/" />
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
                    content="https://opengraph.b-cdn.net/production/images/2f603b9a-716a-469a-9922-3b6ab6ebf3e9.png?token=km3PA9L_H5_xRaknjvnYniGPc4_fJfRziqxTFonOIg0&height=630&width=1200&expires=33290097346"
                />

                {/* Additional meta tags for better compatibility */}
                <meta property="og:site_name" content="TrustLinc" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:type" content="image/png" />
                <meta
                    property="og:image:alt"
                    content="TrustLinc - Promises Delivered, Connections Made"
                />

                {/* Additional Twitter meta tags */}
                <meta name="twitter:site" content="@TrustLinchq" />
                <meta name="twitter:creator" content="@TrustLinchq" />

                {/* Meta Tags Generated via https://www.opengraph.xyz */}
            </head>
            <body className={`${ubuntu.variable} font-sans antialiased`}>
                <AppHeader />
                {children}
                <Toaster richColors />
            </body>
        </html>
    );
}
