"use client";

import RichTextEditor from "@/components/admin/common/RichTextEditor";

interface Props {
  data: any;
  onChange: (data: any) => void;
}

export default function RichContentBlockEditor({
  data,
  onChange,
}: Props) {
  return (
    <div className="border border-gray-700 p-4 rounded-lg space-y-4">

      <h3 className="text-sm text-gray-400 uppercase tracking-wide">
        Rich Content Section
      </h3>

      <RichTextEditor
        value={data.content || ""}
        onChange={(value) =>
          onChange({ ...data, content: value })
        }
      />

    </div>
  );
}