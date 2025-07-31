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
