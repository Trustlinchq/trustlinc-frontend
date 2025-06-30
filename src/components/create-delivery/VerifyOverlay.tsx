"use client";

import React, { useState } from "react";
import PhoneInput from "@/components/create-delivery/PhoneInput";
import PhoneVerify from "@/components/create-delivery/PhoneVerify";
import Portal from "@/components/Portal";

interface VerifyOverlayProps {
    onComplete: () => void;
    onClose?: () => void;
}

export default function VerifyOverlay({
    onComplete,
    onClose,
}: VerifyOverlayProps) {
    const [step, setStep] = useState<"input" | "verify">("input");
    const [phone, setPhone] = useState("");
    const [pinId, setPinId] = useState("");

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

                    {step === "input" && (
                        <PhoneInput
                            onNext={(
                                enteredPhone: string,
                                receivedPinId: string
                            ) => {
                                setPhone(enteredPhone);
                                setPinId(receivedPinId);
                                setStep("verify");
                            }}
                        />
                    )}

                    {step === "verify" && (
                        <PhoneVerify
                            phone={phone}
                            pinId={pinId}
                            onSuccess={onComplete}
                        />
                    )}
                </div>
            </div>
        </Portal>
    );
}
