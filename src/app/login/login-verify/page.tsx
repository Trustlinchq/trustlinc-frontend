import { Suspense } from "react";
import LoginVerifyClient from "./LoginVerifyClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Verify Your Login | TrustLinc",
    description:
        "Enter the OTP sent to your email to verify your login and continue using TrustLinc.",
};

export default function LoginVerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginVerifyClient />
        </Suspense>
    );
}
