"use client";

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import fetchStudySessions, {
  Pagination,
  StudySession,
} from "@/services/studySession/fetchStudySession";
import UpdateLearningModal from "@/components/UpdateLearningModal";
import showStudySessions from "@/services/studySession/showStudySession";

export default function history() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  //学習時間を取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, pagination } = await fetchStudySessions(currentPage);
        setSessions(data);
        setLastPage(pagination.last_page);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [currentPage, updateTrigger]);

  //時間表示をHH:MMに変換
  const formatMinutesToHHMM = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}`;
  };

  //更新処理(モーダル)
  const handleEdit = async (session: any) => {
    const data = await showStudySessions(session.id);
    setSelectedSession(data);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };
  const handleUpdated = () => {
    setUpdateTrigger((prev) => !prev);
  };

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
                  <td>{formatMinutesToHHMM(session.duration_minutes)}</td>
                  <td>{session.category_name}</td>
                  <td>{session.content}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(session)}
                      className="text-sm text-blue-600 hover:underline"
                    >
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

        {/* 編集モーダル */}
        <UpdateLearningModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          session={selectedSession}
          onUpdated={handleUpdated}
        />

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
    </div>
  );
}
