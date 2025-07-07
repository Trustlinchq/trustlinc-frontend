"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface PhoneInputProps {
    onSuccess: () => void;
}

export default function PhoneInput({ onSuccess }: PhoneInputProps) {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const formatPhone = (input: string) => {
        const cleaned = input.replace(/\D/g, "");
        if (cleaned.startsWith("234")) return cleaned;
        if (cleaned.startsWith("0")) return "234" + cleaned.slice(1);
        return "234" + cleaned;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formattedPhone = formatPhone(phone);

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Authentication token mission");
            const res = await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/phone/initiate",
                {
                    phone_number: formattedPhone,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const pinId = res.data.pin_id;
            sessionStorage.setItem("pin_id", pinId);
            sessionStorage.setItem("phone_number", formattedPhone);
            toast.success("OTP sent to your phone number");
            onSuccess();
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                toast.error(
                    err.response?.data?.details ||
                        "Failed to send OTP. Try again."
                );
            } else {
                toast.error("Failed to send OTP. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="flex flex-col bg-neutral-100 mt-8 py-7 rounded-md">
            <div className="mb-3">
                <h2 className="text-xl text-backgroundSecondary font-bold text-center">
                    Phone Verification
                </h2>
                <p className="text-xs text-accent4 mx-auto mt-2 max-w-[50%] text-center">
                    We’ll use this number to confirm your identity and secure
                    your delivery
                </p>
            </div>
            <div className="flex-grow flex flex-col items-center w-full mx-auto space-y-4 max-h-full overflow-hidden ">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center space-y-6 w-full sm:max-w-md mx-auto overflow-hidden"
                >
                    <div className="text-center w-full">
                        <div className="w-full relative">
                            <Input
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="0901 234 5678"
                                required
                                className="w-full pr-10 pl-4 py-5 rounded-lg text-sm bg-gray-100 border border-gray-300 mt-6 overflow-hidden max-w-[90%] mx-auto placeholder:text-accent4/60"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={loading || !phone}
                            className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-lg mt-5 mb-4 max-w-[90%] mx-auto"
                        >
                            {loading ? "Sending..." : "Send verification code"}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
