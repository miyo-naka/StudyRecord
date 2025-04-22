export default async function deleteStudySession(sessionId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions/${sessionId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to delete session");
  }

  const jsondata = await res.json();
  return jsondata.data;
}
