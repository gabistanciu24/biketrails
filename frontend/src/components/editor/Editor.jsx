import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import MenuBar from "./MenuBar";
import styles from "./styles/editor.module.css";
import "highlight.js/styles/atom-one-dark.css";
import { extensions } from "../../constants/tiptapExtensions";

const Editor = ({ onDataChange, content, editable }) => {
  const editor = useEditor({
    editable,
    extensions: extensions,
    editorProps: {
      attributes: {
        class: `${styles.editorContent}`,
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onDataChange(json);
    },
    content: content,
  });

  return (
    <div className={styles.editor_wrapper}>
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
