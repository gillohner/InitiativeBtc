"use client";
import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { IconHelpHexagonFilled, IconChevronDown, IconSearch } from "@tabler/icons-react";
import { BlocksRenderer, BlocksContent } from "@strapi/blocks-react-renderer";
import { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleAccordion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const containsSearchTerm = (blocks: BlocksContent, term: string): boolean => {
    return blocks.some(block => {
      if (block.type === 'paragraph') {
        return block.children.some(child => 
          typeof child === 'object' && 'text' in child && 
          child.text.toLowerCase().includes(term.toLowerCase())
        );
      }
      return false;
    });
  };
  
  const filteredCategories = faq_category?.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      containsSearchTerm(faq.answer, searchTerm)
    )
  })).filter(category => category.faqs.length > 0);
  

  return (
    <Container className="flex flex-col items-center justify-between pb-20">
      <div className="relative z-20 py-10 md:pt-40 text-center">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconHelpHexagonFilled className="h-6 w-6 text-white" />
        </FeatureIconContainer>
        <Heading as="h1" className="mt-4">
          {heading}
        </Heading>
        {sub_heading && (
          <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
            {sub_heading}
          </p>
        )}
        
        <div className="relative mt-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full px-4 py-2 pl-10 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-neutral-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconSearch className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
        </div>
      </div>
      
      <div className="w-full max-w-3xl mx-auto mt-16">
        {filteredCategories?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              {category.name}
            </h2>
            <div className="space-y-4">
              {Array.isArray(category.faqs) && category.faqs.map((faq: FAQ, questionIndex: number) => {
                const key = `${categoryIndex}-${questionIndex}`;
                return (
                  <div key={faq.question} className="border border-neutral-700 rounded-lg overflow-hidden">
                    <button
                      className="w-full px-6 py-4 flex justify-between items-center text-left bg-neutral-800 hover:bg-neutral-700 transition-colors"
                      onClick={() => toggleAccordion(categoryIndex, questionIndex)}
                    >
                      <h4 className="text-lg font-bold text-white">
                        {faq.question}
                      </h4>
                      <IconChevronDown 
                        className={`h-5 w-5 text-neutral-400 transition-transform ${
                          openItems[key] ? 'transform rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openItems[key] && (
                      <div className="px-6 py-4 bg-neutral-900">
                        <div className="text-neutral-400">
                          <BlocksRenderer content={Array.isArray(faq.answer) ? faq.answer : []} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
