export default async function statusStudySession(userId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions/status/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to get session status");
  }

  const data = await res.json();
  return data;
}
