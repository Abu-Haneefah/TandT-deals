import { useUserStore } from "@/store/userStore";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import * as SecureStore from "expo-secure-store";


export const base_url = process.env.EXPO_PUBLIC_BASE_URL;

if (!base_url) {
  console.warn(
    "API Warning: EXPO_PUBLIC_BASE_URL is not defined. Check your .env file.",
  );
}

const marketPlace = axios.create({
  baseURL: base_url,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// REQUEST INTERCEPTOR: Automatically inject the Bearer token
marketPlace.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error("SecureStore Fetch Error:", e);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR: Global Auth & Error Handling
marketPlace.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // 401 means the token is dead, invalid, or expired
    if (error.response?.status === 401) {
      try {
        console.log("Unauthorized: Session expired. Cleaning up...");

        // 1. Clear the physical token from the device
        await SecureStore.deleteItemAsync("userToken");

        // 2. Update Zustand store state to log the user out in the UI
        // We use .getState() to access actions outside of a React component
        useUserStore.getState().logout();
      } catch (e) {
        console.error("Error clearing session on 401:", e);
      }
    }
    return Promise.reject(error);
  },
);

export default marketPlace;
