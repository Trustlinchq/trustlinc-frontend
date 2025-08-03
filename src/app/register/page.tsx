import AuthForm from "@/components/AuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up and Register a TrustLinc Account | TrustLinc",
    description:
        "Join TrustLinc today! Sign up to start delivering promises and fulfilling connections in your community.",
    keywords: [
        "TrustLinc",
        "sign up",
        "register TrustLinc",
        "delivery network",
        "community trust",
        "last mile logistics",
    ],
    openGraph: {
        title: "Sign Up and Register a TrustLinc Account | TrustLinc",
        description:
            "Join TrustLinc today and start delivering promises and fulfilling connections in your community.",
        url: "https://trustlinc.app/",
        images: [
            {
                url: "https://www.trustlinc.app/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "TrustLinc - Register and Start Delivering",
                type: "image/jpeg",
            },
        ],
        siteName: "TrustLinc",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sign Up and Register a TrustLinc Account | TrustLinc",
        description:
            "Join TrustLinc today and start delivering promises and fulfilling connections in your community.",
        images: ["https://www.trustlinc.app/og-image.jpg"],
    },
};

export default function RegisterPage() {
    return (
        <AuthForm
            title={
                <>
                    Welcome to <span className="text-accent3">TrustLinc</span>
                </>
            }
            description="Thanks for choosing TrustLinc! Enter your email to start your journey with fast, secure deliveries."
            submitUrl="https://trustlinc-backend.onrender.com/api/v1/auth/register"
            redirectLabel="Have an account already?"
            redirectHref="/login"
            redirectText="Log in here"
            redirectToVerification="/verify" // Default, but shown for clarity
            terms
        />
    );
}
