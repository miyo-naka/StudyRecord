"use client";

import ContentsCard from "@/components/ContentsCard";
import Header from "@/components/Header";
import StartLearningModal from "@/components/StartLearningModal";
import finishRest from "@/services/rest/finishRest";
import startRest from "@/services/rest/startRest";
import finishStudySession from "@/services/studySession/finishStudySession";
import statusStudySession from "@/services/studySession/statusStudySession";
import { useEffect, useState } from "react";

export default function record() {
  type Status = "idle" | "learning" | "break";
  const [status, setStatus] = useState<Status>("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);

  //学習ステータス取得
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await statusStudySession();
        console.log(data);
        setStatus(data.status);
        if (data.session_id) {
          setCurrentSessionId(data.session_id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStatus();
  }, []);

  // 学習開始(モーダル内で作成後)
  const handleSessionCreated = (id: number) => {
    setCurrentSessionId(id);
    setStatus("learning");
  };

  // 学習終了
  const handleFinishStudy = async () => {
    if (currentSessionId) {
      try {
        await finishStudySession(currentSessionId);
        setStatus("idle");
      } catch (error) {
        console.error("学習終了エラー:", error);
      }
    }
  };

  //休憩開始
  const handleStartRest = async () => {
    if (currentSessionId) {
      try {
        await startRest(currentSessionId);
        setStatus("break");
      } catch (error) {
        console.error("休憩開始エラー:", error);
      }
    }
  };

  //休憩終了
  const handleFinishRest = async () => {
    if (currentSessionId) {
      try {
        await finishRest(currentSessionId);
        setStatus("learning");
      } catch (error) {
        console.error("休憩開始エラー:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow px-4 py-10">
        {/* ヒーローセクション */}
        <section className="text-center mb-16">
          <h1 className="mb-4">Create Record</h1>
          <p className="text-gray-500 text-lg">
            今日の学習内容を記録しましょう
          </p>
        </section>

        {/* 機能カードエリア */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ContentsCard
            title="Start Learning"
            description="学習を開始します"
            emoji="⏱️"
            color="bg-peach-50"
            disabled={status !== "idle"}
            onClick={() => setIsModalOpen(true)}
          />
          <StartLearningModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSessionCreated={handleSessionCreated}
          />
          <ContentsCard
            title="Finish Learning"
            description="学習を終了します"
            emoji="🏅"
            color="bg-peach-50"
            disabled={status !== "learning"}
            onClick={handleFinishStudy}
          />
          <ContentsCard
            title="Have a break"
            description="休憩を開始します"
            emoji="🍵"
            color="bg-green-50"
            disabled={status !== "learning"}
            onClick={handleStartRest}
          />
          <ContentsCard
            title="Start Again"
            description="学習を再開します"
            emoji="🔥"
            color="bg-green-50"
            disabled={status !== "break"}
            onClick={handleFinishRest}
          />
        </section>
      </main>
    </div>
  );
}
