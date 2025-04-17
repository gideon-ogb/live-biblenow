
import React, { useState } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Settings, 
  Share2, 
  Users, 
  MessageSquare,
  ScreenShare,
  ScreenShareOff 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StreamControlsProps {
  isLive?: boolean;
  viewerCount?: number;
  onToggleLive?: () => void;
  className?: string;
}

const StreamControls = ({ 
  isLive = false, 
  viewerCount = 0,
  onToggleLive,
  className 
}: StreamControlsProps) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Camera options
  const cameraOptions = [
    { label: "Built-in Camera", value: "default" },
    { label: "External Camera", value: "external" },
  ];

  // Microphone options
  const micOptions = [
    { label: "Built-in Microphone", value: "default" },
    { label: "Headset Microphone", value: "headset" },
  ];

  // Quality options
  const qualityOptions = [
    { label: "High Definition (1080p)", value: "1080p" },
    { label: "Standard Definition (720p)", value: "720p" },
    { label: "Low Definition (480p)", value: "480p" },
  ];

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-biblenow-neutral-200 p-4", className)}>
      {/* Stream Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {isLive ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 before:content-[''] before:inline-block before:w-2 before:h-2 before:rounded-full before:bg-red-500 before:mr-2 before:animate-pulse-subtle">
              LIVE
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-biblenow-neutral-100 text-biblenow-neutral-600">
              OFFLINE
            </span>
          )}
          
          {isLive && (
            <div className="ml-3 flex items-center text-biblenow-neutral-600">
              <Users size={16} className="mr-1" />
              <span>{viewerCount} viewers</span>
            </div>
          )}
        </div>
        
        <Button
          onClick={onToggleLive}
          className={cn(
            "px-4",
            isLive ? "bg-red-600 hover:bg-red-700" : "bg-biblenow-brown-600 hover:bg-biblenow-brown-700"
          )}
        >
          {isLive ? "End Stream" : "Go Live"}
        </Button>
      </div>
      
      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-4 py-2">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full",
            !isMicOn ? "bg-biblenow-neutral-100 text-biblenow-neutral-600" : ""
          )}
          onClick={() => setIsMicOn(!isMicOn)}
        >
          {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full",
            !isCameraOn ? "bg-biblenow-neutral-100 text-biblenow-neutral-600" : ""
          )}
          onClick={() => setIsCameraOn(!isCameraOn)}
        >
          {isCameraOn ? <Video size={20} /> : <VideoOff size={20} />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full",
            isScreenSharing ? "bg-biblenow-gold-100 text-biblenow-gold-600 border-biblenow-gold-300" : ""
          )}
          onClick={() => setIsScreenSharing(!isScreenSharing)}
        >
          {isScreenSharing ? <ScreenShareOff size={20} /> : <ScreenShare size={20} />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full"
        >
          <MessageSquare size={20} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full"
        >
          <Share2 size={20} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-full",
            showSettings ? "bg-biblenow-neutral-100 text-biblenow-neutral-600" : ""
          )}
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings size={20} />
        </Button>
      </div>
      
      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-4 p-4 bg-biblenow-neutral-50 rounded-lg border border-biblenow-neutral-200 animate-scale-in">
          <h4 className="text-biblenow-brown-800 font-medium mb-3">Stream Settings</h4>
          
          <div className="space-y-4">
            {/* Camera Settings */}
            <div>
              <label className="block text-sm font-medium text-biblenow-brown-700 mb-1">
                Camera
              </label>
              <select className="input-primary w-full">
                {cameraOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            {/* Microphone Settings */}
            <div>
              <label className="block text-sm font-medium text-biblenow-brown-700 mb-1">
                Microphone
              </label>
              <select className="input-primary w-full">
                {micOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            {/* Stream Quality */}
            <div>
              <label className="block text-sm font-medium text-biblenow-brown-700 mb-1">
                Stream Quality
              </label>
              <select className="input-primary w-full">
                {qualityOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            {/* Bandwidth Usage */}
            <div className="bg-white p-3 rounded border border-biblenow-neutral-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-biblenow-neutral-600">Bandwidth Usage</span>
                <span className="text-sm font-medium text-biblenow-brown-700">2.5 Mbps</span>
              </div>
              <div className="w-full h-2 bg-biblenow-neutral-200 rounded-full overflow-hidden">
                <div className="h-full bg-biblenow-gold-400 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamControls;
