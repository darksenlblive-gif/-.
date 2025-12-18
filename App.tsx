
import React, { useState, useMemo, useEffect } from 'react';
import { generateVideos } from './mockData';
import { Video, AppState } from './types';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import Player from './components/Player';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentVideo: null,
    searchQuery: '',
    selectedCategory: 'Все'
  });

  const [videos, setVideos] = useState<Video[]>([]);
  const categories = ['Все', 'Образование', 'Гейминг', 'Развлечения', 'Наука', 'Обзоры'];

  useEffect(() => {
    // В реальном приложении здесь был бы API запрос
    setVideos(generateVideos());
  }, []);

  const filteredVideos = useMemo(() => {
    return videos.filter(v => {
      const matchesSearch = v.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                            v.creator.name.toLowerCase().includes(state.searchQuery.toLowerCase());
      const matchesCategory = state.selectedCategory === 'Все' || 
                              (state.selectedCategory === 'Гейминг' && v.category === 'Gaming') ||
                              (state.selectedCategory === 'Образование' && v.category === 'Education') ||
                              (state.selectedCategory === 'Развлечения' && v.category === 'Entertainment');
      return matchesSearch && matchesCategory;
    });
  }, [videos, state.searchQuery, state.selectedCategory]);

  const handleVideoClick = (video: Video) => {
    setState(prev => ({ ...prev, currentVideo: video }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setState(prev => ({ ...prev, currentVideo: null }));
  };

  return (
    <div className="min-h-screen text-white pb-20 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel h-20 px-8 flex items-center justify-between border-b border-white/10 rounded-b-[2.5rem] mx-4 mt-2 shadow-2xl">
        <div className="flex items-center space-x-6">
          <button onClick={handleBack} className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent hover:scale-110 transition-transform active:scale-95 cursor-pointer flex items-center gap-2">
            <span className="text-indigo-500">◈</span> YouGlass
          </button>
        </div>

        <div className="hidden md:flex flex-grow max-w-2xl mx-12">
          <div className="relative w-full group">
            <input 
              type="text" 
              placeholder="Поиск шедевров..."
              value={state.searchQuery}
              onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] px-8 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 backdrop-blur-2xl transition-all group-hover:bg-white/10"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity">🔍</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button className="p-3 hover:bg-white/10 rounded-2xl transition-all hover:rotate-12">🔔</button>
          <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border-2 border-white/20 shadow-lg shadow-indigo-500/20 cursor-pointer hover:scale-110 transition-all"></div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto flex">
        {!state.currentVideo && <Sidebar />}

        <main className={`flex-grow p-6 ${state.currentVideo ? 'w-full' : ''}`}>
          {state.currentVideo ? (
            <Player video={state.currentVideo} onBack={handleBack} />
          ) : (
            <>
              {/* Category Chips */}
              <div className="flex space-x-4 overflow-x-auto pb-8 scrollbar-hide no-scrollbar px-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setState(prev => ({ ...prev, selectedCategory: cat }))}
                    className={`px-8 py-3.5 rounded-[1.5rem] whitespace-nowrap text-sm font-black tracking-widest uppercase transition-all duration-300 ${
                      state.selectedCategory === cat 
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105' 
                      : 'glass-panel text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid with stagger animation look */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-12 animate-in fade-in duration-1000">
                {filteredVideos.map((video, index) => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    onClick={handleVideoClick} 
                  />
                ))}
              </div>
              
              {filteredVideos.length === 0 && (
                <div className="text-center py-40">
                  <span className="text-6xl mb-6 block">🛸</span>
                  <div className="text-white/40 text-2xl font-black italic tracking-widest uppercase">
                    Космос пуст... видео не найдены
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 w-20 h-20 bg-indigo-600 rounded-[2rem] shadow-2xl shadow-indigo-500/40 flex items-center justify-center text-4xl z-50 glass-panel border border-white/30 hover:scale-110 active:scale-90 transition-all group">
        <span className="group-hover:rotate-90 transition-transform">➕</span>
      </button>
    </div>
  );
};

export default App;
