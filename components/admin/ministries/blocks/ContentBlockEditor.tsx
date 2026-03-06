import RichTextEditor from "../../common/RichTextEditor";

export default function ContentBlockEditor({
  block,
  index,
  blocks,
  setBlocks,
}: any) {

  const updateContent = (value: string) => {

    const updated = [...blocks];

    updated[index].content = value;

    setBlocks(updated);
  };

  return (
    <div className="border p-4 rounded-xl">

      <h3 className="mb-3 font-semibold">
        Content Block
      </h3>

      <RichTextEditor
        value={block.content}
        onChange={updateContent}
      />

    </div>
  );
}