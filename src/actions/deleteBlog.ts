export const deleteBlog = async (blogId: string) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BaseURL;

    const response = await fetch(`${baseURL}/blog/delete/${blogId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const err = await response.json();
      return { success: false, error: err.message || "Failed to delete blog." };
    }

    const { success, message } = await response.json();
    return { success, message };
  } catch (error) {
    console.error("Delete Blog Error:", error);
    return { success: false, error: "Something went wrong." };
  }
};
