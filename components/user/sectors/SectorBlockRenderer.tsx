import SectorHero from "./SectorHero";
import SectorIntro from "./SectorIntro";
import SectorSliderSection from "./SectorSliderSection";
import LocationsSliderSection from "@/components/user/ui/LocationsSliderSection";
import { SectorBlock } from "@/lib/types/sector.types";
import { City } from "@/lib/types/city";

interface Props {
  block: SectorBlock;
  cities: City[];
}

export default function SectorBlockRenderer({ block, cities }: Props) {
  switch (block.type) {
    case "hero":
      return <SectorHero {...block.data} />;

    case "richContent":
      return <SectorIntro {...block.data} />;

    case "industries":
      return <SectorSliderSection {...block.data} />;

    case "locations":
      if (!cities?.length) return null;

      return (
        <LocationsSliderSection
          locationsHeading={block.data?.locationsHeading}
          locationsSubheading={block.data?.locationsSubheading}
          cities={cities}
        />
      );

    default:
      return null;
  }
}