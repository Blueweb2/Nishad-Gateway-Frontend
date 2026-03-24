"use client";

import { useState } from "react";
import SectorHero from "./SectorHero";
import SectorIntro from "./SectorIntro";
import SectorSliderSection from "./SectorSliderSection";
import FAQSection from "@/components/user/shared/FAQSection";
import ContactPopup from "@/components/user/shared/ContactPopup";
import { SectorBlock } from "@/lib/types/sector.types";
import { City } from "@/lib/types/city";

interface Props {
  block: SectorBlock;
  cities: City[];
}

export default function SectorBlockRenderer({ block }: Props) {
  const [openContact, setOpenContact] = useState(false); //  state

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
        <>
          <FAQSection
            items={block.data.items}
            imageUrl={block.data.imageUrl}
            imageAlt={block.data.imageAlt}
            ctaTitle="Ready to Set Up Your Company?"
            ctaButtonText="Talk to an Advisor"
            onCtaClick={() => setOpenContact(true)} //  trigger popup
          />

          {/*  Popup */}
          <ContactPopup
            open={openContact}
            onClose={() => setOpenContact(false)}
          />
        </>
      );

    default:
      return null;
  }
}