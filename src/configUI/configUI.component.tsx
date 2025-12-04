import { useConfigStore } from "../store/store";
import styles from "./configUI.module.css";
import { useEffect, useRef, useState } from "react";
import { defaultConfig, defaultNode } from "../configApp/defaultConfig";
import type { replaceConfig } from "../configApp/types";

const ConfigUI = () => {
  const config = useConfigStore((state) => state.currentConfig);
  const setConfig = useConfigStore((state) => state.set);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cursorRef = useRef<number>(0);

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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.selectionStart = cursorRef.current;
      textareaRef.current.selectionEnd = cursorRef.current;
    }
  }, [textareaValue]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    cursorRef.current = event.target.selectionStart;
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
          className={styles.button}
          onClick={() => {
            const newConfig = [...config];

            newConfig.push({ ...defaultNode });
            setConfig(newConfig);
          }}
        >
          Add button
        </button>
        <button
          className={styles.button}
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
