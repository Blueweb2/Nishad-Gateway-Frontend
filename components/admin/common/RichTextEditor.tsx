"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),

      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["http", "https"],
      }),

      Placeholder.configure({
        placeholder: "Start writing content...",
      }),
    ],

    content: value || "",

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[200px] outline-none text-white prose prose-invert max-w-none focus:outline-none",
      },
    },

    onUpdate({ editor }) {
      const html = editor.getHTML();
      if (html !== value) {
        onChange(html);
      }
    },
  });

  /* Sync external value */

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `px-3 py-1 rounded text-sm transition ${
      active
        ? "bg-emerald-600 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`;

  /* Handle links */

  const handleLink = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const input = window.prompt("Enter URL (https://... or /path)");
    if (!input) return;

    const url = input.trim();

    const isExternal = /^https?:\/\/.+/i.test(url);
    const isInternal = url.startsWith("/");

    if (!isExternal && !isInternal) {
      alert("Only https:// links or internal /paths are allowed.");
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
        ...(isExternal && {
          target: "_blank",
          rel: "noopener noreferrer",
        }),
      })
      .run();
  };

  return (
    <div className="border border-white/10 rounded-lg bg-black/40 overflow-hidden">

      {/* Toolbar */}

      <div className="flex flex-wrap gap-2 p-3 border-b border-white/10">

        {/* Bold */}

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btn(editor.isActive("bold"))}
        >
          Bold
        </button>

        {/* Italic */}

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btn(editor.isActive("italic"))}
        >
          Italic
        </button>

        {/* Headings */}

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={btn(editor.isActive("heading", { level: 2 }))}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={btn(editor.isActive("heading", { level: 3 }))}
        >
          H3
        </button>

        {/* Lists */}

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btn(editor.isActive("bulletList"))}
        >
          Bullet
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btn(editor.isActive("orderedList"))}
        >
          Ordered
        </button>

        {/* Link */}

        <button
          type="button"
          onClick={handleLink}
          className={btn(editor.isActive("link"))}
        >
          Link
        </button>

        {/* Undo */}

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm"
        >
          Undo
        </button>

        {/* Redo */}

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm"
        >
          Redo
        </button>

        {/* Clear */}

        <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm"
        >
          Clear
        </button>

      </div>

      {/* Editor */}

      <div className="p-4">
        <EditorContent editor={editor} />
      </div>

    </div>
  );
}