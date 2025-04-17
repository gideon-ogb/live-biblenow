
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StreamViewer from '@/components/stream/StreamViewer';
import ChatInterface from '@/components/stream/ChatInterface';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Flag, Users } from 'lucide-react';

// Mock stream data
const mockStreamData = {
  id: '1',
  title: 'Sunday Morning Worship Service',
  description: 'Join us for our weekly Sunday morning worship service. We\'ll have worship, prayer, and a message from Pastor Johnson on "Finding Peace in Troubled Times."',
  streamerName: 'Grace Community Church',
  streamerImage: 'https://i.pravatar.cc/150?img=1',
  streamUrl: '', // In a real app, this would be the actual stream URL
  viewerCount: 1243,
  category: 'Worship',
  isLive: true,
  tags: ['worship', 'sunday service', 'sermon'],
  startedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
};

const Stream = () => {
  const { id } = useParams<{ id: string }>();
  const [stream, setStream] = useState(mockStreamData);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real app, we would fetch the stream data based on the ID
      setStream({
        ...mockStreamData,
        id: id || '1',
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Format the time the stream started
  const formatStreamTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-16">
        {isLoading ? (
          // Loading skeleton
          <div className="container mx-auto px-4 py-6">
            <div className="animate-pulse space-y-4">
              <div className="aspect-video bg-biblenow-neutral-200 rounded-lg"></div>
              <div className="h-8 bg-biblenow-neutral-200 rounded w-1/2"></div>
              <div className="h-4 bg-biblenow-neutral-200 rounded w-3/4"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Stream Viewer */}
            <div className="bg-black">
              <div className="container mx-auto px-4">
                <StreamViewer 
                  streamUrl={stream.streamUrl}
                  title={stream.title}
                />
              </div>
            </div>
            
            {/* Stream Info & Chat Section */}
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stream Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Stream Header */}
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-biblenow-neutral-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="live-badge">LIVE</span>
                      <span className="text-biblenow-neutral-500 text-sm">Started at {formatStreamTime(stream.startedAt)}</span>
                      <span className="viewers-badge flex items-center">
                        <Users size={14} className="mr-1" /> {stream.viewerCount.toLocaleString()}
                      </span>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-biblenow-brown-900 mb-2">{stream.title}</h1>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <img 
                          src={stream.streamerImage} 
                          alt={stream.streamerName}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h2 className="text-biblenow-brown-800 font-medium">{stream.streamerName}</h2>
                          <p className="text-biblenow-neutral-500 text-sm">{stream.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => setIsFollowing(!isFollowing)}
                          className={isFollowing ? "btn-secondary" : "btn-primary"}
                        >
                          {isFollowing ? "Following" : "Follow"}
                        </Button>
                        
                        <Button variant="outline" size="icon" className="text-biblenow-brown-700">
                          <Heart size={18} />
                        </Button>
                        
                        <Button variant="outline" size="icon" className="text-biblenow-brown-700">
                          <Share2 size={18} />
                        </Button>
                        
                        <Button variant="outline" size="icon" className="text-biblenow-neutral-500">
                          <Flag size={18} />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-biblenow-neutral-700">{stream.description}</p>
                    
                    {/* Stream Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {stream.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-biblenow-neutral-100 text-biblenow-neutral-600 px-3 py-1 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stream Stats */}
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-biblenow-neutral-200">
                    <h3 className="text-lg font-medium text-biblenow-brown-800 mb-4">Stream Stats</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-biblenow-neutral-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-biblenow-brown-700">{stream.viewerCount.toLocaleString()}</div>
                        <div className="text-biblenow-neutral-500 text-sm">Current Viewers</div>
                      </div>
                      <div className="bg-biblenow-neutral-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-biblenow-brown-700">2,564</div>
                        <div className="text-biblenow-neutral-500 text-sm">Total Views</div>
                      </div>
                      <div className="bg-biblenow-neutral-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-biblenow-brown-700">143</div>
                        <div className="text-biblenow-neutral-500 text-sm">New Followers</div>
                      </div>
                      <div className="bg-biblenow-neutral-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-biblenow-brown-700">30:14</div>
                        <div className="text-biblenow-neutral-500 text-sm">Stream Time</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Chat Interface */}
                <div className="h-[600px]">
                  <ChatInterface streamId={stream.id} />
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Stream;
