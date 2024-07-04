import {
  AiOutlineBold,
  AiOutlineClose,
  AiOutlineEnter,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineRedo,
  AiOutlineStrikethrough,
  AiOutlineUndo,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BiParagraph } from "react-icons/bi";
import { FiCode } from "react-icons/fi";
import { MdOutlineLayersClear } from "react-icons/md";
import { PiCodeBlock, PiQuotes, PiImageSquareBold } from "react-icons/pi";
import { TbSpacingVertical } from "react-icons/tb";
import styles from "./styles/menubar.module.css";
import { useCallback } from "react";

const MenuBar = ({ editor }) => {
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editorMenuBar}>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${styles.editorBtn} ${styles.fontBlack} ${
          editor.isActive("heading", { level: 1 }) ? styles.activeEditorBtn : ""
        }`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${styles.editorBtn} ${styles.fontExtrabold} ${
          editor.isActive("heading", { level: 2 }) ? styles.activeEditorBtn : ""
        }`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${styles.editorBtn} ${styles.fontSemibold} ${
          editor.isActive("heading", { level: 3 }) ? styles.activeEditorBtn : ""
        }`}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${styles.editorBtn} ${styles.fontMedium} ${
          editor.isActive("heading", { level: 4 }) ? styles.activeEditorBtn : ""
        }`}
      >
        H4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`${styles.editorBtn} ${styles.fontNormal} ${
          editor.isActive("heading", { level: 5 }) ? styles.activeEditorBtn : ""
        }`}
      >
        H5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`${styles.editorBtn} ${styles.fontNormal} ${
          editor.isActive("heading", { level: 6 }) ? styles.activeEditorBtn : ""
        }`}
      >
        H6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${styles.editorBtn} ${
          editor.isActive("bold") ? styles.activeEditorBtn : ""
        }`}
      >
        <AiOutlineBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${styles.editorBtn} ${
          editor.isActive("italic") ? styles.activeEditorBtn : ""
        }`}
      >
        <AiOutlineItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`${styles.editorBtn} ${
          editor.isActive("strike") ? styles.activeEditorBtn : ""
        }`}
      >
        <AiOutlineStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`${styles.editorBtn} ${
          editor.isActive("code") ? styles.activeEditorBtn : ""
        }`}
      >
        <FiCode />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={styles.editorBtn}
      >
        <MdOutlineLayersClear />
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={styles.editorBtn}
      >
        <AiOutlineClose />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${styles.editorBtn} ${
          editor.isActive("paragraph") ? styles.activeEditorBtn : ""
        }`}
      >
        <BiParagraph />
      </button>

      <button onClick={addImage} className={styles.editorBtn}>
        <PiImageSquareBold />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${styles.editorBtn} ${
          editor.isActive("bulletList") ? styles.activeEditorBtn : ""
        }`}
      >
        <AiOutlineUnorderedList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${styles.editorBtn} ${
          editor.isActive("orderedList") ? styles.activeEditorBtn : ""
        }`}
      >
        <AiOutlineOrderedList />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${styles.editorBtn} ${
          editor.isActive("codeBlock") ? styles.activeEditorBtn : ""
        }`}
      >
        <PiCodeBlock />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${styles.editorBtn} ${
          editor.isActive("blockquote") ? styles.activeEditorBtn : ""
        }`}
      >
        <PiQuotes />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={styles.editorBtn}
      >
        <TbSpacingVertical />
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={styles.editorBtn}
      >
        <AiOutlineEnter />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={styles.editorBtn}
      >
        <AiOutlineUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={styles.editorBtn}
      >
        <AiOutlineRedo />
      </button>
    </div>
  );
};

export default MenuBar;
