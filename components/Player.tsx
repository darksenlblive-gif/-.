
import React, { useEffect, useState } from 'react';
import { Video } from '../types';
import { getVideoSummary } from '../services/gemini';

interface PlayerProps {
  video: Video;
  onBack: () => void;
}

const Player: React.FC<PlayerProps> = ({ video, onBack }) => {
  const [summary, setSummary] = useState<string>("Генерация умного саммари от Gemini...");

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await getVideoSummary(video.title, video.description);
      setSummary(res || "Саммари временно недоступно.");
    };
    fetchSummary();
  }, [video]);

  // Параметры для YouTube: modestbranding=1 (убирает лого), rel=0 (рекомендации своего канала), iv_load_policy=3 (убирает аннотации)
  const embedUrl = video.platform === 'youtube'
    ? `https://www.youtube.com/embed/${video.videoId}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`
    : `https://rutube.ru/play/embed/${video.videoId}`;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex-grow space-y-6">
        {/* Real Video Frame with Shadow Glow */}
        <div className="relative aspect-video rounded-[3rem] overflow-hidden glass-panel border border-white/20 shadow-[0_0_50px_rgba(99,102,241,0.15)]">
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="glass-panel p-8 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-40"></div>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-white leading-tight flex-grow">{video.title}</h1>
            <div className="flex items-center space-x-2 bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0">
               <button className="px-4 py-2 hover:bg-white/10 rounded-xl transition-all">👍 Лайк</button>
               <button className="px-4 py-2 hover:bg-white/10 rounded-xl transition-all">👎</button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <img src={video.creator.avatar} className="w-16 h-16 rounded-3xl object-cover border-2 border-white/10 group-hover:scale-110 transition-transform duration-500" />
                {video.creator.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-1 border-2 border-[#0f172a]">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-white font-black text-xl">{video.creator.name}</h3>
                <p className="text-white/40 text-sm font-medium uppercase tracking-widest">{video.creator.subscribers} сабов</p>
              </div>
              <button className="bg-white text-black px-10 py-3.5 rounded-[1.5rem] font-black hover:scale-105 active:scale-95 transition-all ml-4 shadow-xl shadow-white/10">
                ПОДПИСАТЬСЯ
              </button>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] p-8 border border-white/5">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                <span className="text-xl">✨</span>
              </div>
              <span className="font-black text-indigo-300 text-sm tracking-widest uppercase">AI Анализ Контента</span>
            </div>
            <p className="text-white/90 text-lg italic leading-relaxed font-medium">{summary}</p>
            <div className="mt-8 pt-8 border-t border-white/10">
               <p className="text-white/60 leading-relaxed text-sm">
                {video.description}
               </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="glass-panel p-8 rounded-[3rem]">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-white font-black text-2xl">{video.comments.length} Мнений</h3>
            <div className="w-10 h-1 bg-white/10 rounded-full"></div>
          </div>
          <div className="space-y-10">
            {video.comments.map(comment => (
              <div key={comment.id} className="flex space-x-6 group">
                <img src={comment.avatar} className="w-14 h-14 rounded-2xl border border-white/10 group-hover:rotate-6 transition-transform" />
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-white font-bold">{comment.author}</span>
                    <span className="text-white/30 text-xs font-medium uppercase tracking-tighter">{comment.timestamp}</span>
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">{comment.text}</p>
                  <div className="flex items-center space-x-8 mt-4">
                    <button className="flex items-center space-x-2 text-white/40 text-sm hover:text-indigo-400 transition-colors">
                      <span className="text-xl">👍</span> <span className="font-bold">{comment.likes}</span>
                    </button>
                    <button className="text-white/40 text-sm font-bold hover:text-white transition-colors">ОТВЕТИТЬ</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:w-[450px] space-y-6">
        <div className="flex items-center justify-between px-4">
          <h4 className="text-white font-black text-xl">РЕКОМЕНДАЦИИ</h4>
          <div className="animate-pulse w-2 h-2 bg-indigo-500 rounded-full"></div>
        </div>
        <div className="flex flex-col gap-6">
          <button 
            onClick={onBack} 
            className="w-full glass-panel py-6 rounded-3xl text-white font-black text-lg hover:bg-indigo-600/30 hover:border-indigo-500/50 transition-all border border-white/10 flex items-center justify-center space-x-4 shadow-lg group"
          >
            <span className="group-hover:-translate-x-2 transition-transform">🔙</span>
            <span>НА ГЛАВНУЮ</span>
          </button>
          
          <div className="space-y-4 px-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex space-x-4 group cursor-pointer p-3 rounded-[2rem] hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                <div className="w-44 aspect-video rounded-2xl overflow-hidden glass-panel shrink-0 relative">
                   <img src={`https://picsum.photos/seed/rec${i+20}/320/180`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                   <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-md text-[10px] px-1.5 py-0.5 rounded text-white font-bold">12:44</div>
                </div>
                <div className="flex flex-col justify-center min-w-0">
                  <h5 className="text-white text-sm font-bold line-clamp-2 group-hover:text-indigo-400 leading-snug">Как создать идеальный Liquid Glass дизайн в 2024</h5>
                  <p className="text-[11px] text-white/40 mt-1 font-bold uppercase tracking-wider">Education • 2.4M</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
