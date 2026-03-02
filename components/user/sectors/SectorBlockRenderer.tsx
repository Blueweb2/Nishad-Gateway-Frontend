import SectorHero from "./SectorHero";
import SectorIntro from "./SectorIntro";
import SectorSliderSection from "./SectorSliderSection";
import { SectorBlock } from "@/lib/types/sector.types";

interface Props {
  block: SectorBlock;
}

export default function SectorBlockRenderer({ block }: Props) {
  switch (block.type) {
    case "hero":
      return <SectorHero {...block.data} />;

    case "richContent":
      return <SectorIntro {...block.data} />;

    case "industries":
      return <SectorSliderSection {...block.data} />;

    default:
      return null;
  }
}