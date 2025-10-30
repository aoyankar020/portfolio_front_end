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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { projectSchema } from "@/type/schema";
import { TagInput } from "@/components/TagInput";

import { updateProjectForm } from "@/actions/updateProject";
import UploadFile from "@/components/FileUpload";
import { useSession } from "next-auth/react";

export default function UpdateProjectForm({ project }: { project: any }) {
  const { data: session } = useSession();
  const ownerId = session?.user?.id;

  console.log("Projects Details:", project);
  const [isPending, startTransition] = useTransition();
  const projectForm = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema as any),
    defaultValues: {
      title: project.title || "",
      description: project.description || "",
      thumbnail: project.thumbnail || "",
      features: project.features || [],
      gitLink: project.gitLink || "",
      liveSite: project.liveSite || "",
      technologies: project.technologies || [],
      ownerId: project.ownerId || "sdfasdasdf",
    },
  });
  const onSubmit = (data: z.infer<typeof projectSchema>) => {
    const formdata = new FormData();

    formdata.append("title", data.title);
    formdata.append("description", data.description);
    if (data.thumbnail) {
      if (data.thumbnail instanceof File) {
        formdata.append("thumbnail", data.thumbnail);
      }
    }
    formdata.append("ownerId", ownerId as string);
    formdata.append("gitLink", data.gitLink as string);
    formdata.append("liveSite", data.liveSite as string);
    // Convert arrays to JSON strings before appending to FormData
    formdata.append("technologies", JSON.stringify(data.technologies));
    formdata.append("features", JSON.stringify(data.features));

    startTransition(async () => {
      const projectData = await updateProjectForm(formdata, project.id);

      console.log("Update Project Data:", projectData);
      if (projectData?.sucess) {
        toast.error(`${projectData.error}`);
        console.log(projectData.error);
      } else {
        toast.success(`${projectData.message}`);
        projectForm.reset();
        redirect("/dashboard/projects");
      }
    });
  };
  return (
    <Form {...projectForm}>
      <form onSubmit={projectForm.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={projectForm.control}
          name="ownerId"
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <FormField
          control={projectForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
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
          control={projectForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Description</FormLabel>
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
        <FormField
          control={projectForm.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Thumbnail </FormLabel>
              <FormControl>
                <UploadFile onFileSelect={(file) => field.onChange(file)} />
                {/* <URLInput placeholder="example.com" {...field} /> */}
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={projectForm.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Features </FormLabel>
              <FormControl>
                <TagInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Add feature"
                />
              </FormControl>
              <FormDescription>
                Press <kbd>Enter</kbd> to add each feature
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={projectForm.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Used Technology </FormLabel>
              <FormControl>
                <TagInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Add technology"
                />
              </FormControl>
              <FormDescription>
                Press <kbd>Enter</kbd> to add each technology
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={projectForm.control}
          name="gitLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository Link </FormLabel>
              <FormControl>
                <URLInput placeholder="example.com" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={projectForm.control}
          name="liveSite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live Link </FormLabel>
              <FormControl>
                <URLInput placeholder="example.com" {...field} />
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
            className="w-full md:w-1/2 lg:w-1/2 cursor-pointer"
            type="submit"
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
