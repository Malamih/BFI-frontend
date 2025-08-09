"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../../label";
import { IconPicker } from "../IconPicker";
import { Input } from "../Input";
import { SectionEditor } from "../SectionEditor";
import { Textarea } from "../textarea";
import { useUpdatePageSection } from "@/services/page-content";
import { Button } from "../../button";
import { checkUpdates } from "@/helpers";

export type Item = {
  title: string;
  description: string;
  icon: string;
};

interface Props {
  sectionName: string;
  page: string;
  section: string;
  items: string[];
  sectionValue: Record<string, Item>;
  haveIcons: boolean;
}

export const ItemsBox = ({
  sectionName,
  page,
  section,
  items,
  sectionValue,
  haveIcons,
}: Props) => {
  const [canSave, setCanSave] = useState(false);
  const [icons, setIcons] = useState([""]);

  useEffect(() => {
    if (haveIcons && items && sectionValue) {
      const icons = items.map((key) => sectionValue[key]?.icon || "");
      setIcons(icons);
    }
  }, [items, sectionValue]);

  const { mutate, isPending } = useUpdatePageSection({ pageName: page });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const sections = {
      [section]: Object.fromEntries(
        items.map((key, i: number) => [
          key,
          {
            title: form.get(`${key}-title-input`),
            description: form.get(`${key}-description-input`),
            ...(haveIcons ? { icon: icons[i] } : {}),
          },
        ])
      ),
    };
    mutate({ pageName: page, sections });
  };
  return (
    <SectionEditor name={sectionName} sectionId={`${page}-${section}`}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-6">
          {items?.map((item, i: number) => {
            return (
              <div
                className="item grid gap-2 w-full min-w-[400px] flex-[1]"
                key={i}
              >
                <Label className="capitalize">
                  {item.replaceAll("_", " ")} Title
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your title"
                    className="h-full"
                    name={`${item}-title-input`}
                    defaultValue={sectionValue && sectionValue[item]?.title}
                    onChange={(e) =>
                      checkUpdates(
                        sectionValue[item]?.title,
                        e.target.value,
                        setCanSave
                      )
                    }
                  />
                  {haveIcons && (
                    <IconPicker
                      onChange={(icon) =>
                        setIcons((prev) => {
                          let icons = [...prev];
                          icons[i] = icon as string;
                          checkUpdates(
                            sectionValue[item].icon,
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
                  )}
                </div>
                <Textarea
                  className="min-h-[300px]"
                  placeholder="Your description here"
                  name={`${item}-description-input`}
                  defaultValue={sectionValue && sectionValue[item]?.description}
                  onChange={(e) =>
                    checkUpdates(
                      sectionValue[item]?.description,
                      e.target.value,
                      setCanSave
                    )
                  }
                />
              </div>
            );
          })}
        </div>
        <div className="mt-2">
          <Button
            disabled={!canSave || isPending}
            className="min-w-[140px] w-full max-w-[140px]"
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </SectionEditor>
  );
};
