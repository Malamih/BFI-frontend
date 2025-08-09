import { Label } from "@radix-ui/react-label";
import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps, useState } from "react";
import { Input } from "./Input";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { readImageAsBase64 } from "@/lib/fileReader";
import { toast } from "sonner";

const imageInputVariants = cva(
  [
    "border-2 border-dotted overflow-hidden flex border-gray-500 relative rounded-sm min-w-[200px] min-h-[200px] selection:bg-primary selection:text-primary-foreground shadow-xs transition-[color,box-shadow,border,text] outline-none cursor-pointer text-gray-500 hover:border-gray-400 hover:text-gray-400",
  ],
  {
    variants: {
      variant: {
        default: "",
        success: "border-success focus-visible:ring-success/40 text-success",
        destructive:
          "border-red-500 focus-visible:ring-red-500/40 text-red-500/60 focus-visible:border-red-500/50",
      },
    },
  }
);

interface Props {
  id: string;
  name: string;
  defaultImage?: string;
}

export const ImageInput = ({
  className,
  variant,
  id,
  defaultImage,
  name,
  ...props
}: ComponentProps<"label"> &
  VariantProps<typeof imageInputVariants> &
  Props) => {
  const [image, setImage] = useState("");
  const [actionVariant, setActionVariant] = useState<
    "success" | "destructive" | "default"
  >("default");

  interface HandleFileReaderEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleFileReader = async (e: HandleFileReaderEvent) => {
    const files: FileList | null = (e.target as HTMLInputElement).files;
    if (!files || files?.length < 1) {
      setActionVariant("destructive");
      return toast.error("Please select a file or an image");
    }
    const image = await readImageAsBase64(files[0]).catch(() => {
      setActionVariant("destructive");
    });
    if (image) {
      setImage(image);
      setActionVariant("success");
    }
  };

  return (
    <Label
      {...props}
      htmlFor={id}
      className={imageInputVariants({
        variant: actionVariant == "default" ? variant : actionVariant,
        className,
      })}
    >
      <Input
        onChange={handleFileReader}
        id={id}
        name={name}
        type="file"
        className="hidden"
      />
      <ImageIcon className="absolute select-none scale-125 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" />
      {(image || defaultImage) && (
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            src={image || defaultImage || ""}
            alt="Image"
            loading="lazy"
            className="object-cover w-full h-full absolute top-0 left-0"
          />
        </div>
      )}
    </Label>
  );
};
