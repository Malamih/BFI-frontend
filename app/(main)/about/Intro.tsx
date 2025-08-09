import Container from "@/components/Container";

export const Intro = ({
  section,
}: {
  section: { headline: string; subheadline: string };
}) => {
  return (
    <section className="mt-24 pb-12 border-b border-b-[#C9C9C9] mb-16">
      <Container className="text-center">
        <h3 className="font-bold mb-12 text-5xl max-sm:text-4xl">
          {section?.headline}
        </h3>
        <p className="text-3xl font-normal w-full max-w-[90%] m-auto max-sm:text-2xl">
          {section?.subheadline}
        </p>
      </Container>
    </section>
  );
};
