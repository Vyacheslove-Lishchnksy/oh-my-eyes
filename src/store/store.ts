import { create } from "zustand";
import type { replaceConfig } from "../configApp/types";
import { defaultConfig } from "../configApp/defaultConfig";

interface ConfigState {
  currentConfig: replaceConfig;
  get: () => replaceConfig;
  set: (newConfig: replaceConfig) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  currentConfig: defaultConfig,
  get: function () {
    return this.currentConfig;
  },
  set: (newConfig: replaceConfig) => set({ currentConfig: newConfig }),
}));
