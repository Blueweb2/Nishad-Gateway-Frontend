"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Dropcursor from "@tiptap/extension-dropcursor";
import { Node, mergeAttributes } from "@tiptap/core";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

/* ================= CUSTOM IMAGE ================= */
export const CustomImage = Node.create({
  name: "customImage",

  group: "block",
  draggable: true,
  selectable: true,

  content: "", // ✅ IMPORTANT (no children)

  isolating: true, // ✅ VERY IMPORTANT (prevents list conflicts)

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: "" },
      caption: { default: "" },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure[data-type='custom-image']",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      { "data-type": "custom-image", class: "my-4 text-center" },

      [
        "img",
        mergeAttributes(HTMLAttributes, {
          class: "rounded-lg max-w-full mx-auto",
        }),
      ],

      HTMLAttributes.caption
        ? [
            "figcaption",
            { class: "text-sm text-gray-400 mt-2" },
            HTMLAttributes.caption,
          ]
        : "",
    ];
  },
});

/* ================= EDITOR ================= */

export default function RichTextEditor({ value, onChange }: Props) {

  const [uploadingImage, setUploadingImage] = useState(false);
  const editor = useEditor({
    extensions: [
       StarterKit.configure({
    heading: { levels: [2, 3] },
    bulletList: false,
    orderedList: false,
    listItem: false,
  }),

  BulletList,
  OrderedList,
  ListItem,

  Link.configure({
    openOnClick: false,
  }),

      CustomImage,

      Dropcursor.configure({
        color: "#10b981",
        width: 2,
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
          "min-h-[250px] outline-none rich-text text-white max-w-none",
      },

      /* ✅ DRAG IMAGE */
     handleDrop: (view, event) => {
  const file = event.dataTransfer?.files?.[0];
  if (!file || !file.type.startsWith("image/")) return false;

  setUploadingImage(true);

  uploadToCloudinarySigned(file, "nishad-gateway/editor")
    .then((res) => {
      const node = view.state.schema.nodes.customImage.create({
        src: res.secure_url,
      });

      const coords = view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      });

      if (!coords) return;

      view.dispatch(view.state.tr.insert(coords.pos, node));
    })
    .finally(() => setUploadingImage(false));

  return true;
},

      /* ✅ PASTE IMAGE */
      handlePaste: (view, event) => {
  const items = event.clipboardData?.items;
  if (!items) return false;

  for (const item of items) {
    if (item.type.startsWith("image")) {
      const file = item.getAsFile();
      if (!file) continue;

      setUploadingImage(true);

      uploadToCloudinarySigned(file, "nishad-gateway/editor")
        .then((res) => {
          const node = view.state.schema.nodes.customImage.create({
            src: res.secure_url,
          });

          view.dispatch(view.state.tr.replaceSelectionWith(node));
        })
        .finally(() => {
          setUploadingImage(false);
        });

      return true;
    }
  }

  return false;
},
    },

    onUpdate({ editor }) {
      const html = editor.getHTML();
      if (html !== value) onChange(html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (active?: boolean) =>
    `p-2 rounded ${active
      ? "bg-emerald-600 text-white"
      : "bg-white/10 text-white hover:bg-white/20"
    }`;

  /* ================= IMAGE BUTTON ================= */

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        setUploadingImage(true);

        const res = await uploadToCloudinarySigned(
          file,
          "nishad-gateway/editor"
        );

        const caption = prompt("Enter image caption (optional)") || "";

        editor
          .chain()
          .focus()
          .insertContent({
            type: "customImage",
            attrs: {
              src: res.secure_url,
              caption,
            },
          })
          .run();

      } catch {
        alert("Image upload failed");
      }

      setUploadingImage(false);
    };

    input.click();
  };

 return (
  <div className="border border-white/10 rounded-xl bg-black/40 overflow-hidden">

    {/* Toolbar */}
    <div className="flex flex-wrap gap-2 p-3 border-b border-white/10">

      <button
        disabled={uploadingImage}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btn(editor.isActive("bold"))} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <Bold size={16} />
      </button>

      <button
        disabled={uploadingImage}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btn(editor.isActive("italic"))} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <Italic size={16} />
      </button>

      <button
        disabled={uploadingImage}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${btn(editor.isActive("heading", { level: 2 }))} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <Heading2 size={16} />
      </button>

      <button
        disabled={uploadingImage}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${btn(editor.isActive("heading", { level: 3 }))} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <Heading3 size={16} />
      </button>

      <button
        disabled={uploadingImage}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btn(editor.isActive("bulletList"))} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <List size={16} />
      </button>

      <button
        disabled={uploadingImage}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${btn(editor.isActive("orderedList"))} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <ListOrdered size={16} />
      </button>

      <button
        disabled={uploadingImage}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${btn(editor.isActive("blockquote"))} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <Quote size={16} />
      </button>

      <button
        disabled={uploadingImage}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${btn(editor.isActive("codeBlock"))} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <Code size={16} />
      </button>

      <button
        disabled={uploadingImage}
        onClick={handleImageUpload}
        className={`${btn()} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <ImageIcon size={16} />
      </button>

      <button
        disabled={uploadingImage}
        onClick={() => {
          const url = prompt("Enter URL");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className={`${btn(editor.isActive("link"))} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <LinkIcon size={16} />
      </button>

      <button
        disabled={uploadingImage}
        onClick={() => editor.chain().focus().undo().run()}
        className={`${btn()} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <Undo size={16} />
      </button>

      <button
        disabled={uploadingImage}
        onClick={() => editor.chain().focus().redo().run()}
        className={`${btn()} ${uploadingImage && "opacity-40 cursor-not-allowed"}`}
      >
        <Redo size={16} />
      </button>

    </div>

    {/* Editor */}
    <div className="relative">

      {/* 🔥 Upload Overlay */}
      {uploadingImage && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
          <p className="text-white text-sm animate-pulse">
            Uploading image...
          </p>
        </div>
      )}

      <div className="p-4 rich-text">
        <EditorContent editor={editor} />
      </div>

    </div>

  </div>
);
}