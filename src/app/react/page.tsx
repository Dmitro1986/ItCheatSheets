/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";

const commands = [
  {
    section: "🧱 Основы компонента",
    items: [
      {
        cmd: "function Hello() {\n  return <div>Привет, React!</div>;\n}",
        descr: "Функциональный компонент.",
      },
      {
        cmd: "export default Hello;",
        descr: "Экспорт компонента по умолчанию.",
      },
      {
        cmd: "import Hello from './Hello';",
        descr: "Импорт компонента.",
      },
      {
        cmd: "<Hello />",
        descr: "Использование компонента в JSX.",
      },
    ],
  },
  {
    section: "🔗 Пропсы и children",
    items: [
      {
        cmd: "function Greet({ name }) {\n  return <p>Hi, {name}!</p>;\n}",
        descr: "Получение пропсов через объект.",
      },
      {
        cmd: '<Greet name="Vlad" />',
        descr: "Передача пропсов.",
      },
      {
        cmd: "function Wrapper({ children }) {\n  return <div>{children}</div>;\n}",
        descr: "Использование children для вложенного JSX.",
      },
    ],
  },
  {
    section: "⚡ useState, useEffect",
    items: [
      {
        cmd: "import { useState } from 'react';\nconst [count, setCount] = useState(0);",
        descr: "Хук состояния.",
      },
      {
        cmd: "setCount(count + 1);",
        descr: "Изменение состояния.",
      },
      {
        cmd: "import { useEffect } from 'react';\nuseEffect(() => {\n  // код при монтировании\n}, []);",
        descr: "Хук эффекта (аналог componentDidMount).",
      },
      {
        cmd: "useEffect(() => {\n  // эффект\n  return () => {/* очистка */};\n}, [count]);",
        descr: "Эффект с зависимостями и очисткой.",
      },
    ],
  },
  {
    section: "🔄 Списки и ключи",
    items: [
      {
        cmd: "{arr.map(item => <li key={item.id}>{item.name}</li>)}",
        descr: "Рендер списка по массиву с ключами.",
      },
      {
        cmd: "const list = [1,2,3];\nreturn <ul>{list.map(x => <li key={x}>{x}</li>)}</ul>;",
        descr: "Полный пример списка.",
      },
    ],
  },
  {
    section: "📋 Формы",
    items: [
      {
        cmd: "<input value={text} onChange={e => setText(e.target.value)} />",
        descr: "Управляемый input.",
      },
      {
        cmd: "const onSubmit = e => {\n  e.preventDefault();\n  // обработка\n};",
        descr: "Обработка формы.",
      },
      {
        cmd: "<form onSubmit={onSubmit}>...</form>",
        descr: "Обработка submit события.",
      },
    ],
  },
  {
    section: "🔧 Полезные хуки",
    items: [
      {
        cmd: "const ref = useRef(null);",
        descr: "Создать ref для доступа к DOM-элементу.",
      },
      {
        cmd: "useMemo(() => compute(), [deps]);",
        descr: "Мемоизация значения.",
      },
      {
        cmd: "useCallback(fn, [deps]);",
        descr: "Мемоизация функции.",
      },
      {
        cmd: "const ctx = useContext(MyContext);",
        descr: "Использование контекста.",
      },
    ],
  },
  {
    section: "🧩 Состояние выше (lifting state up)",
    items: [
      {
        cmd: "// В родителе:\nconst [val, setVal] = useState('');\n<MyChild value={val} onChange={setVal} />",
        descr: "Подъём состояния в родительский компонент.",
      },
      {
        cmd: "// В потомке:\n<input value={value} onChange={e => onChange(e.target.value)} />",
        descr: "Передача значения и обработчика через пропсы.",
      },
    ],
  },
  {
    section: "💡 Разное",
    items: [
      {
        cmd: "const Component = () => null;",
        descr: "Пустой компонент (ничего не рендерит).",
      },
      {
        cmd: "<Fragment>...</Fragment> или <>...</>",
        descr: "Фрагмент — без обёртки в div.",
      },
      {
        cmd: "props && ...",
        descr: "Проверка на наличие пропсов.",
      },
      {
        cmd: "Array.isArray(arr) && arr.map(...)",
        descr: "Безопасный рендеринг массива.",
      },
      {
        cmd: "// Комментарий в JSX: {/* ... */}",
        descr: "JSX-комментарий.",
      },
    ],
  },
];

function CommandBlock({ cmd, descr }: { cmd: string; descr: string }) {
  const [copied, setCopied] = useState(false);

  // Примитивная подсветка: подсвечивает <...> и пропсы (name=...), возвращает многострочные строки красиво.
  const highlighted = cmd
    .replace(
      /<([^>]+)>/g,
      '<span class="text-blue-500 font-semibold">&lt;$1&gt;</span>'
    )
    .replace(
      /([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*{?/g,
      '<span class="text-green-400">$1</span>='
    )
    .replace(/\n/g, "<br/>")
    .replace(/"(.*?)"/g, '<span class="text-yellow-300">"$1"</span>');

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

export default function ReactCheatSheet() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-3 md:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          ⚛️ React: шпаргалка
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
            href="https://react.dev/learn"
            target="_blank"
            className="underline hover:text-blue-500"
          >
            Официальная документация React
          </Link>
        </div>
      </div>
    </div>
  );
}
