import { authOptions } from "@/helpers/authOptions";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const handler = NextAuth(authOptions);
export const POS = async (req: Request) => {
  const formData = await req.formData();
  const images = formData.getAll("images") as File[];

  if (!images || images.length === 0) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const uploadedFiles = [];

  for (const file of images) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadsDir, file.name);
    fs.writeFileSync(filePath, buffer);
    uploadedFiles.push({ name: file.name, url: `/uploads/${file.name}` });
  }

  return NextResponse.json({ files: uploadedFiles });
};
export { handler as GET, handler as POST };
