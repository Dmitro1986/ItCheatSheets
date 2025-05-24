/** @format */

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
} from "components/ui/drawer";
import { ChevronDown, ChevronRight, Menu as MenuIcon, X } from "lucide-react";
import { cn } from "components/lib/utils";
import { menu, MenuItem } from "./sidebar-menu"; // ← ИМПОРТИРУЕШЬ меню!

export default function DrawerMenu() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className="fixed z-50 top-4 left-4 p-2 bg-gray-900 text-white rounded-lg shadow-lg focus:outline-none"
          aria-label="Открыть меню"
        >
          <MenuIcon className="w-7 h-7" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="w-full max-w-xs bg-gray-900 text-white border-r border-gray-800">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <DrawerTitle className="font-bold text-xl">Меню</DrawerTitle>
          <DrawerClose asChild>
            <button
              className="p-2 rounded-lg hover:bg-gray-800"
              aria-label="Закрыть меню"
            >
              <X className="w-6 h-6" />
            </button>
          </DrawerClose>
        </div>
        <nav className="py-2 flex flex-col gap-1">
          {menu.map((item) => {
            if ("isSingleItem" in item) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 hover:bg-gray-800 transition-all font-semibold",
                    pathname === item.href
                      ? "bg-gray-800 font-bold"
                      : "text-white"
                  )}
                >
                  {item.title}
                </Link>
              );
            }

            if ("section" in item) {
              const section = item.section;
              return (
                <div key={section}>
                  <button
                    onClick={() => toggleSection(section)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800 transition-all font-semibold",
                      openSections[section] ? "bg-gray-800" : ""
                    )}
                    aria-expanded={openSections[section] ? "true" : "false"}
                  >
                    <span>{section}</span>
                    {openSections[section] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  <ul
                    className={cn(
                      "flex flex-col gap-1 pl-6 pr-2 transition-all overflow-hidden",
                      openSections[section] ? "max-h-96 py-2" : "max-h-0 py-0"
                    )}
                  >
                    {item.items.map(({ title, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className={cn(
                            "block rounded px-2 py-1 hover:bg-gray-700 transition-colors",
                            pathname === href
                              ? "bg-gray-700 font-bold"
                              : "text-gray-300"
                          )}
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            return null;
          })}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
