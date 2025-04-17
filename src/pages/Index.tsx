import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LivestreamCard from '@/components/ui/LivestreamCard';
import StreamerCard from '@/components/ui/StreamerCard';

// Mock data for active streams
const mockStreams = [
  {
    id: '1',
    title: 'Sunday Morning Worship Service',
    streamerName: 'Grace Community Church',
    streamerImage: 'https://i.pravatar.cc/150?img=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    viewerCount: 1243,
    category: 'Worship',
  },
  {
    id: '2',
    title: 'Bible Study: Book of Romans',
    streamerName: 'Pastor Mike Johnson',
    streamerImage: 'https://i.pravatar.cc/150?img=2',
    thumbnailUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    viewerCount: 785,
    category: 'Bible Study',
  },
  {
    id: '3',
    title: 'Youth Group Livestream',
    streamerName: 'New Life Youth',
    streamerImage: 'https://i.pravatar.cc/150?img=3',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523803326055-13178d85a01e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    viewerCount: 562,
    category: 'Youth',
  },
  {
    id: '4',
    title: 'Midweek Prayer Meeting',
    streamerName: 'Faith Chapel',
    streamerImage: 'https://i.pravatar.cc/150?img=4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    viewerCount: 347,
    category: 'Prayer',
  },
  {
    id: '5',
    title: 'Gospel Choir Performance',
    streamerName: 'Harmony Gospel Choir',
    streamerImage: 'https://i.pravatar.cc/150?img=5',
    thumbnailUrl: 'https://images.unsplash.com/photo-1472653525502-fc569e405a74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    viewerCount: 892,
    category: 'Music',
  },
  {
    id: '6',
    title: 'Daily Devotional',
    streamerName: 'Rev. Sarah Williams',
    streamerImage: 'https://i.pravatar.cc/150?img=6',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    viewerCount: 421,
    category: 'Devotional',
  },
];

const Index = () => {
  const [activeStreams, setActiveStreams] = useState(mockStreams);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-dark-background to-black text-white">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
          <div className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-dark-accent to-dark-accent/80 bg-clip-text text-transparent">
              Live Faith Streams
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
              Connect with live spiritual content from trusted voices around the world.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-dark-accent hover:bg-dark-accent/90 px-6 py-2 rounded-full text-dark-background font-medium transition-colors">
                Browse Streams
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-white border border-white/30 transition-all duration-200">
                Start Streaming
              </button>
            </div>
          </div>
        </section>
        
        {/* Active Streams Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">
                Active Streams
              </h2>
              <button className="text-dark-accent hover:text-dark-accent/80 font-medium">
                View All
              </button>
            </div>
            
            {isLoading ? (
              // Loading skeleton
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-biblenow-neutral-100 rounded-lg overflow-hidden animate-pulse">
                    <div className="aspect-video bg-biblenow-neutral-200"></div>
                    <div className="p-3">
                      <div className="flex space-x-3">
                        <div className="w-10 h-10 rounded-full bg-biblenow-neutral-200"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-biblenow-neutral-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-biblenow-neutral-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Actual content
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeStreams.map(stream => (
                  <LivestreamCard
                    key={stream.id}
                    id={stream.id}
                    title={stream.title}
                    streamerName={stream.streamerName}
                    streamerImage={stream.streamerImage}
                    thumbnailUrl={stream.thumbnailUrl}
                    viewerCount={stream.viewerCount}
                    category={stream.category}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Featured Streamers Section */}
        <section className="py-12 px-4 bg-dark-background/80">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                Featured Creators
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Discover inspiring content creators who share their faith journey through live streams.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {mockStreams.map(stream => (
                <StreamerCard
                  key={stream.id}
                  id={stream.id}
                  name={stream.streamerName}
                  profileImage={stream.streamerImage}
                  followerCount={Math.floor(stream.viewerCount * 2.5)}
                  isVerified={stream.viewerCount > 800}
                  isLive={true}
                  viewerCount={stream.viewerCount}
                  category={stream.category}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-dark-background to-black text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-dark-accent">
              Ready to Share Your Message?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Start your own livestream and connect with a global community of believers.
            </p>
            <button className="bg-dark-accent hover:bg-dark-accent/90 px-6 py-3 rounded-full text-dark-background font-medium transition-colors">
              Start Streaming Now
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
