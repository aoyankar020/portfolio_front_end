// import ProjectDetails from "@/components/modules/projects/projectDetails";
// import { IProject } from "@/type";



// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const projectData = await fetch(
//     `${process.env.NEXT_PUBLIC_BaseURL}/project/${id}`,
//     {
//       next: {
//         revalidate: 30,
//       },
//     }
//   );
//   const projectResponse = !projectData.ok ? null : await projectData.json();
//   const project = await projectResponse?.data?.data;
//   return {
//     title: `${project.title} | My Portfolio`,
//     description: project.content,
//   };
// }

// export async function generateStaticParams() {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/project`);
//   const projectResponse = !response.ok ? null : await response.json();
//   const projects: IProject[] = await projectResponse?.data?.data;
 

//   return projects.slice(0, 5).map((project) => ({
//     id: project.id,
//   }));
// }
// async function Project({ params }: { params: Promise<{ id: string }> }) {
//    const { id } = await params;
//   const projectData = await fetch(
//     `${process.env.NEXT_PUBLIC_BaseURL}/project/${id}`,
//     {
//       next: {
//         revalidate: 30,
//       },
//     }
//   );

//   const projectResponse = !projectData.ok ? null : await projectData.json();
//   const project = await projectResponse?.data?.data;

//   return (<>
//   <div className="w-full">

//   <ProjectDetails key={project.id} project={project}/>
//   </div>
  
//   </>)
    
  
 
 
// }

// export default Project;




import ProjectDetails from "@/components/modules/projects/projectDetails";
import { IProject } from "@/type";

// ✅ Generate metadata safely
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  let project = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/project/${id}`, {
      next: { revalidate: 30 },
    });

    if (res.ok) {
      const json = await res.json();
      project = json?.data?.data ?? null;
    }
  } catch (err) {
    console.error("Failed to fetch project metadata:", err);
  }

  return {
    title: project?.title ? `${project.title} | My Portfolio` : "Project | My Portfolio",
    description: project?.content ?? "Project content not available",
  };
}

// ✅ Generate static params safely
export async function generateStaticParams() {
  let projects: IProject[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/project`);
    if (res.ok) {
      const json = await res.json();
      projects = json?.data?.data ?? [];
    }
  } catch (err) {
    console.error("Failed to fetch projects for static params:", err);
    projects = [];
  }

  // ⚡ Safe slice & fallback ID
  return projects.slice(0, 5).map((project) => ({
    id: project.id?.toString() ?? "unknown",
  }));
}

// ✅ Page component
async function Project({ params }: { params: { id: string } }) {
  const { id } = params;
  let project = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/project/${id}`, {
      next: { revalidate: 30 },
    });

    if (res.ok) {
      const json = await res.json();
      project = json?.data?.data ?? null;
    }
  } catch (err) {
    console.error("Failed to fetch project:", err);
  }

  if (!project) return <p>Project not found</p>;

  return (
    <div className="w-full">
      <ProjectDetails key={project.id} project={project} />
    </div>
  );
}

export default Project;





