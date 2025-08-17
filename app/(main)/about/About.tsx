import Container from "@/components/Container";
import { OverviewItem } from "@/types/pages";
import Image from "next/image";

export const About = ({
  section,
}: {
  section: {
    vision: OverviewItem;
    mission: OverviewItem;
    why_bfi: OverviewItem;
    image: string;
  };
}) => {
  return (
    <section className="mb-24">
      <Container className="flex gap-16">
        <div className="w-fit max-sm:hidden">
          <Image
            src={section?.image || "/about/fast-impact.webp"}
            width={467}
            height={470}
            alt="fast impact"
            className="rounded-3xl w-full max-w-[500px] h-auto max-lg:w-[300px] max-md:w-[200px]"
          />
        </div>
        <ul className="flex flex-col gap-5 w-full max-w-[40%] max-lg:max-w-full">
          <li>
            <h4 className="font-bold text-3xl mb-3">
              {section?.mission?.title}
            </h4>
            <p className="font-light text-base">
              {section?.mission?.description}
            </p>
          </li>
          <li>
            <h4 className="font-bold text-3xl mb-3">
              {section?.vision?.title}
            </h4>
            <p className="font-light text-base">
              {section?.vision?.description}
            </p>
          </li>
          <li>
            <h4 className="font-bold text-3xl mb-3">
              {section?.why_bfi?.title}
            </h4>
            <p className="font-light text-base">
              {section?.why_bfi?.description}
            </p>
          </li>
        </ul>
      </Container>
    </section>
  );
};
