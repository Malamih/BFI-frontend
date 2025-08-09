import Container from "@/components/Container";
import { useEffect, useState } from "react";
import PeopleIcon from "@/assets/icons/people.svg";
import MountainIcon from "@/assets/icons/mountain.svg";
import IdeaIcon from "@/assets/icons/idea.svg";
import { Partners } from "../../components/Partners";
import { OverviewItem } from "@/types/pages";
import { IconByName } from "./CorePillars";

interface Fundation {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const Fundations = ({
  section,
}: {
  section: {
    partners: OverviewItem;
    mission: OverviewItem;
    vision: OverviewItem;
  };
}) => {
  const [fundations, setFundations] = useState<Fundation[]>([]);

  useEffect(() => {
    const fundations: Fundation[] = [
      {
        title: section ? section?.partners?.title : "Our partners include",
        description: section
          ? section?.partners?.description
          : `IMS, Aflamuna, IEFTA, the British Council, the French Institute, 1001, Katara Studios, OG, Iraqi Cinema, Fasila Agency, and Cannes Docs. These alliances enable us to offer world-class programs, co-production opportunities, and industry visibility — both at home and on the global stage.`,
        icon: section ? (
          <IconByName
            name={section?.partners?.icon as string}
            className="text-primary size-16"
          />
        ) : (
          <PeopleIcon />
        ),
      },
      {
        title: section ? section?.mission?.title : "Our Mission",
        description: section
          ? section?.mission?.description
          : "To build Iraq’s cinematic future through world-class training, meaningful industry access, and global collaboration — enabling filmmakers to create stories that resonate locally and compete internationally.",
        icon: section ? (
          <IconByName
            name={section?.mission?.icon as string}
            className="text-primary size-16"
          />
        ) : (
          <MountainIcon />
        ),
      },
      {
        title: section ? section?.vision?.title : "Our Vision",
        description: section
          ? section?.vision?.description
          : "To become Iraq’s leading institute for film training, production support, and international exchange — shaping a diverse, professional, and globally connected creative industry.",
        icon: section ? (
          <IconByName
            name={section?.vision?.icon as string}
            className="text-primary size-16"
          />
        ) : (
          <IdeaIcon />
        ),
      },
    ];

    setFundations(fundations);
  }, [section]);
  return (
    <section className="bg-accent py-12 pb-6">
      <Container>
        <div className="grid grid-cols-3 gap-20 max-xl:grid-cols-2 max-lg:grid-cols-1">
          {fundations.map((fund, i: number) => {
            return (
              <div className="flex flex-col w-full" key={i}>
                <div className="mb-6">{fund.icon}</div>
                <h6 className="font-semibold text-4xl mb-16 whitespace-nowrap max-md:whitespace-break-spaces">
                  {fund.title}
                </h6>
                <p className="font-light text-base">{fund.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
      <Partners />
    </section>
  );
};
