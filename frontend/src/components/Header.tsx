import logout from "@/services/auth/Logout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      alert("ログアウトに失敗しました");
    }
  };

  return (
    <div className="flex justify-between">
      <div className="m-2 h-10">
        <Link href="/" className="flex items-center h-full">
          <img className="h-10 w-10 mr-1" src="/android-chrome-192x192.png" />
          <p className="text-lg font-semibold">Leaning Tracker</p>
        </Link>
      </div>
      <div className="m-4 gap-4 flex justify-end">
        <Link href="/">
          <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-sm">
            Home
          </button>
        </Link>
        {/* <Link href="/register">
          <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-sm">
            会員登録
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-sm">
            ログイン
          </button>
        </Link> */}
        <button
          onClick={handleLogout}
          className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition shadow-sm"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}
