import BlogDetails from "@/components/modules/blogs/blogDetails";
import { IBlog } from "@/type";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogData = await fetch(
    `${process.env.NEXT_PUBLIC_BaseURL}/blog/${id}`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const blogResponse = !blogData.ok ? null : await blogData.json();
  const blog = await blogResponse?.data?.data;
  return {
    title: `${blog.title} | My Portfolio`,
    description: blog.content,
  };
}
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/blog`);
  const blogResponse = !response.ok ? null : await response.json();
  const blogs: IBlog[] = await blogResponse?.data?.data;
  console.log("IBLOG :", blogs);

  return blogs.slice(0, 5).map((blog) => ({
    id: blog.id,
  }));
}
async function Blog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blogData = await fetch(
    `${process.env.NEXT_PUBLIC_BaseURL}/blog/${id}`,
    {
      next: {
        revalidate: 30,
      },
    }
  );

  const blogResponse = !blogData.ok ? null : await blogData.json();
  const blog = await blogResponse?.data?.data;
  console.log("Blog:", blog);
  return (
    <>
      <div className="w-full">
        <BlogDetails key={blog.id} blog={blog} />
      </div>
    </>
  );
}

export default Blog;
