import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import RichEditor from "@/components/ui/dashboard/RichEditor";
import { SectionEditor } from "@/components/ui/dashboard/SectionEditor";
import { VideoFetcher } from "@/components/ui/dashboard/VideoFetcher";
import { Label } from "@/components/ui/label";
import { checkUpdates } from "@/helpers";
import { useUpdatePageSection } from "@/services/page-content";
import React, { useEffect, useState } from "react";

interface Props {
  page: string;
  section: string;
  sectionValue: {
    headline: string;
    description: string;
    videos: string[];
  };
}

export const ResourcesAndIndustryTools = ({
  page,
  section,
  sectionValue,
}: Props) => {
  const [canSave, setCanSave] = useState(false);
  const [videos, setVideos] = useState(["", "", "", ""]);
  const [desc, setDesc] = useState("");

  const { mutateAsync, isPending } = useUpdatePageSection({ pageName: page });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline");
    const description = desc;

    const sections = {
      [section]: {
        ...(headline != sectionValue.headline ? { headline } : {}),
        ...(description != sectionValue.description ? { description } : {}),
        ...(videos != sectionValue.videos ? { videos } : {}),
      },
    };

    await mutateAsync({ pageName: page, sections }).catch(() => {});
    setCanSave(false);
  };

  useEffect(() => {
    if (sectionValue) {
      setDesc(sectionValue.description);
      setVideos(sectionValue?.videos);
    }
  }, [sectionValue]);
  return (
    <SectionEditor
      sectionId="resources-and-industry-tools"
      name="Resources & Industry Tools"
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label>Headline</Label>
          <Input
            placeholder="Type your Headline"
            type="text"
            onChange={(e) =>
              checkUpdates(sectionValue.headline, e.target.value, setCanSave)
            }
            defaultValue={sectionValue?.headline}
            name="headline"
          />
        </div>
        <div className="grid gap-2">
          <Label>Description</Label>
          <RichEditor
            placeholder="Type your description"
            onChange={(val) => {
              checkUpdates(sectionValue?.description, val, setCanSave);
              setDesc(val);
            }}
            value={desc}
          />
        </div>
        <div className="videos flex flex-wrap gap-5">
          {videos.map((video, i: number) => {
            return (
              <div className="input w-full flex-[1] min-w-xl" key={i}>
                <VideoFetcher
                  buttonContent="Get It"
                  thumbnail={false}
                  imageInputId={`resources-and-industry-tools-video-${i}`}
                  imageInputName=""
                  defaultLink={video}
                  label={`video - ${i + 1}`}
                  setVideoLink={(val) =>
                    setVideos((prev) => {
                      let newVideos = [...videos];
                      newVideos[i] = val;
                      return newVideos;
                    })
                  }
                />
              </div>
            );
          })}
        </div>
        <div className="btn mt-2">
          <Button disabled={isPending} className="max-w-[200px] w-full">
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </SectionEditor>
  );
};
