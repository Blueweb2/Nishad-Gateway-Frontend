"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] outline-none text-white prose prose-invert max-w-none",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();

      // prevent unnecessary parent updates
      if (html !== value) {
        onChange(html);
      }
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-white/10 rounded-lg bg-black/40">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b border-white/10">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("bold")
              ? "bg-green-600 text-white"
              : "bg-white/10 text-white"
          }`}
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("italic")
              ? "bg-green-600 text-white"
              : "bg-white/10 text-white"
          }`}
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
              return;
            }

            const url = prompt("Enter URL");
            if (!url) return;

            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("link")
              ? "bg-green-600 text-white"
              : "bg-white/10 text-white"
          }`}
        >
          Link
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="px-3 py-1 rounded text-sm bg-white/10 text-white"
        >
          List
        </button>
      </div>

      {/* Editor */}
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
