import type { configNode, replaceConfig } from "../configApp/types";

export function replaceTextInTextNodes(
  node: any,
  regex: RegExp,
  replacement: string
) {
  if (node.nodeType === 3) {
    if (node.nodeValue.trim().length > 0) {
      node.nodeValue = node.nodeValue.replace(regex, replacement);
    }
  }

  if (node.nodeType === 1) {
    const tagName = node.tagName.toLowerCase();
    if (
      tagName === "script" ||
      tagName === "style" ||
      tagName === "textarea" ||
      tagName === "input"
    ) {
      return;
    }

    let child = node.firstChild;
    while (child) {
      let nextChild = child.nextSibling;
      replaceTextInTextNodes(child, regex, replacement);
      child = nextChild;
    }
  }
}

export const replaceTextByRules = (config: replaceConfig) => {
  config.forEach((node: configNode) => {
    let replacement = getReplacementString(node);

    if (!node.replaceMode) {
      node.replaceMode = "word";
    }

    if (node.replaceMode === "whole_word") {
      node.text = `\\b${node.text}\\w*(?=-|\\b)`;
    } else if (node.replaceMode === "word") {
      node.text = `\\b${node.text}\\b`;
    } else if (node.replaceMode === "partial_word") {
      node.text = `${node.text}`;
    }

    replaceTextInTextNodes(
      document.body,
      new RegExp(node.text, node.isIgnoreCase ? "gi" : "g"),
      replacement
    );
  });
};

const getReplacementString = (node: configNode): string => {
  if (node.replaceTo === "%random_symbols%") {
    return Math.random().toString(36).substring(2, 10);
  } else if (node.replaceTo === "%asterisks%") {
    return "*".repeat(node.text.length);
  } else if (node.replaceTo === "%noting%") {
    return "";
  } else {
    return node.replaceTo;
  }
};
