"use client";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import RichEditor from "@/components/ui/dashboard/RichEditor";
import { SectionEditor } from "@/components/ui/dashboard/SectionEditor";
import { checkUpdates } from "@/helpers";
import { useReplaceImage } from "@/services/cloudinary";
import { useGetPages, useUpdatePageSection } from "@/services/page-content";
import { ContactPage, IraqiIndustryGuidePage, ResourcesPage } from "@/types/pages";
import React, { useEffect, useState } from "react";

export const Content = () => {
  const [canSave, setCanSave] = useState(false);
  const { data, isFetching } = useGetPages({ name: "resources" });
  const [content, setContent] = useState("");

  const { mutateAsync, isPending } = useUpdatePageSection({
    pageName: "resources",
  });
  const { replaceImage, isReplacing } = useReplaceImage();

  const page = data?.payload[0] as ResourcesPage;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let sections: { content?: string; image?: string } = {
      content,
    };
    const form = new FormData(e.target as HTMLFormElement);
    const image = form.get("image") as File;
    if (image.size > 0) {
      await replaceImage(sections?.image as string, form)
        .then((result) => {
          sections.image = result.secure_url;
        })
        .catch((err) => {});
    }
    await mutateAsync({
      pageName: "resources",
      sections,
    }).catch(() => {});
    setCanSave(false);
  };

  useEffect(() => {
    if (page) {
      setContent(page?.sections?.content);
    }
  }, [page]);
  return (
    <section>
      <Accordion type="multiple" disabled={isFetching}>
        <SectionEditor name="resources" sectionId="resources-page">
          <form onSubmit={handleSubmit}>
            <ImageInput
              id="image-input-in-resources"
              name="image"
              defaultImage={page?.sections?.image}
              className="w-full h-[400px] mb-4"
              onChange={() => setCanSave(true)}
            />
            <RichEditor
              placeholder="Type Your Content"
              onChange={(val) => {
                checkUpdates(val, page?.sections?.content, setCanSave);
                setContent(val);
              }}
              value={content}
            />
            <div className="btn mt-2">
              <Button
                className="min-w-[120px]"
                disabled={!canSave || isPending || isReplacing}
              >
                {isPending && !isReplacing && "Saving..."}
                {!isPending && isReplacing && "Replacing..."}
                {!isPending && !isReplacing && "Save"}
              </Button>
            </div>
          </form>
        </SectionEditor>
      </Accordion>
    </section>
  );
};
