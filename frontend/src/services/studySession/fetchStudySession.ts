export default async function fetchStudySessions(page: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("failed to get study-sessions");
  }

  const jsondata = await res.json();
  return jsondata.data;
}
