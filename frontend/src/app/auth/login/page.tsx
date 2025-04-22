"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/services/auth/Login";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await Login(email, password);
      router.push("/"); // 任意の遷移先
    } catch (err: any) {
      setError("ログインに失敗しました");
    }
  };

  return (
    <div className="h-[90vh] flex flex-col justify-center items-center p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600  text-white px-4 py-2 rounded w-full mx-auto"
        >
          ログイン
        </button>
      </form>
    </div>
  );
}
