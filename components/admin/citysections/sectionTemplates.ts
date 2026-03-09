import { Section } from "@/lib/types/section";
import { nanoid } from "nanoid";

export const createSection = (type: string, order: number): Section => {
  switch (type) {
    case "HERO":
      return {
        id: nanoid(),
        type: "HERO",
        title: "Hero Section",
        order,
        content: {
          title: "",
          subtitle: "",
          image: "",
        },
      };

    case "TEXT":
      return {
        id: nanoid(),
        type: "TEXT",
        title: "Text Section",
        order,
        content: {
          html: "",
        },
      };

    case "IMAGE":
      return {
        id: nanoid(),
        type: "IMAGE",
        title: "Image Section",
        order,
        content: {
          image: "",
          caption: "",
        },
      };

    case "CARDS":
      return {
        id: nanoid(),
        type: "CARDS",
        title: "Cards",
        order,
        content: {
          items: [],
        },
      };

    case "TABLE":
      return {
        id: nanoid(),
        type: "TABLE",
        title: "Table",
        order,
        content: {
          headers: [],
          rows: [],
        },
      };

    case "LISTINGS":
      return {
        id: nanoid(),
        type: "LISTINGS",
        title: "Listings",
        order,
        content: {
          listingType: "",
        },
      };

    default:
      return {
        id: nanoid(),
        type: "TEXT",
        title: "Text",
        order,
        content: { html: "" },
      };
  }
};