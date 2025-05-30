"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

// List of states
const STATES = [
    "ABIA",
    "ADAMAWA",
    "AKWA_IBOM",
    "ANAMBRA",
    "BAUCHI",
    "BAYELSA",
    "BENUE",
    "BORNO",
    "CROSS_RIVER",
    "DELTA",
    "EBONYI",
    "EDO",
    "EKITI",
    "ENUGU",
    "GOMBE",
    "IMO",
    "JIGAWA",
    "KADUNA",
    "KANO",
    "KATSINA",
    "KEBBI",
    "KOGI",
    "KWARA",
    "LAGOS",
    "NASARAWA",
    "NIGER",
    "OGUN",
    "ONDO",
    "OSUN",
    "OYO",
    "PLATEAU",
    "RIVERS",
    "SOKOTO",
    "TARABA",
    "YOBE",
    "ZAMFARA",
    "FCT_ABUJA",
];

export default function Phase2() {
    const [username, setUsername] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const [onboardingToken, setOnboardingToken] = useState<string | null>(null);

    useEffect(() => {
        const token = searchParams.get("token");
        setOnboardingToken(token);
    }, [searchParams]);

    const handleSubmit = async () => {
        if (!username || !selectedState || !onboardingToken) {
            toast.error("Please fill all fields, or token is missing.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                "https://trustlinc-backend.onrender.com/api/v1/auth/onboard/phase2",
                {
                    username,
                    state: selectedState,
                    onboarding_token: onboardingToken,
                }
            );

            toast.success("Onboarding complete! Redirecting...");
            router.push("/onboarding/success"); // Change to your actual route
        } catch (error) {
            const err = error as AxiosError<{ error: string }>;

            console.error(err);
            toast.error(
                err?.response?.data?.error || "Something went wrong. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    if (!onboardingToken) {
        return <p className="text-xs text-center">Loading...</p>;
    }

    return (
        <div className="mx-auto max-w-md">
            <h2 className="text-3xl sm:text-4xl text-backgroundSecondary font-bold text-center mx-auto mb-11">
                You’re Almost In — Let’s Wrap This Up
            </h2>

            <div className="mb-5">
                <Label className="font-bold text-backgroundSecondary">
                    Username
                </Label>
                <p className="text-xs mt-1 text-accent4">
                    Your public name in the TrustLinc community.
                </p>
                <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your username"
                    className="w-full pr-10 pl-4 py-6 text-xs border border-gray-300 mt-1 overflow-hidden rounded-lg mx-auto"
                />
            </div>

            <div className="mb-8">
                <Label className="font-bold text-backgroundSecondary">
                    State
                </Label>
                <p className="text-xs mt-1 text-accent4">
                    Help us connect you with your local community.
                </p>
                <Select onValueChange={setSelectedState}>
                    <SelectTrigger className="w-full pr-10 pl-4 py-6  border border-gray-300 mt-1 overflow-hidden rounded-lg mx-auto ">
                        <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent
                        side="bottom"
                        sideOffset={4}
                        className="text-xs text-accent4 w-[200px] h-[200px]"
                    >
                        {STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                                {state.replace("_", " ")}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Button
                className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-full mx-auto"
                disabled={loading}
                onClick={handleSubmit}
            >
                {loading ? "Submitting..." : "Continue"}
            </Button>
        </div>
    );
}
