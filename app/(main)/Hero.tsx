import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/types/pages";
import Image from "next/image";
import Link from "next/link";

export const Hero = ({ section }: { section: HeroSection }) => {
  return (
    <section className="hero bg-accent">
      <Container className="flex items-center pt-24 max-sm:pt-26 h-fit justify-between pe-6 gap-4 xl:gap-24 xl:pe-26 max-sm:pb-12">
        <div className="title w-3xl max-sm:w-full max-sm:text-center">
          <h1 className="font-semibold text-6xl mb-4 max-sm:text-4xl">
            {section?.headline}
          </h1>
          <p className="font-light text-base mb-8">{section?.subheadline}</p>
          <div className="cta flex gap-3 max-sm:items-center max-sm:justify-center">
            <Link href={"/programs&labs"}>
              <Button className="rounded-full py-5 text-xs">
                Explore Our Programs
              </Button>
            </Link>
            <Link href={"/contact"}>
              <Button variant={"outline"} className="rounded-full py-5 text-xs">
                Join Our Network
              </Button>
            </Link>
          </div>
        </div>
        <div className="image w-sm  relative hidden xl:inline-block">
          <Image
            src={section?.image || "/home/hero.webp"}
            width={500}
            height={100}
            className="object-cover rounded-tl-[4rem] w-full h-auto"
            alt="bfi at cannes 2025"
          />
        </div>
      </Container>
    </section>
  );
};
