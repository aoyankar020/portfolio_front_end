"use server";
import { blogformSchema, projectSchema } from "@/type/schema";

export async function updateProjectForm(formData: FormData, id: string) {
  console.log("Project ID:", id);
  try {
    // Convert FormData → plain object
    const raw = Object.fromEntries(formData.entries());

    // Validate with Zod
    const parsed = projectSchema.safeParse(raw);
    if (!parsed.success) {
      console.error("Validation error:", parsed.error.flatten());
      return { error: "Invalid form data", details: parsed.error.flatten() };
    }

    const { ...rest } = parsed.data;

    const modifiedData = {
      ...rest,
    };

    const baseURL = process.env.NEXT_PUBLIC_BaseURL;

    const response = await fetch(`${baseURL}/project/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Update failed:", errorData);
      return { error: errorData.message || "Failed to update Project" };
    }

    const { success, message, data } = await response.json();
    return { success, message, data };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "Something went wrong while updating the project." };
  }
}
