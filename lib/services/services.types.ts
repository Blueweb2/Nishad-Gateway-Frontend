export type ServiceKey =
  | "companyFormation"
  | "internationalMarket"
  | "advisory"
  | "corporateSupport";

export interface ServiceItem {
  label: string;
  href: string;
}

export interface Service {
  index: string;
  title: string;
  items: ServiceItem[];
}
