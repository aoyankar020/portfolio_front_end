import { useId } from "react";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

export default function URLInput({
  className,
  placeholder,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div className="*:not-first:mt-2">
      <div className="relative">
        <Input
          data-slot="text"
          className={cn("peer ps-16", className)}
          placeholder={placeholder}
          type="text"
          {...props}
        />
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
          https://
        </span>
      </div>
    </div>
  );
}
