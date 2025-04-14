"use client";

import Header from "@/components/Header";
import fetchStudySessions from "@/services/studySession/fetchStudySession";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// 仮データ
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f"];
const categoryData = [
  { name: "英語", value: 300 },
  { name: "プログラミング", value: 480 },
  { name: "数学", value: 120 },
];
const recentSessions = [
  {
    date: "2025/04/14",
    category: "英語",
    duration: "30分",
    content: "英単語アプリ",
  },
  {
    date: "2025/04/13",
    category: "プログラミング",
    duration: "1時間",
    content: "Laravel学習",
  },
  {
    date: "2025/04/12",
    category: "数学",
    duration: "45分",
    content: "計算ドリル",
  },
];

export default function myProgress() {
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
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-center">
          <div className="bg-white shadow rounded-2xl p-4">
            <p className="text-sm text-gray-500">今週の学習時間</p>
            <p className="text-xl font-bold text-indigo-600">5時間30分</p>
          </div>
          <div className="bg-white shadow rounded-2xl p-4">
            <p className="text-sm text-gray-500">今月の学習時間</p>
            <p className="text-xl font-bold text-green-600">18時間15分</p>
          </div>
          <div className="bg-white shadow rounded-2xl p-4">
            <p className="text-sm text-gray-500">トータル</p>
            <p className="text-xl font-bold text-amber-600">123時間45分</p>
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
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {categoryData.map((entry, index) => (
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
            {recentSessions.map((session, idx) => (
              <div
                key={idx}
                className="bg-white p-4 shadow rounded-xl text-sm sm:text-base"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="font-semibold">{session.date}</span>
                  <span>
                    {session.category} | {session.duration} | {session.content}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
