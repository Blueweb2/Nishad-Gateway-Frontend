/* ================= HERO BLOCK ================= */

export type HeroBlock = {
  backgroundImage: string;
  backgroundImagePublicId?: string;
  title: string;
  description: string;
};

/* ================= RICH CONTENT BLOCK ================= */

export type RichContentBlock = {
  content: string;
};

/* ================= INDUSTRIES BLOCK ================= */

export type IndustriesItem = {
  title: string;
  description: string;
  image: string;
  imagePublicId?: string;
};

export type IndustriesBlock = {
  sectionLabel: string;
  title: string;
  description: string;
  items: IndustriesItem[];
};

/* ================= SECTOR BLOCK UNION ================= */

export type SectorBlock =
  | { type: "hero"; data: HeroBlock }
  | { type: "richContent"; data: RichContentBlock }
  | { type: "industries"; data: IndustriesBlock };

/* ================= DEFAULT BLOCK FACTORY ================= */

export const getDefaultSectorBlock = (
  type: SectorBlock["type"]
): SectorBlock => {
  switch (type) {
    case "hero":
      return {
        type: "hero",
        data: {
          backgroundImage: "",
          backgroundImagePublicId: "",
          title: "",
          description: "",
        },
      };

    case "richContent":
      return {
        type: "richContent",
        data: {
          content: "",
        },
      };

    case "industries":
      return {
        type: "industries",
        data: {
          sectionLabel: "01 | 05",
          title: "",
          description: "",
          items: [
            {
              title: "",
              description: "",
              image: "",
              imagePublicId: "",
            },
          ],
        },
      };

    default:
      throw new Error("Invalid sector block type");
  }
};