"use client";

import { useState } from "react";
import {
  KnowledgeBaseList,
  CreateKnowledgeBaseForm,
  FileUpload,
  DocumentList,
  FAQList,
  CreateFAQForm,
  EditFAQForm,
} from "./index";
import EditKnowledgeBaseForm from "./edit-knowledge-base-form";
import type { KnowledgeBase, FAQ } from "@/types/knowledge-base";

interface KnowledgeBaseDashboardProps {
  apiKey: string;
}

export default function KnowledgeBaseDashboard({
  apiKey,
}: KnowledgeBaseDashboardProps) {
  const [selectedKb, setSelectedKb] = useState<KnowledgeBase | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingKb, setEditingKb] = useState<KnowledgeBase | null>(null);
  const [activeTab, setActiveTab] = useState<"documents" | "upload" | "faqs">(
    "documents"
  );

  // FAQ相关状态
  const [showCreateFAQForm, setShowCreateFAQForm] = useState(false);
  const [showEditFAQForm, setShowEditFAQForm] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

  const handleSelectKb = (kb: KnowledgeBase) => {
    setSelectedKb(kb);
    setActiveTab("documents");
  };

  const handleCreateSuccess = (kbId: string) => {
    setShowCreateForm(false);
    // 可以选择自动选中新创建的知识库
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
  };

  const handleEditSuccess = () => {
    setShowEditForm(false);
    setEditingKb(null);
    // 刷新会自动发生，因为 hook 中调用了 fetchKnowledgeBaseList
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
    setEditingKb(null);
  };

  // FAQ相关处理函数
  const handleCreateFAQSuccess = () => {
    setShowCreateFAQForm(false);
    // 创建成功后确保用户能看到新创建的FAQ
    console.log("FAQ创建成功，切换回列表视图");
  };

  const handleCreateFAQCancel = () => {
    setShowCreateFAQForm(false);
  };

  const handleEditFAQSuccess = () => {
    setShowEditFAQForm(false);
    setEditingFAQ(null);
    // 编辑成功后确保用户能看到更新后的FAQ
    console.log("FAQ编辑成功，切换回列表视图");
  };

  const handleEditFAQCancel = () => {
    setShowEditFAQForm(false);
    setEditingFAQ(null);
  };

  const handleEditFAQ = (faq: FAQ) => {
    setEditingFAQ(faq);
    setShowEditFAQForm(true);
    setShowCreateFAQForm(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, var(--background) 0%, var(--accent) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-xl mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                智能知识库
              </h1>
              <p className="text-red-500 font-medium">AI驱动的知识管理平台</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            集成先进AI技术，高效管理知识库、文档资源和智能问答系统
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 左侧：知识库列表 */}
          <div className="lg:col-span-2">
            <div className="card-enhanced rounded-2xl p-8 h-full">
              {showCreateForm ? (
                <CreateKnowledgeBaseForm
                  apiKey={apiKey}
                  onSuccess={handleCreateSuccess}
                  onCancel={handleCreateCancel}
                />
              ) : showEditForm && editingKb ? (
                <EditKnowledgeBaseForm
                  apiKey={apiKey}
                  knowledgeBase={editingKb}
                  onSuccess={handleEditSuccess}
                  onCancel={handleEditCancel}
                />
              ) : (
                <KnowledgeBaseList
                  apiKey={apiKey}
                  onSelectKb={handleSelectKb}
                  onCreateKb={() => {
                    setShowCreateForm(true);
                    setShowEditForm(false); // 确保编辑表单关闭
                  }}
                  onDeleteKb={() => {
                    // 如果删除的是当前选中的知识库，清空选择
                    if (selectedKb) {
                      setSelectedKb(null);
                    }
                  }}
                  onEditKb={(kb) => {
                    setEditingKb(kb);
                    setShowEditForm(true);
                    setShowCreateForm(false); // 确保创建表单关闭
                  }}
                />
              )}
            </div>
          </div>

          {/* 右侧：知识库详情 */}
          <div className="lg:col-span-3">
            {selectedKb ? (
              <div className="card-enhanced rounded-2xl overflow-hidden">
                {/* 知识库信息头部 */}
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 border-b-2 border-red-200">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-red-900 mb-1">
                          {selectedKb.kbName}
                        </h2>
                        {selectedKb.createTime && (
                          <p className="text-sm text-red-600 font-medium">
                            🕒 创建于:{" "}
                            {new Date(selectedKb.createTime).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedKb(null)}
                      className="w-10 h-10 rounded-full bg-white shadow-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center justify-center"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* 标签页导航 */}
                <div className="bg-white border-b-2 border-red-100">
                  <nav className="flex space-x-2 px-8 py-2">
                    <button
                      onClick={() => setActiveTab("documents")}
                      className={`px-6 py-4 rounded-t-lg font-semibold text-sm transition-all duration-300 tab-enhanced ${
                        activeTab === "documents"
                          ? "active bg-red-50 text-red-700 border-b-4 border-red-500 shadow-lg"
                          : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                      }`}
                    >
                      📁 文档管理
                    </button>
                    <button
                      onClick={() => setActiveTab("upload")}
                      className={`px-6 py-4 rounded-t-lg font-semibold text-sm transition-all duration-300 tab-enhanced ${
                        activeTab === "upload"
                          ? "active bg-red-50 text-red-700 border-b-4 border-red-500 shadow-lg"
                          : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                      }`}
                    >
                      📤 上传文档
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("faqs");
                        setShowCreateFAQForm(false);
                        setShowEditFAQForm(false);
                      }}
                      className={`px-6 py-4 rounded-t-lg font-semibold text-sm transition-all duration-300 tab-enhanced ${
                        activeTab === "faqs"
                          ? "active bg-red-50 text-red-700 border-b-4 border-red-500 shadow-lg"
                          : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                      }`}
                    >
                      ❓ 问答管理
                    </button>
                  </nav>
                </div>

                {/* 标签页内容 */}
                <div className="p-8 bg-white min-h-[500px]">
                  {activeTab === "documents" && (
                    <DocumentList
                      apiKey={apiKey}
                      kbId={selectedKb.kbId}
                      onDeleteSuccess={() => {
                        // 可以添加删除成功后的处理
                      }}
                    />
                  )}

                  {activeTab === "upload" && (
                    <FileUpload
                      apiKey={apiKey}
                      kbId={selectedKb.kbId}
                      onUploadSuccess={() => {
                        // 上传成功后切换到文档列表
                        setActiveTab("documents");
                      }}
                    />
                  )}

                  {activeTab === "faqs" && (
                    <>
                      {showCreateFAQForm ? (
                        <CreateFAQForm
                          apiKey={apiKey}
                          kbId={selectedKb.kbId}
                          onSuccess={handleCreateFAQSuccess}
                          onCancel={handleCreateFAQCancel}
                        />
                      ) : showEditFAQForm && editingFAQ ? (
                        <EditFAQForm
                          apiKey={apiKey}
                          kbId={selectedKb.kbId}
                          faq={editingFAQ}
                          onSuccess={handleEditFAQSuccess}
                          onCancel={handleEditFAQCancel}
                        />
                      ) : (
                        <FAQList
                          apiKey={apiKey}
                          kbId={selectedKb.kbId}
                          onCreateFAQ={() => {
                            setShowCreateFAQForm(true);
                            setShowEditFAQForm(false);
                          }}
                          onEditFAQ={handleEditFAQ}
                          onDeleteSuccess={() => {
                            // FAQ删除成功后的处理
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="card-enhanced rounded-2xl p-16 text-center h-full flex flex-col justify-center">
                <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-r from-red-100 to-red-200 flex items-center justify-center mb-8 shadow-inner">
                  <svg
                    className="w-16 h-16 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-red-900 mb-4">
                  🎯 选择知识库开始管理
                </h3>
                <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                  从左侧精选列表中选择一个知识库，开启智能文档和FAQ管理之旅
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <div
                    className="w-3 h-3 bg-red-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-red-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
