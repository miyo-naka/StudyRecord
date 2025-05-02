export default async function statusStudySession() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions/status`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to get session status");
  }

  const data = await res.json();
  return data;
}
