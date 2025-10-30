"use client";
import { submitProjectForm } from "@/actions/create_Project";
import URLInput from "@/components/comp-11";
import UploadFile from "@/components/FileUpload";
import { TagInput } from "@/components/TagInput";
import { Button } from "@/components/ui/button";
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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema } from "@/type/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { startTransition, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// Component
function ProjectForm() {
  const { data: session, status } = useSession();
  // const id = (session.data?.user as { id?: string } | undefined)?.id; ownerId
  const ownerId = session?.user?.id;
  console.log("Project Session", session?.user?.id);
  const [isPending, startTransition] = useTransition();
  const projectForm = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema as any),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: undefined,
      features: [],
      gitLink: "",
      liveSite: "",
      technologies: [],
      ownerId: "",
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
    formdata.append("gitLink", data.gitLink as string);
    formdata.append("liveSite", data.liveSite as string);
    formdata.append("ownerId", data.ownerId as string);
    // Convert arrays to JSON strings before appending to FormData
    formdata.append("technologies", JSON.stringify(data.technologies));
    formdata.append("features", JSON.stringify(data.features));

    startTransition(async () => {
      const projectData = await submitProjectForm(formdata);
      console.log("Project Data:", projectData);
      // if (projectData?.error) {
      //   toast.error(`${projectData.error}`);
      //   console.log(projectData.error);
      // } else {
      //   console.log("RESULT FROM FORM", projectData);
      //   toast.success(`${projectData.message}`);
      //   projectForm.reset();
      //   redirect("/dashboard/projects");
      // }

      console.log("Project Form Data:", projectData);
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
            {isPending ? (
              <>
                <Spinner className="size-4" />
                Submitting...
              </>
            ) : (
              "Submited"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ProjectForm;
