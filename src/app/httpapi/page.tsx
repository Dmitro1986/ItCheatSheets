/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";

const commands = [
  {
    section: "🌍 Основные HTTP-запросы",
    items: [
      {
        cmd: "GET /api/users",
        descr: "Получить данные (read).",
      },
      {
        cmd: "POST /api/users",
        descr: "Создать новый ресурс.",
      },
      {
        cmd: "PUT /api/users/123",
        descr: "Полностью заменить ресурс.",
      },
      {
        cmd: "PATCH /api/users/123",
        descr: "Изменить часть ресурса.",
      },
      {
        cmd: "DELETE /api/users/123",
        descr: "Удалить ресурс.",
      },
    ],
  },
  {
    section: "📦 Примеры curl-запросов",
    items: [
      {
        cmd: `curl -X GET https://site/api/users`,
        descr: "Простой GET-запрос.",
      },
      {
        cmd: `curl -X POST https://site/api/users -H "Content-Type: application/json" -d '{"name":"Vlad"}'`,
        descr: "POST с передачей JSON.",
      },
      {
        cmd: `curl -X PUT https://site/api/users/123 -H "Content-Type: application/json" -d '{"name":"Vlad"}'`,
        descr: "PUT (полная замена).",
      },
      {
        cmd: `curl -X PATCH https://site/api/users/123 -H "Content-Type: application/json" -d '{"name":"Vlad"}'`,
        descr: "PATCH (частичное обновление).",
      },
      {
        cmd: `curl -X DELETE https://site/api/users/123`,
        descr: "Удаление ресурса.",
      },
      {
        cmd: `curl -I https://site/api/users`,
        descr: "Получить только заголовки ответа.",
      },
      {
        cmd: `curl -H "Authorization: Bearer <token>" https://site/api/me`,
        descr: "GET с авторизацией по токену.",
      },
    ],
  },
  {
    section: "📑 Важные заголовки",
    items: [
      {
        cmd: "Content-Type: application/json",
        descr: "Тип содержимого — JSON.",
      },
      {
        cmd: "Accept: application/json",
        descr: "Клиент ожидает JSON.",
      },
      {
        cmd: "Authorization: Bearer <token>",
        descr: "Авторизация по токену.",
      },
      {
        cmd: "X-Requested-With: XMLHttpRequest",
        descr: "AJAX-запрос (часто для CORS).",
      },
      {
        cmd: "Cookie: sessionId=abc123;",
        descr: "Передать cookies с запросом.",
      },
      {
        cmd: "Cache-Control: no-cache",
        descr: "Не кэшировать ответ.",
      },
    ],
  },
  {
    section: "🔢 Коды ответа",
    items: [
      {
        cmd: "200 OK",
        descr: "Запрос успешен.",
      },
      {
        cmd: "201 Created",
        descr: "Ресурс создан.",
      },
      {
        cmd: "204 No Content",
        descr: "Успех, но без ответа (например, после DELETE).",
      },
      {
        cmd: "400 Bad Request",
        descr: "Некорректный запрос.",
      },
      {
        cmd: "401 Unauthorized",
        descr: "Не авторизован.",
      },
      {
        cmd: "403 Forbidden",
        descr: "Нет доступа.",
      },
      {
        cmd: "404 Not Found",
        descr: "Ресурс не найден.",
      },
      {
        cmd: "409 Conflict",
        descr: "Конфликт при обновлении ресурса.",
      },
      {
        cmd: "500 Internal Server Error",
        descr: "Внутренняя ошибка сервера.",
      },
    ],
  },
  {
    section: "🔗 REST API и Best Practices",
    items: [
      {
        cmd: "/users",
        descr: "Коллекция ресурсов.",
      },
      {
        cmd: "/users/123",
        descr: "Конкретный ресурс.",
      },
      {
        cmd: "/users/123/posts",
        descr: "Связанные ресурсы (вложенные).",
      },
      {
        cmd: "/users?limit=10&offset=0",
        descr: "Параметры пагинации.",
      },
      {
        cmd: "/users?sort=name,-age",
        descr: "Сортировка (по name, по убыванию age).",
      },
      {
        cmd: "POST /auth/login",
        descr: "Аутентификация — отдельный эндпоинт.",
      },
    ],
  },
  {
    section: "💡 Разное",
    items: [
      {
        cmd: "OPTIONS /api/users",
        descr: "Запросить поддерживаемые методы/заголовки (CORS).",
      },
      {
        cmd: "HEAD /api/users",
        descr: "Проверить наличие ресурса (без body).",
      },
      {
        cmd: `curl -v ...`,
        descr: "Подробный вывод (debug).",
      },
      {
        cmd: "429 Too Many Requests",
        descr: "Слишком много запросов (лимит).",
      },
      {
        cmd: 'Link: <url>; rel="next"',
        descr: "Ссылка на следующую страницу (pagination).",
      },
    ],
  },
];

function CommandBlock({ cmd, descr }: { cmd: string; descr: string }) {
  const [copied, setCopied] = useState(false);

  const highlighted = cmd
    .replace(
      /(GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\b/g,
      '<span class="text-blue-400 font-semibold">$1</span>'
    )
    .replace(
      /(\/[a-zA-Z0-9_\-\?\=\&\.]+)/g,
      '<span class="text-green-400">$1</span>'
    )
    .replace(/"(.*?)"/g, '<span class="text-yellow-200">"$1"</span>')
    .replace(/<token>/g, '<span class="text-blue-300">&lt;token&gt;</span>')
    .replace(
      /(\d{3}) (OK|Created|No Content|Bad Request|Unauthorized|Forbidden|Not Found|Conflict|Internal Server Error|Too Many Requests)/g,
      '<span class="text-pink-300">$1 $2</span>'
    )
    .replace(/\n/g, "<br/>");

  return (
    <div className="flex flex-col gap-1 mb-4 group">
      <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
        <code
          className="flex-1 text-cyan-200 text-base select-all break-all"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
        <button
          className="ml-4 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
          onClick={() => {
            navigator.clipboard.writeText(cmd.replace(/<br\/>/g, "\n"));
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

export default function HttpApiCheatSheet() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-3 md:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          🌍 HTTP & API: шпаргалка
        </h1>
        {commands.map(({ section, items }) => (
          <section className="mb-8" key={section}>
            <h2 className="text-xl font-semibold mb-3">{section}</h2>
            {items.map(({ cmd, descr }) => (
              <CommandBlock key={cmd + descr} cmd={cmd} descr={descr} />
            ))}
          </section>
        ))}
        <div className="mt-12 text-xs text-gray-400 text-center">
          <Link
            href="https://developer.mozilla.org/ru/docs/Web/HTTP/Methods"
            target="_blank"
            className="underline hover:text-blue-500"
          >
            MDN — HTTP методы и основы
          </Link>
        </div>
      </div>
    </div>
  );
}
