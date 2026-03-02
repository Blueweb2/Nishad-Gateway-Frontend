import { v4 as uuid } from "uuid";

/* ================= BASE BLOCK ================= */

export interface BaseSectorBlock {
  _id: string; // stable id for React key & reordering
}

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
  | (BaseSectorBlock & { type: "hero"; data: HeroBlock })
  | (BaseSectorBlock & { type: "richContent"; data: RichContentBlock })
  | (BaseSectorBlock & { type: "industries"; data: IndustriesBlock });

/* ================= DEFAULT BLOCK FACTORY ================= */

export const getDefaultSectorBlock = (
  type: SectorBlock["type"]
): SectorBlock => {
  const base = {
    _id: uuid(),
  };

  if (type === "hero") {
    return {
      ...base,
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
      ...base,
      type: "richContent",
      data: {
        content: "",
      },
    };
  }

  if (type === "industries") {
    return {
      ...base,
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