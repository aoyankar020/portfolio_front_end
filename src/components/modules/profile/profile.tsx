/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { updateProfileForm } from "@/actions/updateProfile";


import UploadFile from "@/components/FileUpload";

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


import { profileSchema } from "@/type/schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

import {  useRouter } from "next/navigation";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// Component
function Profile() {

 
 const { data: session, update,status } = useSession();
  console.log("Profile Session Data:",session)

   const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const profile = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema as any),
    defaultValues: {
      name: "",
    id: "",
    email: "",
    role: "",
    picture: [],
    createdAt: "",
    updatedAt: "",
      // name: session?.user.name || "",
      // id: session?.user.id || "",
      // email: session?.user.email || "",
      // role: session?.user.role || "",
      // picture: session?.user.picture || [],
      // createdAt: session?.user.createdAt || "",
      // updatedAt: session?.user.updatedAt || "",
    },
  });
  useEffect(() => {
  if (status === "authenticated") {
    profile.reset({
      name: session?.user?.name || "",
      id: session?.user?.id || "",
      email: session?.user?.email || "",
      role: session?.user?.role || "",
      picture: session?.user?.picture || [],
      createdAt: session?.user?.createdAt || "",
      updatedAt: session?.user?.updatedAt || "",
    });
  }
}, [status, session]);
  const onSubmit = (formFields: z.infer<typeof profileSchema>) => {
    console.log("Submitting form...");
    const formdata = new FormData();
    formdata.append("name", formFields.name);
    formdata.append("email", formFields.email);
    formdata.append("id", formFields.id);
    if (formFields.picture) {
      if (formFields.picture instanceof File) {
        formdata.append("picture", formFields.picture);
      }
    }

    formdata.append("role", formFields.role as string);
    // formdata.append("updatedAt", formFields.updatedAt as string);
    // // Convert arrays to JSON strings before appending to FormData
    // formdata.append("createdAt", formFields.updatedAt as string);

    startTransition(async () => {
      const ProfileData = await updateProfileForm({
        formData: formdata,
        uId: formFields.id,
      });
      console.log("Profile Update Response :", ProfileData);
      if (!ProfileData?.success) {
        toast.error(`${ProfileData.error}`);
        console.log(ProfileData.error);
      } else {
         // ✅ Update NextAuth session immediately
       await update({
     id: session?.user.id,
  name: formFields.name,
  email: formFields.email,
  role: session?.user.role,
  picture: ProfileData?.data?.picture || session?.user.picture,
  createdAt: session?.user.createdAt,
  updatedAt: new Date().toISOString(),
  accessToken: (session as any).accessToken,
  refreshToken: (session as any).refreshToken,
    
   
  });
        toast.success(`${ProfileData.message}`);
        profile.reset();
         // 👇 Update NextAuth session with new profile data
 
        router.refresh()
        router.push("/dashboard/profile");
        // redirect("/dashboard/projects");
      }
    });
  };
  return (
   <>
   {
    status==="loading" ?<h1>Loading </h1>:<Form {...profile}>
      <form onSubmit={profile.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={profile.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">User ID</FormLabel>
              <FormControl>
                <Input readOnly placeholder="Title here..." {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={profile.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">User Name</FormLabel>
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
          control={profile.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">User Email</FormLabel>
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
          control={profile.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">Role</FormLabel>
              <FormControl>
                <Input readOnly placeholder="Title here..." {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={profile.control}
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">Profile Picture </FormLabel>
              <FormControl>
                <UploadFile onFileSelect={(file) => field.onChange(file)} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={profile.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">
                Profile Creation Date{" "}
              </FormLabel>
              <FormControl>
                <Input readOnly placeholder="Title here..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={profile.control}
          name="updatedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-left">Profile Update Date </FormLabel>
              <FormControl>
                <Input readOnly placeholder="Title here..." {...field} />
              </FormControl>

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
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
   }
   </>
  );
}

export default Profile;
