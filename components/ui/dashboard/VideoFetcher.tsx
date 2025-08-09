"use client";
import React, { ComponentProps, useEffect, useState } from "react";
import { Button } from "../button";
import { ImageInput } from "./ImageInput";
import { Input } from "./Input";
import { cn } from "@/lib/utils";
import { Label } from "../label";
import { extractId, useFetchVideo } from "@/services/vimeo";
import Image from "next/image";

interface Props {
  buttonContent: string;
  buttonProps?: ComponentProps<"button">;
  inputProps?: ComponentProps<"input">;
  imageInputProps?: ComponentProps<"label">;
  label: string;
  imageInputId: string;
  imageInputName: string;
  thumbnail: boolean;
  setVideoLink?: (val: string) => void;
  defaultLink?: string;
}

export const VideoFetcher = ({
  buttonContent,
  inputProps,
  buttonProps,
  imageInputProps,
  className,
  label,
  imageInputId,
  imageInputName,
  thumbnail,
  setVideoLink,
  defaultLink,
  ...props
}: ComponentProps<"div"> & Props) => {
  const [id, setId] = useState("");

  const { data, error, refetch, isFetching } = useFetchVideo({
    id,
    uniqueId: imageInputId,
  });
  const handleGetVideo = (e?: React.FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    refetch();
  };

  useEffect(() => {
    if (defaultLink) {
      const id = extractId(defaultLink);
      setId(id as string);
    }
  }, [defaultLink]);
  useEffect(() => {
    if (setVideoLink && data) {
      setVideoLink(data?.link);
    }
  }, [data]);
  return (
    <div {...props} className={cn(className)}>
      <Label className="mb-2">{label}</Label>
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-2 items-start w-full">
          <div className="flex w-full">
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="text"
              onSubmit={() => handleGetVideo()}
              variant={
                data?.uri && !error
                  ? "success"
                  : error
                  ? "destructive"
                  : "default"
              }
              placeholder="Vimeo video ID only – e.g. 123456789"
              {...inputProps}
              disabled={isFetching}
            />
          </div>
          <Button
            {...buttonProps}
            disabled={isFetching || id == ""}
            size={"sm"}
            className="min-w-[140px]"
            type="button"
            onClick={() => handleGetVideo()}
          >
            {isFetching ? "Loading..." : "Get It"}
          </Button>
        </div>
        {thumbnail && (
          <ImageInput
            {...imageInputProps}
            id={imageInputId}
            name={imageInputName}
          />
        )}
      </div>
    </div>
  );
};
