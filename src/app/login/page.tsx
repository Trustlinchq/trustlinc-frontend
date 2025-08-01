import AuthForm from "@/components/AuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: " TrustLinc Login | Sign in to TrustLinc Account",
    description:
        "Sign in to your TrustLinc account to continue delivering promises and fulfilling connections.",
};

export default function LoginPage() {
    return (
        <AuthForm
            title="Welcome back!"
            description="Sign in to continue delivering promises, fulfilling connections, and moving what matters—together."
            submitUrl="https://trustlinc-backend.onrender.com/api/v1/auth/initiate-login"
            redirectLabel="New to TrustLinc?"
            redirectHref="/register"
            redirectText="Register an account"
            redirectToVerification="/login/login-verify" // Custom redirect for login OTP
        />
    );
}
