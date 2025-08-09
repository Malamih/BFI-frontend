import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export const Placeholder = ({ className }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "placeholder absolute top-0 left-0 w-full h-full pointer-events-none z-0",
        className
      )}
    >
      <Image
        src={"/placeholder.png"}
        width={1000}
        height={1000}
        alt="Placeholder"
        className="object-cover h-full w-full"
      />
    </div>
  );
};
