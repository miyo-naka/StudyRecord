import getCookieValue from "../auth/getCookieValue";

export type CreateStudySessionInput = {
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
  const token = getCookieValue("XSRF-TOKEN");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/study-sessions`,
    {
      method: "POST",
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
    throw new Error("failed to record session");
  }

  const data = await res.json();
  return data;
}
