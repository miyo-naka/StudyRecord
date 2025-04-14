export type CreateStudySessionInput = {
  user_id: number;
  category_id: number;
  content: string;
};

export const createStudySessions = async (input: CreateStudySessionInput) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  if (!res.ok) {
    throw new Error("failed to record session");
  }

  const jsondata = await res.json();
  return jsondata.data;
};
