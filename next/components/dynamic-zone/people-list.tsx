"use client";

import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import SocialMediaButtons from '../elements/socialMediaButtons';
import { Link } from "next-view-transitions";
import "./people-list.css";

interface PeopleListProps {
  heading: string;
  sub_heading: string;
  category: string;
}

export const PeopleList = async ({ heading, sub_heading, category }: PeopleListProps) => {
  // Fetch people data filtered by category
  const people = await fetchContentType(
    "people",
    `filters[position][$eq]=${category}`,
    false
  );

  console.log("Fetched People Data:", people);

  // Ensure people.data exists and is an array
  const peopleData = people?.data || [];

  const Skeleton = ({ imageUrl }: { imageUrl?: string }) => (
    <div
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
      style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '320px' } : {}}
    >
      {!imageUrl && (
        <div className="flex-1" style={{ height: "320px" }}></div>
      )}
    </div>
  );

  const customBlockRenderers: Record<string, (props: { children: React.ReactNode; url: string }) => JSX.Element> = {
    link: ({ children, url }) => (
      <Link href={url} target="_blank" className="text-orange underline">
        {children}
      </Link>
    ),
  };  

  return (
    <Container className="flex flex-col items-center justify-between mb-12">
      <div className="relative z-20 py-10 md:pt-40">
        <Heading as="h1" className="mt-4">
          {heading}
        </Heading>
        <p className="mt-2 text-neutral-400">{sub_heading}</p>
      </div>
      <BentoGrid className="grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
        {peopleData.map((person: any) => {
          const firstname = person.firstname || "Unknown";
          const lastname = person.lastname || "Unknown";
          const description = <BlocksRenderer content={person.description} />;
          const image = person.image || [];
          const imageUrl = image[0]?.url ? process.env.NEXT_PUBLIC_API_URL + person?.image[0]?.url : "";
          const socialMedia = person.socialMedia || [];

          console.log("Social Media:", socialMedia);

          return (
            <BentoGridItem
              title={`${firstname} ${lastname}`}
              description={
                <>
                  <div className="text-container">
                    <BlocksRenderer content={person.description} blocks={customBlockRenderers} />
                  </div>
                  <SocialMediaButtons socialMedia={person.socialMedia || []}/>
                </>
              }
              header={<Skeleton imageUrl={imageUrl} />}
              key={person.id || `person-${index}`}
            >
            </BentoGridItem>
          );
        })}
      </BentoGrid>
    </Container>
  );  
};

export default PeopleList;
