import { replaceTextByRules } from "./app/replaceText";
import { defaultConfig } from "./configApp/defaultConfig";

setInterval(async () => {
  let isActive = await chrome.storage?.local?.get("isActive");

  if (isActive === null || isActive === undefined) {
    await chrome.storage?.local?.set({ isActive: true });
  } else if (isActive.isActive) {
    let result = await chrome.storage?.local?.get("replaceConfig");
    let config = result.replaceConfig || defaultConfig;

    replaceTextByRules(config);
  }
}, 100);

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "REPLACE_TEXT") {
    chrome.storage?.local?.set({ isActive: true });
  } else if (request.action === "BACK_TO_DEFAULT") {
    chrome.storage?.local?.set({ isActive: false });
  }
});

chrome.storage?.local?.get("replaceConfig", async (result) => {
  if (!result.replaceConfig) {
    chrome.storage?.local?.set({ replaceConfig: defaultConfig });
  }
});
