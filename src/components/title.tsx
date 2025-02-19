import { cn } from "@/lib/utils";
import React from "react";

export default function Title(props: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={cn(
        "text-4xl font-extrabold tracking-tight lg:text-5xl",
        props.className,
      )}
    />
  );
}
