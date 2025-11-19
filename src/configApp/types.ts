export interface configNode {
  text: string;
  replaceTo: string | replaceConstants;
  isIgnoreCase?: boolean;
  replaceMode: replaceMode;
}

type replaceConstants = "%random_symbols%" | "%noting%" | "%asterisks%";
type replaceMode = "whole_word" | "partial_word" | "word";

export type replaceConfig = configNode[];
