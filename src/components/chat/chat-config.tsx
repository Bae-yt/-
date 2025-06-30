'use client';

import { useState, useEffect } from 'react';
import { KnowledgeBase } from '@/types/knowledge-base';
import { Agent } from '@/types/agent';
import { KnowledgeBaseClient } from '@/lib/knowledge-base-client';
import { agentService } from '@/services/agentService';

interface ChatConfigProps {
  apiKey: string;
  onConfigChange: (config: ChatConfig) => void;
}

export interface ChatConfig {
  mode: 'knowledge-base' | 'agent';
  kbIds: string[];
  agentUuid: string;
  model: string;
  maxToken: string;
  hybridSearch: boolean;
  networking: boolean;
  sourceNeeded: boolean;
}

export function ChatConfig({ apiKey, onConfigChange }: ChatConfigProps) {
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [config, setConfig] = useState<ChatConfig>({
    mode: 'knowledge-base',
    kbIds: [],
    agentUuid: '',
    model: 'QAnything 4o mini',
    maxToken: '1024',
    hybridSearch: false,
    networking: true,
    sourceNeeded: true,
  });
  const [loading, setLoading] = useState(true);
  const [knowledgeBaseClient, setKnowledgeBaseClient] = useState<KnowledgeBaseClient | null>(null);

  useEffect(() => {
    const initData = async () => {
      if (!apiKey) return;

      try {
        setLoading(true);
        const client = new KnowledgeBaseClient(apiKey);
        setKnowledgeBaseClient(client);
        agentService.setApiKey(apiKey);

        const [kbResponse, agentResponse] = await Promise.all([
          client.getKnowledgeBaseList(),
          agentService.getAgentList()
        ]);

        if (kbResponse.result) {
          setKnowledgeBases(kbResponse.result || []);
        }

        if (agentResponse.success) {
          setAgents(agentResponse.data || []);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, [apiKey]);

  useEffect(() => {
    onConfigChange(config);
  }, [config, onConfigChange]);

  const handleConfigChange = (updates: Partial<ChatConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleKbToggle = (kbId: string) => {
    setConfig(prev => ({
      ...prev,
      kbIds: prev.kbIds.includes(kbId)
        ? prev.kbIds.filter(id => id !== kbId)
        : [...prev.kbIds, kbId]
    }));
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-3 border-red-500 mr-4"></div>
          <span className="text-red-600 font-semibold">🔄 加载配置中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-red-900">⚙️ 对话配置中心</h3>
          <p className="text-red-600">自定义您的AI对话体验</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Mode Selection */}
        <div className="lg:col-span-3">
          <div className="bg-white p-6 rounded-xl border border-red-100">
            <label className="block text-sm font-bold text-red-700 mb-4">
              🎯 对话模式
            </label>
            <div className="space-y-3">
              <label className="flex items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                config.mode === 'knowledge-base' 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-200 hover:border-red-200'
              }">
                <input
                  type="radio"
                  value="knowledge-base"
                  checked={config.mode === 'knowledge-base'}
                  onChange={(e) => handleConfigChange({ mode: e.target.value as 'knowledge-base' })}
                  className="w-4 h-4 text-red-600 border-red-300 focus:ring-red-500 mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-900">📚 知识库对话</div>
                  <div className="text-sm text-gray-600">基于知识库进行问答</div>
                </div>
              </label>
              <label className="flex items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                config.mode === 'agent' 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-200 hover:border-red-200'
              }">
                <input
                  type="radio"
                  value="agent"
                  checked={config.mode === 'agent'}
                  onChange={(e) => handleConfigChange({ mode: e.target.value as 'agent' })}
                  className="w-4 h-4 text-red-600 border-red-300 focus:ring-red-500 mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-900">🤖 Agent对话</div>
                  <div className="text-sm text-gray-600">使用定制Agent服务</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Knowledge Base Selection */}
        {config.mode === 'knowledge-base' && (
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-xl border border-red-100">
              <label className="block text-sm font-bold text-red-700 mb-4">
                📚 选择知识库 
                <span className="inline-flex items-center justify-center w-6 h-6 ml-2 text-xs font-bold text-white bg-red-500 rounded-full">
                  {config.kbIds.length}
                </span>
              </label>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {knowledgeBases.map((kb) => (
                  <label key={kb.kbId} className="flex items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    config.kbIds.includes(kb.kbId) 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-200 hover:border-red-200'
                  }">
                    <input
                      type="checkbox"
                      checked={config.kbIds.includes(kb.kbId)}
                      onChange={() => handleKbToggle(kb.kbId)}
                      className="w-4 h-4 text-red-600 border-red-300 focus:ring-red-500 mr-3"
                    />
                    <span className="font-medium text-gray-900">{kb.kbName}</span>
                  </label>
                ))}
              </div>
              {knowledgeBases.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-red-500 font-medium">⚠️ 暂无知识库</p>
                  <p className="text-sm text-gray-600 mt-1">请先在知识库管理中创建</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Agent Selection */}
        {config.mode === 'agent' && (
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-xl border border-red-100">
              <label className="block text-sm font-bold text-red-700 mb-4">
                🤖 选择Agent
              </label>
              <select
                value={config.agentUuid}
                onChange={(e) => handleConfigChange({ agentUuid: e.target.value })}
                className="form-input-enhanced w-full px-4 py-3 rounded-lg font-medium text-gray-900 focus:ring-4"
              >
                <option value="">🔍 请选择一个Agent...</option>
                {agents.map((agent) => (
                  <option key={agent.uuid} value={agent.uuid}>
                    🤖 {agent.name}
                  </option>
                ))}
              </select>
              {agents.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-red-500 font-medium">⚠️ 暂无Agent</p>
                  <p className="text-sm text-gray-600 mt-1">请先在Agent管理中创建</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Knowledge Base Settings */}
        {config.mode === 'knowledge-base' && (
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-xl border border-red-100">
              <h4 className="text-sm font-bold text-red-700 mb-4">⚙️ 高级设置</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🤖 AI模型
                  </label>
                  <select
                    value={config.model}
                    onChange={(e) => handleConfigChange({ model: e.target.value })}
                    className="form-input-enhanced w-full px-3 py-2 rounded-lg"
                  >
                    <option value="QAnything 4o mini">QAnything 4o mini</option>
                    <option value="deepseek-lite">DeepSeek Lite</option>
                    <option value="deepseek-pro">DeepSeek Pro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📝 最大Token数
                  </label>
                  <input
                    type="number"
                    value={config.maxToken}
                    onChange={(e) => handleConfigChange({ maxToken: e.target.value })}
                    className="form-input-enhanced w-full px-3 py-2 rounded-lg"
                    min="1"
                    max="4096"
                    placeholder="1024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  config.hybridSearch 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 hover:border-red-200'
                }">
                  <input
                    type="checkbox"
                    checked={config.hybridSearch}
                    onChange={(e) => handleConfigChange({ hybridSearch: e.target.checked })}
                    className="w-4 h-4 text-red-600 border-red-300 focus:ring-red-500 mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">🔍 混合搜索</div>
                    <div className="text-xs text-gray-600">结合语义搜索</div>
                  </div>
                </label>

                <label className="flex items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  config.networking 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 hover:border-red-200'
                }">
                  <input
                    type="checkbox"
                    checked={config.networking}
                    onChange={(e) => handleConfigChange({ networking: e.target.checked })}
                    className="w-4 h-4 text-red-600 border-red-300 focus:ring-red-500 mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">🌐 网络搜索</div>
                    <div className="text-xs text-gray-600">实时信息检索</div>
                  </div>
                </label>

                <label className="flex items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  config.sourceNeeded 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 hover:border-red-200'
                }">
                  <input
                    type="checkbox"
                    checked={config.sourceNeeded}
                    onChange={(e) => handleConfigChange({ sourceNeeded: e.target.checked })}
                    className="w-4 h-4 text-red-600 border-red-300 focus:ring-red-500 mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">📄 来源信息</div>
                    <div className="text-xs text-gray-600">显示引用来源</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Agent Settings */}
        {config.mode === 'agent' && (
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-xl border border-red-100">
              <h4 className="text-sm font-bold text-red-700 mb-4">⚙️ 高级设置</h4>
              
              <label className="flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                config.sourceNeeded 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-200 hover:border-red-200'
              }">
                <input
                  type="checkbox"
                  checked={config.sourceNeeded}
                  onChange={(e) => handleConfigChange({ sourceNeeded: e.target.checked })}
                  className="w-4 h-4 text-red-600 border-red-300 focus:ring-red-500 mr-4"
                />
                <div>
                  <div className="font-medium text-gray-900">📄 显示来源信息</div>
                  <div className="text-sm text-gray-600">在回答中包含引用来源和参考链接</div>
                </div>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}