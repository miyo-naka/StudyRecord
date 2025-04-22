export default async function showStudySessions(sessionId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions/${sessionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to get study-session");
  }

  const data = await res.json();
  return data;
}
