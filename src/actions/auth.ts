import { FieldValues } from "react-hook-form";

export const login = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("Action Auth:", res);
  if (!res?.ok) {
    console.error("Login Failed", await res.text());
  }
  return await res.json();
};
