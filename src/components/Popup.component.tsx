import { useEffect, useState } from "react";
import styles from "./Popup.module.css";
import { defaultConfig } from "../configApp/defaultConfig";
import Chrome from "../api/chrome/Chrome";
import { ImSwitch } from "react-icons/im";
import { FaGear } from "react-icons/fa6";

const Popup: React.FC = () => {
  const [isActiveScript, setIsActiveScript] = useState<boolean>(true);

  useEffect(() => {
    chrome.storage?.local?.get("isActive", (result) => {
      if (result.isActive !== undefined) {
        setIsActiveScript(result.isActive);
      }
    });
  }, []);

  useEffect(() => {
    if (isActiveScript) {
      replaceText();
    } else {
      backToDefault();
    }
  }, [isActiveScript]);

  const replaceText = () => {
    Chrome.sendMessage(
      { action: "REPLACE_TEXT", config: defaultConfig },
      () => {
        if (chrome.runtime.lastError) {
          return;
        }
      }
    );
  };

  const backToDefault = () => {
    Chrome.sendMessage({ action: "BACK_TO_DEFAULT" }, () => {
      if (chrome.runtime.lastError) {
        return;
      }
    });
  };
  return (
    <div className={styles.popupContainer}>
      <button className={styles.optionsButton} onClick={openOptions}>
        <FaGear />
      </button>
      <button
        onClick={() => setIsActiveScript((prev) => !prev)}
        className={`${styles.replaceButton} ${
          isActiveScript ? styles.active : ""
        }`}
      >
        <ImSwitch
          className={`${styles.icon} ${isActiveScript ? styles.active : ""}`}
        />
      </button>
    </div>
  );
};

export default Popup;

const openOptions = () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("configUI/configUI.html"));
  }
};
