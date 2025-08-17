import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
import RichEditor from "@/components/ui/dashboard/RichEditor";
import { SectionEditor } from "@/components/ui/dashboard/SectionEditor";
import { VideoFetcher } from "@/components/ui/dashboard/VideoFetcher";
import { Label } from "@/components/ui/label";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkUpdates } from "@/helpers";
import { useReplaceImage, useUploadToCloudinary } from "@/services/cloudinary";
import { useUpdatePageSection } from "@/services/page-content";
import { Tabs } from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";

export interface IndustryItems {
  type: "video" | "image";
  value: string | File;
}

interface Props {
  page: string;
  section: string;
  sectionValue: {
    headline: string;
    description: string;
    items: IndustryItems[];
  };
}

export const ResourcesAndIndustryTools = ({
  page,
  section,
  sectionValue,
}: Props) => {
  const [canSave, setCanSave] = useState(false);
  const [items, setItems] = useState<IndustryItems[]>([
    {
      type: "video",
      value: "",
    },
    {
      type: "video",
      value: "",
    },
    {
      type: "video",
      value: "",
    },
    {
      type: "video",
      value: "",
    },
  ]);
  const { replaceImage, isReplacing } = useReplaceImage();
  const { mutateAsync: uploadImage, isPending: isUploading } =
    useUploadToCloudinary();
  const [desc, setDesc] = useState("");

  const { mutateAsync, isPending } = useUpdatePageSection({ pageName: page });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline");
    const description = desc;

    let itemsToUpdate: IndustryItems[] = [];

    for (const i of items) {
      if (i.type === "image" && i.value instanceof File) {
        try {
          const formData = new FormData();
          formData.append("image", i.value);

          const res = await uploadImage(formData);
          itemsToUpdate.push({ ...i, value: res.secure_url });
        } catch {
          itemsToUpdate.push(i); // لو صار خطأ نخليه مثل ما هو
        }
      } else {
        itemsToUpdate.push(i);
      }
    }

    const sections = {
      [section]: {
        ...(headline !== sectionValue.headline ? { headline } : {}),
        ...(description !== sectionValue.description ? { description } : {}),
        items: itemsToUpdate,
      },
    };

    console.log("itemsToUpdate:", itemsToUpdate);

    await mutateAsync({ pageName: page, sections }).catch(() => {});
    setCanSave(false);
  };

  useEffect(() => {
    if (sectionValue) {
      setDesc(sectionValue.description);
      setItems(sectionValue.items);
    }
  }, [sectionValue]);

  const handleImageChange = (i: number, file: File) => {
    const itemsCopy = [...items];
    itemsCopy[i].type = "image";
    itemsCopy[i].value = file;
    setItems(itemsCopy);
  };
  return (
    <SectionEditor
      sectionId="resources-and-industry-tools"
      name="Resources & Industry Tools"
    >
      {JSON.stringify(items[0])}
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
          {items.map((item, i: number) => {
            return (
              <div className="input w-full flex-[1] min-w-xl" key={i}>
                <Tabs defaultValue={item.type}>
                  <TabsList>
                    <TabsTrigger value="video">Video</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                  </TabsList>
                  <TabsContent value="video">
                    <VideoFetcher
                      buttonContent="Get It"
                      thumbnail={false}
                      imageInputId={`resources-and-industry-tools-video-${i}`}
                      imageInputName=""
                      defaultLink={
                        item.type == "video" ? (item.value as string) : ""
                      }
                      label={``}
                      setVideoLink={(val) =>
                        setItems((prev) => {
                          let newItems = [...prev];
                          newItems[i].type = "video";
                          newItems[i].value = val;
                          return newItems;
                        })
                      }
                    />
                  </TabsContent>
                  <TabsContent value="image">
                    <ImageInput
                      id={`image-input-iraq-industry-tools-${i}`}
                      name=""
                      className="my-2"
                      defaultImage={
                        item.type == "image" && typeof item.value == "string"
                          ? (item.value as string)
                          : ""
                      }
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (target.files && target.files[0]) {
                          handleImageChange(i, target.files[0]);
                        }
                      }}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            );
          })}
        </div>
        <div className="btn mt-2">
          <Button
            disabled={isPending || isUploading}
            className="max-w-[200px] w-full"
          >
            {isUploading ? "Uploading..." : isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </SectionEditor>
  );
};
