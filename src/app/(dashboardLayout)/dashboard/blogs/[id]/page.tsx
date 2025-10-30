import BlogForm from "@/components/modules/blogs/BlogForm";
import UpdateBlogForm from "@/components/modules/blogs/updateBlog";
import Image from "next/image";
type Props = {
  params: {
    id: string;
  };
};
async function SingleBlog({ params }: Props) {
  const { id } = params;
  // ✅ Server-side fetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/blog/${id}`, {
    cache: "no-store",
  });
  const json = await res.json();
  const blog = json?.data?.data;
  return (
    <section className="relative mx-auto shadow-2xl px-20 py-10 rounded-2xl   w-1/2">
      <div className="text-center  pb-6">
        <h1 className="text-xl uppercase font-semibold">{blog?.title} </h1>
      </div>
      <div className="relative w-full mx-auto aspect-[16/9] rounded-xl mb-10 ">
        <Image
          // Use nullish coalescing to ensure src is always a string
          src={
            blog.coverImage && blog.coverImage !== ""
              ? blog?.coverImage
              : "/globe.svg"
          }
          alt="Blog img"
          fill
          className="object-contain rounded-3xl"
        />
      </div>
      <div className="w-full ">
        {/* <BlogForm /> */}
        <UpdateBlogForm blog={blog} />
      </div>
    </section>
  );
}

export default SingleBlog;
