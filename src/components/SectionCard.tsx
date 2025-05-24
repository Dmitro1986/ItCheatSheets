/** @format */

// components/SectionCard.tsx
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface SectionCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  colorClass?: string;
}

export function SectionCard({
  title,
  description,
  href,
  icon: Icon,
  colorClass = "bg-gray-800",
}: SectionCardProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "group rounded-2xl shadow-md border border-gray-700 transition-transform hover:-translate-y-1 hover:shadow-xl p-6 flex flex-col gap-2",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      )}
      tabIndex={0}
    >
      <div
        className={clsx(
          "w-12 h-12 rounded-full flex items-center justify-center mb-3 text-white",
          colorClass
        )}
      >
        <Icon className="w-7 h-7" />
      </div>
      <h2 className="text-xl font-bold mb-1 group-hover:text-emerald-400 transition-colors">
        {title}
      </h2>
      <p className="text-gray-400 text-sm">{description}</p>
    </Link>
  );
}
