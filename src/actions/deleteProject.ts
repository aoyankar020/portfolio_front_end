export const deleteProject = async (blogId: string) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BaseURL;

    const response = await fetch(`${baseURL}/project/delete/${blogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const err = await response.json();
      return {
        success: false,
        error: err.message || "Failed to delete Project.",
      };
    }

    const { success, message } = await response.json();
    return { success, message };
  } catch (error) {
    console.error("Delete Project Error:", error);
    return { success: false, error: "Something went wrong." };
  }
};
