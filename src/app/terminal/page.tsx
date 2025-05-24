/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";

const commands = [
  {
    section: "🧱 Базовые команды",
    items: [
      {
        cmd: "pwd",
        descr: "Показать путь к текущей папке.",
      },
      {
        cmd: "ls",
        descr: "Список файлов и папок в текущей директории.",
      },
      {
        cmd: "ls -la",
        descr: "Подробный список всех файлов (включая скрытые).",
      },
      {
        cmd: "cd <папка>",
        descr: "Перейти в другую папку.",
      },
      {
        cmd: "cd ..",
        descr: "Перейти на уровень вверх.",
      },
      {
        cmd: "mkdir <имя>",
        descr: "Создать новую папку.",
      },
      {
        cmd: "touch <файл>",
        descr: "Создать новый пустой файл.",
      },
      {
        cmd: "clear",
        descr: "Очистить терминал.",
      },
    ],
  },
  {
    section: "📦 Работа с файлами и папками",
    items: [
      {
        cmd: "cp <файл> <куда>",
        descr: "Скопировать файл в новое место.",
      },
      {
        cmd: "mv <что> <куда>",
        descr: "Переместить файл/папку или переименовать.",
      },
      {
        cmd: "rm <файл>",
        descr: "Удалить файл.",
      },
      {
        cmd: "rm -r <папка>",
        descr: "Удалить папку и всё содержимое.",
      },
      {
        cmd: "cat <файл>",
        descr: "Показать содержимое файла.",
      },
      {
        cmd: "nano <файл>",
        descr: "Открыть файл в редакторе nano.",
      },
      {
        cmd: "code <файл>",
        descr: "Открыть файл в VSCode (если установлен).",
      },
      {
        cmd: "open <файл/папка>",
        descr: "Открыть файл или папку в Finder (macOS).",
      },
    ],
  },
  {
    section: "🔎 Поиск и просмотр",
    items: [
      {
        cmd: "find . -name '<имя>'",
        descr: "Поиск файла/папки по имени с текущей директории.",
      },
      {
        cmd: "grep '<текст>' <файл>",
        descr: "Поиск строки в файле.",
      },
      {
        cmd: "grep -r '<текст>' .",
        descr: "Поиск текста во всех файлах в папке.",
      },
      {
        cmd: "history",
        descr: "Показать историю команд терминала.",
      },
      {
        cmd: "head <файл>",
        descr: "Первые 10 строк файла.",
      },
      {
        cmd: "tail <файл>",
        descr: "Последние 10 строк файла.",
      },
      {
        cmd: "less <файл>",
        descr: "Постраничный просмотр длинного файла.",
      },
    ],
  },
  {
    section: "⚡ Системные команды",
    items: [
      {
        cmd: "top",
        descr: "Показать текущие процессы.",
      },
      {
        cmd: "ps aux",
        descr: "Список всех процессов.",
      },
      {
        cmd: "kill <PID>",
        descr: "Завершить процесс по ID.",
      },
      {
        cmd: "df -h",
        descr: "Показать доступное место на дисках.",
      },
      {
        cmd: "du -sh <папка>",
        descr: "Показать размер папки.",
      },
      {
        cmd: "chmod +x <файл>",
        descr: "Сделать файл исполняемым.",
      },
      {
        cmd: "whoami",
        descr: "Показать имя пользователя.",
      },
    ],
  },
  {
    section: "💡 Продвинутое",
    items: [
      {
        cmd: "curl <url>",
        descr: "Отправить HTTP-запрос, скачать файл.",
      },
      {
        cmd: "wget <url>",
        descr: "Скачать файл по ссылке.",
      },
      {
        cmd: "tar -xzf <архив.tar.gz>",
        descr: "Распаковать архив tar.gz.",
      },
      {
        cmd: "zip <архив.zip> <файл>",
        descr: "Создать zip-архив.",
      },
      {
        cmd: "unzip <архив.zip>",
        descr: "Распаковать zip-архив.",
      },
      {
        cmd: "ssh <user>@<host>",
        descr: "Подключиться к удалённому серверу по SSH.",
      },
      {
        cmd: "man <команда>",
        descr: "Справка по команде (manual).",
      },
    ],
  },
];

function CommandBlock({ cmd, descr }: { cmd: string; descr: string }) {
  const [copied, setCopied] = useState(false);

  // Подсветка <...>
  const highlighted = cmd.replace(
    /<([^>]+)>/g,
    '<span class="text-blue-500 font-semibold">&lt;$1&gt;</span>'
  );

  return (
    <div className="flex flex-col gap-1 mb-4 group">
      <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
        <code
          className="flex-1 text-green-400 text-base select-all break-all"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
        <button
          className="ml-4 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
          onClick={() => {
            navigator.clipboard.writeText(cmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? "Скопировано!" : "Скопировать"}
        </button>
      </div>
      <div className="text-xs text-gray-500 pl-1">{descr}</div>
    </div>
  );
}

export default function TerminalCheatSheet() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-3 md:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          💻 Терминал: шпаргалка
        </h1>
        {commands.map(({ section, items }) => (
          <section className="mb-8" key={section}>
            <h2 className="text-xl font-semibold mb-3">{section}</h2>
            {items.map(({ cmd, descr }) => (
              <CommandBlock key={cmd} cmd={cmd} descr={descr} />
            ))}
          </section>
        ))}
        <div className="mt-12 text-xs text-gray-400 text-center">
          <Link
            href="https://tldr.sh/"
            target="_blank"
            className="underline hover:text-blue-500"
          >
            TLDR pages: справочник терминала
          </Link>
        </div>
      </div>
    </div>
  );
}
