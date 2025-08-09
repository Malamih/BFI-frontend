"use client";
import Container from "@/components/Container";
import { useGetGallery } from "@/services/gallery";
import Image from "next/image";

export const Gallery = () => {
  const { data } = useGetGallery();
  return (
    <section className="mb-16">
      <Container>
        <div className="columns-5 max-2xl:columns-4 max-xl:columns-3 max-md:columns-2 max-sm:columns-1 gap-2 space-y-2">
          {data?.payload?.map((image, i) => (
            <div
              key={i}
              className="break-inside-avoid overflow-hidden rounded-md"
            >
              <Image
                src={image?.image?.secure_url || ""}
                alt={`img-${i}`}
                width={1000}
                height={1000}
                className="w-full h-auto rounded-md"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
