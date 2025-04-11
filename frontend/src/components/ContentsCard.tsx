import Link from "next/link";

export function ContentsCard({
  title,
  description,
  href,
  emoji,
  color,
}: {
  title: string;
  description: string;
  href: string;
  emoji: string;
  color: string;
}) {
  return (
    <Link href={href}>
      <div
        className={`rounded-2xl p-6 transition shadow-sm hover:shadow-md hover:scale-[1.02] ${color} cursor-pointer`}
      >
        <div className="text-4xl mb-3">{emoji}</div>
        <h2 className="text-gray-800 mb-1">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}
