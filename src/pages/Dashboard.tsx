
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StreamControls from '@/components/stream/StreamControls';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  Clock, 
  ArrowUpRight, 
  BarChart2, 
  Calendar, 
  Settings, 
  Video, 
  MessageSquare,
  Share2,
  Star, 
  Bookmark 
} from 'lucide-react';

// Mock analytics data
const viewerData = [
  { time: '10:00', viewers: 120 },
  { time: '10:15', viewers: 215 },
  { time: '10:30', viewers: 342 },
  { time: '10:45', viewers: 461 },
  { time: '11:00', viewers: 587 },
  { time: '11:15', viewers: 624 },
  { time: '11:30', viewers: 598 },
  { time: '11:45', viewers: 543 },
  { time: '12:00', viewers: 472 },
];

const weeklyData = [
  { day: 'Sun', viewers: 1243, followers: 32 },
  { day: 'Mon', viewers: 423, followers: 12 },
  { day: 'Tue', viewers: 525, followers: 15 },
  { day: 'Wed', viewers: 781, followers: 22 },
  { day: 'Thu', viewers: 456, followers: 14 },
  { day: 'Fri', viewers: 892, followers: 24 },
  { day: 'Sat', viewers: 634, followers: 18 },
];

// Mock past streams data
const pastStreams = [
  {
    id: '1',
    title: 'Sunday Morning Worship Service',
    date: new Date(2023, 6, 23),
    duration: '1:45:12',
    views: 1243,
    engagement: 86,
    thumbnailUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '2',
    title: 'Midweek Bible Study: Romans 4',
    date: new Date(2023, 6, 19),
    duration: '1:12:45',
    views: 785,
    engagement: 72,
    thumbnailUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '3',
    title: 'Prayer & Worship Night',
    date: new Date(2023, 6, 16),
    duration: '0:58:36',
    views: 562,
    engagement: 64,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

// Mock scheduled streams data
const scheduledStreams = [
  {
    id: '1',
    title: 'Sunday Morning Worship Service',
    date: new Date(2023, 6, 30, 10, 0),
    thumbnailUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    id: '2',
    title: 'Midweek Bible Study: Romans 5',
    date: new Date(2023, 6, 26, 19, 0),
    thumbnailUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

const Dashboard = () => {
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Toggle live status
  const handleToggleLive = () => {
    if (isLive) {
      setIsLive(false);
      setViewerCount(0);
    } else {
      setIsLive(true);
      // Start with a random number of viewers
      setViewerCount(Math.floor(Math.random() * 100) + 50);
      
      // Simulate viewer count increasing over time
      const interval = setInterval(() => {
        setViewerCount(prev => {
          const change = Math.floor(Math.random() * 10) - 2; // -2 to +8 viewers
          return Math.max(0, prev + change);
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  };
  
  // Format date
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-16 bg-biblenow-neutral-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-biblenow-brown-900 mb-2 md:mb-0">
              Streamer Dashboard
            </h1>
            <Button 
              onClick={() => window.location.href = '/go-live'}
              className="btn-gold flex items-center gap-1"
            >
              <Video size={18} />
              <span>Go Live</span>
            </Button>
          </div>
          
          {isLoading ? (
            // Loading skeleton
            <div className="animate-pulse space-y-6">
              <div className="h-64 bg-biblenow-neutral-200 rounded-lg"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-32 bg-biblenow-neutral-200 rounded-lg"></div>
                <div className="h-32 bg-biblenow-neutral-200 rounded-lg"></div>
                <div className="h-32 bg-biblenow-neutral-200 rounded-lg"></div>
              </div>
              <div className="h-64 bg-biblenow-neutral-200 rounded-lg"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stream Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <StreamControls
                    isLive={isLive}
                    viewerCount={viewerCount}
                    onToggleLive={handleToggleLive}
                  />
                </div>
                
                <div className="bg-white rounded-lg shadow-sm border border-biblenow-neutral-200 p-4">
                  <h3 className="text-lg font-medium text-biblenow-brown-800 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="btn-secondary flex items-center justify-center gap-2">
                      <Video size={16} />
                      <span>Schedule</span>
                    </Button>
                    <Button className="btn-secondary flex items-center justify-center gap-2">
                      <MessageSquare size={16} />
                      <span>Messages</span>
                    </Button>
                    <Button className="btn-secondary flex items-center justify-center gap-2">
                      <Share2 size={16} />
                      <span>Share</span>
                    </Button>
                    <Button className="btn-secondary flex items-center justify-center gap-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </Button>
                  </div>
                  
                  {isLive && (
                    <div className="mt-4 p-3 bg-biblenow-neutral-50 rounded-lg border border-biblenow-neutral-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-biblenow-brown-700 font-medium">Current Stream</span>
                        <span className="live-badge">LIVE</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-biblenow-neutral-600">Duration:</span>
                        <span className="text-biblenow-brown-700 font-medium">00:32:14</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-biblenow-neutral-600">Viewers:</span>
                        <span className="text-biblenow-brown-700 font-medium">{viewerCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-biblenow-neutral-600">Chat Messages:</span>
                        <span className="text-biblenow-brown-700 font-medium">128</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-biblenow-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-biblenow-neutral-500 text-sm">Total Views</p>
                      <h3 className="text-2xl font-bold text-biblenow-brown-800 mt-1">6,847</h3>
                    </div>
                    <div className="p-2 bg-biblenow-brown-100 text-biblenow-brown-700 rounded">
                      <Users size={20} />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-green-600 text-sm">
                    <ArrowUpRight size={14} className="mr-1" />
                    <span>12% increase</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border border-biblenow-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-biblenow-neutral-500 text-sm">Followers</p>
                      <h3 className="text-2xl font-bold text-biblenow-brown-800 mt-1">1,254</h3>
                    </div>
                    <div className="p-2 bg-biblenow-gold-100 text-biblenow-gold-700 rounded">
                      <Star size={20} />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-green-600 text-sm">
                    <ArrowUpRight size={14} className="mr-1" />
                    <span>8% increase</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border border-biblenow-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-biblenow-neutral-500 text-sm">Stream Time</p>
                      <h3 className="text-2xl font-bold text-biblenow-brown-800 mt-1">42:15:32</h3>
                    </div>
                    <div className="p-2 bg-biblenow-neutral-100 text-biblenow-neutral-700 rounded">
                      <Clock size={20} />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-biblenow-neutral-500 text-sm">
                    <span>Last 30 days</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-4 border border-biblenow-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-biblenow-neutral-500 text-sm">Engagement Rate</p>
                      <h3 className="text-2xl font-bold text-biblenow-brown-800 mt-1">75%</h3>
                    </div>
                    <div className="p-2 bg-biblenow-neutral-100 text-biblenow-neutral-700 rounded">
                      <BarChart2 size={20} />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-green-600 text-sm">
                    <ArrowUpRight size={14} className="mr-1" />
                    <span>5% increase</span>
                  </div>
                </div>
              </div>
              
              {/* Analytics */}
              <div className="bg-white rounded-lg shadow-sm p-4 border border-biblenow-neutral-200">
                <Tabs defaultValue="viewers">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-biblenow-brown-800">Analytics</h3>
                    <TabsList className="bg-biblenow-neutral-100">
                      <TabsTrigger value="viewers">Viewers</TabsTrigger>
                      <TabsTrigger value="followers">Followers</TabsTrigger>
                      <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="viewers">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={viewerData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                          <XAxis dataKey="time" stroke="#78716C" />
                          <YAxis stroke="#78716C" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #D6D3D1',
                              borderRadius: '4px',
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="viewers"
                            name="Viewers"
                            stroke="#B6986C"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="followers">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={weeklyData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                          <XAxis dataKey="day" stroke="#78716C" />
                          <YAxis stroke="#78716C" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #D6D3D1',
                              borderRadius: '4px',
                            }}
                          />
                          <Legend />
                          <Bar
                            dataKey="followers"
                            name="New Followers"
                            fill="#F59E0B"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="engagement">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={weeklyData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                          <XAxis dataKey="day" stroke="#78716C" />
                          <YAxis stroke="#78716C" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #D6D3D1',
                              borderRadius: '4px',
                            }}
                          />
                          <Legend />
                          <Bar
                            dataKey="viewers"
                            name="Viewers"
                            fill="#B6986C"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Past Streams & Scheduled Streams */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Past Streams */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-biblenow-neutral-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-biblenow-brown-800">Past Streams</h3>
                    <Button variant="outline" size="sm">View All</Button>
                  </div>
                  
                  <div className="space-y-4">
                    {pastStreams.map(stream => (
                      <div key={stream.id} className="flex space-x-3 p-3 rounded-lg hover:bg-biblenow-neutral-50 transition-colors">
                        <div className="w-24 h-16 bg-biblenow-neutral-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={stream.thumbnailUrl}
                            alt={stream.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-biblenow-brown-800 truncate">{stream.title}</h4>
                          <div className="flex items-center text-biblenow-neutral-500 text-sm mt-1">
                            <Calendar size={14} className="mr-1" />
                            <span>{formatDate(stream.date)}</span>
                            <span className="mx-2">•</span>
                            <Clock size={14} className="mr-1" />
                            <span>{stream.duration}</span>
                          </div>
                          <div className="flex items-center text-biblenow-neutral-500 text-sm mt-1">
                            <Users size={14} className="mr-1" />
                            <span>{stream.views.toLocaleString()} views</span>
                            <span className="mx-2">•</span>
                            <BarChart2 size={14} className="mr-1" />
                            <span>{stream.engagement}% engagement</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button variant="ghost" size="icon" className="text-biblenow-neutral-500">
                            <Bookmark size={18} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Scheduled Streams */}
                <div className="bg-white rounded-lg shadow-sm p-4 border border-biblenow-neutral-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-biblenow-brown-800">Scheduled Streams</h3>
                    <Button variant="outline" size="sm">Schedule New</Button>
                  </div>
                  
                  <div className="space-y-4">
                    {scheduledStreams.map(stream => (
                      <div key={stream.id} className="flex space-x-3 p-3 rounded-lg hover:bg-biblenow-neutral-50 transition-colors">
                        <div className="w-24 h-16 bg-biblenow-neutral-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={stream.thumbnailUrl}
                            alt={stream.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-biblenow-brown-800 truncate">{stream.title}</h4>
                          <div className="flex items-center text-biblenow-neutral-500 text-sm mt-1">
                            <Calendar size={14} className="mr-1" />
                            <span>{formatDate(stream.date)}</span>
                            <span className="mx-2">•</span>
                            <Clock size={14} className="mr-1" />
                            <span>{formatTime(stream.date)}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-xs bg-biblenow-neutral-100 text-biblenow-neutral-600 px-2 py-0.5 rounded-full">
                              Scheduled
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm" className="text-biblenow-brown-700">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {scheduledStreams.length === 0 && (
                      <div className="text-center py-8">
                        <Calendar className="mx-auto h-12 w-12 text-biblenow-neutral-300" />
                        <h3 className="mt-2 text-sm font-medium text-biblenow-brown-800">No scheduled streams</h3>
                        <p className="mt-1 text-sm text-biblenow-neutral-500">Get started by scheduling your next stream</p>
                        <div className="mt-6">
                          <Button className="btn-primary">Schedule a Stream</Button>
                        </div>
                      </div>
                    )}
                  </div>
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

export default Dashboard;
