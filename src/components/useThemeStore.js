import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme-ai") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("theme-ai", theme);
    set({ theme });
  },
}));