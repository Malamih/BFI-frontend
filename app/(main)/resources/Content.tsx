"use client";

import Container from "@/components/Container";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Layer } from "@/components/ui/Layer";
import { useGetPages } from "@/services/page-content";
import { ResourcesPage } from "@/types/pages";
import Image from "next/image";
import Link from "next/link";

export const Content = () => {
  const contactButton = `
   <a href="/contact" style="
      position: relative;
      z-index: 3;
      border: 1px solid #d1d5db; /* gray-300 */
      border-radius: 0.8rem;
      padding: 0.3rem 1.5rem;
      font-size: 1rem; /* text-lg */
      cursor: pointer;
      background-color: white;
      transition: background-color 0.2s ease-in-out;
      color: #10C594;
      display: inline-block;
      text-align: center;
      text-decoration: none;
      font-weight: 600;
      margin-left: 1rem;
    "
    >
      Contact Us
    </a>
  `;
  const { data, isFetching } = useGetPages({ name: "resources" });
  const page = data?.payload[0] as ResourcesPage;
  return (
    <main className="relative py-20">
      <Loader hide={!isFetching} />
      <Container className="flex">
        <Image
          fill
          src={page?.sections?.image || "/contact/hero.webp"}
          className="object-cover z-[0]"
          alt="hero image"
        />
        <Layer className="opacity-90 z-[1]" />
        <div
          className="content z-[2] relative text-white"
          dangerouslySetInnerHTML={{
            __html: page?.sections?.content + contactButton,
          }}
        ></div>
      </Container>
    </main>
  );
};
