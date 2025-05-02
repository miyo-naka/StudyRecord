import getCookieValue from "../auth/getCookieValue";

export default async function startRest(study_session_id: number) {
  const token = getCookieValue("XSRF-TOKEN");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rests/start`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(token ?? ""),
      },
      body: JSON.stringify({ study_session_id }),
    }
  );

  if (!res.ok) {
    throw new Error("failed to start rest");
  }

  const data = await res.json();
  return data;
}
