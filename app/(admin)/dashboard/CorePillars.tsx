"use client";
import { Button } from "@/components/ui/button";
import { IconPicker } from "@/components/ui/dashboard/IconPicker";
import { Input } from "@/components/ui/dashboard/Input";
import { SectionEditor } from "@/components/ui/dashboard/SectionEditor";
import { Textarea } from "@/components/ui/dashboard/textarea";
import { Label } from "@/components/ui/label";
import { checkUpdates } from "@/helpers";
import { useUpdatePageSection } from "@/services/page-content";
import { useEffect, useState } from "react";

interface PillarData {
  title: string;
  description: string;
  icon: string;
}

interface Props {
  sectionValue: {
    headline: string;
    subheadline: string;
    pillars: PillarData[];
  };
  section: string;
  page: string;
}

export const CorePillars = ({ sectionValue, section, page }: Props) => {
  const items = ["1st Pillar", "2nd Pillar", "3rd Pillar", "4th Pillar"];
  const [icons, setIcons] = useState([""]);
  const [canSave, setCanSave] = useState(false);

  const { mutateAsync, isPending } = useUpdatePageSection({ pageName: page });
  useEffect(() => {
    if (sectionValue) {
      const icons = items.map((key, i) => sectionValue.pillars[i]?.icon || "");
      setIcons(icons);
    }
  }, [sectionValue]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const headline = form.get("headline");
    const subheadline = form.get("subheadline");
    const sections = {
      corePillars: {
        ...(headline ? { headline } : {}),
        ...(subheadline ? { subheadline } : {}),
        pillars: items.map((item, i) => ({
          title: form.get(`${item}-title-input`),
          description: form.get(`${item}-description-input`),
          icon: icons[i],
        })),
      },
    };
    await mutateAsync({ pageName: "home", sections }).catch(() => {});
    setCanSave(false);
  };
  return (
    <SectionEditor sectionId="home-core-pillars-section" name="Core Pillars">
      <form onSubmit={handleSubmit}>
        <div className="input mb-4">
          <Label className="mb-2">Headline</Label>
          <Input
            placeholder="Core Pillars headline"
            type="text"
            name="headline"
            defaultValue={sectionValue?.headline}
            onChange={(e) =>
              checkUpdates(
                sectionValue.headline as string,
                e.target.value,
                setCanSave
              )
            }
          />
          <Label className="mb-2 mt-4">Subheadline</Label>
          <Textarea
            name="subheadline"
            defaultValue={sectionValue?.subheadline}
            placeholder="Core pillars Subheadline here"
            className="min-h-[100px] max-h-[200px]"
            onChange={(e) =>
              checkUpdates(
                sectionValue?.subheadline as string,
                e.target.value,
                setCanSave
              )
            }
          />
        </div>
        <div className="flex flex-wrap gap-6">
          {items?.map((item, i: number) => {
            return (
              <div
                className="item grid gap-2 w-full min-w-[400px] flex-[1]"
                key={i}
              >
                <Label className="capitalize">
                  {item.replaceAll("_", " ")}
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your title"
                    className="h-full"
                    name={`${item}-title-input`}
                    defaultValue={
                      sectionValue?.pillars && sectionValue?.pillars[i]?.title
                    }
                    onChange={(e) =>
                      checkUpdates(
                        sectionValue?.pillars[i]?.title as string,
                        e.target.value,
                        setCanSave
                      )
                    }
                  />
                  <IconPicker
                    onChange={(icon) =>
                      setIcons((prev) => {
                        let icons = [...prev];
                        icons[i] = icon as string;
                        checkUpdates(
                          sectionValue?.pillars[i]?.icon,
                          icon as string,
                          setCanSave
                        );
                        return icons;
                      })
                    }
                    value={icons[i]}
                    placeholder={`${item} Icon`}
                    showClearButton
                    className="w-[300px]"
                  />
                </div>
                <Textarea
                  className="min-h-[300px]"
                  placeholder="Your description here"
                  name={`${item}-description-input`}
                  defaultValue={
                    sectionValue && sectionValue?.pillars[i]?.description
                  }
                  onChange={(e) =>
                    checkUpdates(
                      sectionValue?.pillars[i]?.description,
                      e.target.value,
                      setCanSave
                    )
                  }
                />
              </div>
            );
          })}
        </div>
        <div className="button mt-2">
          <Button className="min-w-[120px]" disabled={!canSave || isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </SectionEditor>
  );
};
