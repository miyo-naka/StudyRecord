"use client";

import Header from "@/components/Header";
import React from "react";

export default function Mypage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow px-4 py-10">
        {/* ヒーローセクション */}
        <section className="text-center mb-16 mt-16">
          <h1 className="text-2xl font-bold mb-4">My Page</h1>
          <p className="text-gray-500 text-lg">
            ユーザー情報を確認・編集しましょう
          </p>
        </section>

        {/* プロフィール編集フォーム */}
        <section className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ユーザー名
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ユーザー名を入力"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              パスワード（変更時のみ）
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="新しいパスワード"
            />
          </div>

          <div className="text-right">
            <button className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-blue-600 transition">
              保存する
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
