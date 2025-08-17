import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Layer } from "@/components/ui/Layer";
import Image from "next/image";
import Link from "next/link";

export const Hero = ({
  data,
}: {
  data: {
    headline?: string;
    subheadline?: string;
    image?: string;
    applying_link?: string;
    contact_link?: string;
  };
}) => {
  return (
    <section className="max-md:px-2 m-4">
      <Container className="mt-12 pb-20 relative h-[calc(60vh-var(--header-height))] min-h-[600px] max-h-[700px] rounded-[4rem] overflow-hidden">
        <Layer
          className="z-[1] opacity-100"
          style={{
            background: "linear-gradient(15deg, black 10%, transparent)",
          }}
        />
        <Image
          src={data?.image || "/programs-and-labs/hero.webp"}
          width={1000}
          height={1000}
          className="w-full h-full absolute top-0 left-0 object-cover z-0"
          alt="Hero image"
        />
        <div className="text-white w-full h-full flex flex-col justify-end relative z-[2]">
          <div className="max-sm:text-center">
            <h1 className="font-bold text-6xl mb-6 max-sm:text-5xl">
              {data?.headline}
            </h1>
            <div
              className="font-light text-base mb-6 w-full max-w-xl max-sm:text-sm"
              dangerouslySetInnerHTML={{ __html: data?.subheadline as string }}
            ></div>
          </div>
          <div className="max-sm:justify-center flex items-center gap-2">
            <Link
              href={data?.applying_link || "/contact"}
              className="min-w-[150px] max-sm:min-w-fit"
            >
              <Button size={"lg"} className="w-full">
                Apply Now
              </Button>
            </Link>
            <Link
              href={data?.contact_link || "/contact"}
              className="min-w-[150px] max-sm:min-w-fit"
            >
              <Button
                variant={"outline"}
                size={"lg"}
                className="bg-transparent w-full"
              >
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
