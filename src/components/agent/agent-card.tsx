"use client";

import { Agent } from "@/types/agent";

interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
  onDelete: (uuid: string) => void;
  onViewDetail: (uuid: string) => void;
}

export function AgentCard({
  agent,
  onEdit,
  onDelete,
  onViewDetail,
}: AgentCardProps) {
  return (
    <div className="card-enhanced rounded-2xl p-6 space-y-4 hover:transform hover:scale-105 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-red-900 mb-1">{agent.name}</h3>
          <p className="text-red-600 text-sm font-medium">🤖 AI智能助手</p>
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed bg-red-50 p-3 rounded-lg">{agent.description}</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-lg border border-red-100">
          <div className="text-xs text-red-500 font-semibold mb-1">📊 模型</div>
          <div className="text-sm font-medium text-gray-800">{agent.model}</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-red-100">
          <div className="text-xs text-red-500 font-semibold mb-1">📝 Token</div>
          <div className="text-sm font-medium text-gray-800">{agent.maxToken}</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-red-100">
          <div className="text-xs text-red-500 font-semibold mb-1">🔍 混合搜索</div>
          <div className={`text-sm font-medium ${
            agent.hybridSearch ? 'text-green-600' : 'text-gray-500'
          }`}>
            {agent.hybridSearch ? "✅ 启用" : "❌ 禁用"}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-red-100">
          <div className="text-xs text-red-500 font-semibold mb-1">🌐 网络搜索</div>
          <div className={`text-sm font-medium ${
            agent.networking ? 'text-green-600' : 'text-gray-500'
          }`}>
            {agent.networking ? "✅ 启用" : "❌ 禁用"}
          </div>
        </div>
      </div>

      {agent.uuid && (
        <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-500 font-semibold mb-1">🏷️ UUID</div>
          <div className="text-xs text-gray-700 font-mono break-all">
            {agent.uuid}
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onViewDetail(agent.uuid)}
          className="flex-1 btn-primary px-4 py-3 rounded-lg font-semibold text-sm"
        >
          🔍 查看详情
        </button>
        <button
          onClick={() => onEdit(agent)}
          className="flex-1 btn-secondary px-4 py-3 rounded-lg font-semibold text-sm"
        >
          ✏️ 编辑
        </button>
        <button
          onClick={() => onDelete(agent.uuid)}
          className="px-4 py-3 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-600 rounded-lg font-semibold text-sm transition-all duration-200"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
