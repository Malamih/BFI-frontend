"use client";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { SectionEditor } from "@/components/ui/dashboard/SectionEditor";
import { extractPublicId } from "@/helpers";
import {
  useDeleteFromCloudinary,
  useUploadToCloudinary,
} from "@/services/cloudinary";
import { useGetPages, useUpdatePageSection } from "@/services/page-content";
import { ProgramsAndLabsPage } from "@/types/pages";
import React, { useState } from "react";

export const Content = () => {
  const { data, isFetching } = useGetPages({ name: "programsAndLabs" });
  const page = data?.payload[0] as ProgramsAndLabsPage;

  const { mutateAsync, isPending } = useUpdatePageSection({
    pageName: "programsAndLabs",
  });

  const { mutateAsync: uploadToCloudinary, isPending: uploadingImage } =
    useUploadToCloudinary();
  const { mutateAsync: deleteFromCloudinary, isPending: deletingImage } =
    useDeleteFromCloudinary(() => {});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const image = form.get("image") as File;
    if (image.size > 0) {
      const public_id = extractPublicId(page?.sections?.image as string);
      public_id && (await deleteFromCloudinary({ public_id }));
      uploadToCloudinary(form).then(async (res) => {
        console.log(res.secure_url);
        const sections = { image: res.secure_url };
        await mutateAsync({ pageName: "programsAndLabs", sections }).catch(
          () => {}
        );
      });
    }
  };

  return (
    <section>
      <Accordion type="multiple" disabled={isFetching}>
        <SectionEditor
          name="Programs and Labs"
          sectionId="programs-and-labs-editor"
        >
          <form onSubmit={handleSubmit}>
            <ImageInput
              id="programs-and-labs-image-input"
              name="image"
              className="h-[400px]"
              defaultImage={page?.sections?.image}
            />
            <div className="btn mt-2">
              <Button
                disabled={isPending || deletingImage || uploadingImage}
                className="max-w-[200px] w-full"
              >
                {isPending || deletingImage || uploadingImage
                  ? "Saving..."
                  : "Save"}
              </Button>
            </div>
          </form>
        </SectionEditor>
      </Accordion>
    </section>
  );
};
