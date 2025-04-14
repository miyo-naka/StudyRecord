export type CreateStudySessionInput = {
  user_id: number;
  category_id: number;
  content: string;
};

export type StudySession = {
  id: number;
  start_time: string;
  finish_time: string | null;
  category_id: number;
  content: string;
  user_id: number;
};

export default async function createStudySession(
  input: CreateStudySessionInput
): Promise<StudySession> {
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

  const data = await res.json();
  return data;
}
