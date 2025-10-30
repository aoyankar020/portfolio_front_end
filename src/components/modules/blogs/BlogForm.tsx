"use client";
import { submitBlogForm } from "@/actions/create_Blog";
import URLInput from "@/components/comp-11";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import z from "zod";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import UploadFile from "@/components/FileUpload";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "title must be at least 10 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be 20 charecture",
  }),
  coverImage: z.instanceof(File).optional(),
  authorId: z.string(),
});
// Component
function BlogForm() {
  const session = useSession();
  const id = (session.data?.user as { id?: string } | undefined)?.id;
  console.log("UID:", session.data?.user);

  // const id = (user as { id?: string } | undefined)?.id;
  // console.log("Session From blog:", session);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      coverImage: undefined,
      authorId: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    console.log("fORM DATA :", formData);
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("authorId", id as string); // ✅ pass userId to backend (fallback to empty string)
    console.log("Iamage : ", values.coverImage);
    if (values.coverImage instanceof File) {
      formData.append("coverImage", values.coverImage);
    }

    startTransition(async () => {
      const result = await submitBlogForm(formData);

      if (!result?.success) {
        toast.error(`${result.error}`);
        console.log(result.error);
      } else {
        console.log("RESULT FROM FORM", result);
        toast.success(`${result.message}`);
        form.reset();
        redirect("/dashboard/blogs");
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Title</FormLabel>
              <FormControl>
                <Input placeholder="Title here..." {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your content here..." {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image </FormLabel>
              <FormControl>
                <URLInput placeholder="example.com" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image </FormLabel>
              <FormControl>
                <UploadFile onFileSelect={(file) => field.onChange(file)} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full text-center">
          <Button
            disabled={isPending}
            className="w-full md:w-1/2 lg:w-1/2 cursor-pointer"
            type="submit"
          >
            {isPending ? (
              <>
                <Spinner className="size-4" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BlogForm;
