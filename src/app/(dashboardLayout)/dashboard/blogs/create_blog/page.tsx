import BlogForm from "@/components/modules/blogs/BlogForm";

function CreateBlog() {
  return (
    <section className=" lg:mx-auto shadow-2xl lg:p-10 rounded-2xl p-10  lg:w-1/2">
      <div className="text-center  pb-10">
        <h1 className="text-xl uppercase font-semibold">Add NEW Blog</h1>
      </div>
      <div className=" w-full ">
        <BlogForm />
      </div>
    </section>
  );
}

export default CreateBlog;
