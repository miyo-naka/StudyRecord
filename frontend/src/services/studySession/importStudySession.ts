import getCookieValue from "../auth/getCookieValue";

export default async function importStudySession(formData: FormData) {
  console.log(formData);
  const token = getCookieValue("XSRF-TOKEN");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/import`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "X-XSRF-TOKEN": decodeURIComponent(token ?? ""),
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("failed to import Excel data");
  }

  const jsondata = await res.json();
  return jsondata.data;
}
