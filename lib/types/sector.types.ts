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


/* ================= LOCATIONS BLOCK ================= */

export type LocationsBlock = {
  locationsHeading?: string;
  locationsSubheading?: string;
};

/* ================= FAQ BLOCK ================= */

export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQBlock = {
  items: FAQItem[];
  imageUrl?: string;
  imageAlt?: string;
};
/* ================= SECTOR BLOCK UNION ================= */

export type SectorBlock =
  | (BaseSectorBlock & { type: "hero"; data: HeroBlock })
  | (BaseSectorBlock & { type: "richContent"; data: RichContentBlock })
  | (BaseSectorBlock & { type: "industries"; data: IndustriesBlock })
  | (BaseSectorBlock & { type: "locations"; data: LocationsBlock })
  | (BaseSectorBlock & { type: "faq"; data: FAQBlock });;

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

if (type === "locations") {
  return {
    ...base,
    type: "locations",
    data: {
      locationsHeading: "",
      locationsSubheading: "",
    },
  };
}

if (type === "faq") {
  return {
    ...base,
    type: "faq",
    data: {
      items: [{ question: "", answer: "" }],
      imageUrl: "",
      imageAlt: "",
    },
  };
}

throw new Error("Invalid sector block type");
}