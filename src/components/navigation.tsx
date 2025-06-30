"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

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

              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive("/portfolio")
                      ? "bg-primary text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-primary-light hover:text-white hover:transform hover:scale-105"
                  }`}
                >
                  🎨 过往作业展示
                </button>
                {showDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50">
                    <div className="py-2 border-b border-gray-200">
                      <div className="px-4 py-1 text-xs font-semibold text-gray-500">
                        CSS 学习示例
                      </div>
                      <Link
                        href="/01.css.html（基础）.html"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        CSS基础知识
                      </Link>
                      <Link
                        href="/02.css.html（进阶）.html"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        CSS进阶概念
                      </Link>
                      <Link
                        href="/03-css.html（相对定位与绝对定位）.html"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        CSS定位详解
                      </Link>
                      <Link
                        href="/04-css.html.html"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        JavaScript基础
                      </Link>
                    </div>
                    <div className="py-2">
                      <div className="px-4 py-1 text-xs font-semibold text-gray-500">
                        旅游网站示例
                      </div>
                      <Link
                        href="/page1.html"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        寻梦旅游-简约版
                      </Link>
                      <Link
                        href="/page2.html"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        寻梦旅游-详细版
                      </Link>
                    </div>
                  </div>
                )}
              </div>
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
