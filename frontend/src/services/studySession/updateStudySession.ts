import { StudySession } from "./createStudySession";

export type UpdateStudySessionInput = {
  category_id: number;
  content: string;
  start_time: string;
  finish_time: string;
};

export default async function updateStudySession(
  sessionId: number,
  input: UpdateStudySessionInput
): Promise<StudySession> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions/${sessionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  if (!res.ok) {
    throw new Error("failed to update session");
  }

  const data = await res.json();
  return data;
}
