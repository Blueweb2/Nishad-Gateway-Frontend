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
  if (type === "hero") {
    return {
      type: "hero",
      data: {
        backgroundImage: "",
        backgroundImagePublicId: undefined,
        title: "",
        description: "",
      },
    };
  }

  if (type === "richContent") {
    return {
      type: "richContent",
      data: {
        content: "",
      },
    };
  }

  if (type === "industries") {
    return {
      type: "industries",
      data: {
        title: "",
        description: "",
        items: [
          {
            title: "",
            description: "",
            image: "",
            imagePublicId: undefined,
          },
        ],
      },
    };
  }

  throw new Error("Invalid sector block type");
};