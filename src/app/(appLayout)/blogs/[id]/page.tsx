// import BlogDetails from "@/components/modules/blogs/blogDetails";
// import { IBlog } from "@/type";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const blogData = await fetch(
//     `${process.env.NEXT_PUBLIC_BaseURL}/blog/${id}`,
//     {
//       next: {
//         revalidate: 30,
//       },
//     }
//   );
//   const blogResponse = !blogData.ok ? null : await blogData.json();
//   const blog = await blogResponse?.data?.data;
//   return {
//     title: `${blog.title} | My Portfolio`,
//     description: blog.content,
//   };
// }
// // Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/blog`);
//   const blogResponse = !response.ok ? null : await response.json();
//   const blogs: IBlog[] = await blogResponse?.data?.data;
//   console.log("IBLOG :", blogs);

//   return blogs.slice(0, 5).map((blog) => ({
//     id: blog.id,
//   }));
// }
// async function Blog({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const blogData = await fetch(
//     `${process.env.NEXT_PUBLIC_BaseURL}/blog/${id}`,
//     {
//       next: {
//         revalidate: 30,
//       },
//     }
//   );

//   const blogResponse = !blogData.ok ? null : await blogData.json();
//   const blog = await blogResponse?.data?.data;

//   return (
//     <>
//       <div className="w-full">
//         <BlogDetails key={blog.id} blog={blog} />
//       </div>
//     </>
//   );
// }

// export default Blog;
import BlogDetails from "@/components/modules/blogs/blogDetails";
import { IBlog } from "@/type";

// ✅ Generate metadata safely
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  let blog = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/blog/${id}`, {
      next: { revalidate: 30 },
    });

    if (res.ok) {
      const json = await res.json();
      blog = json?.data?.data ?? null;
    }
  } catch (err) {
    console.error("Failed to fetch blog metadata:", err);
  }

  return {
    title: blog?.title ? `${blog.title} | My Portfolio` : "Blog | My Portfolio",
    description: blog?.content ?? "Blog content not available",
  };
}

// ✅ Generate static params safely
export async function generateStaticParams() {
  let blogs: IBlog[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/blog`);
    if (res.ok) {
      const json = await res.json();
      blogs = json?.data?.data ?? [];
    }
  } catch (err) {
    console.error("Failed to fetch blogs for static params:", err);
    blogs = [];
  }

  // ⚡ Safe: fallback empty array
  return blogs.slice(0, 5).map((blog) => ({
    id: blog.id?.toString() ?? "unknown",
  }));
}

// ✅ Page component
async function Blog({ params }: { params: { id: string } }) {
  const { id } = params;
  let blog = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/blog/${id}`, {
      next: { revalidate: 30 },
    });

    if (res.ok) {
      const json = await res.json();
      blog = json?.data?.data ?? null;
    }
  } catch (err) {
    console.error("Failed to fetch blog:", err);
  }

  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="w-full">
      <BlogDetails key={blog.id} blog={blog} />
    </div>
  );
}

export default Blog;
