/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";

const commands = [
  {
    section: "🎨 Основы селекторов",
    items: [
      {
        cmd: "div { ... }",
        descr: "Селектор по тегу.",
      },
      {
        cmd: ".class { ... }",
        descr: "Селектор по классу.",
      },
      {
        cmd: "#id { ... }",
        descr: "Селектор по id.",
      },
      {
        cmd: "div, p { ... }",
        descr: "Несколько селекторов одновременно.",
      },
      {
        cmd: "div > p { ... }",
        descr: "Только прямой потомок.",
      },
      {
        cmd: "div p { ... }",
        descr: "Любой потомок.",
      },
      {
        cmd: "a:hover { ... }",
        descr: "Псевдокласс при наведении.",
      },
      {
        cmd: "input:focus { ... }",
        descr: "Псевдокласс при фокусе.",
      },
    ],
  },
  {
    section: "📦 Размеры и отступы",
    items: [
      {
        cmd: "width: 100px; height: 2rem;",
        descr: "Фиксированные размеры.",
      },
      {
        cmd: "max-width: 100%; min-height: 40vh;",
        descr: "Максимальные/минимальные размеры.",
      },
      {
        cmd: "margin: 16px 8px;",
        descr: "Внешний отступ: сверху/снизу и справа/слева.",
      },
      {
        cmd: "padding: 0 12px;",
        descr: "Внутренний отступ: слева и справа.",
      },
      {
        cmd: "box-sizing: border-box;",
        descr: "Всё (width/height) учитывает border и padding.",
      },
    ],
  },
  {
    section: "🎯 Цвета и фон",
    items: [
      {
        cmd: "color: #222;",
        descr: "Цвет текста.",
      },
      {
        cmd: "background: #fff;",
        descr: "Фон.",
      },
      {
        cmd: "background: linear-gradient(90deg, #09f, #0f9);",
        descr: "Градиентный фон.",
      },
      {
        cmd: "opacity: 0.7;",
        descr: "Прозрачность.",
      },
      {
        cmd: "border: 1px solid #ccc;",
        descr: "Граница вокруг элемента.",
      },
      {
        cmd: "border-radius: 8px;",
        descr: "Скругление углов.",
      },
      {
        cmd: "box-shadow: 0 4px 12px #0002;",
        descr: "Тень.",
      },
    ],
  },
  {
    section: "🔠 Текст и шрифты",
    items: [
      {
        cmd: "font-size: 1.25rem;",
        descr: "Размер шрифта.",
      },
      {
        cmd: "font-weight: bold;",
        descr: "Жирный шрифт.",
      },
      {
        cmd: "text-align: center;",
        descr: "Выравнивание текста.",
      },
      {
        cmd: "line-height: 1.5;",
        descr: "Межстрочный интервал.",
      },
      {
        cmd: "text-transform: uppercase;",
        descr: "Преобразовать в верхний регистр.",
      },
      {
        cmd: "text-decoration: underline;",
        descr: "Подчёркивание текста.",
      },
      {
        cmd: "overflow: hidden; text-overflow: ellipsis; white-space: nowrap;",
        descr: "Обрезка текста с троеточием.",
      },
    ],
  },
  {
    section: "🔳 Flex и Grid",
    items: [
      {
        cmd: "display: flex; gap: 16px;",
        descr: "Гибкий контейнер и расстояние между элементами.",
      },
      {
        cmd: "flex-direction: column;",
        descr: "Расположение столбцом.",
      },
      {
        cmd: "justify-content: space-between;",
        descr: "Распределение элементов по главной оси.",
      },
      {
        cmd: "align-items: center;",
        descr: "Выравнивание по поперечной оси.",
      },
      {
        cmd: "display: grid; grid-template-columns: 1fr 2fr;",
        descr: "Grid-контейнер и две колонки.",
      },
      {
        cmd: "gap: 24px;",
        descr: "Отступы между элементами (grid/flex).",
      },
      {
        cmd: "grid-column: 1 / span 2;",
        descr: "Элемент на две колонки.",
      },
    ],
  },
  {
    section: "📱 Адаптив и медиазапросы",
    items: [
      {
        cmd: "@media (max-width: 600px) { ... }",
        descr: "Стили только для маленьких экранов.",
      },
      {
        cmd: "width: 100vw; height: 100vh;",
        descr: "Во всю ширину/высоту экрана.",
      },
      {
        cmd: "object-fit: cover;",
        descr: "Изображение без искажений (обрезать лишнее).",
      },
      {
        cmd: "overflow-x: auto;",
        descr: "Горизонтальная прокрутка если не помещается.",
      },
    ],
  },
  {
    section: "💡 Трюки и разное",
    items: [
      {
        cmd: ":root { --main-color: #09f; }",
        descr: "CSS-переменные (custom properties).",
      },
      {
        cmd: "color: var(--main-color);",
        descr: "Использование переменной.",
      },
      {
        cmd: "* { box-sizing: border-box; }",
        descr: "Современная разметка по умолчанию.",
      },
      {
        cmd: "::before, ::after { content: ''; display: block; }",
        descr: "Псевдоэлементы.",
      },
      {
        cmd: "cursor: pointer;",
        descr: "Курсор-указатель (рука).",
      },
      {
        cmd: "transition: all 0.2s;",
        descr: "Плавное изменение свойств.",
      },
      {
        cmd: "z-index: 10;",
        descr: "Положение по оси Z (слои).",
      },
      {
        cmd: "user-select: none;",
        descr: "Запрет выделения текста.",
      },
    ],
  },
];

function CommandBlock({ cmd, descr }: { cmd: string; descr: string }) {
  const useCopy = () => {
    const [copied, setCopied] = useState(false);
    const onCopy = () => {
      navigator.clipboard.writeText(cmd.replace(/\n/g, "\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };
    return [copied, onCopy] as const;
  };
  const [copied, onCopy] = useCopy();

  // Подсветка: селекторы, свойства и значения, многострочный вывод
  const highlighted = cmd
    .replace(
      /([.#]?[a-zA-Z0-9\-_]+)\s*\{/g,
      '<span class="text-blue-400 font-semibold">$1</span> {'
    )
    .replace(/([a-z\-]+):/g, '<span class="text-green-300">$1</span>:')
    .replace(
      /(#\w{3,8}|\d+px|\d+rem|\d+vh|\d+vw)/g,
      '<span class="text-yellow-200">$1</span>'
    )
    .replace(/;/g, '<span class="text-gray-400">;</span>')
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
          onClick={onCopy}
        >
          {copied ? "Скопировано!" : "Скопировать"}
        </button>
      </div>
      <div className="text-xs text-gray-500 pl-1">{descr}</div>
    </div>
  );
}

export default function CSSCheatSheet() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-3 md:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          🎨 CSS: шпаргалка
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
            href="https://css-tricks.com/snippets/css/"
            target="_blank"
            className="underline hover:text-blue-500"
          >
            CSS Tricks — Snippets
          </Link>
        </div>
      </div>
    </div>
  );
}
