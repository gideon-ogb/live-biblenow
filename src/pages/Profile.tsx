
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LivestreamCard from '@/components/ui/LivestreamCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Users, Calendar, User, Clock } from 'lucide-react';

// Mock profile data
const mockProfileData = {
  id: '1',
  name: 'Grace Community Church',
  bio: 'A welcoming church community focused on worship, fellowship, and spiritual growth. Join us for our weekly services and special events.',
  profileImage: 'https://i.pravatar.cc/150?img=1',
  coverImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  followerCount: 5847,
  followingCount: 42,
  isVerified: true,
  isLive: true,
  joinedDate: new Date(2021, 3, 15),
  socialLinks: {
    website: 'https://gracechurch.example.com',
    facebook: 'https://facebook.com/gracechurch',
    instagram: 'https://instagram.com/gracechurch',
    youtube: 'https://youtube.com/gracechurch',
  },
};

// Mock streams data
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
    title: 'Midweek Bible Study: Romans 4',
    streamerName: 'Grace Community Church',
    streamerImage: 'https://i.pravatar.cc/150?img=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    viewerCount: 785,
    category: 'Bible Study',
  },
  {
    id: '3',
    title: 'Prayer & Worship Night',
    streamerName: 'Grace Community Church',
    streamerImage: 'https://i.pravatar.cc/150?img=1',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    viewerCount: 562,
    category: 'Prayer',
  },
];

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState(mockProfileData);
  const [streams, setStreams] = useState(mockStreams);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // In a real app, we would fetch profile data based on the ID
      setProfile({
        ...mockProfileData,
        id: id || '1',
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Format joined date
  const formatJoinedDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-16">
        {isLoading ? (
          // Loading skeleton
          <div className="container mx-auto px-4 py-6 animate-pulse">
            <div className="h-48 bg-biblenow-neutral-200 rounded-lg mb-6"></div>
            <div className="h-20 w-20 bg-biblenow-neutral-200 rounded-full -mt-16 ml-6 border-4 border-white"></div>
            <div className="h-8 bg-biblenow-neutral-200 rounded w-1/4 mt-4"></div>
            <div className="h-4 bg-biblenow-neutral-200 rounded w-1/2 mt-4"></div>
          </div>
        ) : (
          <>
            {/* Profile Header */}
            <div className="relative bg-biblenow-neutral-100">
              {/* Cover Image */}
              <div className="h-48 md:h-64 overflow-hidden">
                <img 
                  src={profile.coverImage} 
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="container mx-auto px-4">
                {/* Profile Info */}
                <div className="relative -mt-16 mb-6">
                  <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
                    {/* Profile Image */}
                    <div className="mb-4 md:mb-0">
                      <div className="relative inline-block">
                        <img 
                          src={profile.profileImage} 
                          alt={profile.name}
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-sm"
                        />
                        {profile.isLive && (
                          <span className="live-badge absolute top-0 right-0">LIVE</span>
                        )}
                      </div>
                    </div>
                    
                    {/* Profile Details */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h1 className="text-2xl md:text-3xl font-bold text-biblenow-brown-900 flex items-center">
                            {profile.name}
                            {profile.isVerified && (
                              <CheckCircle size={20} className="ml-2 text-biblenow-gold-500" />
                            )}
                          </h1>
                          <div className="flex items-center space-x-4 mt-1 text-biblenow-neutral-600 text-sm">
                            <div className="flex items-center">
                              <Users size={16} className="mr-1" />
                              <span>{profile.followerCount.toLocaleString()} followers</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-1" />
                              <span>Joined {formatJoinedDate(profile.joinedDate)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex space-x-2">
                          <Button 
                            onClick={() => setIsFollowing(!isFollowing)}
                            className={isFollowing ? "btn-secondary" : "btn-primary"}
                          >
                            {isFollowing ? "Following" : "Follow"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bio */}
                  <div className="mt-4 max-w-2xl">
                    <p className="text-biblenow-neutral-700">{profile.bio}</p>
                  </div>
                  
                  {/* Social Links */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {Object.entries(profile.socialLinks).map(([platform, url]) => (
                      <a 
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-biblenow-neutral-600 hover:text-biblenow-brown-700 text-sm flex items-center bg-white px-3 py-1 rounded-full shadow-sm border border-biblenow-neutral-200"
                      >
                        <span className="capitalize">{platform}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="container mx-auto px-4 py-6">
              <Tabs defaultValue="streams">
                <TabsList className="bg-biblenow-neutral-100 p-1 rounded-lg mb-6">
                  <TabsTrigger value="streams">Streams</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
                
                {/* Streams Tab */}
                <TabsContent value="streams">
                  <div className="space-y-6">
                    {/* Active Stream */}
                    {profile.isLive && (
                      <div>
                        <h3 className="text-xl font-bold text-biblenow-brown-800 mb-4 flex items-center">
                          <span className="live-badge mr-2">LIVE</span>
                          Currently Streaming
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <LivestreamCard
                            id={streams[0].id}
                            title={streams[0].title}
                            streamerName={streams[0].streamerName}
                            streamerImage={streams[0].streamerImage}
                            thumbnailUrl={streams[0].thumbnailUrl}
                            viewerCount={streams[0].viewerCount}
                            category={streams[0].category}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Past Streams */}
                    <div>
                      <h3 className="text-xl font-bold text-biblenow-brown-800 mb-4 flex items-center">
                        <Clock size={18} className="mr-2" />
                        Past Streams
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {streams.slice(1).map(stream => (
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
                    </div>
                  </div>
                </TabsContent>
                
                {/* About Tab */}
                <TabsContent value="about">
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-biblenow-neutral-200">
                    <h3 className="text-xl font-bold text-biblenow-brown-800 mb-4">About {profile.name}</h3>
                    <p className="text-biblenow-neutral-700 mb-6">
                      Grace Community Church is a vibrant community of believers dedicated to worship, fellowship, and spiritual growth. 
                      We believe in the power of community and the importance of sharing God's word with others. 
                      Our mission is to spread love, hope, and faith to all who seek it.
                    </p>
                    
                    <h4 className="text-lg font-medium text-biblenow-brown-700 mb-3">Streaming Schedule</h4>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center text-biblenow-neutral-700">
                        <span className="w-32 font-medium">Sundays:</span>
                        <span>10:00 AM - Main Worship Service</span>
                      </li>
                      <li className="flex items-center text-biblenow-neutral-700">
                        <span className="w-32 font-medium">Wednesdays:</span>
                        <span>7:00 PM - Bible Study</span>
                      </li>
                      <li className="flex items-center text-biblenow-neutral-700">
                        <span className="w-32 font-medium">Fridays:</span>
                        <span>8:00 PM - Prayer & Worship Night</span>
                      </li>
                    </ul>
                    
                    <h4 className="text-lg font-medium text-biblenow-brown-700 mb-3">Contact Information</h4>
                    <ul className="space-y-2">
                      <li className="text-biblenow-neutral-700">
                        <span className="font-medium">Website:</span>{' '}
                        <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-biblenow-brown-600 hover:underline">
                          {profile.socialLinks.website.replace('https://', '')}
                        </a>
                      </li>
                      <li className="text-biblenow-neutral-700">
                        <span className="font-medium">Email:</span> contact@gracechurch.example.com
                      </li>
                      <li className="text-biblenow-neutral-700">
                        <span className="font-medium">Phone:</span> (555) 123-4567
                      </li>
                    </ul>
                  </div>
                </TabsContent>
                
                {/* Schedule Tab */}
                <TabsContent value="schedule">
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-biblenow-neutral-200">
                    <h3 className="text-xl font-bold text-biblenow-brown-800 mb-4">Upcoming Streams</h3>
                    
                    <div className="space-y-4">
                      <div className="border-l-4 border-biblenow-gold-400 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-biblenow-brown-800">Sunday Morning Worship Service</h4>
                            <p className="text-biblenow-neutral-600 text-sm mt-1">Join us for our weekly Sunday morning worship service.</p>
                          </div>
                          <div className="text-right">
                            <div className="text-biblenow-brown-700 font-medium">Sunday</div>
                            <div className="text-biblenow-neutral-500 text-sm">10:00 AM</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-biblenow-brown-400 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-biblenow-brown-800">Midweek Bible Study: Romans 5</h4>
                            <p className="text-biblenow-neutral-600 text-sm mt-1">Continuing our study through the book of Romans.</p>
                          </div>
                          <div className="text-right">
                            <div className="text-biblenow-brown-700 font-medium">Wednesday</div>
                            <div className="text-biblenow-neutral-500 text-sm">7:00 PM</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-biblenow-brown-400 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-biblenow-brown-800">Prayer & Worship Night</h4>
                            <p className="text-biblenow-neutral-600 text-sm mt-1">A night of prayer, worship and fellowship.</p>
                          </div>
                          <div className="text-right">
                            <div className="text-biblenow-brown-700 font-medium">Friday</div>
                            <div className="text-biblenow-neutral-500 text-sm">8:00 PM</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-biblenow-brown-400 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-biblenow-brown-800">Youth Group Livestream</h4>
                            <p className="text-biblenow-neutral-600 text-sm mt-1">Special event for our youth community.</p>
                          </div>
                          <div className="text-right">
                            <div className="text-biblenow-brown-700 font-medium">Saturday</div>
                            <div className="text-biblenow-neutral-500 text-sm">4:00 PM</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-biblenow-brown-800 mb-4">Regular Schedule</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="bg-biblenow-neutral-50 border-b border-biblenow-neutral-200">
                              <th className="text-left py-3 px-4 text-biblenow-brown-700">Day</th>
                              <th className="text-left py-3 px-4 text-biblenow-brown-700">Time</th>
                              <th className="text-left py-3 px-4 text-biblenow-brown-700">Event</th>
                              <th className="text-left py-3 px-4 text-biblenow-brown-700">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-biblenow-neutral-200">
                              <td className="py-3 px-4 text-biblenow-brown-800">Sunday</td>
                              <td className="py-3 px-4 text-biblenow-neutral-600">10:00 AM</td>
                              <td className="py-3 px-4 text-biblenow-brown-700 font-medium">Main Worship Service</td>
                              <td className="py-3 px-4 text-biblenow-neutral-600">Weekly Sunday service with worship and teaching</td>
                            </tr>
                            <tr className="border-b border-biblenow-neutral-200">
                              <td className="py-3 px-4 text-biblenow-brown-800">Wednesday</td>
                              <td className="py-3 px-4 text-biblenow-neutral-600">7:00 PM</td>
                              <td className="py-3 px-4 text-biblenow-brown-700 font-medium">Bible Study</td>
                              <td className="py-3 px-4 text-biblenow-neutral-600">In-depth Bible study series</td>
                            </tr>
                            <tr className="border-b border-biblenow-neutral-200">
                              <td className="py-3 px-4 text-biblenow-brown-800">Friday</td>
                              <td className="py-3 px-4 text-biblenow-neutral-600">8:00 PM</td>
                              <td className="py-3 px-4 text-biblenow-brown-700 font-medium">Prayer & Worship</td>
                              <td className="py-3 px-4 text-biblenow-neutral-600">Evening of prayer and worship music</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
