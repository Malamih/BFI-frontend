import Container from "@/components/Container";
import { Partners } from "@/components/Partners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/types/pages";
import Image from "next/image";
import Link from "next/link";

export const Hero = ({ section }: { section: HeroSection }) => {
  const highlightBeforeLastWord = (text: string) => {
    const words = text.trim().split(" ");
    if (words.length < 2) return text; // لو كلمة واحدة أو أقل، ترجع النص كما هو

    // الكلمة قبل الأخيرة:
    const beforeLastIndex = words.length - 2;
    words[
      beforeLastIndex
    ] = `<span class="text-primary">${words[beforeLastIndex]}</span>`;

    return words.join(" ");
  };
  return (
    <section className="min-h-[calc(100vh-var(--header-height))] pt-6 flex justify-center flex-col">
      <Container className="flex-[1] flex items-center justify-between gap-40">
        <div className="w-full max-w-2xl max-md:text-center">
          <h1
            className="text-4xl font-bold mb-8"
            dangerouslySetInnerHTML={{
              __html: section && highlightBeforeLastWord(section?.headline),
            }}
          ></h1>
          <p className="font-normal text-base text-black/50 mb-12">
            {section?.subheadline}
          </p>
          <Link href={"/contact"}>
            <Button variant={"outline"}>Start Your Journey</Button>
          </Link>
        </div>
        <div className="h-[60vh] max-lg:hidden min-w-[500px] max-h-[700px] max-w-[700px] min-h-[400px] relative flex-[1]">
          <div
            className="flex items-center gap-6 z-10 absolute -bottom-2 left-0 bg-background py-2 pr-10"
            style={{ clipPath: "polygon(0 0, 79% 0, 100% 100%, 0% 100%)" }}
          >
            <div className="*:data-[slot=avatar]:ring-transparent flex -space-x-8">
              {Array.from({ length: 3 }).map((_, i: number) => {
                return (
                  <Avatar key={i}>
                    <AvatarImage src={`/about/film-makers/${i + 1}.webp`} />
                    <AvatarFallback>FM</AvatarFallback>
                  </Avatar>
                );
              })}
            </div>
            <div className="text-center leading-4 font-bold text-sm">
              <p>8k+</p>
              <p>Filmmakers</p>
              <p>Supported</p>
            </div>
          </div>
          <Image
            src={section?.image || "/about/hero.webp"}
            alt="image"
            fill
            className="object-cover rounded-3xl"
          />
        </div>
      </Container>
      <Partners />
    </section>
  );
};
