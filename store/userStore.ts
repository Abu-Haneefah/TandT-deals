import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  country: string;
}

interface UserState {
  isLoggedIn: boolean;
  user: UserProfile | null;
  login: (userData: UserProfile) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,

      login: (userData) => {
        set({ isLoggedIn: true, user: userData });
      },

      logout: () => {
        SecureStore.deleteItemAsync("userToken").catch((err) =>
          console.error("Failed to delete token on logout", err),
        );

        set({ isLoggedIn: false, user: null });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
