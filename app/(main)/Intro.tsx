import Container from "@/components/Container";
import { Placeholder } from "@/components/Placeholder";
import LogoGrid from "@/assets/logo-grid.svg";

export const Intro = ({
  section,
}: {
  section: { headline: string; subheadline: string };
}) => {
  return (
    <section className="relative pt-14 pb-0 overflow-hidden mb-14 bg-white/70">
      <Placeholder />
      <Container className="relative z-10 text-center">
        <h2 className="font-bold text-5xl max-sm:text-4xl leading-[100%] mb-2">
          {section?.headline}
        </h2>
        <p className="font-extralight text-base w-full max-w-lg m-auto">
          {section?.subheadline}
        </p>
        <LogoGrid className="h-[90px] m-auto scale-150" />
      </Container>
    </section>
  );
};
