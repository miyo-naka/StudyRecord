import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between">
      <div>
        <Link href="/">
          <img className="m-4" src="/" alt="Leaning Tracker" />
        </Link>
      </div>
      <div className="m-4 flex justify-end gap-4">
        <Link href="/">
          <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-sm">
            Home
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-sm">
            会員登録
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-sm">
            ログイン
          </button>
        </Link>
        <Link href="/logout">
          <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-sm">
            ログアウト
          </button>
        </Link>
      </div>
    </div>
  );
}
