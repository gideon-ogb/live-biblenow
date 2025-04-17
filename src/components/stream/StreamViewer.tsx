
import React, { useState } from 'react';
import { Volume2, Volume1, VolumeX, Maximize, Settings, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreamViewerProps {
  streamUrl: string;
  title: string;
  isFullScreen?: boolean;
  className?: string;
}

const StreamViewer = ({ streamUrl, title, isFullScreen = false, className }: StreamViewerProps) => {
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState("720p");
  const [showQualityOptions, setShowQualityOptions] = useState(false);

  // Video quality options
  const qualityOptions = [
    { label: "1080p (HD)", value: "1080p" },
    { label: "720p (HD)", value: "720p" },
    { label: "480p", value: "480p" },
    { label: "360p", value: "360p" },
    { label: "Auto", value: "auto" },
  ];

  // Timer to hide controls
  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (showControls) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [showControls]);

  // Toggle full screen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Toggle controls visibility
  const handleMouseMove = () => {
    setShowControls(true);
  };

  // Volume icon based on volume level
  const VolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />;
    if (volume < 50) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div 
      className={cn(
        "relative bg-black w-full overflow-hidden",
        isFullScreen ? "h-screen" : "aspect-video",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Video Element (placeholder for actual video player) */}
      <div className="w-full h-full flex items-center justify-center">
        {streamUrl ? (
          <video 
            src={streamUrl} 
            className="w-full h-full object-contain" 
            autoPlay
            muted={isMuted}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-white">
            <div className="w-16 h-16 rounded-full bg-biblenow-brown-600 animate-pulse-subtle flex items-center justify-center mb-4">
              <span className="font-bold">LIVE</span>
            </div>
            <p className="text-xl">Stream will begin shortly...</p>
          </div>
        )}
      </div>

      {/* Controls Overlay */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center space-x-4">
            <button 
              className="text-white hover:text-biblenow-gold-400 transition-colors"
              onClick={() => setIsMuted(!isMuted)}
            >
              <VolumeIcon />
            </button>
            
            {/* Volume Slider */}
            <div className="w-24 hidden sm:block">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume} 
                onChange={(e) => {
                  setVolume(parseInt(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-biblenow-gold-400"
              />
            </div>
            
            {/* Stream Info */}
            <div className="text-white text-sm">
              <span className="bg-red-600 px-1.5 py-0.5 rounded text-[10px] font-medium mr-2">LIVE</span>
              <span className="hidden sm:inline">{title}</span>
            </div>
          </div>
          
          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            {/* Quality Selector */}
            <div className="relative">
              <button 
                className="text-white hover:text-biblenow-gold-400 transition-colors"
                onClick={() => setShowQualityOptions(!showQualityOptions)}
              >
                <Settings size={18} />
              </button>
              
              {/* Quality Dropdown */}
              {showQualityOptions && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded p-2 w-36 shadow-lg">
                  <p className="text-white/70 text-xs mb-1 px-2">Quality</p>
                  {qualityOptions.map((option) => (
                    <button 
                      key={option.value}
                      className={cn(
                        "block w-full text-left px-2 py-1 text-sm rounded",
                        quality === option.value ? "bg-biblenow-gold-400/20 text-biblenow-gold-400" : "text-white hover:bg-white/10"
                      )}
                      onClick={() => {
                        setQuality(option.value);
                        setShowQualityOptions(false);
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Share Button */}
            <button className="text-white hover:text-biblenow-gold-400 transition-colors">
              <Share2 size={18} />
            </button>
            
            {/* Fullscreen Button */}
            <button 
              className="text-white hover:text-biblenow-gold-400 transition-colors"
              onClick={toggleFullScreen}
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamViewer;
