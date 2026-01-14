"use client";

import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProjectDetailsButton({
  name,
  projectId,
}: {
  name: string;
  projectId: string;
}) {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => router.push(`/projects/${projectId}`)}
        className="px-6 py-2 flex justify-center items-center gap-2 capitalize  text-sm font-medium text-white bg-[#19687c] rounded-md hover:bg-[#19687c] transition cursor-pointer"
      >
        {name}
        <MoveRight />
      </Button>
    </>
  );
}
