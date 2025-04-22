import Link from "next/link";

export default function thanks() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h2>ご登録ありがとうございます</h2>
      <Link href="/auth/login">
        <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-sm">
          Login
        </button>
      </Link>
    </div>
  );
}
