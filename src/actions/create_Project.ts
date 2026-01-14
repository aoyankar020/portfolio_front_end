

export async function submitProjectForm(formdata: FormData) {
  console.log("Project Form Data:", formdata);
  // Convert form data to object
  // const raw = Object.fromEntries(formdata.entries());
  // console.log("From Project Action:", raw);

  // const parsed = projectSchema.safeParse(raw);
  // if (!parsed.success) {
  //   return { error: "Invalid form data" };
  // }
  // console.log("Parsed Project Data,", parsed);

  // const { ...parsedData } = parsed.data;
  // const modifiedProjectData = {
  //   ...parsedData,
  //   ownerId: "cmgnkihw80000upj42jcvk0j5",
  // };

  const baseURL = process.env.NEXT_PUBLIC_BaseURL;
  const response = await fetch(`${baseURL}/project/create`, {
    method: "POST",

    body: formdata,
  });
  const data = await response.json();

  return data;
}
