"use client";
import Container from "@/components/Container";
import { useGetPartners } from "@/services/partners";
import Image from "next/image";

export const Partners = () => {
  const { data } = useGetPartners({ query: {} });
  const hasPartners = data?.payload && data.payload.length > 0;

  return (
    <section>
      <Container>
        <ul className="grid grid-cols-6 gap-12 my-12 max-md:grid-cols-4 max-sm:grid-cols-2 justify-between items-center">
          {hasPartners
            ? data.payload.map((p, i: number) => (
                <li
                  key={i}
                  className="flex items-center justify-center"
                  style={{
                    filter: "grayscale(100%) brightness(70%)", // يجعل الصورة رمادي غامق
                    opacity: 0.8, // يقلل الشفافية
                  }}
                >
                  <Image
                    src={p.logo?.secure_url || "/logo.png"}
                    width={90}
                    height={90}
                    alt="Partner"
                  />
                </li>
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <li
                  key={`fallback-${i}`}
                  className="flex items-center justify-center"
                  style={{
                    filter: "grayscale(100%) brightness(50%)",
                    opacity: 0.8,
                  }}
                >
                  <Image
                    src={"/logo.png"}
                    width={100}
                    height={100}
                    alt="logo"
                  />
                </li>
              ))}
        </ul>
      </Container>
    </section>
  );
};
