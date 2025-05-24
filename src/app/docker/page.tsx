/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";

const commands = [
  {
    section: "🧱 Основы Docker",
    items: [
      {
        cmd: "docker --version",
        descr: "Показать установленную версию Docker.",
      },
      {
        cmd: "docker info",
        descr: "Информация о системе Docker.",
      },
      {
        cmd: "docker help",
        descr: "Показать справку по командам Docker.",
      },
    ],
  },
  {
    section: "📦 Работа с образами",
    items: [
      {
        cmd: "docker pull <имя_образа>",
        descr: "Скачать образ из Docker Hub.",
      },
      {
        cmd: "docker images",
        descr: "Список загруженных образов.",
      },
      {
        cmd: "docker rmi <ID_или_имя>",
        descr: "Удалить образ.",
      },
      {
        cmd: "docker build -t <имя> .",
        descr: "Собрать образ из Dockerfile в текущей папке.",
      },
    ],
  },
  {
    section: "🐳 Контейнеры",
    items: [
      {
        cmd: "docker run <образ>",
        descr: "Создать и запустить контейнер.",
      },
      {
        cmd: "docker run -it <образ> /bin/bash",
        descr: "Интерактивный запуск контейнера с терминалом.",
      },
      {
        cmd: "docker ps",
        descr: "Список запущенных контейнеров.",
      },
      {
        cmd: "docker ps -a",
        descr: "Все (в том числе остановленные) контейнеры.",
      },
      {
        cmd: "docker stop <container_id>",
        descr: "Остановить контейнер.",
      },
      {
        cmd: "docker start <container_id>",
        descr: "Запустить остановленный контейнер.",
      },
      {
        cmd: "docker restart <container_id>",
        descr: "Перезапустить контейнер.",
      },
      {
        cmd: "docker rm <container_id>",
        descr: "Удалить контейнер.",
      },
      {
        cmd: "docker exec -it <container_id> /bin/bash",
        descr: "Зайти внутрь работающего контейнера.",
      },
      {
        cmd: "docker logs <container_id>",
        descr: "Посмотреть логи контейнера.",
      },
    ],
  },
  {
    section: "🌉 Сети и тома",
    items: [
      {
        cmd: "docker network ls",
        descr: "Список сетей Docker.",
      },
      {
        cmd: "docker network create <имя>",
        descr: "Создать новую сеть.",
      },
      {
        cmd: "docker volume ls",
        descr: "Список томов Docker.",
      },
      {
        cmd: "docker volume create <имя>",
        descr: "Создать новый том.",
      },
      {
        cmd: "docker run -v <volume>:/path <образ>",
        descr: "Смонтировать том внутрь контейнера.",
      },
      {
        cmd: "docker run -p 8080:80 <образ>",
        descr: "Пробросить порт 80 контейнера на порт 8080 хоста.",
      },
    ],
  },
  {
    section: "🧹 Очистка",
    items: [
      {
        cmd: "docker system prune -f",
        descr: "Очистить неиспользуемые контейнеры, образы и тома.",
      },
      {
        cmd: "docker image prune -a",
        descr: "Удалить все неиспользуемые образы.",
      },
      {
        cmd: "docker container prune",
        descr: "Удалить все остановленные контейнеры.",
      },
      {
        cmd: "docker volume prune",
        descr: "Удалить неиспользуемые тома.",
      },
    ],
  },
  {
    section: "💡 Docker Compose",
    items: [
      {
        cmd: "docker-compose up",
        descr: "Запустить сервисы в фоне согласно docker-compose.yml.",
      },
      {
        cmd: "docker-compose up -d",
        descr: "Запустить сервисы в фоне (detached).",
      },
      {
        cmd: "docker-compose down",
        descr: "Остановить и удалить все сервисы.",
      },
      {
        cmd: "docker-compose build",
        descr: "Собрать образы, указанные в docker-compose.yml.",
      },
      {
        cmd: "docker-compose logs",
        descr: "Посмотреть логи сервисов.",
      },
      {
        cmd: "docker-compose ps",
        descr: "Показать список сервисов и их статус.",
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

export default function DockerCheatSheet() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-3 md:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          🐳 Docker: шпаргалка
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
            href="https://docs.docker.com/engine/reference/commandline/docker/"
            target="_blank"
            className="underline hover:text-blue-500"
          >
            Документация Docker CLI
          </Link>
        </div>
      </div>
    </div>
  );
}
