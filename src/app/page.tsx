/** @format */
import { SectionCard } from "../components/SectionCard";
import {
  GitFork,
  TerminalSquare,
  Dock,
  BookOpen,
  Files,
  Rat as ReactIcon,
  Palette,
  Database,
  Server,
} from "lucide-react";

const sections = [
  {
    title: "Git",
    description: "Основные команды Git для контроля версий",
    href: "/git",
    icon: GitFork,
    colorClass: "bg-[#803019]",
  },
  {
    title: "Terminal",
    description: "Команды терминала для Linux и macOS",
    href: "/terminal",
    icon: TerminalSquare,
    colorClass: "bg-[#17451a]",
  },
  {
    title: "Docker",
    description: "Команды Docker для контейнеризации",
    href: "/docker",
    icon: Dock,
    colorClass: "bg-[#0b2340]",
  },
  {
    title: "JavaScript",
    description: "Шпаргалка по JavaScript и ES6+",
    href: "/javascript",
    icon: Files,
    colorClass: "bg-[#b4a252]",
  },
  {
    title: "React",
    description: "Основные концепции и хуки React",
    href: "/react",
    icon: ReactIcon,
    colorClass: "bg-[#1e4856]",
  },
  {
    title: "CSS",
    description: "Полезные CSS свойства и трюки",
    href: "/css",
    icon: Palette,
    colorClass: "bg-[#35133d]",
  },
  {
    title: "Базы данных",
    description: "Команды для работы с базами данных",
    href: "/data",
    icon: Database,
    colorClass: "bg-[#411616]",
  },
  {
    title: "HTTP/API",
    description: "Работа с HTTP и API",
    href: "/httpapi",
    icon: Server,
    colorClass: "bg-[#112431]",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-extrabold mb-2">IT FullStack Шпаргалки</h1>
      <p className="text-gray-400 mb-6">
        Коллекция полезных команд и шпаргалок для разработчиков
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <SectionCard key={section.href} {...section} />
        ))}
      </div>
    </div>
  );
}
