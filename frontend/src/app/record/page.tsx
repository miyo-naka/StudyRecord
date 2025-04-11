import { ContentsCard } from "@/components/ContentsCard";
import Header from "@/components/Header";

export default function record() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow px-4 py-10">
        {/* ヒーローセクション */}
        <section className="text-center mb-16">
          <h1 className="mb-4">Learning Tracker</h1>
          <p className="text-gray-500 text-lg">
            学びを記録して、成長を見える化しよう
          </p>
        </section>

        {/* 機能カードエリア */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ContentsCard
            title="Create Record"
            description="今日の学習内容を記録しましょう"
            href="/record"
            emoji="✍️"
            color="bg-peach-50"
          />
          <ContentsCard
            title="View History"
            description="過去の記録を確認・編集"
            href="/history"
            emoji="📖"
            color="bg-blue-50"
          />
          <ContentsCard
            title="Search by Genre"
            description="ジャンル別に絞り込み"
            href="/history"
            emoji="🔍"
            color="bg-green-50"
          />
          <ContentsCard
            title="My Page"
            description="ユーザー情報を確認"
            href="/mypage"
            emoji="👤"
            color="bg-gray-100"
          />
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
