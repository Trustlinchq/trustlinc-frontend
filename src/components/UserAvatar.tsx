import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type User = {
    username: string;
    full_name: string;
    role: "shipper" | "carrier"; // assuming these are the two roles
    image?: string | null;
};

type Props = {
    user: User;
};

export default function UserAvatar({ user }: Props) {
    // Optional: Emoji based on user role

    return (
        <Avatar>
            {user.image ? (
                <AvatarImage src={user.image} alt={user.username} />
            ) : (
                <AvatarFallback className="bg-neutral1 text-base text-center cursor-pointer">
                    {user.full_name?.charAt(0).toUpperCase() ||
                        user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
            )}
        </Avatar>
    );
}
