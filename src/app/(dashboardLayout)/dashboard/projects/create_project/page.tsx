import ProjectForm from "@/components/modules/projects/ProjectForm";

function CreateProject() {
  return (
    <section className=" mx-auto shadow-2xl  rounded-2xl  p-10 lg:w-1/2">
      <div className="text-center  pb-10">
        <h1 className="text-xl uppercase font-semibold">Add NEW Project</h1>
      </div>
      <div className="px-10 ">
        <ProjectForm />
      </div>
    </section>
  );
}

export default CreateProject;
