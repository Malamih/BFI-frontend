import Container from "@/components/Container";
import { Layer } from "@/components/ui/Layer";
import Image from "next/image";
import { Content } from "./Content";

export default function page() {
  return (
    <main className="relative min-h-[calc(100vh-var(--header-height))]">
      <Image
        src={"/contact/hero.webp"}
        className="object-cover z-[1]"
        fill
        alt="hero-image"
      />
      <Layer className="opacity-90 z-[2]" />
      <Content />
    </main>
  );
}
