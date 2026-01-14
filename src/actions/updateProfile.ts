
import { getSession } from "next-auth/react";

export async function updateProfileForm({
  formData,
  uId,
}: {
  formData: FormData;
  uId: string;
}) {
 
  const session = await getSession();
  const baseURL = process.env.NEXT_PUBLIC_BaseURL;
  const response = await fetch(`${baseURL}/user/update/${uId}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    cache: "no-store",
  });
  const responseData = await response.json();
  return responseData;
}
