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
    <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-[10px]">AI</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {agent.name}
            </h3>
            <p className="text-gray-500 text-xs">智能助手 • {agent.model}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
              agent.hybridSearch
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {agent.hybridSearch ? "混合搜索" : "普通搜索"}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
              agent.networking
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {agent.networking ? "联网" : "离线"}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4 max-h-20 overflow-y-auto">
        <p className="text-gray-700 text-xs leading-relaxed">
          {agent.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 p-2 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">最大Token</div>
            <div className="text-xs font-semibold">{agent.maxToken}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
            <svg
              className="w-4 h-4 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">模型类型</div>
            <div className="text-xs font-semibold">{agent.model}</div>
          </div>
        </div>
      </div>

      {agent.uuid && (
        <div className="bg-gray-50 rounded-lg p-2 mb-4">
          <div className="flex items-center space-x-1">
            <svg
              className="w-3 h-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
              />
            </svg>
            <span className="text-[10px] text-gray-400 font-mono">
              {agent.uuid}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onViewDetail(agent.uuid)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 flex items-center justify-center space-x-1"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>查看详情</span>
        </button>
        <button
          onClick={() => onEdit(agent)}
          className="flex-1 border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 flex items-center justify-center space-x-1"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span>编辑</span>
        </button>
        <button
          onClick={() => onDelete(agent.uuid)}
          className="p-1.5 border border-gray-200 hover:border-red-400 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-all duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
