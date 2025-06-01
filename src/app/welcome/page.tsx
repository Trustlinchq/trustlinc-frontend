"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WelcomePage() {
    return (
        <div className="flex h-screen items-center justify-center bg-white">
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            >
                <Image
                    src="/logo-icon.svg"
                    alt="TrustLinc Logo"
                    width={100}
                    height={50}
                    className="object-contain"
                />
            </motion.div>
        </div>
    );
}
