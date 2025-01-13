"use client";
import React from "react";
import { Heading } from "../../elements/heading";
import { Subheading } from "../../elements/subheading";
import { Button } from "../../elements/button";
import { Container } from "../../container";
import { FeatureIconContainer } from "../features/feature-icon-container";
import { IconSettings } from "@tabler/icons-react";
import { Card } from "./card";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { BlocksContent } from "@strapi/blocks-react-renderer";

export const HowItWorks = ({
  heading,
  sub_heading,
  steps,
  cta,
}: {
  heading: string;
  sub_heading: string;
  steps: any;
  cta: any;
}) => {
  return (
    <div>
      <Container className="py-20 max-w-7xl mx-auto relative z-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconSettings className="h-3 w-3 text-white" />
        </FeatureIconContainer>
        <Heading className="pt-2">{heading}</Heading>
        <Subheading className="max-w-2xl mx-auto">{sub_heading}</Subheading>
        {cta?.URL && (
          <div className="flex space-x-2 items-center mt-8" style={{ justifyContent: "center"}}>
            <Button
              as={Link}
              href={`${cta.URL}`}
              {...(cta.variant && { variant: cta.variant })}
            >
              {cta.text}
              <FaDownload size="20" style={{marginLeft: "11px"}} />
            </Button>
          </div>
        )}

        {steps &&
          steps.map(
            (
              item: {
                title: string;
                description: BlocksContent;
                image: string;
                link: { URL: string; target: string, text: string };
              },
              index: number
            ) => (
              <Card
                title={item.title}
                description={item.description}
                image={item.image}
                link={item.link}
                index={index + 1}
                key={"card" + index}
              />
            )
          )}
      </Container>
    </div>
  );
};
