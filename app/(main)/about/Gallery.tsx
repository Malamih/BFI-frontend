"use client";
import Container from "@/components/Container";
import { useGetGallery } from "@/services/gallery";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

export const Gallery = () => {
  const { data } = useGetGallery();

  // Check if there are images in the gallery
  const hasImages = data?.payload && data.payload.length > 0;

  // Placeholder data with different heights for masonry effect
  const placeholderImages = [
    { width: 400, height: 300 },
    { width: 400, height: 500 },
    { width: 400, height: 350 },
    { width: 400, height: 400 },
    { width: 400, height: 250 },
    { width: 400, height: 450 },
    { width: 400, height: 320 },
    { width: 400, height: 380 },
    { width: 400, height: 280 },
    { width: 400, height: 420 },
    { width: 400, height: 360 },
    { width: 400, height: 480 },
    { width: 400, height: 340 },
  ];

  return (
    <section className="mb-16">
      <Container>
        <div className="columns-5 max-2xl:columns-4 max-xl:columns-3 max-md:columns-2 max-sm:columns-1 gap-2 space-y-2">
          {hasImages
            ? // Show actual gallery images
              data.payload.map((image, i) => (
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
              ))
            : // Show placeholder images
              placeholderImages.map((placeholder, i) => (
                <div
                  key={`placeholder-${i}`}
                  className="break-inside-avoid overflow-hidden rounded-md"
                >
                  <div
                    className="w-full bg-white rounded-md flex items-center justify-center border-2 border-dashed border-white"
                    style={{
                      aspectRatio: `${placeholder.width}/${placeholder.height}`,
                      minHeight: `${
                        (placeholder.height / placeholder.width) * 100
                      }%`,
                    }}
                  >
                    <ImageIcon
                      className="w-12 h-12 text-gray-400"
                      strokeWidth={1}
                    />
                  </div>
                </div>
              ))}
        </div>
      </Container>
    </section>
  );
};
