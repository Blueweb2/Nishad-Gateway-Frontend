import SectorHero from "./SectorHero";
import SectorIntro from "./SectorIntro";
import SectorSliderSection from "./SectorSliderSection";
import FAQSection from "@/components/user/shared/FAQSection";
import { SectorBlock } from "@/lib/types/sector.types";
import { City } from "@/lib/types/city";

interface Props {
  block: SectorBlock;
  cities: City[];
}

export default function SectorBlockRenderer({ block }: Props) {
  switch (block.type) {
    case "hero":
      return <SectorHero {...block.data} />;

    case "richContent":
      return <SectorIntro {...block.data} />;

    case "industries":
      return <SectorSliderSection {...block.data} />;

    case "faq":
      if (!block.data?.items?.length) return null;

      return (
        <FAQSection
          items={block.data.items}
          imageUrl={block.data.imageUrl}
          imageAlt={block.data.imageAlt}
          ctaTitle="Ready to Set Up Your Company?"
          ctaButtonText="Talk to an Advisor"
     
        />
      );

    default:
      return null;
  }
}