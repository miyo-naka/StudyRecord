"use client";

import Header from "@/components/Header";
import fetchCategories from "@/services/category/fetchCategories";
import fetchMypage from "@/services/mypage/fetchMypage";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type SummaryData = {
  total: number;
  weekTotal: number;
  monthTotal: number;
  categoryTotal: Record<string, number>;
  recentRecords: {
    date: string;
    category_id: number;
    content: string;
    duration: number;
  }[];
};

export default function myProgress() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [categories, setCategories] = useState<
    { id: number; category_name: string }[]
  >([]);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c"];

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await fetchMypage();
        setSummary(data);
      } catch (error) {
        console.error("マイページデータ取得エラー:", error);
      }
    };
    fetchSummary();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const categoryMap: Record<string, string> = categories.reduce(
    (acc: Record<string, string>, category: any) => {
      acc[category.id] = category.name;
      return acc;
    },
    {}
  );

  // categoryTotal をチャート用データに変換
  const pieData =
    summary && categories.length > 0
      ? Object.entries(summary.categoryTotal).map(([key, value]) => ({
          name: categoryMap[key] ?? `カテゴリー${key}`,
          value,
        }))
      : [];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow px-4 py-10">
        {/* ヒーローセクション */}
        <section className="text-center mb-16">
          <h1 className="mb-4">My Page</h1>
          <p className="text-gray-500 text-lg">
            ユーザー名さんの学習状況を確認
          </p>
        </section>

        {/* 情報表示エリア */}
        {/* サマリー */}

        {summary ? (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-center">
              <div className="bg-white shadow rounded-2xl p-4">
                <p className="text-sm text-gray-500">今週の学習時間</p>
                <p className="text-xl font-bold text-indigo-600">
                  {summary.weekTotal.toFixed(1)}時間
                </p>
              </div>
              <div className="bg-white shadow rounded-2xl p-4">
                <p className="text-sm text-gray-500">今月の学習時間</p>
                <p className="text-xl font-bold text-green-600">
                  {summary.monthTotal.toFixed(1)}時間
                </p>
              </div>
              <div className="bg-white shadow rounded-2xl p-4">
                <p className="text-sm text-gray-500">トータル</p>
                <p className="text-xl font-bold text-amber-600">
                  {summary.total.toFixed(1)}時間
                </p>
              </div>
            </section>

            {/* カテゴリー別グラフ */}
            <section className="mb-12">
              <h2 className="text-lg font-semibold mb-4">
                📊 カテゴリー別の学習時間
              </h2>
              <div className="h-64 bg-white rounded-2xl shadow p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* 最近の記録 */}
            <section>
              <h2 className="text-lg font-semibold mb-4">🕓 最近の学習記録</h2>
              <div className="space-y-3">
                {summary.recentRecords.map((session, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 shadow rounded-xl text-sm sm:text-base"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <span className="font-semibold">{session.date}</span>
                      <span>
                        {session.category_id} | {session.duration.toFixed(1)} |{" "}
                        {session.content}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <p>読み込み中...</p>
        )}
      </main>
    </div>
  );
}
