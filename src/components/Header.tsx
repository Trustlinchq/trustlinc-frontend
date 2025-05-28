"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ResourcesDropdown } from "@/components/ResourcesDropdown";
import { ProductDropdown } from "@/components/ProductDropdown";

export default function Header() {
    const navLinks = ["Products", "Resources", "Pricing", "Blog", "Contact"];
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-neutral2 py-4 shadow-sm">
            <div className="max-w-5xl mx-auto">
                <nav className="px-6 flex items-center justify-between gap-4">
                    {/* Left: Logo */}
                    <Link href="/">
                        <div className="h-10 w-[120px] flex items-center">
                            <Image
                                src="/logo.svg"
                                alt="TrustLinc Logo"
                                width={100}
                                height={50}
                                className="object-contain cursor-pointer"
                            />
                        </div>
                    </Link>

                    {/* Center: Desktop Nav Links */}
                    <div className="hidden md:flex items-center space-x-10 font-bold flex-1 justify-center">
                        {navLinks.map((label) => {
                            if (label === "Products")
                                return <ProductDropdown key={label} />;
                            if (label === "Resources")
                                return <ResourcesDropdown key={label} />;
                            return (
                                <Link
                                    key={label}
                                    href={`/${label.toLowerCase()}`}
                                    className="text-[#303E4B] text-sm hover:text-[#544ddca8]"
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right: Login & Signup Buttons */}
                    <div className="hidden md:flex items-center space-x-6 font-bold">
                        <Link
                            href="/login"
                            className="text-[#303E4B] text-sm hover:text-[#544ddca8]"
                        >
                            Login
                        </Link>
                        <Button
                            asChild
                            size="sm"
                            className="bg-[#544DDC] hover:bg-[#001028]/90  px-5 h-9"
                        >
                            <Link
                                href="/register"
                                className="text-white text-sm"
                            >
                                Register
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden flex items-center">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="border border-gray-300 rounded-b-md p-2 hover:bg-gray-100 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
                                >
                                    <Menu className="h-6 w-6 text-[#303E4B] z-10" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-full h-full px-6 pt-4 pb-6 flex flex-col bg-neutral2 overflow-y-auto"
                            >
                                {/* Logo */}
                                <div className="flex justify-between items-center mb-8">
                                    <Link href="/">
                                        <Image
                                            src="/logo.svg"
                                            alt="Trustlinc Logo"
                                            width={100}
                                            height={30}
                                            className="object-contain"
                                        />
                                    </Link>
                                </div>

                                {/* Mobile Nav Links */}
                                <div className="flex flex-col space-y-7 items-start">
                                    <div className="flex flex-col space-y-3">
                                        <span className="text-xs text-gray-400 font-bold">
                                            Products
                                        </span>
                                        <Link
                                            href="/shippers"
                                            className="text-[#303E4B] text-2xl font-bold hover:text-[#544ddca8]"
                                        >
                                            Shippers
                                        </Link>
                                        <Link
                                            href="/couriers"
                                            className="text-[#303E4B] text-2xl font-bold hover:text-[#544ddca8]"
                                        >
                                            Couriers
                                        </Link>
                                        <Link
                                            href="/pricing"
                                            className="text-[#303E4B] text-2xl font-bold hover:text-[#544ddca8]"
                                        >
                                            Pricing
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="text-[#303E4B] text-2xl font-bold hover:text-[#544ddca8]"
                                        >
                                            Contact
                                        </Link>
                                    </div>

                                    <div className="flex flex-col space-y-3 mt-6">
                                        <span className="text-xs text-gray-400 font-bold">
                                            Resources
                                        </span>
                                        <Link
                                            href="/about"
                                            className="text-[#303E4B] text-2xl font-bold hover:text-[#544ddca8]"
                                        >
                                            About
                                        </Link>
                                        <Link
                                            href="/careers"
                                            className="text-[#303E4B] text-2xl font-bold hover:text-[#544ddca8]"
                                        >
                                            Careers
                                        </Link>
                                        <Link
                                            href="/docs"
                                            className="text-[#303E4B] text-2xl font-bold hover:text-[#544ddca8]"
                                        >
                                            Docs
                                        </Link>
                                        <Link
                                            href="/security"
                                            className="text-[#303E4B] text-2xl font-bold hover:text-[#544ddca8]"
                                        >
                                            Security
                                        </Link>
                                        <Link
                                            href="/newsroom"
                                            className="text-[#303E4B] text-2xl font-bold hover:text-[#544ddca8]"
                                        >
                                            Newsroom
                                        </Link>
                                        <Link
                                            href="/blog"
                                            className="text-[#303E4B] text-2xl font-bold hover:text-[#544ddca8]"
                                        >
                                            Blog
                                        </Link>
                                    </div>
                                </div>

                                {/* Auth Section */}
                                <div className="flex justify-center space-x-6 py-7 items-center mt-auto">
                                    <Link
                                        href="/login"
                                        className="text-[#303E4B] text-sm font-bold hover:text-[#544ddca8]"
                                    >
                                        Login
                                    </Link>
                                    <Button
                                        asChild
                                        size="sm"
                                        className="bg-[#544DDC] hover:bg-[#001028]/90 px-5 h-9"
                                    >
                                        <Link
                                            href="/register"
                                            className="text-white text-sm font-bold"
                                        >
                                            Register
                                        </Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </div>
        </header>
    );
}
