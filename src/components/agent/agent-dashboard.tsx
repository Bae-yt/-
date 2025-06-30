"use client";

import { useState, useEffect } from "react";
import { Agent, CreateAgentRequest, UpdateAgentRequest } from "@/types/agent";
import { agentService } from "@/services/agentService";
import { AgentList } from "./agent-list";
import { AgentForm } from "./agent-form";
import { AgentDetail } from "./agent-detail";
import { AgentKbBinding } from "./agent-kb-binding";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/ui/toast";

type ViewMode = "list" | "create" | "edit" | "detail" | "kb-binding";

interface AgentDashboardProps {
  apiKey: string;
}

export function AgentDashboard({ apiKey }: AgentDashboardProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const { toasts, removeToast, showSuccess, showError } = useToast();

  useEffect(() => {
    if (apiKey) {
      agentService.setApiKey(apiKey);
      loadAgents();
    }
  }, [apiKey]);

  const loadAgents = async () => {
    setLoading(true);
    try {
      const response = await agentService.getAgentList();
      if (response.success && response.data) {
        // 确保 response.data 是数组
        const agentsData = Array.isArray(response.data) ? response.data : [];
        setAgents(agentsData);
      } else {
        console.error("Failed to load agents:", response.error);
        setAgents([]); // 设置为空数组
        showError(`加载Agent列表失败: ${response.error}`);
      }
    } catch (error) {
      console.error("Error loading agents:", error);
      setAgents([]); // 设置为空数组
      showError("加载Agent列表时发生错误");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAgent = async (agentData: CreateAgentRequest) => {
    try {
      const response = await agentService.createAgent(agentData);
      if (response.success) {
        showSuccess("Agent创建成功");
        setViewMode("list");
        loadAgents();
      } else {
        showError(`创建Agent失败: ${response.error}`);
      }
    } catch (error) {
      console.error("Error creating agent:", error);
      showError("创建Agent时发生错误");
    }
  };

  const handleUpdateAgent = async (agentData: UpdateAgentRequest) => {
    try {
      const response = await agentService.updateAgent(agentData);
      if (response.success) {
        showSuccess("Agent更新成功");
        setViewMode("list");
        setSelectedAgent(null);
        loadAgents();
      } else {
        showError(`更新Agent失败: ${response.error}`);
      }
    } catch (error) {
      console.error("Error updating agent:", error);
      showError("更新Agent时发生错误");
    }
  };

  const handleDeleteAgent = async (uuid: string) => {
    if (!confirm("确定要删除这个Agent吗？")) {
      return;
    }

    try {
      const response = await agentService.deleteAgent({ uuid });
      if (response.success) {
        showSuccess("Agent删除成功");
        loadAgents();
      } else {
        showError(`删除Agent失败: ${response.error}`);
      }
    } catch (error) {
      console.error("Error deleting agent:", error);
      showError("删除Agent时发生错误");
    }
  };

  const handleViewDetail = async (uuid: string) => {
    try {
      const response = await agentService.getAgentDetail(uuid);
      if (response.success && response.data) {
        setSelectedAgent(response.data);
        setViewMode("detail");
      } else {
        showError(`获取Agent详情失败: ${response.error}`);
      }
    } catch (error) {
      console.error("Error getting agent detail:", error);
      showError("获取Agent详情时发生错误");
    }
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setViewMode("edit");
  };

  const handleManageKnowledgeBases = (agent: Agent) => {
    setSelectedAgent(agent);
    setViewMode("kb-binding");
  };

  if (!apiKey) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">API Key未配置</h2>
        <p className="text-gray-600">
          请在环境变量中配置 NEXT_PUBLIC_QANYTHING_API_KEY
        </p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--accent) 100%)' }}>
        <div className="max-w-7xl mx-auto p-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-xl mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">智能Agent</h1>
                <p className="text-red-500 font-medium">AI助手智能管理中心</p>
              </div>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">创建和管理您的AI助手，配置知识库绑定，打造个性化智能服务</p>
          </div>

          <div className="card-enhanced rounded-2xl p-8 mb-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-red-900">Agent中央控制台</h2>
                  <p className="text-red-600">统一管理您的AI助手</p>
                </div>
              </div>
              <div className="flex gap-4">
                {viewMode !== "list" && (
                  <button
                    onClick={() => {
                      setViewMode("list");
                      setSelectedAgent(null);
                    }}
                    className="btn-secondary px-6 py-3 rounded-lg font-semibold"
                  >
                    🔙 返回列表
                  </button>
                )}
                {viewMode === "list" && (
                  <button
                    onClick={() => setViewMode("create")}
                    className="btn-primary px-6 py-3 rounded-lg font-semibold"
                  >
                    ✨ 创建Agent
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="card-enhanced rounded-2xl overflow-hidden">
            {viewMode === "list" && (
              <div className="p-8">
                <AgentList
                  agents={agents}
                  loading={loading}
                  onEdit={handleEditAgent}
                  onDelete={handleDeleteAgent}
                  onViewDetail={handleViewDetail}
                />
              </div>
            )}

            {viewMode === "create" && (
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-red-900 mb-2">✨ 创建新Agent</h3>
                  <p className="text-red-600">配置您的AI助手参数</p>
                </div>
                <AgentForm
                  onSubmit={handleCreateAgent}
                  onCancel={() => setViewMode("list")}
                />
              </div>
            )}

            {viewMode === "edit" && selectedAgent && (
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-red-900 mb-2">🔧 编辑Agent</h3>
                  <p className="text-red-600">修改 {selectedAgent.name} 的配置</p>
                </div>
                <AgentForm
                  agent={selectedAgent}
                  onSubmit={handleUpdateAgent}
                  onCancel={() => {
                    setViewMode("list");
                    setSelectedAgent(null);
                  }}
                  isEditing={true}
                />
              </div>
            )}

            {viewMode === "detail" && selectedAgent && (
              <div className="p-8">
                <AgentDetail
                  agent={selectedAgent}
                  onClose={() => {
                    setViewMode("list");
                    setSelectedAgent(null);
                  }}
                  onEdit={handleEditAgent}
                  onManageKnowledgeBases={handleManageKnowledgeBases}
                />
              </div>
            )}

            {viewMode === "kb-binding" && selectedAgent && (
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-red-900 mb-2">🔗 知识库绑定</h3>
                  <p className="text-red-600">管理 {selectedAgent.name} 的知识库关联</p>
                </div>
                <AgentKbBinding
                  agent={selectedAgent}
                  apiKey={apiKey}
                  onClose={() => {
                    setViewMode("detail");
                  }}
                  onSuccess={async () => {
                    await loadAgents();
                    // 重新获取当前Agent的详情以显示最新的绑定状态
                    if (selectedAgent) {
                      try {
                        const response = await agentService.getAgentDetail(selectedAgent.uuid);
                        if (response.success && response.data) {
                          setSelectedAgent(response.data);
                          setViewMode("detail");
                        }
                      } catch (error) {
                        console.error("Error refreshing agent detail:", error);
                        setViewMode("detail");
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
