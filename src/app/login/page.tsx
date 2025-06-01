import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
    return (
        <AuthForm
            title="Welcome back!"
            description="Sign in to continue delivering promises, fulfilling connections, and moving what matters—together."
            submitUrl="https://trustlinc-backend.onrender.com/api/v1/auth/login"
            redirectLabel="New to TrustLinc?"
            redirectHref="/register"
            redirectText="Register an account"
            redirectToVerification="/login-verify" // 👈 Custom redirect for login OTP
        />
    );
}
