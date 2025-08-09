"use client";
import TargetIcon from "@/assets/icons/target.svg";
import GrowIcon from "@/assets/icons/grow-icon.svg";
import PieChartIcon from "@/assets/icons/pie-chart.svg";
import MultiChannelIcon from "@/assets/icons/multichannel.svg";
import EcoSystemIcon from "@/assets/icons/ecosystem.svg";
import * as LucideIcons from "lucide-react";
import Container from "@/components/Container";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface Pillar {
  icon: React.ReactNode | string;
  title: string;
  description: string;
}

export function IconByName({
  name,
  ...props
}: {
  name: string;
  [key: string]: any;
}) {
  const IconComponent = (LucideIcons as any)[name];
  if (!IconComponent) return null; // or fallback icon/component

  return <IconComponent {...props} />;
}

export const CorePillars = ({
  section,
}: {
  section: { headline: string; subheadline: string; pillars: Pillar[] };
}) => {
  const [corePillars, setCorePillars] = useState<Pillar[]>([]);

  useEffect(() => {
    const pillars: Pillar[] = [
      {
        title: "Creative Education & Talent Growth",
        description:
          "Structured training, mentorship labs, and university integration — preparing Iraq’s next generation of filmmakers through international standards and localized knowledge.",
        icon: <GrowIcon />,
      },
      {
        title: "Resources, Tools & Legal Infrastructure",
        description:
          "From contract templates and rights protection to fair working conditions — BFI equips creatives with the tools needed to work safely and professionally.",
        icon: <PieChartIcon />,
      },
      {
        title: "International Exchange & Co-Production",
        description:
          "We connect Iraqi filmmakers with global labs, festivals, mentors, and producers — supporting co-productions and cultural mobility.",
        icon: <MultiChannelIcon />,
      },
      {
        title: "Strategic Knowledge & Policy Engagement",
        description:
          "Through research, advocacy, and ecosystem mapping, BFI helps shape better cultural policy, ethical practices, and long-term industry frameworks.",
        icon: <EcoSystemIcon />,
      },
    ];
    if (!section) {
      setCorePillars(pillars);
    } else {
      setCorePillars(section?.pillars);
    }
  }, [section]);
  return (
    <section className="my-16 mt-28">
      <Container className="flex justify-between gap-12 max-xl:flex-col max-xl:justify-center max-xl:items-center">
        <div className="max-xl:text-center self-center w-full max-w-xl">
          <div className="p-6 bg-primary max-xl:m-auto max-xl:mb-9 rounded-2xl w-fit h-fit mb-9">
            <TargetIcon />
          </div>
          <h6 className="font-semibold text-4xl mb-3">{section?.headline}</h6>
          <p className="font-normal text-sm">{section?.subheadline}</p>
        </div>
        <ul
          className="grid grid-cols-2 grid-rows-2 max-md:grid-cols-1"
          style={{ gridTemplateColumns: "2" }}
        >
          {corePillars.map((pillar, i: number) => {
            return (
              <li
                key={i}
                className={clsx(
                  "py-12 px-5 text-center flex flex-col items-center",
                  {
                    "min-md:border-t-2 min-md:border-t-primary min-md:border-l-2 border-l-primary -translate-x-0.5 -translate-y-0.5":
                      i == corePillars.length - 1,
                    "min-md:border-b-2 min-md:border-b-primary min-md:border-r-2 border-r-primary":
                      i == 0,
                  }
                )}
              >
                <div className="icon mb-6">
                  {typeof pillar.icon == "string" ? (
                    <IconByName
                      name={pillar?.icon}
                      className="size-12 text-primary"
                    />
                  ) : (
                    pillar.icon
                  )}
                </div>
                <h6 className="font-semibold mb-2">{pillar.title}</h6>
                <p className="font-normal text-xs">{pillar.description}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};
