export default async function startRest(study_session_id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rests/start`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
