import axios from "axios";
import { toast } from "sonner";
import { logout } from "@/lib/logout";

const apiClient = axios.create({
    baseURL: "https://trustlinc-backend.onrender.com/api/v1",
});

apiClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    console.log("Token retrieved from localStorage:", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.log("No token found in localStorage for request:", config.url);
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        console.log(`API call succeeded: ${response.config.url}`);
        return response;
    },
    async (error) => {
        console.error(
            `API call failed: ${error.config?.url}, status: ${error.response?.status}`
        ); // Debug logging
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(
                    "https://trustlinc-backend.onrender.com/api/v1/auth/refresh-token",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                const newToken = res.data.token;
                localStorage.setItem("token", newToken);
                // Dispatch StorageEvent to notify other tabs
                window.dispatchEvent(
                    new StorageEvent("storage", {
                        key: "token",
                        newValue: newToken,
                    })
                );
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiClient(originalRequest); // Retry original request
            } catch (err) {
                console.error("Token refresh failed:", err); // Log refresh error
                const logoutResult = await logout();
                if (logoutResult.success) {
                    toast.error("Session expired. Redirecting to login...");
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 2000);
                } else {
                    toast.error("Failed to log out. Redirecting to login...");
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 2000);
                }
            }
        } else if (error.response?.status === 403) {
            toast.error("Access denied. Shipper role required.");
        }
        return Promise.reject(error);
    }
);

export default apiClient;
