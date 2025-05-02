import getCookieValue from "../auth/getCookieValue";

export default async function finishStudySession(sessionId: number) {
  const token = getCookieValue("XSRF-TOKEN");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions/${sessionId}/finish`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(token ?? ""),
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to finish session");
  }

  const jsondata = await res.json();
  return jsondata.data;
}
