"use client";
import Container from "@/components/Container";
import { Form } from "./Form";
import Image from "next/image";
import { Layer } from "@/components/ui/Layer";
import { MailIcon, MapPinIcon, PinIcon } from "lucide-react";
import { useGetPages } from "@/services/page-content";
import { ContactPage } from "@/types/pages";
import { Loader } from "@/components/Loader";

export const Content = () => {
  const { data, isFetching } = useGetPages({ name: "contact" });
  const sections = data?.payload[0]?.sections as ContactPage["sections"];
  return (
    <section className="min-h-[calc(100vh-var(--header-height))] max-lg:items-center items-center relative overflow-hidden flex flex-col justify-center">
      <Loader hide={!isFetching} />
      <div className="absolute top-0 end-0 w-[55%] h-full rounded-bl-[10rem] overflow-hidden">
        <Layer className="opacity-[91%] z-[1]" />
        <Image
          src={"/contact/hero.webp"}
          fill
          className="object-cover z-0"
          alt="hero image"
        />
      </div>

      <Container className="flex justify-between gap-6 h-full relative z-[2] text-white max-lg:flex-col-reverse">
        <Form
          data={{
            headline: sections?.form?.headline,
            subheadline: sections?.form?.subheadline,
          }}
        />
        <div className="self-center max-w-xl max-2xl:max-w-lg">
          <div className="mb-20 max-lg:text-center max-lg:text-black">
            <h2 className="font-bold text-3xl mb-2">{sections?.form?.title}</h2>
            <p className="text-sm">{sections?.form?.description}</p>
          </div>
          <Image
            src={"/contact/placeholder.png"}
            width={10000}
            height={10000}
            alt="placeholder"
            className="max-lg:hidden"
          />
        </div>
      </Container>
      <Container className="mt-12 mb-8">
        <div className="social">
          <div className="flex items-center gap-2 text-[#8D8BA7]">
            <MailIcon width={18} />
            {sections?.form?.email}
          </div>
          <div className="flex items-center gap-2 text-[#8D8BA7]">
            <MapPinIcon width={18} />
            {sections?.form?.location}
          </div>
        </div>
      </Container>
    </section>
  );
};
