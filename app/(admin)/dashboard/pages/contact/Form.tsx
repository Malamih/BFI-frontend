import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import { SectionEditor } from "@/components/ui/dashboard/SectionEditor";
import { Textarea } from "@/components/ui/dashboard/textarea";
import { Label } from "@/components/ui/label";
import { checkUpdates } from "@/helpers";
import { useUpdatePageSection } from "@/services/page-content";
import React, { useState } from "react";

interface Props {
  sectionValue: {
    headline: string;
    subheadline: string;
    email: string;
    location: string;
    title: string;
    description: string;
  };
}

export const Form = ({ sectionValue }: Props) => {
  const [canSave, setCanSave] = useState(false);

  const { mutateAsync, isPending } = useUpdatePageSection({
    pageName: "contact",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const headline = form.get("headline");
    const subheadline = form.get("subheadline");
    const title = form.get("title");
    const description = form.get("description");
    const email = form.get("email");
    const location = form.get("location");

    const sections = {
      form: {
        ...(headline != sectionValue?.headline ? { headline } : {}),
        ...(subheadline != sectionValue?.subheadline ? { subheadline } : {}),
        ...(title != sectionValue?.title ? { title } : {}),
        ...(description != sectionValue?.description ? { description } : {}),
        ...(email != sectionValue?.email ? { email } : {}),
        ...(location != sectionValue?.location ? { location } : {}),
      },
    };

    mutateAsync({ pageName: "contact", sections }).catch(() => {});
    setCanSave(false);
  };
  return (
    <SectionEditor name="Form Data" sectionId="form-section-contact-page">
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <div className="input grid gap-2">
          <Label>Headline</Label>
          <Input
            placeholder="Enter your form headline"
            type="text"
            name="headline"
            defaultValue={sectionValue?.headline}
            onChange={(e) =>
              checkUpdates(sectionValue?.headline, e.target.value, setCanSave)
            }
          />
        </div>
        <div className="input grid gap-2">
          <Label>Subheadline</Label>
          <Textarea
            className="min-h-[120px] max-h-[200px]"
            placeholder="Enter your form subheadline"
            name="subheadline"
            defaultValue={sectionValue?.subheadline}
            onChange={(e) =>
              checkUpdates(sectionValue?.subheadline, e.target.value, setCanSave)
            }
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="input grid gap-2 flex-[1] w-full min-w-[400px]">
            <Label>Email</Label>
            <Input
              placeholder="Enter your form email"
              type="email"
              name="email"
              defaultValue={sectionValue?.email}
              onChange={(e) =>
                checkUpdates(sectionValue?.email, e.target.value, setCanSave)
              }
            />
          </div>
          <div className="input grid gap-2 flex-[1] w-full min-w-[400px]">
            <Label>Location</Label>
            <Input
              placeholder="Enter your form location"
              type="location"
              name="location"
              defaultValue={sectionValue?.location}
              onChange={(e) =>
                checkUpdates(sectionValue?.location, e.target.value, setCanSave)
              }
            />
          </div>
        </div>
        <div className="input grid gap-2">
          <Label>Title</Label>
          <Input
            placeholder="Enter your form title"
            type="text"
            name="title"
            defaultValue={sectionValue?.title}
            onChange={(e) =>
              checkUpdates(sectionValue?.title, e.target.value, setCanSave)
            }
          />
        </div>
        <div className="input grid gap-2">
          <Label>Description</Label>
          <Textarea
            className="min-h-[120px] max-h-[200px]"
            placeholder="Enter your form description"
            name="description"
            defaultValue={sectionValue?.description}
            onChange={(e) =>
              checkUpdates(sectionValue?.description, e.target.value, setCanSave)
            }
          />
        </div>
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
  );
};
