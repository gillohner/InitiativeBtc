"use client";
import React from "react";
import { Heading } from "../../elements/heading";
import { Subheading } from "../../elements/subheading";
import { Container } from "../../container";
import { FeatureIconContainer } from "../features/feature-icon-container";
import { IconSettings } from "@tabler/icons-react";
import { Card } from "./card";

export const HowItWorks = ({
  heading,
  sub_heading,
  steps,
}: {
  heading: string;
  sub_heading: string;
  steps: any;
}) => {
  return (
    <div>
      <Container className="py-20 max-w-7xl mx-auto relative z-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconSettings className="h-3 w-3 text-white" />
        </FeatureIconContainer>
        <Heading className="pt-2">{heading}</Heading>
        <Subheading className="max-w-2xl mx-auto">{sub_heading}</Subheading>

        {steps &&
          steps.map(
            (
              item: {
                title: string;
                description: string;
                image: string;
                link: { url: string; target: string };
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
