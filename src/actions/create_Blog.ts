"use server";
import { blogformSchema } from "@/type/schema";

export async function submitBlogForm(formdata: FormData) {
  // const raw = Object.fromEntries(formdata.entries());
  // console.log("From Action:", raw);

  // const parsed = blogformSchema.safeParse(raw);
  // if (!parsed.success) {
  //   return { error: "Invalid form data" };
  // }
  // console.log("Parsed,", parsed.data);

  // const { title, content, coverImage } = parsed.data;
  // const modifiedData = {
  //   title,
  //   content,
  //   coverImage,
  //   authorId: "cmgnkihw80000upj42jcvk0j5",
  // };
  // console.log("Modified:", modifiedData);
  const baseURL = process.env.NEXT_PUBLIC_BaseURL;
  const response = await fetch(`${baseURL}/blog/create`, {
    method: "POST",

    body: formdata,
  });

  const data = await response.json();

  console.log("Backend Response Data:", data);

  return data;
}
