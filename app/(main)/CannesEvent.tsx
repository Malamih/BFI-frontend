import Container from "@/components/Container";
import { Layer } from "@/components/ui/Layer";
import Image from "next/image";

export const CannesEvent = ({
  section,
}: {
  section: { headline: string; subheadline: string };
}) => {
  return (
    <section>
      <Container className="!p-0">
        <div className="px-2 flex items-center justify-center overflow-hidden relative w-full h-[calc(100vh-var(--header-height))]">
          <div className="content relative z-[2] text-center text-white">
            <h3 className="font-bold text-6xl max-sm:text-5xl leading-16 mb-2">
              {section?.headline}
            </h3>
            <p className="text-lg max-sm:text-base font-normal leading-8">
              {section?.subheadline}
            </p>
          </div>
          <Layer className="opacity-[79%] z-[1]" />
          <Image
            src={"/home/cannesEvent.webp"}
            className="object-cover z-0 relative"
            alt="Cannes Event"
            fill
          />
        </div>
      </Container>
    </section>
  );
};
