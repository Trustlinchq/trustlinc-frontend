import { Suspense } from "react";
import VerifyClient from "./VerifyClient";

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyClient />
        </Suspense>
    );
}
