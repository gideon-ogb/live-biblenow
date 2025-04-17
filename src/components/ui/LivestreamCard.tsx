
import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LivestreamCardProps {
  id: string;
  title: string;
  streamerName: string;
  streamerImage: string;
  thumbnailUrl: string;
  viewerCount: number;
  category: string;
  className?: string;
}

const LivestreamCard = ({
  id,
  title,
  streamerName,
  streamerImage,
  thumbnailUrl,
  viewerCount,
  category,
  className,
}: LivestreamCardProps) => {
  return (
    <Link to={`/stream/${id}`}>
      <div className={cn("bg-dark-beige rounded-lg overflow-hidden shadow-sm card-hover", className)}>
        <div className="relative aspect-video bg-biblenow-neutral-100 overflow-hidden">
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex space-x-2">
            <span className="live-badge">LIVE</span>
            <span className="viewers-badge flex items-center">
              <Users size={12} className="mr-1" /> {viewerCount.toLocaleString()}
            </span>
          </div>
          {category && (
            <div className="absolute bottom-2 right-2">
              <span className="bg-black/60 text-white px-2 py-0.5 rounded text-xs">{category}</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <img 
                src={streamerImage} 
                alt={streamerName}
                className="w-10 h-10 rounded-full object-cover border-2 border-dark-background"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-dark-background font-medium text-sm mb-1 truncate">{title}</h3>
              <p className="text-dark-background/80 text-xs truncate">{streamerName}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LivestreamCard;
