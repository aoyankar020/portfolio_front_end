"use server";
import { blogformSchema } from "@/type/schema";

export async function updateBlogForm(formData: FormData, id: string) {
  try {
    // Convert FormData → plain object
    const raw = Object.fromEntries(formData.entries());
    console.log("Raw data:", raw);

    // Validate with Zod
    const parsed = blogformSchema.safeParse(raw);
    if (!parsed.success) {
      console.error("Validation error:", parsed.error.flatten());
      return { error: "Invalid form data", details: parsed.error.flatten() };
    }

    const { title, content, coverImage } = parsed.data;

    const modifiedData = {
      title,
      content,
      coverImage,
      authorId: "cmgnkihw80000upj42jcvk0j5", // ✅ (you might want to pass this dynamically)
    };

    const baseURL = process.env.NEXT_PUBLIC_BaseURL;

    const response = await fetch(`${baseURL}/blog/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Update failed:", errorData);
      return { error: errorData.message || "Failed to update blog" };
    }

    const { success, message, data } = await response.json();
    return { success, message, data };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "Something went wrong while updating the blog." };
  }
}
