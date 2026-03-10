"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MiniTextEditor({ value, onChange }: Props) {
const editor = useEditor({
  immediatelyRender: false,

  extensions: [
    StarterKit.configure({
      heading: false,
      bulletList: false,
      orderedList: false,
      blockquote: false,
      codeBlock: false,
    }),
    Link.configure({
      openOnClick: false,
    }),
    Placeholder.configure({
  placeholder: "THis is a mini editor for small text. It does not support headings, lists, blockquotes, or code blocks. It only supports basic formatting like bold and links.",
}),
  ],

  content: value || "",

  onUpdate({ editor }) {
    onChange(editor.getHTML());
  },

  editorProps: {
    attributes: {
      class:
        "min-h-[60px] outline-none text-white text-sm focus:outline-none",
    },
  },
});

  if (!editor) return null;

  const btn = (active: boolean) =>
    `px-2 py-1 rounded text-xs ${
      active
        ? "bg-emerald-600 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`;

  const handleLink = () => {
    const url = prompt("Enter URL");
    if (!url) return;

    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="border border-white/10 rounded bg-black/40">

      <div className="flex gap-2 p-2 border-b border-white/10">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btn(editor.isActive("bold"))}
        >
          Bold
        </button>

        <button
          type="button"
          onClick={handleLink}
          className={btn(editor.isActive("link"))}
        >
          Link
        </button>
      </div>

      <div className="p-3 rich-text">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}