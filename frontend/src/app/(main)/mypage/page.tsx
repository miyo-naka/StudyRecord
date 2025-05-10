"use client";

import Header from "@/components/Header";
import fetchUser from "@/services/auth/FetchUser";
import updateUser from "@/services/user/updateUser";
import React, { useEffect, useRef, useState } from "react";
import importStudySession from "@/services/studySession/importStudySession";

export default function Mypage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //ユーザー情報を取得
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchUser();
        setName(data.user.name);
        setEmail(data.user.email);
      } catch (error) {
        console.error("Userデータ取得エラー:", error);
      }
    };
    getUser();
  }, []);

  //更新
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      await updateUser({ name, email, password });
      alert("ユーザー情報を更新しました");
      setPassword("");
    } catch (error) {
      alert("更新に失敗しました");
    }
  };

  //Excelインポート
  const handleExcelImport = async () => {
    if (!selectedFile) {
      alert("ファイルを選択してください");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const data = await importStudySession(formData);
      console.log("インポート成功", data);
    } catch (error) {
      console.error("インポート失敗", error);
    }
  };

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
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              パスワード（変更時のみ）
              <input
                type="password"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="新しいパスワード"
              />
            </label>
          </div>

          <div className="text-right">
            <button
              className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-blue-600 transition"
              onClick={handleSubmit}
            >
              保存する
            </button>
          </div>
        </section>

        {/* Excelからのインポート */}
        <section className="max-w-xl mx-auto bg-white shadow-md rounded-2xl m-4 p-6">
          <p>CSVインポート</p>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
            className="text-sm text-gray-600
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-100 file:text-gray-700
                    hover:file:bg-gray-200"
          />

          <button
            className="mx-auto bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-sm"
            onClick={handleExcelImport}
          >
            Import
          </button>
        </section>
      </main>
    </div>
  );
}
