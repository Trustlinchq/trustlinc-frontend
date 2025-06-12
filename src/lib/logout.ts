// lib/logout.ts
import axios from "axios";

export const logout = async () => {
    const token = localStorage.getItem("token");

    try {
        await axios.post(
            "https://trustlinc-backend.onrender.com/api/v1/auth/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return { success: true };
    } catch (error) {
        console.error("Logout failed:", error);
        return { success: false, error };
    }
};
