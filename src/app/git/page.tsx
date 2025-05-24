/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";

const commands = [
  {
    section: "🧱 Базовые команды",
    items: [
      {
        cmd: "git init",
        descr: "Создаёт новый репозиторий Git в текущей папке.",
      },
      {
        cmd: "git status",
        descr:
          "Показывает статус файлов: изменения, готовые к коммиту, неотслеживаемые файлы.",
      },
      {
        cmd: "git add .",
        descr:
          "Добавляет все изменения в индексацию (staging area) для следующего коммита.",
      },
      {
        cmd: 'git commit -m "..."',
        descr: "Создаёт коммит с заданным сообщением.",
      },
      {
        cmd: "git log --oneline",
        descr: "Выводит историю коммитов в кратком виде.",
      },
      {
        cmd: "git diff",
        descr:
          "Показывает различия между файлами в рабочем каталоге и последним коммитом.",
      },
    ],
  },
  {
    section: "🌿 Работа с ветками",
    items: [
      {
        cmd: "git branch",
        descr: "Показывает список локальных веток.",
      },
      {
        cmd: "git branch <name>",
        descr: "Создаёт новую ветку.",
      },
      {
        cmd: "git checkout <name>",
        descr: "Переключается на ветку.",
      },
      {
        cmd: "git checkout -b <name>",
        descr: "Создаёт новую ветку и переключается на неё.",
      },
      {
        cmd: "git merge <name>",
        descr: "Объединяет ветку с текущей.",
      },
      {
        cmd: "git branch -d <name>",
        descr: "Удаляет ветку.",
      },
      {
        cmd: "git switch <name>",
        descr: "Быстро переключается на ветку.",
      },
    ],
  },
  {
    section: "🌍 Удалённый репозиторий",
    items: [
      {
        cmd: "git clone <url>",
        descr: "Клонирует удалённый репозиторий.",
      },
      {
        cmd: "git remote -v",
        descr: "Показывает список подключённых удалённых репозиториев.",
      },
      {
        cmd: "git remote set-url origin <url>",
        descr: "Меняет url-адрес origin.",
      },
      {
        cmd: "git pull",
        descr: "Загружает изменения из удалённого репозитория.",
      },
      {
        cmd: "git push",
        descr: "Отправляет изменения на сервер.",
      },
      {
        cmd: "git push -u origin <branch>",
        descr: "Создаёт ветку на сервере и пушит её.",
      },
      {
        cmd: "git fetch",
        descr: "Загружает изменения без слияния.",
      },
    ],
  },
  {
    section: "🛠️ Отладка и восстановление",
    items: [
      {
        cmd: "git config --list",
        descr: "Показывает все текущие конфигурации Git.",
      },
      {
        cmd: "git config user.name",
        descr: "Показывает имя пользователя Git.",
      },
      {
        cmd: 'git config --global user.name "..."',
        descr: "Устанавливает глобальное имя пользователя.",
      },
      {
        cmd: "git reset --hard",
        descr:
          "Отменяет все изменения и возвращает состояние файлов к последнему коммиту.",
      },
      {
        cmd: "git clean -fd",
        descr: "Удаляет неотслеживаемые файлы и папки.",
      },
      {
        cmd: "git stash",
        descr: "Временно сохраняет текущие изменения без коммита.",
      },
      {
        cmd: "git stash pop",
        descr: "Восстанавливает изменения из stash.",
      },
      {
        cmd: "git reflog",
        descr: "Показывает историю всех перемещений HEAD и коммитов.",
      },
    ],
  },
  {
    section: "💡 Продвинутое",
    items: [
      {
        cmd: "git rebase",
        descr: "Переносит коммиты из одной ветки в другую.",
      },
      {
        cmd: "git cherry-pick <commit>",
        descr: "Применяет изменения из одного коммита в текущую ветку.",
      },
      {
        cmd: "git tag",
        descr: "Показывает список тегов или создаёт новый тег.",
      },
    ],
  },
];

function CommandBlock({ cmd, descr }: { cmd: string; descr: string }) {
  const [copied, setCopied] = useState(false);

  const highlighted = cmd.replace(
    /<(\w+)>/g,
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

export default function Git() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-3 md:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          📘 Git Шпаргалка
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
            href="https://github.com/"
            target="_blank"
            className="underline hover:text-blue-500"
          >
            Перейти к репозиторию GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
