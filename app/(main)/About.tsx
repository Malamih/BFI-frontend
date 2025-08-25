import Container from "@/components/Container";
import LogoGridHorizontal from "@/assets/logo-grid-horizontal.svg";
import { Placeholder } from "@/components/Placeholder";
import Image from "next/image";
import { VimeoModalPlayer } from "@/components/VimeoPlayer";
import { Layer } from "@/components/ui/Layer";
import { extractId } from "@/services/vimeo";

export const About = ({
  section,
}: {
  section: {
    headline: string;
    subheadline: string;
    description: string;
    video: string;
  };
}) => {
  return (
    <section>
      <Container
        className="pt-12 pb-6 px-12 relative flex justify-between gap-12 max-lg:flex-col"
        style={{
          background:
            "linear-gradient(135deg, var(--primary) 0%, #141727 100%)",
        }}
      >
        <Placeholder className="opacity-[0.8%]" />
        <div className="text-white w-full max-w-2xl z-10 relative">
          <h4 className="text-6xl max-sm:text-4xl font-bold mb-2">
            {section?.headline}
          </h4>
          <h5 className="text-4xl max-sm:text-2xl font-normal mb-4">
            {section?.subheadline}
          </h5>
          <p
            className="font-normal text-lg max-sm:text-base text-justify mb-8"
            dangerouslySetInnerHTML={{ __html: section?.description }}
          ></p>
        </div>
        <div className="video relative min-w-[387px] bg-black z-10 h-[470px] max-lg:min-w-full translate-y-12 max-lg:w-full">
          {section?.video && (
            <Image src={section?.video} fill alt="about image" className="relative z-10" />
          )}
          <Layer className="z-10 opacity-30 bg-black" />
          <LogoGridHorizontal className="absolute top-12 -right-12 w-[150px] z-0" />
        </div>
      </Container>
    </section>
  );
};
