"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <nav className="nav-enhanced shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-12">
            <Link
              href="/"
              className="text-2xl font-bold"
              style={{ color: "var(--primary)" }}
            >
              🔥 QAnything
            </Link>

            <div className="flex space-x-2">
              <Link
                href="/"
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/") && pathname === "/"
                    ? "bg-primary text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-primary-light hover:text-white hover:transform hover:scale-105"
                }`}
              >
                📚 知识库管理
              </Link>

              <Link
                href="/agents"
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/agents")
                    ? "bg-primary text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-primary-light hover:text-white hover:transform hover:scale-105"
                }`}
              >
                🤖 Agent管理
              </Link>

              <Link
                href="/chat"
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/chat")
                    ? "bg-primary text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-primary-light hover:text-white hover:transform hover:scale-105"
                }`}
              >
                💬 Stream对话
              </Link>

              <Link
                href="/portfolio"
                className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/portfolio")
                    ? "bg-primary text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-primary-light hover:text-white hover:transform hover:scale-105"
                }`}
              >
                🎨 过往作业展示
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              AI
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
