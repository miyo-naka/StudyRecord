export default async function finishStudySession(sessionId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions/${sessionId}/finish`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to finish session");
  }

  const jsondata = await res.json();
  return jsondata.data;
}
