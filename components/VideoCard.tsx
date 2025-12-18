
import React from 'react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div 
      onClick={() => onClick(video)}
      className="group cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-video rounded-[2rem] overflow-hidden glass-panel border border-white/10 mb-4 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] group-hover:border-indigo-500/30">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${video.id}/1280/720`;
          }}
        />
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xl text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/10">
          {video.duration}
        </div>
        <div className="absolute top-3 left-3 bg-indigo-600/80 backdrop-blur-md text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">
          {video.platform}
        </div>
      </div>
      
      <div className="flex space-x-3 px-1">
        <div className="shrink-0">
          <img 
            src={video.creator.avatar} 
            alt={video.creator.name} 
            className="w-11 h-11 rounded-2xl object-cover glass-panel border border-white/10 p-0.5 shadow-lg shadow-black/20"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-white font-bold line-clamp-2 text-sm leading-[1.3] group-hover:text-indigo-400 transition-colors">
            {video.title}
          </h3>
          <div className="mt-1.5 flex flex-col">
            <span className="text-white/60 text-xs font-medium hover:text-white transition-colors flex items-center">
              {video.creator.name}
              {video.creator.verified && (
                <span className="ml-1 text-blue-400">●</span>
              )}
            </span>
            <div className="flex items-center text-[11px] text-white/40 mt-0.5">
              <span>{video.views}</span>
              <span className="mx-1.5">•</span>
              <span>{video.postedAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
