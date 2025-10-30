"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ value = [], onChange, placeholder }: TagInputProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setTags(value); // sync initial value safely on client
  }, [value]);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      setTags(newTags);
      onChange?.(newTags);
    }
    setInput("");
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange?.(newTags);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Badges outside the input */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1 px-2 "
          >
            {tag}
            <span
              className=" cursor-pointer flex justify-between items-center gap-4  "
              onClick={() => removeTag(tag)}
            >
              {/* <IoClose /> */}
              <X className=" text-gray-500 font-bold p-0 text-sm" />
            </span>
          </Badge>
        ))}
      </div>

      {/* Input field in its own bordered container */}
      <div className="border rounded-md p-2">
        <Input
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag(input);
            }
          }}
          className="border-none shadow-none focus-visible:ring-0 w-full"
        />
      </div>
    </div>
  );
}
