export type StudySession = {
  id: number;
  date: string;
  category_id: number;
  category_name: string;
  content: string;
  duration_minutes: number;
};

export type Pagination = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
};

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
  return {
    data: jsondata.data,
    pagination: jsondata.pagination,
  };
}
