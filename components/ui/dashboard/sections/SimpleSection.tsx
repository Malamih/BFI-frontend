"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import { SectionEditor } from "@/components/ui/dashboard/SectionEditor";
import { Textarea } from "@/components/ui/dashboard/textarea";
import { Label } from "@/components/ui/label";
import { checkUpdates } from "@/helpers";
import { useUpdatePageSection } from "@/services/page-content";
import { useState } from "react";

export const SimpleSection = ({
  section,
  page,
  sectionName,
}: {
  section?: { headline: string; subheadline: string };
  page: string;
  sectionName: string;
}) => {
  const [canSave, setCanSave] = useState(false);
  const { mutate, isPending } = useUpdatePageSection({ pageName: page });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline") as string;
    const subheadline = form.get("subheadline") as string;

    const data = {
      [sectionName]: {
        ...(headline != section?.headline ? { headline } : {}),
        ...(subheadline != section?.subheadline ? { subheadline } : {}),
      },
    };
    mutate({ sections: data, pageName: page });
  };
  return (
    <SectionEditor
      name={`${sectionName.replaceAll("_", " ")} Section`}
      sectionId={`${page}-${sectionName}-section`}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label>Headline</Label>
          <Input
            placeholder="Type your headline"
            defaultValue={section?.headline}
            name="headline"
            onChange={(e) =>
              checkUpdates(
                section?.headline as string,
                e.target.value,
                setCanSave
              )
            }
          />
        </div>
        <div className="grid gap-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Type your description"
            defaultValue={section?.subheadline}
            className="min-h-[100px] max-h-[200px]"
            name="subheadline"
            onChange={(e) =>
              checkUpdates(
                section?.subheadline as string,
                e.target.value,
                setCanSave
              )
            }
          />
        </div>
        <div className="button">
          <Button className="min-w-[120px]" disabled={!canSave || isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </SectionEditor>
  );
};
