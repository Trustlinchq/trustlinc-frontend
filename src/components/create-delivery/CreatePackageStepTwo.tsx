"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

const LOCATIONS = [
    "ABA",
    "UMUAHIA",
    "OHAFIA",
    "AROCHUKWU",
    "ABEOKUTA",
    "SANGO_OTA",
    "IJEBU_ODE",
    "OTA",
    "ABUJA_CENTRAL",
    "GWAGWALADA",
    "KUBWA",
    "KARU",
    "ASABA",
    "WARRI",
    "UGHELLI",
    "SAPELE",
    "AWKA",
    "ONITSHA",
    "NNEWI",
    "OBOSI",
    "BENIN_CITY",
    "EKPOMA",
    "AUCHI",
    "CALABAR",
    "IKOM",
    "OBUBRA",
    "ENUGU_CITY",
    "NSUKKA",
    "AGBANI",
    "IBADAN",
    "OGBOMOSHO",
    "OYO_TOWN",
    "IKEJA",
    "YABA",
    "SURULERE",
    "VICTORIA_ISLAND",
    "LEKKI",
    "UYO",
    "IKOT_EKPENE",
    "EKET",
    "ILE_IFE",
    "OSOGBO",
    "ILESA",
    "PORT_HARCOURT",
    "OBIO_AKPOR",
    "BONNY",
    "OWERRI",
    "ORLU",
    "OKIGWE",
] as const;

interface Props {
    data: {
        pickup_location: string;
        pickup_location_details?: string;
        destination: string;
        destination_details?: string;
    };
    updateData: (data: Partial<Props["data"]>) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function CreatePackageStepTwo({
    data,
    updateData,
    onNext,
    onBack,
}: Props) {
    const isStepValid =
        data.pickup_location.trim() &&
        data.destination.trim() &&
        data.pickup_location.trim() !== data.destination.trim();

    return (
        <section className="min-h-screen mt-20 mx-auto max-w-lg">
            <div className="mb-3">
                <h2 className="text-2xl text-backgroundSecondary font-bold text-center mb-11">
                    Where’s this package headed?
                </h2>
            </div>

            {/* Pickup Location */}
            <div className="mb-7">
                <Label
                    htmlFor="pickup_location"
                    className="text-sm text-accent4 font-normal"
                >
                    Pickup Location
                </Label>
                <Select
                    value={data.pickup_location || ""}
                    onValueChange={(val) =>
                        updateData({ pickup_location: val })
                    }
                >
                    <SelectTrigger
                        id="pickup_location"
                        className="w-full pr-4 pl-4 py-5 bg-neutral1 border border-gray-300 mt-3 rounded-lg text-xs text-accent4/75"
                    >
                        <SelectValue placeholder="Select pickup location" />
                    </SelectTrigger>
                    <SelectContent className="text-xs text-accent4 max-h-60 w-full">
                        {LOCATIONS.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                                {loc.replace(/_/g, " ")}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input
                    id="pickup_location_details"
                    value={data.pickup_location_details || ""}
                    onChange={(e) =>
                        updateData({ pickup_location_details: e.target.value })
                    }
                    placeholder="e.g. Opposite Zenith Bank, Abak Road"
                    className="mt-4 w-full pr-10 pl-4 py-5 bg-neutral1 border border-gray-300 rounded-lg placeholder:text-accent4/45"
                />
            </div>

            {/* Destination */}
            <div className="mb-4">
                <Label
                    htmlFor="destination"
                    className="text-sm text-accent4 font-normal"
                >
                    Destination
                </Label>
                <Select
                    value={data.destination || ""}
                    onValueChange={(val) => updateData({ destination: val })}
                >
                    <SelectTrigger
                        id="destination"
                        className="w-full pr-4 pl-4 py-5 bg-neutral1 border border-gray-300 mt-3 rounded-lg text-xs text-accent4/75"
                    >
                        <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent className="text-xs text-accent4 max-h-60 w-full">
                        {LOCATIONS.map((loc) => (
                            <SelectItem key={loc} value={loc}>
                                {loc.replace(/_/g, " ")}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input
                    id="destination_details"
                    value={data.destination_details || ""}
                    onChange={(e) =>
                        updateData({ destination_details: e.target.value })
                    }
                    placeholder="e.g. Behind City Mall, Admiralty Way"
                    className="mt-4 w-full pr-10 pl-4 py-5 bg-neutral1 border border-gray-300 rounded-lg placeholder:text-accent4/45"
                />
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-8">
                <Button
                    type="button"
                    variant="outline"
                    className="w-1/3 py-6 border-gray-300 text-accent4 hover:bg-muted"
                    onClick={onBack}
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </Button>

                <Button
                    type="button"
                    className="w-2/3 py-6 bg-accent3 hover:bg-backgroundPrimary rounded-lg"
                    onClick={onNext}
                    disabled={!isStepValid}
                >
                    Continue
                </Button>
            </div>
        </section>
    );
}
