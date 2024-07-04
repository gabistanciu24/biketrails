import { generateHTML } from "@tiptap/react";
import parse from "html-react-parser";
import { extensions } from "../constants/tiptapExtensions";

export const parseJsonToHtml = (json) => {
  return parse(generateHTML(json, extensions));
};
