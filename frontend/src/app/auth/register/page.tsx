"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Register from "@/services/auth/Register";
import Link from "next/link";

export default function register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await Register(name, email, password);
      router.push("/auth/thanks");
    } catch (err: any) {
      console.error("Register Error:", err.response?.data);
      setError("登録に失敗しました");
    }
  };

  return (
    <div className="h-[90vh] flex flex-col justify-center items-center p-8 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 bg-white border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 bg-white border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 bg-white border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600  text-white px-4 py-2 rounded w-full mx-auto"
        >
          登録
        </button>
      </form>
      <Link
        href={"/auth/login"}
        className="mt-4 text-blue-800 hover:text-blue-500"
      >
        ログインはこちら
      </Link>
    </div>
  );
}
