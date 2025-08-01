import AuthForm from "@/components/AuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "TrustLinc Register | Create Your TrustLinc Account",
    description:
        "Join TrustLinc today! Sign up to start delivering promises and fulfilling connections in your community.",
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
            redirectToVerification="/verify" // 👈 Default, but shown for clarity
            terms
        />
    );
}
