"use client";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function BlogButton({ name, blogId }: { name: string; blogId: string }) {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => router.push(`/blogs/${blogId}`)}
        className="px-4 py-2 flex justify-center items-center gap-2 capitalize  text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition cursor-pointer"
      >
        {name}
        <MoveRight />
      </Button>
    </>
  );
}
