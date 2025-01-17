import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { IconHelpHexagonFilled } from "@tabler/icons-react";
import { BlocksRenderer, BlocksContent } from "@strapi/blocks-react-renderer";

interface FAQ {
  question: string;
  answer: BlocksContent;
}

interface FAQCategory {
  name: string;
  faqs: FAQ[];
}

export const FAQ = ({ 
  heading, 
  sub_heading, 
  faq_category 
}: { 
  heading: string;
  sub_heading: string;
  faq_category: FAQCategory[];
}) => {
  return (
    <Container className="flex flex-col items-center justify-between pb-20">
      <div className="relative z-20 py-10 md:pt-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconHelpHexagonFilled className="h-6 w-6 text-white" />
        </FeatureIconContainer>
        <Heading as="h1" className="mt-4">
          {heading}
        </Heading>
      </div>
      
      {faq_category?.map((category, index) => (
        <div key={index} className="w-full">
          <h2 className="text-2xl font-bold text-white mb-8 mt-16">
            {category.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {Array.isArray(category.faqs) && category.faqs.map((faq: FAQ) => (
              <div key={faq.question}>
                <h4 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                  {faq.question}
                </h4>
                <p className="mt-4 text-neutral-400">
                  <BlocksRenderer content={Array.isArray(faq.answer) ? faq.answer : []} />
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
};
