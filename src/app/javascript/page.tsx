/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";

const commands = [
  {
    section: "🧱 Переменные и типы",
    items: [
      {
        cmd: "let x = 5;",
        descr: "Объявить изменяемую переменную.",
      },
      {
        cmd: "const name = 'Vlad';",
        descr: "Объявить константу (не может быть переопределена).",
      },
      {
        cmd: "typeof x",
        descr: "Тип переменной.",
      },
      {
        cmd: "let a = 1, b = '2', c = true;",
        descr: "Одновременное объявление нескольких переменных.",
      },
    ],
  },
  {
    section: "📦 Функции и стрелочные функции",
    items: [
      {
        cmd: "function sum(a, b) { return a + b; }",
        descr: "Обычная функция.",
      },
      {
        cmd: "const sum = (a, b) => a + b;",
        descr: "Стрелочная функция.",
      },
      {
        cmd: "(() => { ... })();",
        descr: "Мгновенно вызываемая функция (IIFE).",
      },
      {
        cmd: "const greet = name => `Hi, ${name}`;",
        descr: "Стрелочная функция с одним параметром.",
      },
    ],
  },
  {
    section: "🔄 Условия и циклы",
    items: [
      {
        cmd: "if (x > 0) { ... } else { ... }",
        descr: "Обычный if/else.",
      },
      {
        cmd: "for (let i = 0; i < 5; i++) { ... }",
        descr: "Классический for-цикл.",
      },
      {
        cmd: "while (условие) { ... }",
        descr: "Цикл while.",
      },
      {
        cmd: "arr.forEach(item => { ... });",
        descr: "Перебор массива forEach.",
      },
      {
        cmd: "arr.map(x => x * 2);",
        descr: "Создать новый массив, применяя функцию к каждому элементу.",
      },
      {
        cmd: "for (const key in obj) { ... }",
        descr: "Перебор свойств объекта.",
      },
      {
        cmd: "for (const val of arr) { ... }",
        descr: "Перебор значений массива.",
      },
    ],
  },
  {
    section: "📚 Массивы и объекты",
    items: [
      {
        cmd: "const arr = [1, 2, 3];",
        descr: "Создать массив.",
      },
      {
        cmd: "arr.push(4);",
        descr: "Добавить элемент в конец.",
      },
      {
        cmd: "arr.pop();",
        descr: "Удалить последний элемент.",
      },
      {
        cmd: "arr.shift(); arr.unshift(0);",
        descr: "Удалить первый / добавить в начало.",
      },
      {
        cmd: "arr.includes(2);",
        descr: "Проверка наличия значения.",
      },
      {
        cmd: "arr.filter(x => x > 1);",
        descr: "Отфильтровать элементы.",
      },
      {
        cmd: "const obj = { a: 1, b: 2 };",
        descr: "Создать объект.",
      },
      {
        cmd: "Object.keys(obj);",
        descr: "Ключи объекта в массив.",
      },
      {
        cmd: "Object.values(obj);",
        descr: "Значения объекта в массив.",
      },
      {
        cmd: "Object.entries(obj);",
        descr: "Пары ключ-значение объекта.",
      },
      {
        cmd: "const { a, b } = obj;",
        descr: "Деструктуризация объекта.",
      },
      {
        cmd: "const [x, y] = arr;",
        descr: "Деструктуризация массива.",
      },
    ],
  },
  {
    section: "🌟 Строки и шаблоны",
    items: [
      {
        cmd: "const msg = 'Hi' + name;",
        descr: "Конкатенация строк.",
      },
      {
        cmd: "const msg = `Hi, ${name}!`;",
        descr: "Шаблонные строки (template literals).",
      },
      {
        cmd: "str.length",
        descr: "Длина строки.",
      },
      {
        cmd: "str.toUpperCase()",
        descr: "В верхний регистр.",
      },
      {
        cmd: "str.trim()",
        descr: "Удалить пробелы по краям.",
      },
      {
        cmd: "str.split(',')",
        descr: "Разбить строку в массив.",
      },
      {
        cmd: "str.replace('a', 'b')",
        descr: "Заменить подстроку.",
      },
      {
        cmd: "str.includes('foo')",
        descr: "Проверить наличие подстроки.",
      },
    ],
  },
  {
    section: "⏳ Асинхронность",
    items: [
      {
        cmd: "setTimeout(() => {...}, 1000);",
        descr: "Выполнить с задержкой.",
      },
      {
        cmd: "setInterval(() => {...}, 1000);",
        descr: "Выполнять периодически.",
      },
      {
        cmd: "Promise.resolve(42).then(console.log);",
        descr: "Создать промис и обработать результат.",
      },
      {
        cmd: "async function f() { await ... }",
        descr: "Асинхронная функция с await.",
      },
      {
        cmd: "const res = await fetch(url);",
        descr: "Запрос к серверу (внутри async-функции).",
      },
      {
        cmd: "try { ... } catch(e) { ... }",
        descr: "Обработка ошибок.",
      },
    ],
  },
  {
    section: "💡 Разное и трюки",
    items: [
      {
        cmd: "[...arr1, ...arr2]",
        descr: "Оператор расширения (spread) для объединения массивов.",
      },
      {
        cmd: "{ ...obj1, c: 3 }",
        descr: "Spread для объекта (копия + новые поля).",
      },
      {
        cmd: "Math.max(...arr)",
        descr: "Максимум в массиве.",
      },
      {
        cmd: "JSON.stringify(obj)",
        descr: "Преобразовать объект в строку JSON.",
      },
      {
        cmd: "JSON.parse(json)",
        descr: "Строку JSON в объект.",
      },
      {
        cmd: "console.log('Привет!')",
        descr: "Вывести в консоль.",
      },
      {
        cmd: "Array.isArray(val)",
        descr: "Проверить: массив ли это?",
      },
      {
        cmd: "typeof val === 'undefined'",
        descr: "Проверка на undefined.",
      },
      {
        cmd: "!!val",
        descr: "Преобразование к boolean.",
      },
    ],
  },
];

function CommandBlock({ cmd, descr }: { cmd: string; descr: string }) {
  const [copied, setCopied] = useState(false);

  const highlighted = cmd
    .replace(
      /`([^`]+)`/g,
      '<span class="text-yellow-400 font-semibold">`$1`</span>' // для шаблонных строк
    )
    .replace(
      /(\.\.\.[a-zA-Z_][a-zA-Z0-9_]*)/g,
      '<span class="text-blue-500 font-semibold">$1</span>' // для spread-операторов
    )
    .replace(
      /([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g,
      '<span class="text-green-400">$1</span>' // функции
    )
    .replace(
      /<([^>]+)>/g,
      '<span class="text-blue-500 font-semibold">&lt;$1&gt;</span>'
    );

  return (
    <div className="flex flex-col gap-1 mb-4 group">
      <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
        <code
          className="flex-1 text-green-300 text-base select-all break-all"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
        <button
          className="ml-4 px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
          onClick={() => {
            navigator.clipboard.writeText(cmd.replace(/;/g, "; ")); // читаемее в буфере
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

export default function JSCheatSheet() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-3 md:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          📒 JavaScript: шпаргалка
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
            href="https://learn.javascript.ru/"
            target="_blank"
            className="underline hover:text-blue-500"
          >
            Учебник: learn.javascript.ru
          </Link>
        </div>
      </div>
    </div>
  );
}
