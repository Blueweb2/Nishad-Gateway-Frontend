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
      // 🔥 Important safeguard
      if (!cities || cities.length === 0) return null;

      return (
        <LocationsSliderSection
          locationsHeading={
            block.data?.locationsHeading ||
            "Start Your Business Anywhere in Saudi Arabia"
          }
          locationsSubheading={
            block.data?.locationsSubheading ||
            "Entity selection and licensing can be completed regardless of your chosen city or economic zone."
          }
          cities={cities}
        />
      );

    default:
      return null;
  }
}