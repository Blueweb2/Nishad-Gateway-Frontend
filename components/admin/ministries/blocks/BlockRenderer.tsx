// "use client";
// import ContentBlockEditor from "./ContentBlockEditor";
// import SliderBlockEditor from "./SliderBlockEditor";
// import CardsBlockEditor from "./CardsBlockEditor";

// import {
//   MinistryBlock,
//   ContentBlock,
//   SliderBlock,
//   CardsBlock,
// } from "@/lib/types/ministry";

// type Props = {
//   block: MinistryBlock;
//   blocks: MinistryBlock[];
//   setBlocks: React.Dispatch<React.SetStateAction<MinistryBlock[]>>;
// };

// export default function BlockRenderer({ block, blocks, setBlocks }: Props) {

//   if (block.type === "content") {
//     const contentBlock: ContentBlock = block;

//     return (
//       <ContentBlockEditor
//         block={contentBlock}
//         blocks={blocks}
//         setBlocks={setBlocks}
//       />
//     );
//   }

//   if (block.type === "slider") {
//     const sliderBlock: SliderBlock = block;

//     return (
//       <SliderBlockEditor
//         block={sliderBlock}
//         blocks={blocks}
//         setBlocks={setBlocks}
//       />
//     );
//   }

//   if (block.type === "cards") {
//     const cardsBlock: CardsBlock = block;

//     return (
//       <CardsBlockEditor
//         block={cardsBlock}
//         blocks={blocks}
//         setBlocks={setBlocks}
//       />
//     );
//   }

//   return null;
// }
import React from 'react'

export default function BlockRenderer() {
  return (
    <div>BlockRenderer</div>
  )
}
