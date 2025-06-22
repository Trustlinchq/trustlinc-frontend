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
import apiClient from "@/lib/api";

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
    const [isInitializing, setIsInitializing] = useState(true);
    const [onboardingToken, setOnboardingToken] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    // Handle token extraction and early validation
    useEffect(() => {
        const localToken = localStorage.getItem("onboardingToken");
        const urlToken = searchParams.get("token");

        // Use localStorage token if available, else try the URL
        if (localToken) {
            setOnboardingToken(localToken);
            setIsInitializing(false);
        } else if (urlToken) {
            apiClient
                .post("/auth/refresh-onboarding-token", { token: urlToken })
                .then(() => {
                    localStorage.setItem("onboardingToken", urlToken);
                    setOnboardingToken(urlToken);
                })
                .catch(() => {
                    toast.error(
                        "Your onboarding session has expired. Please restart."
                    );
                })
                .finally(() => {
                    setIsInitializing(false);
                });
        } else {
            toast.error("Missing onboarding token. Please restart onboarding.");
            setIsInitializing(false);
        }
    }, [searchParams]);

    const handleSubmit = async () => {
        if (!username.trim() || !selectedState || !onboardingToken) {
            toast.error("Please fill all fields.");
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post("/auth/onboard/phase2", {
                username,
                state: selectedState,
                onboarding_token: onboardingToken,
            });

            const { user, token } = response.data;
            console.log("Phase2: API response:", { user, token }); // Debugging

            // Validate user object
            if (
                !user ||
                !user.role ||
                !["SHIPPER", "COURIER"].includes(user.role)
            ) {
                throw new Error("Invalid user data: missing or invalid role");
            }

            // Store user and token in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success(
                "Onboarding complete! Redirecting to welcome page..."
            );
            router.push("/welcome");
        } catch (error) {
            const err = error as AxiosError<{ error: string }>;
            toast.error(
                err?.response?.data?.error || "Something went wrong. Try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // Initial loading state while validating token
    if (isInitializing) {
        return (
            <p className="text-lg items-center text-center justify-center">
                Loading...
            </p>
        );
    }

    // Token invalid or missing after initialization
    if (!onboardingToken) {
        return (
            <div className="flex flex-col text-center items-center mt-40 text-sm max-w-[90%] sm:max-w-md mx-auto">
                <p className="text-base sm:text-lg mb-6">
                    Invalid or expired token. Please restart onboarding.
                </p>
                <Button
                    onClick={() => router.push("/restart-onboarding")}
                    className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-full mx-auto"
                >
                    Restart
                </Button>
            </div>
        );
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
                    <SelectTrigger className="w-full pr-10 pl-4 py-6 border border-gray-300 mt-1 overflow-hidden rounded-lg mx-auto">
                        <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent
                        side="bottom"
                        sideOffset={4}
                        className="text-xs text-accent4 max-h-60 w-full"
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
                className="w-full py-6 bg-accent3 hover:bg-backgroundPrimary rounded-lg mx-auto"
                disabled={loading || !username || !selectedState}
                onClick={handleSubmit}
            >
                {loading ? "Submitting..." : "Continue"}
            </Button>
        </div>
    );
}
