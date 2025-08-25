"use client";
import { Button } from "@/components/ui/button";
import { ImageInput } from "@/components/ui/dashboard/ImageInput";
import { Input } from "@/components/ui/dashboard/Input";
import RichEditor from "@/components/ui/dashboard/RichEditor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { queryClient } from "@/providers/queryProvider";
import { useGetJurors } from "@/services/jurors";
import { useGetPartners } from "@/services/partners";
import {
  useCreateProgram,
  useGetProgram,
  useUpdateProgram,
} from "@/services/programs";
import { useGetProjects } from "@/services/projects";
import clsx from "clsx";
import { ArrowRight, MinusIcon, PlusIcon, Router, Trophy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Item = {
  title: string;
  content: string;
};

type selector = {
  title: string;
  items: { key: string; value: string }[];
  key: string;
  selected_items: { key: string; value: string }[];
  dialog_title: string;
  dialog_description: string;
};

export const Content = ({ id }: { id: string }) => {
  const [awardsList, setAwardsList] = useState<string[]>([]);
  const [awardsInputValue, setAwardsInputValue] = useState("");
  const [showAwardsInput, setShowAwardsInput] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<File | "">("");
  const [itemsContentInput, setItemsContentInput] = useState("");
  const [itemsTitleInput, setItemsTitleInput] = useState("");

  const [subheadline, setSubheadline] = useState("");
  const [description, setDescription] = useState("");

  const { data: program, isFetching } = useGetProgram(id);

  const [items, setItems] = useState<Item[]>([]);

  const [selectors, setSelectors] = useState<selector[]>([
    {
      title: "Selected Projects",
      items: [],
      selected_items: [],
      key: "selected_projects",
      dialog_title: "Select Projects",
      dialog_description: `Select a project from these projects that you have in your portoflio at "projects" page. Only the name of the project will be visible in the "selected projects" section`,
    },
    {
      title: "Jury",
      items: [],
      selected_items: [],
      key: "jury",
      dialog_title: "Jury",
      dialog_description: `Select Jury from these jurors that you have in your portoflio at "Jurors" page.`,
    },
    {
      title: "Partners",
      items: [],
      selected_items: [],
      key: "partners",
      dialog_title: "Partners",
      dialog_description: `Select Partners from these partners that you have in your portoflio at "Partners" page.`,
    },
    {
      title: "Projects",
      items: [],
      selected_items: [],
      key: "projects",
      dialog_title: "Projects",
      dialog_description: `Select projects from these projects that you have in your portoflio at "projects" page.`,
    },
  ]);

  const { data: projects } = useGetProjects({ query: {} });
  const { data: jury } = useGetJurors({ query: {} });
  const { data: partners } = useGetPartners({ query: {} });

  useEffect(() => {
    if (program) {
      setSubheadline(program?.payload?.sub_headline || "");
      setDescription(program?.payload?.description || "");
      setAwardsList(program?.payload?.awards_list || []);
      setItems(program?.payload?.items || []);

      setSelectors([
        {
          title: "Selected Projects",
          items: [],
          selected_items:
            program?.payload?.selected_projects?.map((project) => ({
              key: project._id,
              value: project.title,
            })) || [],
          key: "selected_projects",
          dialog_title: "Select Projects",
          dialog_description: `Select a project from these projects that you have in your portoflio at "projects" page. Only the name of the project will be visible in the "selected projects" section`,
        },
        {
          title: "Jury",
          items: [],
          selected_items:
            program?.payload?.jury?.map((jury) => ({
              key: jury._id,
              value: jury.name,
            })) || [],
          key: "jury",
          dialog_title: "Jury",
          dialog_description: `Select Jury from these jurors that you have in your portoflio at "Jurors" page.`,
        },
        {
          title: "Partners",
          items: [],
          selected_items:
            program?.payload?.partners?.map((partner) => ({
              key: partner._id,
              value: partner.name,
            })) || [],
          key: "partners",
          dialog_title: "Partners",
          dialog_description: `Select Partners from these partners that you have in your portoflio at "Partners" page.`,
        },
        {
          title: "Projects",
          items: [],
          selected_items:
            program?.payload?.projects?.map((project) => ({
              key: project._id,
              value: project.title,
            })) || [],
          key: "projects",
          dialog_title: "Projects",
          dialog_description: `Select projects from these projects that you have in your portoflio at "projects" page.`,
        },
      ]);
    }
  }, [program]);

  useEffect(() => {
    if (projects) {
      setSelectors((prev) => {
        let items = [...prev];
        let index = prev.findIndex((selector) => selector.key == "projects");
        let index2 = prev.findIndex(
          (selector) => selector.key == "selected_projects"
        );
        items[index].items = projects.payload?.map((project) => ({
          key: project?._id,
          value: project.title,
        }));
        items[index2].items = projects.payload?.map((project) => ({
          key: project?._id,
          value: project.title,
        }));
        return items;
      });
    }
  }, [projects]);

  useEffect(() => {
    if (jury) {
      setSelectors((prev) => {
        let items = [...prev];
        let index = prev.findIndex((selector) => selector.key == "jury");
        items[index].items = jury.payload?.map((juror) => ({
          key: juror?._id,
          value: juror.name,
        }));
        return items;
      });
    }
  }, [jury]);

  useEffect(() => {
    if (partners) {
      setSelectors((prev) => {
        let items = [...prev];
        let index = prev.findIndex((selector) => selector.key == "partners");
        items[index].items = partners.payload?.map((partner) => ({
          key: partner?._id,
          value: partner.name,
        }));
        return items;
      });
    }
  }, [partners]);

  const router = useRouter();
  const {
    mutateAsync: updateProgram,
    isPending,
    error,
  }: any = useUpdateProgram(id);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();

    try {
      // 1. Append basic form inputs
      const formElements = (e.target as HTMLFormElement).elements;
      Array.from(formElements).forEach((el) => {
        if (
          (el instanceof HTMLInputElement ||
            el instanceof HTMLTextAreaElement ||
            el instanceof HTMLSelectElement) &&
          el.name &&
          el.value.trim() !== ""
        ) {
          form.append(el.name, el.value);
        }
      });

      // 3. Helper to extract selected keys
      const getSelectedKeys = (key: string): string[] =>
        selectors
          .find((s) => s.key === key)
          ?.selected_items.map((i) => i.key) || [];

      // 4. Prepare array data
      const arrayData = {
        selected_projects: getSelectedKeys("selected_projects"),
        partners: getSelectedKeys("partners"),
        projects: getSelectedKeys("projects"),
        jury: getSelectedKeys("jury"),
        awards_list: awardsList,
      };

      // 5. Append array data properly
      Object.entries(arrayData).forEach(([key, values]) => {
        if (Array.isArray(values)) {
          values.forEach((value) => form.append(key, value));
        }
      });

      // 6. Append other fields
      if (description) form.append("description", description);
      if (subheadline) form.append("sub_headline", subheadline);
      if (backgroundImage && backgroundImage instanceof File) {
        form.append("background", backgroundImage);
      }

      form.append("items", JSON.stringify(items));
      // 7. Submit with error handling
      await updateProgram(form);

      queryClient.invalidateQueries({ queryKey: ["programs"] });
      router.push("/dashboard/programs");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg mb-6">Edit Program</h1>
        <div className="opts">
          <Link href={"/dashboard/programs"}>
            <Button variant={"ghost"}>
              Go Back
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
      <form onSubmit={submit}>
        <div className="input grid mb-4 gap-2 w-full min-w-sm flex-[1]">
          <Label>Headline (optional)</Label>
          <Input
            placeholder="Enter program headline"
            type="text"
            name="headline"
            defaultValue={program?.payload?.headline}
            variant={error?.fieldErrors?.headline ? "destructive" : "default"}
          />
        </div>
        <div className="subheadline mt-4 mb-4">
          <RichEditor
            placeholder="A subheadline for the program (optional)"
            value={subheadline}
            onChange={setSubheadline}
            className={clsx({
              "!border-red-500/50": error?.fieldErrors?.sub_headline,
            })}
          />
        </div>
        <ImageInput
          id="edit-program-image-input"
          onChange={(e: any) => setBackgroundImage(e.target?.files[0])}
          name=""
          className="mb-5 min-h-[300px]"
          defaultImage={program?.payload?.background?.secure_url}
          variant={
            error?.message == "Background is required"
              ? "destructive"
              : "default"
          }
        />
        <div className="subheadline mt-4 mb-4">
          <RichEditor
            placeholder="Program description (optional)"
            value={description}
            onChange={setDescription}
            className={clsx({
              "!border-red-500/50": error?.fieldErrors?.description,
            })}
          />
        </div>
        <div className="group mb-5 flex flex-wrap gap-6">
          <div className="input grid gap-2 w-full min-w-sm flex-[1]">
            <Label>Name</Label>
            <Input
              placeholder="Enter program name"
              type="text"
              name="name"
              defaultValue={program?.payload?.name}
              variant={error?.fieldErrors?.name ? "destructive" : "default"}
            />
          </div>
          <div className="input grid gap-2 w-full min-w-sm flex-[1]">
            <Label>Applying Link (optional)</Label>
            <Input
              placeholder="Enter applying link"
              type="text"
              name="applying_link"
              defaultValue={program?.payload?.applying_link}
              variant={
                error?.fieldErrors?.applying_link ? "destructive" : "default"
              }
            />
          </div>
          <div className="input grid gap-2 w-full min-w-sm flex-[1]">
            <Label>Contact Link (optional)</Label>
            <Input
              placeholder="Enter contact link"
              type="text"
              name="contact_link"
              defaultValue={program?.payload?.contact_link}
              variant={
                error?.fieldErrors?.contact_link ? "destructive" : "default"
              }
            />
          </div>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {selectors?.map((selector, i: number) => {
            return (
              <li
                key={i}
                className={clsx(
                  "w-full min-w-xl flex-[1] px-3 py-2 border border-gray-500/20 rounded-sm shadow-2xl",
                  {
                    "border-red-500/50": error?.fieldErrors?.[selector.key],
                  }
                )}
              >
                <Selector data={selector} setSelectors={setSelectors} />
              </li>
            );
          })}
        </ul>
        <ul
          className={clsx(
            "mt-5 py-2 px-3 border-gray-500/30 border rounded-sm",
            {
              "border-red-500": error?.fieldErrors?.awards_list,
            }
          )}
        >
          <div className="header mb-4">
            {!showAwardsInput && (
              <div className="title flex items-center justify-between gap-2">
                <h1 className="font-semibold">Awards</h1>
                <Button
                  size={"sm"}
                  type="button"
                  onClick={() => setShowAwardsInput(true)}
                >
                  <PlusIcon />
                </Button>
              </div>
            )}
            {showAwardsInput && (
              <div className="input flex items-center justify-between gap-2">
                <Input
                  placeholder="Type the award"
                  name="award"
                  type="text"
                  value={awardsInputValue}
                  onChange={(e) => setAwardsInputValue(e.target.value)}
                />
                <div className="btns flex items-center gap-2">
                  <Button
                    size={"sm"}
                    type="button"
                    onClick={() =>
                      setAwardsList((prev) => {
                        let awards = [...prev];
                        awards.push(awardsInputValue);
                        setAwardsInputValue("");
                        return awards;
                      })
                    }
                  >
                    Add
                  </Button>
                  <Button
                    size={"sm"}
                    type="button"
                    variant={"destructive"}
                    onClick={() => setShowAwardsInput(false)}
                  >
                    close
                  </Button>
                </div>
              </div>
            )}
          </div>
          {awardsList?.map((award, i) => {
            return (
              <li
                key={i}
                className={clsx(
                  "py-2 px-3 flex gap-2 justify-between items-center border border-gray-600/50 rounded-sm mb-2 last:mb-0",
                  {}
                )}
              >
                <div className="content flex gap-2">
                  <Trophy width={19} className="text-gray-500" />
                  {award}
                </div>
                <Button
                  variant={"destructive"}
                  type="button"
                  onClick={() =>
                    setAwardsList((prev) => {
                      let items = [...prev];
                      items.splice(i, 1);
                      return items;
                    })
                  }
                >
                  <MinusIcon />
                </Button>
              </li>
            );
          })}
        </ul>
        <section className="py-2 px-3 border border-gray-600/50 rounded-sm mt-5">
          <header className="flex justify-between items-center gap-5">
            <h1 className="font-semibold">Items List</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"}>
                  <PlusIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add new Item</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="e.g. Timeline"
                    value={itemsTitleInput}
                    onChange={(e) => setItemsTitleInput(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Content</Label>
                  <RichEditor
                    placeholder="Item Content"
                    className="mb-2 w-full max-w-[460px]"
                    value={itemsContentInput}
                    onChange={(v) => setItemsContentInput(v)}
                  />
                </div>
                <Button
                  disabled={itemsTitleInput == "" || itemsContentInput == ""}
                  onClick={() => {
                    setItems((prev) => [
                      ...prev,
                      { title: itemsTitleInput, content: itemsContentInput },
                    ]);
                    setItemsTitleInput("");
                    setItemsContentInput("");
                  }}
                >
                  Add
                </Button>
              </DialogContent>
            </Dialog>
          </header>
          <ul className="items flex flex-wrap mt-4 gap-4">
            {items?.map((item, i: number) => {
              return (
                <Item
                  title={item.title}
                  key={i}
                  index={i}
                  setItems={setItems}
                  content={item.content}
                />
              );
            })}
          </ul>
        </section>
        <Button className="w-full mt-5" disabled={isPending}>
          {isPending ? "Updating..." : "Update"}
        </Button>
      </form>
    </section>
  );
};

export const Item = ({
  title,
  index,
  setItems,
  content,
}: {
  title: string;
  index: number;
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  content: string;
}) => {
  return (
    <div className="item grid gap-2 w-full flex-[1] min-w-xl">
      <div className="flex items-center justify-between">
        <Label>{title}</Label>
        <Button
          size="sm"
          variant="destructive"
          type="button"
          onClick={() =>
            setItems((prev: Item[]) => {
              let items = [...prev];
              items.splice(index, 1);
              return items;
            })
          }
        >
          <MinusIcon />
        </Button>
      </div>
      <RichEditor
        value={content}
        onChange={(val: string) =>
          setItems((prev: Item[]) => {
            let items = [...prev];
            if (index !== -1) {
              items[index] = { ...items[index], content: val };
            }
            return items;
          })
        }
      />
    </div>
  );
};

export const Selector = ({
  data,
  setSelectors,
}: {
  data: selector;
  setSelectors: React.Dispatch<React.SetStateAction<selector[]>>;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="selector w-full">
      <div className="header flex items-center justify-between gap-2">
        <Label>{data?.title}</Label>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={"ghost"} type="button">
              <PlusIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{data?.dialog_title}</DialogTitle>
              <DialogDescription>{data?.dialog_description}</DialogDescription>
            </DialogHeader>
            <ul className="custom-scroll-area flex flex-col gap-2">
              {data?.items.map((item, i) => {
                return (
                  <li
                    className="flex items-center justify-between bg-gray-500/20 p-2 rounded-sm"
                    key={i}
                  >
                    <span>{item?.value}</span>
                    <Button
                      size="sm"
                      className="w-fit h-fit px-2 py-2"
                      disabled={data?.selected_items.some(
                        (selected) => selected.key == item.key
                      )}
                      onClick={() =>
                        setSelectors((prev) => {
                          return prev.map((selector) => {
                            if (selector.key === data.key) {
                              const alreadyExists =
                                selector.selected_items.some(
                                  (selected) => selected.key === item.key
                                );
                              if (alreadyExists) return selector;

                              return {
                                ...selector,
                                selected_items: [
                                  ...selector.selected_items,
                                  item,
                                ],
                              };
                            }
                            return selector;
                          });
                        })
                      }
                    >
                      <PlusIcon />
                    </Button>
                  </li>
                );
              })}
              {data?.items.length < 1 && (
                <li className="text-center text-lg text-gray-500">
                  <span>Add Items First Please</span>
                </li>
              )}
            </ul>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="mt-2 flex flex-col gap-2">
        {data?.selected_items?.map((item, i) => {
          return (
            <li
              className="flex items-center justify-between bg-gray-500/20 p-2 rounded-sm"
              key={i}
            >
              <span>{item?.value}</span>
              <Button
                size="sm"
                className="w-fit h-fit px-2 py-2"
                disabled={
                  !data?.selected_items.some(
                    (selected) => selected.key === item.key
                  )
                }
                type="button"
                onClick={() =>
                  setSelectors((prev) => {
                    return prev.map((selector) => {
                      if (selector.key === data.key) {
                        return {
                          ...selector,
                          selected_items: selector.selected_items.filter(
                            (selected) => selected.key !== item.key
                          ),
                        };
                      }
                      return selector;
                    });
                  })
                }
              >
                <MinusIcon />
              </Button>
            </li>
          );
        })}
        {data?.selected_items?.length < 1 && (
          <li className="text-center text-lg text-gray-500">
            <h1>No Items Added Yet</h1>
          </li>
        )}
      </ul>
    </div>
  );
};
