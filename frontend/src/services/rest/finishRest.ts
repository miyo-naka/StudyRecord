export default async function finishRest(study_session_id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rests/finish`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ study_session_id }),
    }
  );

  if (!res.ok) {
    throw new Error("failed to finish rest");
  }

  const data = await res.json();
  return data;
}
