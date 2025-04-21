export default async function fetchMyProgress() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/culculator`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("failed to get myprogress");
  }

  const data = await res.json();
  return data;
}
