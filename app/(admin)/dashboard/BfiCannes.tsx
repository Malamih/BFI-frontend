"use client";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
import { SectionEditor } from "@/components/ui/dashboard/SectionEditor";
import { Textarea } from "@/components/ui/dashboard/textarea";
import { Label } from "@/components/ui/label";
import { checkUpdates } from "@/helpers";
import {
  useDeleteFromCloudinary,
  useReplaceImage,
  useUploadToCloudinary,
} from "@/services/cloudinary";
import { useUpdatePageSection } from "@/services/page-content";
import { useState } from "react";

export const BfiCannes = ({
  section,
}: {
  section?: { headline: string; subheadline: string; image: string };
}) => {
  const [canSave, setCanSave] = useState(false);
  const { mutate, isPending } = useUpdatePageSection({ pageName: "home" });
  const { replaceImage, isReplacing } = useReplaceImage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline") as string;
    const subheadline = form.get("subheadline") as string;
    const image = form.get("image") as File;
    let data: {
      bfiCannes: { image?: string; headline?: string; subheadline?: string };
    } = {
      bfiCannes: {
        ...(headline != section?.headline ? { headline } : {}),
        ...(subheadline != section?.subheadline ? { subheadline } : {}),
      },
    };
    if (image.size > 0) {
      replaceImage(section?.image as string, form)
        .then((result) => {
          data.bfiCannes.image = result.secure_url;
          mutate({ sections: data, pageName: "home" });
        })
        .catch((err) => {});
    } else {
      mutate({ sections: data, pageName: "home" });
    }
  };
  return (
    <SectionEditor name="Bfi Cannes Section" sectionId="home-bfiCannes-section">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex max-lg:flex-col gap-4 w-full">
          <div className="inputs w-full flex flex-col gap-4">
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
          </div>
          <ImageInput
            id="image-input-selector-for-bficannes-section"
            name="image"
            defaultImage={section?.image}
            onChange={() => setCanSave(true)}
          />
        </div>
        <div className="button">
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
  );
};
