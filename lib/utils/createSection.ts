import { v4 as uuid } from "uuid";
import { CityBlogSection } from "@/lib/types/city-blog";

export function createSection(
  type: CityBlogSection["type"],
  existingSections: CityBlogSection[]
): CityBlogSection {
  const baseSection = {
    id: uuid(),
    type,
    title: `${type.replaceAll("_", " ")} Section`,
    order:
      Math.max(0, ...existingSections.map((s) => s.order)) + 1,
    isActive: true,
  };

  let content: any = {};

  switch (type) {
    case "HERO":
      content = {
        heading: "",
        subheading: "",
        backgroundImage: "",
        ctaText: "",
        ctaLink: "",
      };
      break;

    case "CATEGORIES":
      content = { heading: "", introText: "" };
      break;

    case "VISION":
      content = { heading: "", content: "", imageUrl: "" };
      break;

    case "INVESTMENT_HIGHLIGHTS":
      content = {
        mainHeading: "",
        description: "",
        cards: [],
      };
      break;

    case "BUSINESS_SETUP_OPTIONS":
      content = {
        heading: "",
        description: "",
        options: [],
        decisionFlow: "",
        bottomText: "",
      };
      break;

    case "INFRASTRUCTURE":
      content = {
        heading: "",
        description: "",
        slides: [],
      };
      break;

    case "LANDMARKS":
      content = {
        heading: "",
        ctaText: "",
        ctaLink: "",
        items: [],
      };
      break;

    case "FOOD_GUIDE":
      content = {
        heading: "",
        filters: [],
      };
      break;

      case "TRANSPORTATION_GUIDE":
  content = {
    heading: "",
    slides: [
      {
        label: "",
        backgroundImage: "",
        backgroundImagePublicId: undefined,
        title: "",
        link: "",
      },
    ],
  };
  break;

  case "EXPANDABLE_SNAPSHOT":
  content = {
    heading: "",
    cards: [
      {
        imageUrl: "",
        imagePublicId: undefined,
        caption: "",
      },
      {
        imageUrl: "",
        imagePublicId: undefined,
        caption: "",
      },
    ],
  };
  break;





  case "FUTURE_OUTLOOK":
  content = {
    heading: "",
    slides: [
      {
        title: "",
        description: "",
        imageUrl: "",
        imagePublicId: undefined,
        ctaText: "",
        ctaLink: "",
      },
    ],
  };
  break;


  }

  return { ...baseSection, content };
}
