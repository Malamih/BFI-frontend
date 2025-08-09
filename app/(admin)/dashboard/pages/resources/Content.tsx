"use client";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import RichEditor from "@/components/ui/dashboard/RichEditor";
import { SectionEditor } from "@/components/ui/dashboard/SectionEditor";
import { checkUpdates } from "@/helpers";
import { useGetPages, useUpdatePageSection } from "@/services/page-content";
import { ContactPage, IraqiIndustryGuidePage } from "@/types/pages";
import React, { useEffect, useState } from "react";

export const Content = () => {
  const [canSave, setCanSave] = useState(false);
  const { data, isFetching } = useGetPages({ name: "resources" });
  const [content, setContent] = useState("");

  const { mutateAsync, isPending } = useUpdatePageSection({
    pageName: "resources",
  });
  const page = data?.payload[0] as IraqiIndustryGuidePage;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sections = {
      content,
    };
    console.log(sections.content.slice(0, 500));
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
                disabled={isPending || !canSave}
                className="max-w-[200px] w-full"
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </SectionEditor>
      </Accordion>
    </section>
  );
};
