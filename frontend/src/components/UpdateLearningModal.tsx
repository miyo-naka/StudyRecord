"use client";

import { useEffect, useState } from "react";
import fetchCategories from "@/services/category/fetchCategories";
import updateStudySession, {
  UpdateStudySessionInput,
} from "@/services/studySession/updateStudySession";

type UpdateLearningModalProps = {
  isOpen: boolean;
  onClose: () => void;
  session: {
    id: number;
    category_id: number;
    content: string;
    start_time: string;
    finish_time: string;
    category_name?: string;
  } | null;
  onUpdated: () => void;
};

export default function UpdateLearningModal({
  isOpen,
  onClose,
  session,
  onUpdated,
}: UpdateLearningModalProps) {
  const [formData, setFormData] = useState({
    category_id: session?.category_id ?? 1,
    content: session?.content ?? "",
    start_time: "",
    finish_time: "",
  });
  const [categories, setCategories] = useState<
    { id: number; category_name: string }[]
  >([]);

  //カテゴリーの値を取得
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  //変更前のデータを取得
  function formatDateForInput(date: string | Date | null): string {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toISOString().slice(0, 16);
  }

  useEffect(() => {
    if (session && isOpen) {
      console.log("初期session", session); //debag
      setFormData({
        category_id: session.category_id,
        content: session.content ?? "",
        start_time: formatDateForInput(session.start_time),
        finish_time: formatDateForInput(session.finish_time),
      });
    }
  }, [session]);

  //入力値を取得
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("time") ? new Date(value) : value,
    }));
  };

  //更新
  const handleSubmit = async () => {
    if (!session) return;
    try {
      await updateStudySession(session.id, {
        ...formData,
        start_time: new Date(formData.start_time),
        finish_time: new Date(formData.finish_time),
      });
      onClose();
      onUpdated?.();
    } catch (error) {
      alert("更新に失敗しました");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4">学習記録を編集</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium">Category</label>
          <select
            value={formData.category_id}
            onChange={handleChange}
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
            value={formData.content}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            rows={3}
          />
        </div>
        <div className="mb-3">
          <label className="block mb-2">
            Hours
            <input
              name="duration_minutes"
              type="datetime-local"
              value={formData.start_time}
              onChange={handleChange}
              className="border w-full"
            />
          </label>
        </div>

        <div>
          <label className="block mb-2">
            Finish
            <input
              name="finish_time"
              type="datetime-local"
              value={formData.finish_time}
              onChange={handleChange}
              className="border w-full"
            />
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
