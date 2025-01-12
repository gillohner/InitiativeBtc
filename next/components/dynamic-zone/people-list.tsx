import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import fetchContentType from "@/lib/strapi/fetchContentType";
import Image from "next/image";

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

  return (
    <Container className="flex flex-col items-center justify-between pb-20">
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
          const description =
            person.description && typeof person.description === "string"
              ? person.description
              : "No description available.";
          const socialMedia = person.socialMedia || [];
          const image = person.image || [];
          const imageUrl = person?.image[0]?.url;
          const imgUrl = imageUrl ? "http://localhost:1337" + imageUrl : 'https://example.com/example.jpeg';

          console.log(socialMedia)
          console.log(image)

          return (
            <BentoGridItem
              key={person.id}
              title={`${firstname} ${lastname}`}
              description={description}
            >
              <Image
                  src={imageUrl}
                  alt={`${firstname} ${lastname}`}
                  width={300}
                  height={300}
                  className="rounded-full"
              />
              <div className="flex space-x-2 mt-2">
                {socialMedia.map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </BentoGridItem>
          );
        })}
      </BentoGrid>
    </Container>
  );
};

export default PeopleList;
