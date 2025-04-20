export default async function fetchMypage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mypage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("failed to get mypage");
  }

  const data = await res.json();
  return data;
}
