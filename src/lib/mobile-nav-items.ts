import { Home, Package, WalletCards, Send } from "lucide-react";

export const mobileNavItems = [
    {
        name: "Home",
        href: "/shipper/dashboard",
        icon: Home,
    },

    {
        name: "Send",
        href: "/shipper/create-delivery",
        icon: Send,
    },

    {
        name: "Deliveries",
        href: "/my-deliveries",
        icon: Package,
    },

    {
        name: "Payment",
        href: "/payment-history",
        icon: WalletCards,
    },
];
