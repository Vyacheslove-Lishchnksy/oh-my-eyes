import type { configNode, replaceConfig } from "./types";

export const defaultConfig: replaceConfig = [];

export const defaultNode: configNode = {
  text: "text that you want to replace",
  replaceTo: "text that you want to see",
  isIgnoreCase: true,
  replaceMode: "partial_word",
};
