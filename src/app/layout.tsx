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
    metadataBase: new URL("https://www.trustlinc.app"),
    openGraph: {
        title: "TrustLinc | Promises Delivered, Connections Made",
        description:
            "A new kind of delivery platform that connects people through trust, community, and purpose. Join the movement today.",
        url: "https://www.trustlinc.app",
        siteName: "TrustLinc",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "TrustLinc - Promises Delivered, Connections Made",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "TrustLinc | Promises Delivered, Connections Made",
        description:
            "A people-powered last-mile delivery network built on trust and community.",
        images: ["/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${ubuntu.variable} font-sans antialiased`}>
                <AppHeader />
                {children}
                <Toaster richColors />
            </body>
        </html>
    );
}
