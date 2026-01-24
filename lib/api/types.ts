// // src/lib/api/types.ts

// export type ApiResponse<T> = {
//   success: boolean;
//   message: string;
//   data: T;
// };

// // ------------------
// // SERVICE TYPES
// // ------------------
// export type Service = {
//   _id: string;
//   index: string;
//   title: string;
//   slug: string;
//   isActive: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// };

// export type ServicesMenuItem = {
//   _id: string;
//   title: string;
//   slug: string;
//   subservices?: { _id: string; title: string; slug: string }[];
// };

// // ------------------
// // SUBSERVICE TYPES
// // ------------------
// export type SubService = {
//   _id: string;
//   serviceId: string;
//   title: string;
//   slug: string;
//   description?: string;
//   image?: string;
//   isActive: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// };

// // ------------------
// // SUBSERVICE CONTENT TYPES
// // ------------------
// export type WhySlide = {
//   title: string;
//   description: string;
//   image: string;
// };

// export type OwnershipSlide = {
//   title: string;
//   leftText?: string;
//   rightText?: string;
//   image: string;
// };

// export type EntityRow = {
//   id: string;
//   entityType: string;
//   ownership: string;
//   bestFor: string;
//   capital: string;
//   regulatoryBody: string;
//   timeToSetup: string;
//   icon?: string;
// };

// export type EntityTypeSlide = {
//   title: string;
//   description?: string; // ✅ make optional to avoid TS error
//   mainImage: string;
//   subImage: string;
// };

// export type LocationSlide = {
//   title: string;
//   description?: string; // ✅ optional
//   image: string;
//   tag?: string; // ✅ optional (backend may not send always)
//   link?: string; // ✅ optional
// };

// export type FAQ = {
//   q: string;
//   a: string;
// };

// export type EntityChooseQuestion = {
//   question: string;
//   options: { label: string; value: string }[];
//   selectedValue?: string;
// };

// export type SubServiceContent = {
//   sectionOrder: string[];

//   heroTitle: string;
//   heroSubtitle: string;
//   heroDescription: string;
//   heroButtonText: string;
//   heroButtonLink: string;
//   heroImage: string;

//   whyHeading: string;
//   whySlides: WhySlide[];
//   whyCtaText: string;
//   whyCtaLink: string;

//   ownershipHeading: string;
//   ownershipTabOneLabel: string;
//   ownershipTabTwoLabel: string;
//   ownershipSlides: OwnershipSlide[];

//   entityTableHeading: string;
//   entityTableRows: EntityRow[];

//   entityTypesHeading: string;
//   entityTypesDescription: string;
//   entityTypesSlides: EntityTypeSlide[];

//   entityChooseHeading: string;
//   entityChooseSubheading: string;
//   entityChooseQuestions: EntityChooseQuestion[];

//   documentsHeading: string;
//   documentsSubheading: string;
//   documentEntityTabs: { label: string; value: string }[];
//   documentGroups: {
//     entityValue: string;
//     cards: { title: string; items: string[]; icon?: string }[];
//   }[];

//   locationsHeading: string;
//   locationsSubheading: string;
//   locationsSlides: LocationSlide[];

//   introHeading: string;
//   introText: string;

//   sections: { heading: string; text: string; image?: string }[];

//   faqHeading: string;
//   faqs: FAQ[];
// };