"use client";

import { useState } from "react";
import CreatePackageStepOne from "./CreatePackageStepOne";
import CreatePackageStepTwo from "./CreatePackageStepTwo";
import CreatePackageStepThree from "./CreatePackageStepThree";
// import CreatePackageStepFour from "./CreatePackageStepFour";

export type PackageSize = "SMALL" | "MEDIUM" | "LARGE";

export type Location =
    | "ABA"
    | "UMUAHIA"
    | "OHAFIA"
    | "AROCHUKWU"
    | "ABEOKUTA"
    | "SANGO_OTA"
    | "IJEBU_ODE"
    | "OTA"
    | "ABUJA_CENTRAL"
    | "GWAGWALADA"
    | "KUBWA"
    | "KARU"
    | "ASABA"
    | "WARRI"
    | "UGHELLI"
    | "SAPELE"
    | "AWKA"
    | "ONITSHA"
    | "NNEWI"
    | "OBOSI"
    | "BENIN_CITY"
    | "EKPOMA"
    | "AUCHI"
    | "CALABAR"
    | "IKOM"
    | "OBUBRA"
    | "ENUGU_CITY"
    | "NSUKKA"
    | "AGBANI"
    | "IBADAN"
    | "OGBOMOSHO"
    | "OYO_TOWN"
    | "IKEJA"
    | "YABA"
    | "SURULERE"
    | "VICTORIA_ISLAND"
    | "LEKKI"
    | "IKOT_EKPENE"
    | "EKET"
    | "ILE_IFE"
    | "OSOGBO"
    | "ILESA"
    | "PORT_HARCOURT"
    | "OBIO_AKPOR"
    | "BONNY"
    | "OWERRI"
    | "ORLU"
    | "OKIGWE";

interface FormData {
    category: string;
    description: string;
    size: "" | PackageSize;
    price: string;
    pickup_location: string;
    pickup_location_details: string;
    destination: string;
    destination_details: string;
    recipient_name: string;
    recipient_number: string;
}

type Step = 1 | 2 | 3 | 4;

export default function CreatePackageStepper() {
    const [step, setStep] = useState<Step>(1);

    const [formData, setFormData] = useState<FormData>({
        category: "",
        description: "",
        size: "",
        price: "",
        pickup_location: "",
        pickup_location_details: "",
        destination: "",
        destination_details: "",
        recipient_name: "",
        recipient_number: "",
    });

    const updateFormData = (newData: Partial<FormData>) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    const goToNext = () =>
        setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev));
    const goToPrev = () =>
        setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));

    // Optional: Reset all
    const resetForm = () => {
        setStep(1);
        setFormData({
            category: "",
            description: "",
            size: "",
            price: "",
            pickup_location: "",
            pickup_location_details: "",
            destination: "",
            destination_details: "",
            recipient_name: "",
            recipient_number: "",
        });
    };

    return (
        <>
            {step === 1 && (
                <CreatePackageStepOne
                    data={formData}
                    updateData={updateFormData}
                    onNext={goToNext}
                />
            )}

            {step === 2 && (
                <CreatePackageStepTwo
                    data={formData}
                    updateData={updateFormData}
                    onNext={goToNext}
                    onBack={goToPrev}
                />
            )}

            {step === 3 && (
                <CreatePackageStepThree
                    data={formData}
                    updateData={updateFormData}
                    onNext={goToNext}
                    onBack={goToPrev}
                />
            )}

            {/* {step === 4 && (
                <CreatePackageStepFour
                    data={formData}
                    onBack={goToPrev}
                    onSuccess={resetForm}
                />
            )}  */}
        </>
    );
}
