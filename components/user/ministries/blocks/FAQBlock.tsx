import FAQSection from "@/components/user/shared/FAQSection";
import { FAQBlock as FAQBlockType } from "@/lib/types/ministry";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  block: FAQBlockType;
};

export default function FAQBlock({ block }: Props) {
  const items =
    block.faqs?.map((faq) => ({
      question: faq.q,
      answer: faq.a,
    })) || [];

  return (
    <FAQSection
      title="Frequently Asked Questions"
      items={items}
      imageUrl={
        block.faqImage
          ? cloudinaryAutoWebp(block.faqImage)
          : undefined
      }
      imageAlt={block.faqImageAlt}
      ctaTitle="Ready to Set Up Your Company?"
      ctaButtonText="Talk to an Advisor"
    />
  );
}