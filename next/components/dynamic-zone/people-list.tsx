import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import fetchContentType from "@/lib/strapi/fetchContentType";
import Image from "next/image";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

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

  const Skeleton = ({ imageUrl }) => (
    <div
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
      style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '320px' } : {}}
    >
      {!imageUrl && (
        <div className="flex-1" style={{height: "320px"}}></div>
      )}
    </div>
  );
  
  
  return (
    <Container className="flex flex-col items-center justify-between">
      <div className="relative z-20 py-10 md:pt-40">
        <Heading as="h1" className="mt-4">
          {heading}
        </Heading>
        <p className="mt-2 text-neutral-400">{sub_heading}</p>
      </div>
      <BentoGrid>
        {peopleData.map((person: any) => {
          const firstname = person.firstname || "Unknown";
          const lastname = person.lastname || "Unknown";
          const description = <BlocksRenderer content={person.description} />;
          const socialMedia = person.socialMedia || [];
          const image = person.image || [];
          const imageUrl = image[0]?.url ? "http://localhost:1337" + person?.image[0]?.url : "";
          console.log(imageUrl);
        

          return (
            <BentoGridItem
              key={person.id}
              title={`${firstname} ${lastname}`}
              description={
                description
              }
              header={
                <Skeleton imageUrl={imageUrl} />
              }
            >
            </BentoGridItem>
          );
        })}
      </BentoGrid>
    </Container>
  );
};

export default PeopleList;
