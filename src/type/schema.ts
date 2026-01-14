import { zodResolver } from "@hookform/resolvers/zod";
import { File } from "buffer";
import { useForm } from "react-hook-form";
import z from "zod";

export const trimmedNonEmptyString = z
  .string()
  .trim()
  .min(1, { message: "This field cannot be empty." });

const optionalUrl = z
  .string()
  .url({ message: "Invalid URL format." })
  .optional()
  .or(z.literal(""));
export const stringArrayPreprocess = z.preprocess((value) => {
  if (typeof value === "string") {
    try {
      // Parse JSON if it's a stringified array
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      // If it's a single string, wrap it into an array
      return [parsed];
    } catch {
      // If parsing fails, split by comma
      return value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }
  }

  // If already an array (e.g. from frontend), just return it
  if (Array.isArray(value)) return value;

  // Default empty array if undefined/null
  return [];
}, z.array(z.string().trim().min(1, { message: "Item cannot be empty." })));

export const blogformSchema = z.object({
  title: z.string().min(10, {
    message: "title must be at least 10 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be 20 charecture",
  }),
  coverImage: z.instanceof(Blob).optional(),
});
// export const projectSchema = z.object({
//   title: z
//     .string()
//     .trim()
//     .min(3, { message: "Title must be at least 3 characters." })
//     .max(120, { message: "Title is too long." }),

//   thumbnail: z.instanceof(File).optional(),

//   gitLink: optionalUrl,
//   liveSite: optionalUrl,

//   description: z
//     .string()
//     .trim()
//     .min(20, { message: "Description must be at least 20 characters." })
//     .max(5000, { message: "Description is too long." }),

//   features: stringArrayPreprocess, // default []
//   technologies: stringArrayPreprocess, // default []

//   ownerId: z.string().optional(),
// });
export const projectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(120, { message: "Title is too long." }),

  thumbnail: z
    .any()
    .refine(
      (file) =>
        !file || // optional
        (typeof file === "object" &&
          file !== null &&
          "name" in file &&
          "size" in file &&
          "type" in file),
      { message: "Invalid file upload" }
    )
    .optional(),

  gitLink: optionalUrl,
  liveSite: optionalUrl,

  description: z
    .string()
    .trim()
    .min(20, { message: "Description must be at least 20 characters." })
    .max(5000, { message: "Description is too long." }),

  features: stringArrayPreprocess,
  technologies: stringArrayPreprocess,

  ownerId: z.string().optional(),
});

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(20, { message: "Name is too long." }),
  id: z.string(),

  picture: z
    .any()
    .refine(
      (file) =>
        !file || // allow optional
        (typeof file === "object" &&
          file !== null &&
          "name" in file &&
          "size" in file &&
          "type" in file),
      { message: "Invalid file upload." }
    )
    .optional(),

  email: z.string().email({ message: "Email is invalid." }),

  role: z
    .string()
    .trim()
    .min(4, { message: "Role must be at least 4 characters." }),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
