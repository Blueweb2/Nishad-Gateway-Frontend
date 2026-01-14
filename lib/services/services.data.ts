import { Service, ServiceKey } from "./services.types";

export const SERVICES: Record<ServiceKey, Service> = {
  companyFormation: {
    index: "1-1",
    title: "Company Formation",
    items: [
      {
        label: "Company Setup Overview",
        href: "/services/company-formation/overview",
      },
      {
        label: "Entity Types",
        href: "/services/company-formation/entity-types",
      },
      {
        label: "Licensing & Approvals",
        href: "/services/company-formation/licensing",
      },
      {
        label: "Ownership & Capital",
        href: "/services/company-formation/ownership",
      },
      {
        label: "Setup Timeline",
        href: "/services/company-formation/timeline",
      },
    ],
  },

  internationalMarket: {
    index: "1-2",
    title: "International Market Entry",
    items: [
      {
        label: "Market Entry Strategy",
        href: "/services/international-market/strategy",
      },
      {
        label: "Regulatory Compliance",
        href: "/services/international-market/compliance",
      },
      {
        label: "Partner Identification",
        href: "/services/international-market/partners",
      },
    ],
  },

  advisory: {
    index: "1-3",
    title: "Saudi Business Advisory",
    items: [
      {
        label: "Business Structuring",
        href: "/services/advisory/structuring",
      },
      {
        label: "Risk Assessment",
        href: "/services/advisory/risk",
      },
      {
        label: "Growth Advisory",
        href: "/services/advisory/growth",
      },
    ],
  },

  corporateSupport: {
    index: "1-4",
    title: "Corporate Support",
    items: [
      {
        label: "PRO Services",
        href: "/services/corporate/pro",
      },
      {
        label: "Accounting & Tax",
        href: "/services/corporate/accounting",
      },
      {
        label: "HR & Payroll",
        href: "/services/corporate/hr",
      },
    ],
  },
};
