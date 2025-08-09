"use client";

import { useGetGallery } from "@/services/gallery";
import { CreateButton } from "./components/CreateButton";
import { GalleryImage, GalleryImageType } from "./components/Image";

export const Content = () => {
  const { data, isFetching } = useGetGallery();

  return (
    <section>
      <div className="header flex justify-between items-center">
        <div className="title">
          <h1 className="text-3xl font-bold">Your Gallery</h1>
          <p>This gallery of images will be visible at the about page only.</p>
        </div>
        <div className="options">
          <CreateButton />
        </div>
      </div>

      <ul className="mt-8 columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
        {data?.payload?.map((image: GalleryImageType) => {
          return <GalleryImage image={image} key={image._id} />;
        })}
      </ul>
    </section>
  );
};
