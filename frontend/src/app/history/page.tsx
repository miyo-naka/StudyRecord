"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import fetchStudySessions from "@/services/studySession/fetchStudySession";

export default function history() {
  const [sessions, setSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  //学習時間を取得して計算
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetchStudySessions(currentPage);
        const processedData = response.data.map((session: any) => {
          const date = new Date(session.start_time).toISOString().split("T")[0];

          if (!session.finish_time) {
            return {
              ...session,
              date,
              duration: "Learning",
            };
          }

          // セッション全体の学習時間（ミリ秒）
          const totalDurationMs =
            new Date(session.finish_time).getTime() -
            new Date(session.start_time).getTime();

          // 休憩時間の合計（ミリ秒）
          const totalRestMs =
            session.rests?.reduce((acc: number, rest: any) => {
              if (rest.finish_time) {
                const restDuration =
                  new Date(rest.finish_time).getTime() -
                  new Date(rest.start_time).getTime();
                return acc + restDuration;
              }
              return acc;
            }, 0) ?? 0;

          // 有効な学習時間（ミリ秒 → 時間へ変換）
          const effectiveDurationHours =
            (totalDurationMs - totalRestMs) / 1000 / 60 / 60;
          const duration = Math.floor(effectiveDurationHours * 10) / 10;

          return {
            ...session,
            date: date,
            duration: duration,
          };
        });
        setSessions(processedData);
        setLastPage(response.last_page);
      } catch (error) {
        console.error("取得エラー:", error);
      }
    };
    fetchSessions();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow px-4 py-10">
        {/* ヒーローセクション */}
        <section className="text-center mb-16">
          <h1 className="mb-4">History</h1>
          <p className="text-gray-500 text-lg">
            ここまでの学びの記録を振り返り
          </p>
        </section>

        {/* 一覧表示エリア */}
        <div className="w-[95%] sm:w-[80%] mb-5 mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr className="[&>th]:py-3 [&>th]:px-4 text-left text-sm font-semibold text-gray-700">
                <th>Date</th>
                <th>Hours</th>
                <th>Category</th>
                <th>Content</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessions.map((session: any) => (
                <tr
                  key={session.id}
                  className="[&>td]:py-3 [&>td]:px-4 hover:bg-gray-50 transition-colors"
                >
                  <td>{session.date}</td>
                  <td>{session.duration}</td>
                  <td>{session.category.category_name}</td>
                  <td>{session.content}</td>
                  <td>
                    <button className="text-sm text-blue-600 hover:underline">
                      編集
                    </button>
                  </td>
                  <td>
                    <button className="text-sm text-red-500 hover:underline">
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ページネーション */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            前へ
          </button>

          <span>
            {currentPage} / {lastPage}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, lastPage))
            }
            disabled={currentPage === lastPage}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            次へ
          </button>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
