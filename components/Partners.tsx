"use client";
import Container from "@/components/Container";
import { useGetPartners } from "@/services/partners";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Partner {
  logo: string;
}

export const Partners = () => {
  const { data } = useGetPartners({ query: {} });
  return (
    <section>
      <Container>
        <ul className="grid-cols-6 gap-12 grid my-12 max-md:grid-cols-4 max-sm:grid-cols-2">
          {data?.payload?.map((p, i: number) => {
            return (
              <li key={i}>
                <Image
                  src={p.logo?.secure_url}
                  width={130}
                  height={100}
                  alt="Partner"
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};
