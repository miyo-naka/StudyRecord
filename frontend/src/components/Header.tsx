import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between">
      <img className="m-4" src="/" alt="Leaning Tracker" />
      <div className="m-4 flex justify-end gap-4">
        <Link href="/register">
          <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-blue-600 transition shadow-sm">
            会員登録
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-sm">
            ログイン
          </button>
        </Link>
      </div>
    </div>
  );
}
