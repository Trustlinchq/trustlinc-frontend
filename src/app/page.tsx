"use client";

import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How does TrustLinc work?",
            answer: "TrustLinc connects people who want to send packages with trusted everyday travelers going in the same direction. Shippers post a delivery, couriers accept, and the package gets delivered safely.",
        },
        {
            question: "Is TrustLinc safe?",
            answer: "Yes. All couriers are verified, and every delivery is confirmed with a secure OTP code. We also offer support to help resolve any issues quickly and fairly.",
        },
        {
            question: "How do travelers get paid?",
            answer: "Once a delivery is successfully completed and confirmed, the courier (traveler) gets paid instantly through their preferred payout method.",
        },
        {
            question: "What types of items can I send?",
            answer: "You can send most small to medium-sized personal or business items — like documents, clothing, gadgets, or care packages. Hazardous, illegal, or oversized items are not allowed.",
        },

        {
            question: "Do I need to meet the traveler in person?",
            answer: "Yes, in most cases, senders and travelers coordinate a convenient pickup and drop-off location. In the future, we’ll introduce smart locker options for added convenience.",
        },
        {
            question: "What if my package is lost or damaged?",
            answer: "TrustLinc offers support to help resolve any issues quickly and fairly. We also recommend using our secure packaging guidelines to minimize risks.",
        },
    ];

    return (
        <div className="min-h-screen bg-neutral2">
            {/*Hero Section*/}
            <main className="relative pt-10 sm:pt-24 overflow-hidden">
                {/*Hero Text Content*/}
                <section className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="px-6 flex flex-col space-y-4 md:text-left">
                        <h1 className="text-5xl sm:text-5xl md:text-6xl md:max-w-[900px] font-bold leading-tight text-backgroundPrimary">
                            Deliveries, <br />
                            Powered by People. <br />
                            Built on Trust.
                        </h1>

                        <p className="text-base sm:text-lg  md:text-xl text-[#303e4b] max-w-[80%] md:max-w-[80%]">
                            TrustLinc connects travelers with people who need
                            deliveries—secure, reliable, and powered by
                            community.
                        </p>

                        <div className="flex justify-start">
                            <Button
                                asChild
                                size="lg"
                                className="bg-accent3 hover:bg-backgroundPrimary w-fit"
                            >
                                <Link
                                    href="/register"
                                    className="text-white font-bold"
                                >
                                    Join the community
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/*Hero Image*/}
                    <div className="hidden md:block absolute inset-y-0 right-0 w-[20%] md:w-[100%] lg:w-[50%] ml-4 md:ml-16 lg:ml-24">
                        <div className="relative h-full w-full overflow-hidden rounded-[1rem] shadow-[0_15px_40px_rgba(0,0,0,0.15)]">
                            <Image
                                src="/dashboard1.svg"
                                alt="Dashboard"
                                fill
                                className="object-contain"
                                sizes="40vw"
                            />
                        </div>
                    </div>
                </section>

                {/*Our Value Section*/}
                <section className="bg-neutral1 text-center py-10 sm:py-24 mt-24">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <span className="w-2 h-2 bg-backgroundPrimary rounded-full"></span>

                            <p className="text-sm flex font-semibold text-accent3 ">
                                Our Value
                            </p>
                        </div>
                        <h2 className="text-xl md:text-4xl max-w-[80%] sm:max-w-[80%] mx-auto font-bold text-backgroundPrimary leading-snug">
                            TrustLinc turns everyday travel into a smarter
                            delivery network—
                            <span className="text-backgroundSecondary font-medium">
                                {" "}
                                secure, affordable,
                            </span>{" "}
                            and powered by people you can trust.
                        </h2>
                    </div>
                </section>

                {/*How It Works Section*/}
                <section className="w-full bg-backgroundPrimary text-white py-10 px-6 sm:py-24">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center space-y-4">
                            <div className="flex items-center gap-3 justify-center mb-4">
                                <span className="w-2 h-2 bg-neutral2 rounded-full"></span>

                                <p className="text-sm flex font-semibold text-accent1 ">
                                    How it Works
                                </p>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold">
                                Seamless Deliveries,
                                <br className="hidden md:block" /> Powered by
                                People
                            </h2>
                        </div>

                        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 ">
                            {/* Step 1 */}
                            <div className="flex flex-col justify-center gap-10 p-6 sm:pl-6 shadow-sm rounded-3xl transition duration-300 hover:shadow-md  bg-[#0c1c2bd5]">
                                <h3 className="text-xl font-semibold">
                                    Post a Package
                                </h3>

                                <Image
                                    src="/how-it-works-step1.svg"
                                    alt="Post a Package"
                                    width={400}
                                    height={250}
                                    priority={true}
                                    quality={100}
                                    className="mx-auto w-full max-w-[300px] sm:max-w-[350px] md:max-w-[300px] h-auto object-contain"
                                />

                                <p className="text-1xl text-[#a0aec0] font-medium sm:max-w-[70%]">
                                    Create a delivery request, set a reward, and
                                    deposit payment into TrustLinc’s secure
                                    escrow for peace of mind.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col justify-center gap-10 p-6 sm:pl-6 shadow-sm rounded-3xl transition duration-300 hover:shadow-md bg-[#0c1c2bd5]">
                                <h3 className="text-xl font-semibold">
                                    Match with a Traveler
                                </h3>

                                <Image
                                    src="/how-it-works-step2.svg"
                                    alt="Match with a Traveler"
                                    width={500}
                                    height={300}
                                    quality={100}
                                    className="mx-auto w-full max-w-[300px] sm:max-w-[350px] md:max-w-[250px] h-auto object-contain"
                                />

                                <p className="text-1xl text-[#a0aec0] font-medium sm:max-w-[70%]">
                                    Connect with a verified traveler heading
                                    your way to pick up and deliver your
                                    package.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col justify-center gap-10 p-6 sm:pl-6 shadow-sm rounded-3xl transition duration-300 hover:shadow-md bg-[#0c1c2bd5]">
                                <h3 className="text-xl font-semibold">
                                    Hand Over the Package
                                </h3>

                                <Image
                                    src="/how-it-works-step3.svg"
                                    alt="Hand Over the Package"
                                    width={500}
                                    height={300}
                                    quality={100}
                                    className="mx-auto w-full max-w-[300px] sm:max-w-[350px] md:max-w-[250px] h-auto object-contain"
                                />

                                <p className="text-1xl text-[#a0aec0] font-medium max-w-[100%] sm:max-w-[65%]">
                                    Meet the traveler at a convenient location
                                    and hand over your securely packed item.
                                </p>
                            </div>

                            {/* Step 4 */}
                            <div className="flex flex-col justify-center gap-10 md:gap-24 p-6 sm:pl-6 shadow-sm rounded-3xl transition duration-300 hover:shadow-md bg-[#0c1c2bd5]">
                                <h3 className="text-xl font-semibold">
                                    Track & Receive
                                </h3>

                                <Image
                                    src="/how-it-works-step4.svg"
                                    alt="Track & Receive"
                                    width={500}
                                    height={300}
                                    quality={100}
                                    className="mx-auto w-full max-w-[300px] sm:max-w-[350px] md:max-w-[350px] h-auto object-contain"
                                />

                                <p className="text-1xl text-[#a0aec0] font-medium max-w-[90%] sm:max-w-[65%]">
                                    Monitor your package’s journey and confirm
                                    delivery before releasing payment from
                                    escrow.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Our Features Section*/}
                <section className="py-10 sm:py-24 px-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-2 h-2 bg-backgroundPrimary rounded-full"></span>
                        <p className="text-sm flex font-semibold text-accent3">
                            Our Features
                        </p>
                    </div>

                    <h2 className="text-3xl md:text-4xl text-center font-bold mb-12">
                        Effortless Shipping,
                        <br className="hidden sm:block" /> Powered by People.
                    </h2>

                    <div className="columns-1 md:columns-2 gap-3 space-y-4 max-w-5xl mx-auto">
                        {/* Card 1 */}
                        <div className="bg-backgroundPrimary rounded-xl shadow-lg p-6 flex flex-col gap-8 break-inside-avoid">
                            <div>
                                <h3 className="text-lg sm:text-[20px] text-center md:text-left text-accent1 font-semibold mb-2">
                                    Secure & Trust-Based Deliveries
                                </h3>
                                <p className="text-sm text-neutral1 text-center md:text-left sm:max-w-[80%]">
                                    Send and deliver with confidence—every
                                    transaction is securely protected by
                                    TrustLinc’s escrow system.
                                </p>
                            </div>

                            <Image
                                src="/card-1.svg"
                                alt="Secure Delivery"
                                width={500}
                                height={300}
                                quality={100}
                                className="mx-auto w-full max-w-[500px] rounded-lg h-auto object-contain"
                            />
                        </div>

                        {/* Card 2 */}
                        <div className="bg-backgroundPrimary flex flex-col sm:flex-row sm:items-end rounded-xl shadow-lg pt-8 pb-8 gap-8 sm:gap-6 sm:p-6 break-inside-avoid">
                            <Image
                                src="/card-2.svg"
                                alt="Smart Matching"
                                width={120}
                                height={120}
                                quality={100}
                                className="w-[120px] h-auto rounded-lg object-contain mx-auto sm:mx-0"
                            />

                            <div className="text-center sm:text-left">
                                <h3 className="text-lg sm:text-[20px] text-accent1 font-semibold mb-2">
                                    Smart Matching
                                </h3>
                                <p className="text-sm text-center sm:text-left m-auto sm:m-0 text-neutral1 max-w-[80%] sm:max-w-[80%]">
                                    Match with trusted travelers headed your way
                                    for seamless and secure deliveries.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-backgroundPrimary flex flex-col sm:flex-row sm:items-end rounded-xl shadow-lg pt-8 pb-8 gap-8 sm:gap-6 sm:p-6 break-inside-avoid">
                            <Image
                                src="/card-3.svg"
                                alt="Community Driven"
                                width={120}
                                height={120}
                                quality={100}
                                className="w-[120px] rounded-lg h-auto object-contain mx-auto sm:mx-0"
                            />
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg sm:text-[20px] text-accent1 font-semibold mb-2">
                                    Community-Driven
                                </h3>
                                <p className="text-sm text-center sm:text-left m-auto sm:m-0 text-neutral1 max-w-[90%] sm:max-w-[80%]">
                                    Leverage everyday travelers to move packages
                                    faster and more efficiently, reducing costs
                                    and promoting sustainability.
                                </p>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-backgroundPrimary text-center sm:text-left rounded-xl shadow-lg p-6 flex flex-col gap-8 break-inside-avoid">
                            <Image
                                src="/card-4.svg"
                                alt="Flexible"
                                width={500}
                                height={300}
                                quality={100}
                                className="w-full max-w-[379px] rounded-lg h-auto object-contain"
                            />
                            <div>
                                <h3 className="text-lg sm:text-[20px] text-accent1 font-semibold mb-2">
                                    Flexible & Rewarding
                                </h3>
                                <p className="text-sm text-neutral1 sm:max-w-[70%]">
                                    Set your own delivery price, earn while
                                    traveling, and enjoy a delivery system that
                                    works around your schedule.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/*What We Believe Section*/}
                <section className="bg-backgroundPrimary py-10 sm:py-24 px-6 sm:px-8">
                    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-8 sm:gap-16">
                        {/* Text Section */}
                        <div className="text-left max-w-xl">
                            <div className="flex items-center gap-3  mb-6">
                                <span className="w-2 h-2 bg-neutral2 rounded-full"></span>

                                <p className="text-sm flex font-semibold text-accent1 ">
                                    What We Believe
                                </p>
                            </div>
                            <p className="text-lg sm:text-2xl font-medium  sm:max-w-[80%] text-neutral2 mb-6">
                                “TrustLinc isn’t just about deliveries—it’s
                                about people helping people. We’re building a
                                community-driven solution that makes shipping
                                more personal, reliable, and rewarding for
                                everyone.”
                            </p>
                            <p className="text-sm text-neutral1 font-medium">
                                Chiemela Nwankwo, Co-Founder & CEO
                                <br />
                                <span className="text-accent1">TrustLinc</span>
                            </p>
                        </div>

                        {/* Image Section */}
                        <div className="flex-shrink-0">
                            <Image
                                src="/chiemela-portrait.png"
                                alt="Chiemela Nwankwo"
                                width={500}
                                height={300}
                                quality={100}
                                className="rounded-xl w-[400px] rotate-[-2deg] mx-auto sm:mx-0"
                            />
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-neutral1 py-10 sm:py-24 px-4 sm:px-8">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 items-center">
                        {/* Left Side */}
                        <div>
                            <div className="flex items-center gap-2 mb-2  sm:mb-5">
                                <span className="w-2 h-2 bg-backgroundPrimary rounded-full"></span>
                                <p className="text-sm flex font-semibold text-accent3 ">
                                    Frequently Asked Questions
                                </p>
                            </div>
                            <h2 className="text-4xl font-bold text-headingPrimary mb-3 sm:mb-6">
                                Got Questions?
                            </h2>
                            <p className="text-sm text-accent4 font-medium mb-4">
                                Can’t find what you’re looking for?
                            </p>

                            <Button
                                asChild
                                size="sm"
                                className="bg-[#544DDC] hover:bg-[#001028]/90 transition  px-4 py-2 h-9"
                            >
                                <Link
                                    href="/register"
                                    className="text-white text-sm"
                                >
                                    Contact us
                                </Link>
                            </Button>
                        </div>

                        {/* Right Side FAQ Accordion */}
                        <div className="space-y-4">
                            {faqs.map((faq, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div
                                        key={index}
                                        className={`rounded-xl p-2 transition-colors duration-200 
                                        hover:bg-slate-200 
                                        ${isOpen ? "bg-slate-200" : ""}`}
                                    >
                                        <button
                                            className="w-full text-left text-lg p-2 flex items-center justify-between text-backgroundSecondary font-semibold"
                                            onClick={() => toggleIndex(index)}
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-${index}`}
                                        >
                                            {faq.question}
                                            <span className="ml-4">
                                                {isOpen ? (
                                                    <Minus size={20} />
                                                ) : (
                                                    <Plus size={20} />
                                                )}
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div
                                                id={`faq-${index}`}
                                                className="px-2 pb-4 text-base font-medium text-accent4 animate-fade-in mt-2 max-w-[90%] sm:max-w-[100%]"
                                            >
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Join the Community Section */}
                <section className="bg-neutral2 py-10 sm:py-24 px-4 sm:px-8">
                    <div className="max-w-5xl mx-auto items-center text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <span className="w-2 h-2 bg-backgroundPrimary rounded-full"></span>
                            <p className="text-sm flex font-semibold text-accent3">
                                Join the Community
                            </p>
                        </div>

                        <h2 className="text-2xl sm:text-4xl text-center font-bold text-headingPrimary mb-2 sm:mb-4">
                            Join a Smarter Way to Deliver.
                        </h2>

                        <p className="text-sm max-w-[90%] mx-auto sm:max-w-none text-accent4 font-medium mb-5">
                            A smarter delivery network—built on trust, powered
                            by people.
                        </p>

                        <div className="items-center space-x-6 font-bold">
                            <Button
                                asChild
                                size="sm"
                                className="bg-[#544DDC] hover:bg-[#001028]/90  px-5 h-9"
                            >
                                <Link
                                    href="/register"
                                    className="text-white text-sm"
                                >
                                    Get Started
                                </Link>
                            </Button>

                            <Link
                                href="/login"
                                className="text-[#303E4B] text-sm hover:text-[#544ddca8]"
                            >
                                Contact us
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-backgroundPrimary py-10 sm:py-24 px-4 sm:px-8">
                    <div className="max-w-5xl mx-auto ">
                        <div className="items-center text-center mb-10 sm:mb-36">
                            <Link href="/" className="inline-block">
                                <Image
                                    src="/logo-white.svg"
                                    alt="TrustLinc Logo"
                                    width={400}
                                    height={250}
                                    priority={true}
                                    quality={100}
                                    className="w-auto max-w-[90vw] xl:max-w-[1400px] h-auto object-contain cursor-pointer"
                                />
                            </Link>
                        </div>

                        <div className="px-3 sm:max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-16 sm:gap-4">
                            {/* Left section: Logo and contact info */}
                            <div className="text-sm text-neutral2">
                                <p className="mb-1 sm:mb-2 font-bold">
                                    <a
                                        href="mailto:support@trustlinc.app"
                                        className="text-sm sm:text-base font-medium hover:text-accent1 hover:underline"
                                    >
                                        support@trustlinc.app
                                    </a>
                                </p>

                                <p className="text-xs sm:text-sm text-neutral-400">
                                    KM1 Aba | Port Harcourt <br />
                                    Express Way Umuahia, Abia State.
                                </p>
                            </div>

                            {/* Right section: Footer links */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-8 sm:gap-10">
                                {/* Products */}
                                <div>
                                    <h3 className="text-sm sm:text-base font-medium text-neutral1 mb-4 sm:mb-6">
                                        Products
                                    </h3>
                                    <ul className="space-y-4 text-neutral-400">
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <Link href="/shippers">
                                                Shippers
                                            </Link>
                                        </li>
                                        <li className="text-sm hover:text-accent1 hover:underline">
                                            <Link href="/couriers">
                                                Couriers
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Company */}
                                <div>
                                    <h3 className="text-sm sm:text-base font-medium text-neutral1 mb-4 sm:mb-6">
                                        Company
                                    </h3>
                                    <ul className="space-y-4 text-neutral-400">
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <Link href="/about">About</Link>
                                        </li>
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <Link href="/careers">Careers</Link>
                                        </li>
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <Link href="/blog">Blog</Link>
                                        </li>
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <Link href="/security">
                                                Security
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Resources */}
                                <div>
                                    <h3 className="text-sm sm:text-base font-medium text-neutral1 mb-4 sm:mb-6">
                                        Resources
                                    </h3>
                                    <ul className="space-y-4 text-neutral-400">
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <Link href="/docs">Docs</Link>
                                        </li>
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <Link href="/newsrooms">
                                                Newsrooms
                                            </Link>
                                        </li>
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <Link href="/privacy">Privacy</Link>
                                        </li>
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <Link href="/terms">Terms</Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Support */}
                                <div>
                                    <h3 className="text-sm sm:text-base font-medium text-neutral1 mb-4 sm:mb-6 -mt-12 sm:mt-0">
                                        Support
                                    </h3>
                                    <ul className="space-y-4 text-neutral-400">
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <Link href="/contact">
                                                Contact us
                                            </Link>
                                            {/* Internal link – no target="_blank" */}
                                        </li>
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <a
                                                href="https://x.com/TrustLinchq"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                X (Twitter)
                                            </a>
                                        </li>
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <a
                                                href="https://www.instagram.com/trustlinchq/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Instagram
                                            </a>
                                        </li>
                                        <li className="text-xs sm:text-sm hover:text-accent1 hover:underline">
                                            <a
                                                href="#"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Facebook
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
