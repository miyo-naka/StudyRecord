import Link from "next/link";

export type ContentCardProps = {
  title: string;
  description: string;
  href?: string;
  emoji: string;
  color: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function ContentsCard({
  title,
  description,
  href,
  emoji,
  color,
  disabled = false,
  onClick,
}: ContentCardProps) {
  const CardContent = (
    <div
      className={`rounded-2xl p-6 transition shadow-sm ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:shadow-md hover:scale-[1.02]  cursor-pointer"
      } ${color}`}
      onClick={!disabled ? onClick : undefined}
    >
      <div className="text-4xl mb-3">{emoji}</div>
      <h2 className="text-gray-800 mb-1">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
  if (href) {
    return <Link href={href}>{CardContent}</Link>;
  }
  return CardContent;
}
