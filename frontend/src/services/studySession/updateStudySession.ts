import { StudySession } from "./createStudySession";
import getCookieValue from "../auth/getCookieValue";

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
  const token = getCookieValue("XSRF-TOKEN");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions/${sessionId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(token ?? ""),
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
