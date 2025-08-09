import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import RichEditor from "@/components/ui/dashboard/RichEditor";
import { SectionEditor } from "@/components/ui/dashboard/SectionEditor";
import { Textarea } from "@/components/ui/dashboard/textarea";
import { VideoFetcher } from "@/components/ui/dashboard/VideoFetcher";
import { Label } from "@/components/ui/label";
import { checkUpdates } from "@/helpers";
import { useUpdatePageSection } from "@/services/page-content";
import React, { useEffect, useState } from "react";

export const About = ({
  section,
}: {
  section?: {
    headline: string;
    subheadline: string;
    description: string;
    video: string;
  };
}) => {
  const [canSave, setCanSave] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [editorVal, setEditorVal] = useState("");

  useEffect(() => {
    if (section) {
      setEditorVal(section.description);
    }
  }, [section]);

  const { mutate, isPending } = useUpdatePageSection({ pageName: "home" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline") as string;
    const subheadline = form.get("subheadline") as string;

    const data = {
      about: {
        ...(headline != section?.headline ? { headline } : {}),
        ...(subheadline != section?.subheadline ? { subheadline } : {}),
        ...(editorVal != section?.description
          ? { description: editorVal }
          : {}),
        ...(videoLink != section?.description ? { video: videoLink } : {}),
      },
    };

    mutate({ sections: data, pageName: "home" });
  };
  return (
    <SectionEditor name="About Section" sectionId="home-about-section">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label>Headline</Label>
          <Input
            placeholder="Type your headline here"
            type="text"
            name="headline"
            defaultValue={section?.headline}
            onChange={(e) =>
              checkUpdates(e.target.value, section?.headline, setCanSave)
            }
          />
        </div>
        <div className="grid gap-2">
          <Label>Subheadline</Label>
          <Input
            placeholder="Type your subheadline here"
            type="text"
            name="subheadline"
            defaultValue={section?.subheadline}
            onChange={(e) =>
              checkUpdates(e.target.value, section?.subheadline, setCanSave)
            }
          />
        </div>
        <div className="grid gap-2">
          <Label>Description</Label>
          <RichEditor
            placeholder="Type your description here"
            value={editorVal}
            onChange={setEditorVal}
          />
        </div>
        <VideoFetcher
          buttonContent="Get It"
          imageInputId=""
          imageInputName=""
          thumbnail={false}
          label="Video"
          defaultLink={section?.video}
          setVideoLink={setVideoLink}
        />
        <div className="btn mt-4">
          <Button disabled={isPending} className="min-w-[120px] max-md:w-full">
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </SectionEditor>
  );
};
