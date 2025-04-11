import { ContentsCard } from "@/components/ContentsCard";
import Header from "@/components/Header";

export default function record() {
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
            href="/"
            emoji="⏱️"
            color="bg-peach-50"
          />
          <ContentsCard
            title="Finish Learning"
            description="学習を終了します"
            href="/"
            emoji="🏅"
            color="bg-peach-50"
          />
          <ContentsCard
            title="Have a break"
            description="休憩を開始します"
            href="/history"
            emoji="🍵"
            color="bg-green-50"
          />
          <ContentsCard
            title="Start Again"
            description="学習を再開します"
            href="/mypage"
            emoji="🔥"
            color="bg-green-50"
          />
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
