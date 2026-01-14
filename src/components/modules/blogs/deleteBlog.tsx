"use client";

import { deleteBlog } from "@/actions/deleteBlog";
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
import { Spinner } from "@/components/ui/spinner";
import { Trash } from "lucide-react";
import {  useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function DeleteBlogAlert(params: { id: string }) {
  const { id } = params;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBlog(id);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message || "Blog deleted successfully!");
        router.refresh(); // refresh the page or data
        router.push("/dashboard/blogs"); // optional redirect
      }
    });
  };
  return (
    <AlertDialog>
      {/* The button that triggers the dialog */}
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
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
            {isPending ? (
              <>
                <Spinner />
                Deleting...
              </>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
