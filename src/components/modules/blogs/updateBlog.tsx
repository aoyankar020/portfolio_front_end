/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { redirect } from "next/navigation";

import URLInput from "@/components/comp-11";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,

} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateBlogForm } from "@/actions/updateBlogForm";
import { SquarePen } from "lucide-react";

const formSchema = z.object({
  title: z
    .string()
    .min(10, { message: "title must be at least 10 characters." }),
  content: z.string().min(10, { message: "Content must be 20 characters" }),
  coverImage: z.string().optional(),
});

export default function UpdateBlogForm({ blog }: { blog: any }) {
  console.log("Blog:", blog);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      coverImage: blog?.coverImage || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("coverImage", values.coverImage ?? "");

    startTransition(async () => {
      const result = await updateBlogForm(formData, blog.id);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message);
        form.reset();
        redirect("/dashboard/blogs");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Title</FormLabel>
              <FormControl>
                <Input placeholder="Title here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your content here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* cover image */}
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <URLInput placeholder="example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full text-center">
          <Button disabled={isPending} type="submit" className="w-1/2">
            {isPending ? (
              <>
                <SquarePen className="text-gray-100 text-sm" />
                Updating...
              </>
            ) : (
              <>
                <SquarePen className="text-gray-100 text-sm" />
                Update
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
