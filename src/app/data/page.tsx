/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";

const commands = [
  {
    section: "🧱 Создание и структура",
    items: [
      {
        cmd: "CREATE DATABASE имя_бд;",
        descr: "Создать новую базу данных.",
      },
      {
        cmd: "USE имя_бд;",
        descr: "Выбрать базу данных для работы.",
      },
      {
        cmd: `CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  age INT
);`,
        descr: "Создать таблицу с колонками и ограничениями.",
      },
      {
        cmd: "DESCRIBE users;",
        descr: "Показать структуру таблицы.",
      },
      {
        cmd: "DROP TABLE users;",
        descr: "Удалить таблицу.",
      },
      {
        cmd: "DROP DATABASE имя_бд;",
        descr: "Удалить базу данных.",
      },
    ],
  },
  {
    section: "📋 Вставка и обновление данных",
    items: [
      {
        cmd: `INSERT INTO users (name, email, age) VALUES ('Вася', 'vasya@mail.ru', 28);`,
        descr: "Вставить новую строку.",
      },
      {
        cmd: `UPDATE users SET age = 29 WHERE name = 'Вася';`,
        descr: "Обновить данные по условию.",
      },
      {
        cmd: "DELETE FROM users WHERE age < 18;",
        descr: "Удалить записи по условию.",
      },
    ],
  },
  {
    section: "🔍 Выборка данных (SELECT)",
    items: [
      {
        cmd: "SELECT * FROM users;",
        descr: "Получить все записи из таблицы.",
      },
      {
        cmd: "SELECT name, age FROM users WHERE age > 18;",
        descr: "Получить определённые колонки с фильтром.",
      },
      {
        cmd: "SELECT * FROM users ORDER BY age DESC;",
        descr: "Сортировка по убыванию возраста.",
      },
      {
        cmd: "SELECT * FROM users LIMIT 10 OFFSET 20;",
        descr: "Пагинация: 10 строк, начиная с 21-й.",
      },
      {
        cmd: "SELECT DISTINCT email FROM users;",
        descr: "Уникальные значения в столбце.",
      },
      {
        cmd: "SELECT COUNT(*) FROM users;",
        descr: "Посчитать количество записей.",
      },
    ],
  },
  {
    section: "🤝 Связи и JOIN'ы",
    items: [
      {
        cmd: `SELECT users.name, orders.price
FROM users
JOIN orders ON users.id = orders.user_id;`,
        descr: "Внутренний JOIN — только совпадения.",
      },
      {
        cmd: `SELECT users.name, orders.price
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`,
        descr: "LEFT JOIN — все пользователи + заказы, если есть.",
      },
      {
        cmd: `SELECT users.name, orders.price
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;`,
        descr: "RIGHT JOIN — все заказы + пользователя, если есть.",
      },
    ],
  },
  {
    section: "🛠️ Индексы и оптимизация",
    items: [
      {
        cmd: "CREATE INDEX idx_email ON users(email);",
        descr: "Создать индекс для ускорения поиска по email.",
      },
      {
        cmd: "DROP INDEX idx_email ON users;",
        descr: "Удалить индекс.",
      },
      {
        cmd: "EXPLAIN SELECT * FROM users WHERE age > 18;",
        descr: "Показать, как будет выполняться запрос.",
      },
    ],
  },
  {
    section: "💡 Полезное и разное",
    items: [
      {
        cmd: "ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT true;",
        descr: "Добавить новую колонку.",
      },
      {
        cmd: "ALTER TABLE users DROP COLUMN is_active;",
        descr: "Удалить колонку.",
      },
      {
        cmd: "TRUNCATE TABLE users;",
        descr: "Очистить таблицу (удалить все строки, id сбросится).",
      },
      {
        cmd: "SET FOREIGN_KEY_CHECKS=0;",
        descr: "Отключить проверку внешних ключей (MySQL).",
      },
      {
        cmd: "SHOW TABLES;",
        descr: "Показать список таблиц в базе.",
      },
    ],
  },
];

function CommandBlock({ cmd, descr }: { cmd: string; descr: string }) {
  const [copied, setCopied] = useState(false);

  const highlighted = cmd
    .replace(
      /\b(SELECT|FROM|WHERE|ORDER BY|LIMIT|OFFSET|DISTINCT|COUNT|JOIN|LEFT JOIN|RIGHT JOIN|ON|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM|CREATE|TABLE|DATABASE|PRIMARY KEY|AUTO_INCREMENT|UNIQUE|INDEX|ALTER|ADD|DROP|EXPLAIN|SHOW|DESCRIBE|TRUNCATE|BOOLEAN|DEFAULT|FOREIGN_KEY_CHECKS)\b/gi,
      '<span class="text-blue-400 font-bold">$1</span>'
    )
    .replace(
      /`?([a-z_][a-z0-9_]*)`?/gi,
      '<span class="text-green-300">$1</span>'
    )
    .replace(/('[^']*')/g, '<span class="text-yellow-200">$1</span>')
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

export default function DBCheatSheet() {
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-3 md:px-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          🗄️ SQL Базы данных: шпаргалка
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
            href="https://sql.sh/"
            target="_blank"
            className="underline hover:text-blue-500"
          >
            sql.sh — справочник SQL
          </Link>
        </div>
      </div>
    </div>
  );
}
