import { useConfigStore } from "../store/store";
import styles from "./configUI.module.css";
import { useEffect, useRef, useState } from "react";
import { defaultConfig } from "../configApp/defaultConfig";
import type { replaceConfig } from "../configApp/types";

const ConfigUI = () => {
  const config = useConfigStore((state) => state.currentConfig);
  const setConfig = useConfigStore((state) => state.set);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isSaveLoading, setIsSaveLoading] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      const result = await chrome.storage?.local?.get("replaceConfig");
      setConfig(result.replaceConfig || defaultConfig);
    };
    fetchConfig();
  }, []);

  const [textareaValue, setTextareaValue] = useState(
    JSON.stringify(config, null, 2)
  );

  useEffect(() => {
    setTextareaValue(JSON.stringify(config, null, 2));
  }, [config]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setTextareaValue(newValue);

    try {
      const newConfig = JSON.parse(newValue) as replaceConfig;
      setConfig(newConfig);
    } catch (error) {
      console.error("Incorrect JSON:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.saveButton}
          onClick={() => {
            setIsSaveLoading(true);
            setTimeout(() => {
              setIsSaveLoading(false);
            }, 2500);
            chrome.storage.local.set({ replaceConfig: config });
          }}
        >
          {isSaveLoading ? (
            <div className={styles.saveAnimationContainer}>
              <div className={styles.loader}></div>
              <div className={styles.checkMark}></div>
            </div>
          ) : (
            <>Save</>
          )}
        </button>
      </div>
      <textarea
        className={styles.textarea}
        ref={textareaRef}
        value={textareaValue}
        onChange={handleChange}
      />
    </div>
  );
};
export default ConfigUI;
