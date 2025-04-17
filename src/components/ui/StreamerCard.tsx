
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface StreamerCardProps {
  id: string;
  name: string;
  profileImage: string;
  followerCount: number;
  isVerified?: boolean;
  isFollowing?: boolean;
  isLive?: boolean;
  viewerCount?: number;
  category?: string;
  className?: string;
  onFollow?: () => void;
}

const StreamerCard = ({
  id,
  name,
  profileImage,
  followerCount,
  isVerified = false,
  isFollowing = false,
  isLive = false,
  viewerCount = 0,
  category,
  className,
  onFollow,
}: StreamerCardProps) => {
  return (
    <AspectRatio ratio={3/4} className={cn("bg-dark-beige rounded-lg overflow-hidden shadow-sm flex flex-col card-hover", className)}>
      <div className="p-4 flex flex-col items-center h-full justify-between">
        <div className="relative flex-shrink-0">
          <Link to={`/profile/${id}`}>
            <img 
              src={profileImage} 
              alt={name}
              className="w-20 h-20 rounded-full object-cover border-2 border-dark-background"
            />
          </Link>
          {isLive && (
            <span className="absolute -top-1 -right-1 live-badge">LIVE</span>
          )}
        </div>
        
        <div className="flex flex-col items-center flex-grow mt-3">
          <Link to={`/profile/${id}`}>
            <h3 className="text-black font-medium flex items-center">
              {name}
              {isVerified && (
                <CheckCircle size={14} className="ml-1 text-dark-accent" />
              )}
            </h3>
          </Link>
          
          <div className="text-black/70 text-sm mt-1 flex items-center">
            <Users size={14} className="mr-1" />
            <span>{followerCount.toLocaleString()} followers</span>
          </div>
          
          {isLive && viewerCount > 0 && (
            <div className="mt-2 text-sm">
              <span className="viewers-badge flex items-center">
                <Users size={12} className="mr-1" /> {viewerCount.toLocaleString()}
              </span>
              {category && (
                <span className="mt-1 bg-dark-background/10 text-black px-2 py-0.5 rounded-full text-xs">
                  {category}
                </span>
              )}
            </div>
          )}
        </div>
        
        <Button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onFollow) onFollow();
          }}
          className={cn(
            "w-full text-sm",
            isFollowing ? "btn-secondary" : "btn-primary"
          )}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
    </AspectRatio>
  );
};

export default StreamerCard;
