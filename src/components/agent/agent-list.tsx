'use client';

import { Agent } from '@/types/agent';
import { AgentCard } from './agent-card';

interface AgentListProps {
  agents: Agent[];
  loading?: boolean;
  onEdit: (agent: Agent) => void;
  onDelete: (uuid: string) => void;
  onViewDetail: (uuid: string) => void;
}

export function AgentList({ agents, loading, onEdit, onDelete, onViewDetail }: AgentListProps) {
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mb-4"></div>
        <span className="text-xl font-semibold text-red-600">🤖 AI加载中...</span>
        <div className="mt-4 flex space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  // 确保 agents 是数组
  const agentsList = Array.isArray(agents) ? agents : [];

  if (agentsList.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-red-100 to-red-200 flex items-center justify-center">
          <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-red-900 mb-4">🤖 创建您的第一个AI助手</h3>
        <p className="text-lg text-red-600 mb-8 max-w-md mx-auto">还没有Agent？现在就开始创建您的智能助手，解锁AI的无限可能！</p>
        <div className="flex justify-center space-x-4">
          <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-red-900">🤖 Agent集合</h3>
          <p className="text-red-600">共 {agentsList.length} 个智能AI助手</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {agentsList.map((agent) => (
          <AgentCard
            key={agent.uuid}
            agent={agent}
            onEdit={onEdit}
            onDelete={onDelete}
            onViewDetail={onViewDetail}
          />
        ))}
      </div>
    </div>
  );
}