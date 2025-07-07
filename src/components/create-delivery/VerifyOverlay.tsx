"use client";

import { useState } from "react";
import Portal from "@/components/Portal";
import PhoneInput from "./PhoneInput";
import PhoneVerify from "./PhoneVerify";

interface VerifyOverlayProps {
    onComplete: () => void;
    onClose?: () => void;
}

export default function VerifyOverlay({
    onClose,
    onComplete,
}: VerifyOverlayProps) {
    const [step, setStep] = useState<"input" | "verify">("input");

    return (
        <Portal>
            <div className="fixed inset-0 z-50  bg-black/50 ">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 w-[90%] max-w-lg rounded-lg bg-white p-7 shadow-lg">
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="absolute right-7 top-4 text-gray-400 hover:text-gray-600 text-xl"
                            aria-label="Close overlay"
                        >
                            &times;
                        </button>
                    )}

                    {step === "input" ? (
                        <PhoneInput onSuccess={() => setStep("verify")} />
                    ) : (
                        <PhoneVerify
                            onSuccess={onComplete}
                            onBack={() => setStep("input")}
                        />
                    )}
                </div>
            </div>
        </Portal>
    );
}
