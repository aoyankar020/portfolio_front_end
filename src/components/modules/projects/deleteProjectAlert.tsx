"use client";

import { deleteProject } from "@/actions/deleteProject";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {  useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteProjectAlert(params: { id: string }) {
  const { id } = params;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProject(id);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message || "Project deleted successfully!");
        router.refresh(); // refresh the page or data
        router.push("/dashboard/projects"); // optional redirect
      }
    });
  };
  return (
    <AlertDialog>
      {/* The button that triggers the dialog */}
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" variant="ghost">
          <Trash className="text-gray-600" />
        </Button>
      </AlertDialogTrigger>

      {/* The dialog box content */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your blog
            and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
