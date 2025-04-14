export default async function fetchStudySessions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("学習セッションの取得に失敗しました");
  }

  const jsondata = await res.json();
  return jsondata.data;
}
