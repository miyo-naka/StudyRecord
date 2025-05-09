import getCookieValue from "../auth/getCookieValue";

export type UpdateUserInput = {
  name: string;
  email: string;
  password?: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

export default async function updateUser(
  input: UpdateUserInput
): Promise<User> {
  const token = getCookieValue("XSRF-TOKEN");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: "PUT",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": decodeURIComponent(token ?? ""),
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("failed to update user");
  }

  const data = await res.json();
  return data;
}
