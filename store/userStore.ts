import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

type UserStore = {
  hasFinishedOnboarding: boolean;
  toggleFinishedOnboarding: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      hasFinishedOnboarding: false,
      toggleFinishedOnboarding: () => {
        set((state) => ({
          ...state,
          hasFinishedOnboarding: !state.hasFinishedOnboarding,
        }));
      },
    }),
    {
      name: "plantly-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
