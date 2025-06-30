'use client';

import { useEffect, useState } from 'react';
import { useKnowledgeBase } from '@/hooks/use-knowledge-base';
import type { KnowledgeBase } from '@/types/knowledge-base';

interface KnowledgeBaseListProps {
  apiKey: string;
  onSelectKb?: (kb: KnowledgeBase) => void;
  onCreateKb?: () => void;
  onDeleteKb?: (kbId: string) => void;
  onEditKb?: (kb: KnowledgeBase) => void;
}

export default function KnowledgeBaseList({
  apiKey,
  onSelectKb,
  onCreateKb,
  onDeleteKb,
  onEditKb,
}: KnowledgeBaseListProps) {
  const {
    knowledgeBases,
    loading,
    error,
    fetchKnowledgeBaseList,
    deleteKnowledgeBase,
  } = useKnowledgeBase(apiKey);

  const [selectedKbId, setSelectedKbId] = useState<string | null>(null);

  useEffect(() => {
    fetchKnowledgeBaseList();
  }, [fetchKnowledgeBaseList]);

  const handleSelectKb = (kb: KnowledgeBase) => {
    setSelectedKbId(kb.kbId);
    onSelectKb?.(kb);
  };

  const handleDeleteKb = async (kbId: string, kbName: string) => {
    if (confirm(`确定要删除知识库"${kbName}"吗？此操作不可恢复。`)) {
      try {
        await deleteKnowledgeBase(kbId);
        onDeleteKb?.(kbId);
        if (selectedKbId === kbId) {
          setSelectedKbId(null);
        }
      } catch (error) {
        console.error('删除知识库失败:', error);
      }
    }
  };

  if (loading && knowledgeBases.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-500 mb-4"></div>
        <p className="text-red-600 font-medium">🔄 加载中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-red-800 font-semibold mb-4">⚠️ 加载失败: {error}</p>
        <button
          onClick={() => fetchKnowledgeBaseList()}
          className="btn-primary px-6 py-3 rounded-lg font-semibold"
        >
          🔄 重新加载
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-900">📚 知识库集合</h3>
            <p className="text-sm text-red-600">智能管理您的知识资源</p>
          </div>
        </div>
        <button
          onClick={onCreateKb}
          className="btn-primary px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          ✨ 创建知识库
        </button>
      </div>

      {knowledgeBases.length === 0 ? (
        <div className="text-center py-16 px-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-100 to-red-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-red-900 mb-2">🎆 开始您的知识之旅</h4>
          <p className="text-red-600 mb-6 max-w-xs mx-auto">还没有知识库？现在就创建第一个，开始构建您的智能知识体系！</p>
          <button
            onClick={onCreateKb}
            className="btn-primary px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            🚀 创建第一个知识库
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {knowledgeBases.map((kb) => (
            <div
              key={kb.kbId}
              className={`card-enhanced p-6 cursor-pointer transition-all duration-300 ${
                selectedKbId === kb.kbId
                  ? 'border-red-400 bg-red-50 shadow-lg transform scale-102 ring-2 ring-red-200'
                  : 'hover:shadow-lg hover:transform hover:scale-102'
              }`}
              onClick={() => handleSelectKb(kb)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                    selectedKbId === kb.kbId
                      ? 'bg-gradient-to-r from-red-500 to-red-600'
                      : 'bg-gradient-to-r from-red-400 to-red-500'
                  }`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg mb-1 ${
                      selectedKbId === kb.kbId ? 'text-red-900' : 'text-gray-900'
                    }`}>{kb.kbName}</h4>
                    {kb.createTime && (
                      <p className={`text-sm flex items-center ${
                        selectedKbId === kb.kbId ? 'text-red-600' : 'text-gray-500'
                      }`}>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(kb.createTime).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditKb?.(kb);
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 border border-red-300 hover:border-red-500 rounded-lg transition-all duration-200"
                  >
                    ✏️ 编辑
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteKb(kb.kbId, kb.kbName);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-white hover:bg-red-600 border border-gray-300 hover:border-red-600 rounded-lg transition-all duration-200"
                    disabled={loading}
                  >
                    🗑️ 删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && knowledgeBases.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-3 border-red-500"></div>
            <span className="text-red-600 font-medium">🔄 更新中...</span>
          </div>
        </div>
      )}
    </div>
  );
}