import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
import { SectionEditor } from "@/components/ui/dashboard/SectionEditor";
import { Textarea } from "@/components/ui/dashboard/textarea";
import { checkUpdates, extractPublicId } from "@/helpers";
import {
  useDeleteFromCloudinary,
  useUploadToCloudinary,
} from "@/services/cloudinary";
import { useGetPages, useUpdatePageSection } from "@/services/page-content";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

export const HeroSection = ({
  section,
  sectionName,
  page,
}: {
  section?: { headline: string; subheadline: string; image: string };
  sectionName: string;
  page: string;
}) => {
  const [canSave, setCanSave] = useState(false);

  const { mutateAsync, isPending } = useUpdatePageSection({ pageName: page });
  const { mutateAsync: uploadToCloudinary, isPending: uploadingImage } =
    useUploadToCloudinary();
  const { mutateAsync: deleteFromCloudinary, isPending: deletingImage } =
    useDeleteFromCloudinary(() => {});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline");
    const subheadline = form.get("subheadline");
    const image = form.get("image") as File;
    if (image?.size > 0) {
      const formData = new FormData();
      formData.append("image", image);

      const public_id = extractPublicId(section?.image as string);
      public_id && (await deleteFromCloudinary({ public_id }));
      uploadToCloudinary(formData)
        .then(async (res) => {
          const sections = {
            [sectionName]: {
              ...(headline != section?.headline ? { headline } : {}),
              ...(subheadline != section?.subheadline ? { subheadline } : {}),
              ...(res.secure_url ? { image: res.secure_url } : {}),
            },
          };
          await mutateAsync({ pageName: page, sections }).catch(() => {});
          setCanSave(false);
        })
        .catch((err) => {});
    } else {
      const sections = {
        [sectionName]: {
          ...(headline != section?.headline ? { headline } : {}),
          ...(subheadline != section?.subheadline ? { subheadline } : {}),
        },
      };
      await mutateAsync({ pageName: page, sections }).catch(() => {});
      setCanSave(false);
    }
  };

  return (
    <SectionEditor
      name={`${sectionName} Section`}
      sectionId={`${page}-${sectionName}`}
    >
      <form
        className="flex gap-12 max-lg:flex-col max-lg:gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col flex-[1]">
          <div className="mb-4 grid gap-2">
            <Label>Headline</Label>
            <Input
              type="text"
              placeholder={`${sectionName} section headline`}
              defaultValue={section?.headline}
              name="headline"
              onChange={(e) =>
                checkUpdates(e.target.value, section?.headline, setCanSave)
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Sub Headline</Label>
            <Textarea
              placeholder={`${sectionName} section subheadline`}
              className="max-h-[200px] min-h-[100px]"
              name="subheadline"
              onChange={(e) =>
                checkUpdates(e.target.value, section?.subheadline, setCanSave)
              }
              defaultValue={section?.subheadline}
            />
            <Button
              className="w-[150px] max-lg:hidden"
              disabled={
                !canSave || isPending || uploadingImage || deletingImage
              }
            >
              {isPending || uploadingImage || deletingImage
                ? "Saving..."
                : "Save"}
            </Button>
          </div>
        </div>
        <ImageInput
          id={`${page}-${sectionName}-section-image`}
          name="image"
          className={clsx("w-[300px] h-[300px] max-lg:w-full max-w-[400px]", {
            "opacity-50 cursor-progress pointer-none": uploadingImage,
          })}
          onChange={() => setCanSave(true)}
          defaultImage={section?.image}
        />
        <Button
          className="lg:hidden w-full"
          disabled={!canSave || isPending || uploadingImage || deletingImage}
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </SectionEditor>
  );
};
