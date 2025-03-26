import React from "react";
import { useThemeStore } from "./useThemeStore";
import { THEMES } from "../constants/index";

function Setting() {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Theme</h1>
          <p className="text-sm text-base-content/70">
            Customize your experience with different themes
          </p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        
            <button
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
        
            </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
