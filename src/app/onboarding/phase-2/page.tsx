import { Suspense } from "react";
import Phase2Form from "@/components/Phase2Form";

export default function OnboardingPhase2Page() {
    return (
        <section className="min-h-screen flex flex-col bg-neutral-100 px-4 pt-20 sm:pt-28 overflow-x-hidden">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
                <Phase2Form />
            </Suspense>
        </section>
    );
}
