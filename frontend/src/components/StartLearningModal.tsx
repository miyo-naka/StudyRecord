"use client";

import { useEffect, useState } from "react";
import createStudySession from "@/services/studySession/createStudySession";
import fetchCategories from "@/services/category/fetchCategories";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSessionCreated: (sessionId: number) => void;
};

export default function StartLearningModal({
  isOpen,
  onClose,
  onSessionCreated,
}: Props) {
  const [categoryId, setCategoryId] = useState<number>(1);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<
    { id: number; category_name: string }[]
  >([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const newSession = await createStudySession({
        category_id: categoryId,
        content: content,
      });
      setContent("");
      onSessionCreated(newSession.id);
      onClose();
    } catch (error) {
      console.error("登録失敗:", error);
      alert("登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4">学習を開始する</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="mt-1 p-2 border rounded w-full"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            rows={3}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            {loading ? "登録中…" : "学習開始"}
          </button>
        </div>
      </div>
    </div>
  );
}
