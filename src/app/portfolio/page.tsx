"use client";

import { useState } from "react";

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("page1");

  const projects = [
    {
      id: "page1",
      title: "寻梦旅游公司 - 经典版",
      description: "采用莫兰迪色彩风格的旅游网站，展示了清新雅致的设计理念",
      url: "/page1.html",
      tags: ["HTML", "CSS", "响应式设计", "莫兰迪色彩"],
    },
    {
      id: "page2",
      title: "寻梦旅游公司 - 现代版",
      description:
        "更现代化的设计风格，采用了固定导航、英雄区域等现代Web设计元素",
      url: "/page2.html",
      tags: ["HTML", "CSS", "现代设计", "英雄区域", "弹性布局"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎨 过往作业展示
          </h1>
          <p className="text-lg text-gray-600">
            这里展示了一些前端开发的作业项目，包括HTML、CSS等技术的实际应用
          </p>
        </div>

        {/* 项目选择卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                activeTab === project.id
                  ? "border-blue-500 bg-blue-50 shadow-lg transform scale-105"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
              }`}
              onClick={() => setActiveTab(project.id)}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 预览区域 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {projects.find((p) => p.id === activeTab)?.title}
              </h2>
              <div className="flex items-center space-x-4">
                <a
                  href={projects.find((p) => p.id === activeTab)?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  🔗 在新窗口打开
                </a>
                <div className="flex space-x-2">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => setActiveTab(project.id)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                        activeTab === project.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {project.id === "page1" ? "经典版" : "现代版"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <iframe
              src={projects.find((p) => p.id === activeTab)?.url}
              className="w-full h-[800px] border-0"
              title={projects.find((p) => p.id === activeTab)?.title}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>

        {/* 项目详情 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            项目详情
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                技术特点
              </h4>
              <ul className="space-y-2 text-gray-600">
                {activeTab === "page1" ? (
                  <>
                    <li>• 采用莫兰迪色彩搭配，营造温馨雅致的视觉效果</li>
                    <li>• CSS动画和过渡效果，提升用户体验</li>
                    <li>• 响应式布局设计，适配不同设备</li>
                    <li>• 语义化HTML结构，良好的代码组织</li>
                  </>
                ) : (
                  <>
                    <li>• 现代化CSS布局技术（Flexbox）</li>
                    <li>• 固定导航栏设计，优化用户浏览体验</li>
                    <li>• 英雄区域（Hero Section）设计</li>
                    <li>• 半透明效果和现代视觉设计</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                设计亮点
              </h4>
              <ul className="space-y-2 text-gray-600">
                {activeTab === "page1" ? (
                  <>
                    <li>• 统一的莫兰迪色调主题</li>
                    <li>• 丰富的hover交互效果</li>
                    <li>• 优雅的卡片式布局</li>
                    <li>• 固定底部导航设计</li>
                  </>
                ) : (
                  <>
                    <li>• 大尺寸背景图片的英雄区域</li>
                    <li>• 现代化的卡片布局</li>
                    <li>• 优化的图文混排设计</li>
                    <li>• 渐变和阴影效果的巧妙运用</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
