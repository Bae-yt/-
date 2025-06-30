'use client';

import { useState, useCallback } from 'react';
import { ChatInterface } from './chat-interface';
import { ChatConfig, ChatConfig as ChatConfigType } from './chat-config';

interface ChatDashboardProps {
  apiKey: string;
}

export function ChatDashboard({ apiKey }: ChatDashboardProps) {
  const [config, setConfig] = useState<ChatConfigType>({
    mode: 'knowledge-base',
    kbIds: [],
    agentUuid: '',
    model: 'QAnything 4o mini',
    maxToken: '1024',
    hybridSearch: false,
    networking: true,
    sourceNeeded: true,
  });

  const handleConfigChange = useCallback((newConfig: ChatConfigType) => {
    setConfig(newConfig);
  }, []);

  const isConfigValid = () => {
    if (config.mode === 'knowledge-base') {
      return config.kbIds.length > 0;
    } else if (config.mode === 'agent') {
      return config.agentUuid !== '';
    }
    return false;
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, var(--background) 0%, var(--accent) 100%)' }}>
      <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-xl mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">智能聊天中心</h1>
              <p className="text-red-500 font-medium">AI驱动的对话体验</p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">基于知识库或Agent进行智能对话，体验流式响应的魅力</p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Configuration Panel - 放在顶部 */}
          <div className="card-enhanced rounded-2xl">
            <ChatConfig 
              apiKey={apiKey} 
              onConfigChange={handleConfigChange}
            />
          </div>

          {/* Chat Interface - 放在下方 */}
          <div className="card-enhanced rounded-2xl overflow-hidden" style={{ height: '70vh' }}>
            {isConfigValid() ? (
              <ChatInterface
                apiKey={apiKey}
                mode={config.mode}
                kbIds={config.kbIds}
                agentUuid={config.agentUuid}
                model={config.model}
                maxToken={config.maxToken}
                hybridSearch={config.hybridSearch}
                networking={config.networking}
                sourceNeeded={config.sourceNeeded}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-100 to-red-200 flex items-center justify-center">
                    <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">🚀 配置你的AI对话</h3>
                  <p className="text-red-600 mb-4">
                    {config.mode === 'knowledge-base' 
                      ? '请在上方选择至少一个知识库开始对话' 
                      : '请在上方选择一个Agent开始对话'
                    }
                  </p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}