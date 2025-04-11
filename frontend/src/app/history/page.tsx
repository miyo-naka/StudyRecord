"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { fetchStudySessions } from "@/services/studySession/fetchStudySession";

export default function history() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await fetchStudySessions();
        console.log("取得データ:", data);
        setSessions(data);
      } catch (error) {
        console.error("取得エラー:", error);
      }
    };

    fetchSessions();
  }, []);

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
                  <td>{session.start_time}</td>
                  <td>{session.finish_time}</td>
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
      </main>

      {/* <Footer /> */}
    </div>
  );
}
