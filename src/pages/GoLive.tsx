
import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StreamControls from '@/components/stream/StreamControls';
import ChatInterface from '@/components/stream/ChatInterface';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, Info, Camera, CameraOff } from 'lucide-react';

const GoLive = () => {
  const [isLive, setIsLive] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [previewActive, setPreviewActive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle camera preview
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const enableCamera = async () => {
      try {
        if (cameraEnabled && videoRef.current) {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          videoRef.current.srcObject = stream;
          setPreviewActive(true);
        } else if (stream) {
          stream.getTracks().forEach(track => track.stop());
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
          setPreviewActive(false);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setCameraEnabled(false);
        setPreviewActive(false);
      }
    };
    
    enableCamera();
    
    // Clean up on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraEnabled]);
  
  // Toggle live status
  const handleToggleLive = () => {
    if (!title.trim()) {
      // Show error for missing title
      alert('Please enter a stream title before going live');
      return;
    }
    
    if (isLive) {
      setIsLive(false);
      setViewerCount(0);
    } else {
      setIsLive(true);
      // Start with a random number of viewers
      setViewerCount(Math.floor(Math.random() * 20) + 5);
      
      // Simulate viewer count increasing over time
      const interval = setInterval(() => {
        setViewerCount(prev => {
          const change = Math.floor(Math.random() * 5) - 1; // -1 to +4 viewers
          return Math.max(0, prev + change);
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  };
  
  // Category options
  const categoryOptions = [
    { label: 'Worship', value: 'worship' },
    { label: 'Bible Study', value: 'bible-study' },
    { label: 'Prayer', value: 'prayer' },
    { label: 'Youth', value: 'youth' },
    { label: 'Music', value: 'music' },
    { label: 'Devotional', value: 'devotional' },
    { label: 'Sermon', value: 'sermon' },
    { label: 'Discussion', value: 'discussion' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-16 bg-biblenow-neutral-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-biblenow-brown-900 mb-6">
            {isLive ? 'You are Live!' : 'Go Live'}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stream Preview & Controls */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Preview */}
              <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
                {previewActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white">
                    <div className="w-16 h-16 rounded-full bg-biblenow-neutral-700 flex items-center justify-center mb-4">
                      <CameraOff size={32} />
                    </div>
                    <p className="text-lg">Camera preview not available</p>
                    <p className="text-biblenow-neutral-400 text-sm mt-2">
                      {cameraEnabled 
                        ? 'There was an issue accessing your camera' 
                        : 'Enable camera to see preview'}
                    </p>
                    <Button 
                      className="mt-4 bg-white/20 hover:bg-white/30 text-white"
                      onClick={() => setCameraEnabled(true)}
                    >
                      <Camera size={16} className="mr-2" />
                      Enable Camera
                    </Button>
                  </div>
                )}
                
                {/* Live Indicator */}
                {isLive && (
                  <div className="absolute top-4 left-4 flex items-center space-x-3">
                    <span className="live-badge !px-3 !py-1 !text-sm">LIVE</span>
                    <span className="viewers-badge flex items-center text-white bg-black/50 backdrop-blur-sm">
                      <Users size={14} className="mr-1" /> {viewerCount}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Stream Controls */}
              <StreamControls
                isLive={isLive}
                viewerCount={viewerCount}
                onToggleLive={handleToggleLive}
              />
              
              {/* Stream Details (only editable when not live) */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-biblenow-neutral-200">
                <h3 className="text-lg font-medium text-biblenow-brown-800 mb-4">Stream Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="stream-title" className="block text-sm font-medium text-biblenow-brown-700 mb-1">
                      Stream Title*
                    </label>
                    <Input
                      id="stream-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a title for your stream"
                      disabled={isLive}
                      className="input-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="stream-description" className="block text-sm font-medium text-biblenow-brown-700 mb-1">
                      Description
                    </label>
                    <Textarea
                      id="stream-description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what this stream is about"
                      disabled={isLive}
                      className="input-primary min-h-[100px]"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="stream-category" className="block text-sm font-medium text-biblenow-brown-700 mb-1">
                      Category
                    </label>
                    <select
                      id="stream-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      disabled={isLive}
                      className="input-primary w-full"
                    >
                      <option value="">Select a category</option>
                      {categoryOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-start p-3 bg-biblenow-neutral-50 rounded-lg border border-biblenow-neutral-200">
                    <Info size={18} className="text-biblenow-neutral-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-biblenow-neutral-600">
                      Stream details can't be modified while you're live. You can edit them before starting or after ending your stream.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat Interface */}
            <div className="h-[600px]">
              {isLive ? (
                <ChatInterface streamId="live" />
              ) : (
                <div className="bg-white h-full rounded-lg overflow-hidden shadow-sm border border-biblenow-neutral-200 flex flex-col items-center justify-center p-6 text-center">
                  <Users size={48} className="text-biblenow-neutral-300 mb-4" />
                  <h3 className="text-xl font-medium text-biblenow-brown-800 mb-2">Chat will be enabled when you go live</h3>
                  <p className="text-biblenow-neutral-600">
                    Viewers will be able to chat with you and raise their hands to ask questions once your stream starts.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Stream Tips */}
          {!isLive && (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-biblenow-neutral-200">
              <h3 className="text-xl font-medium text-biblenow-brown-800 mb-4">Streaming Tips</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-biblenow-neutral-50 rounded-lg border border-biblenow-neutral-200">
                  <h4 className="font-medium text-biblenow-brown-700 mb-2">Prepare Your Space</h4>
                  <p className="text-biblenow-neutral-600 text-sm">
                    Find a quiet location with good lighting and minimal background distractions to enhance your stream quality.
                  </p>
                </div>
                
                <div className="p-4 bg-biblenow-neutral-50 rounded-lg border border-biblenow-neutral-200">
                  <h4 className="font-medium text-biblenow-brown-700 mb-2">Test Your Equipment</h4>
                  <p className="text-biblenow-neutral-600 text-sm">
                    Check your camera, microphone, and internet connection before going live to avoid technical issues.
                  </p>
                </div>
                
                <div className="p-4 bg-biblenow-neutral-50 rounded-lg border border-biblenow-neutral-200">
                  <h4 className="font-medium text-biblenow-brown-700 mb-2">Engage With Viewers</h4>
                  <p className="text-biblenow-neutral-600 text-sm">
                    Acknowledge viewers who join your stream and respond to comments to build community engagement.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GoLive;
