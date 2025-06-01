import { Suspense } from "react";
import LoginVerifyClient from "./LoginVerifyClient";

export default function LoginVerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginVerifyClient />
        </Suspense>
    );
}
