import Container from "@/components/Container";
import Image from "next/image";

export const Hero = ({
  section,
}: {
  section: { headline: string; subheadline: string; image: string };
}) => {
  return (
    <section className="bg-[#050520] flex items-center relative text-white h-[calc(90vh-var(--header-height))]">
      <Container className="text-center">
        <h1 className="font-bold text-6xl mb-6 leading-[5.5rem] relative z-10">
          {section?.headline}
        </h1>
        <p className="font-normal text-2xl w-full max-w-3xl m-auto relative z-10">
          {section?.subheadline}
        </p>
        <Image
          src={section?.image || "/news-and-media/hero.webp"}
          width={1000}
          height={1000}
          alt="hero-image"
          className="w-2/4 absolute top-0 right-0 h-full object-cover pointer-events-none z-0"
        />
      </Container>
    </section>
  );
};
