
import React, { useState, useRef, useEffect } from 'react';
import { Send, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  username: string;
  userImage: string;
  message: string;
  timestamp: Date;
  isHandRaised?: boolean;
}

interface ChatInterfaceProps {
  streamId: string;
  className?: string;
}

// Mock data for initial messages
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    username: 'JohnDoe',
    userImage: 'https://i.pravatar.cc/150?img=1',
    message: 'Hello everyone! Glad to be here today.',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: '2',
    username: 'SarahSmith',
    userImage: 'https://i.pravatar.cc/150?img=2',
    message: 'The stream quality is excellent today!',
    timestamp: new Date(Date.now() - 1000 * 60),
  },
  {
    id: '3',
    username: 'MichaelBrown',
    userImage: 'https://i.pravatar.cc/150?img=3',
    message: "I've been looking forward to this all week.",
    timestamp: new Date(Date.now() - 1000 * 30),
    isHandRaised: true,
  },
];

const ChatInterface = ({ streamId, className }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isHandRaised, setIsHandRaised] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        username: 'You', // In a real app, this would be the current user's name
        userImage: 'https://i.pravatar.cc/150?img=8', // In a real app, this would be the current user's image
        message: newMessage,
        timestamp: new Date(),
        isHandRaised,
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Reset hand raised status after sending a message
      if (isHandRaised) {
        setIsHandRaised(false);
      }
    }
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn("flex flex-col bg-white h-full rounded-lg overflow-hidden shadow-sm border border-biblenow-neutral-200", className)}>
      {/* Chat Header */}
      <div className="bg-biblenow-brown-50 border-b border-biblenow-neutral-200 py-3 px-4">
        <h3 className="font-medium text-biblenow-brown-800">Live Chat</h3>
      </div>
      
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex space-x-3 animate-fade-in">
            <img 
              src={msg.userImage} 
              alt={msg.username}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium text-biblenow-brown-800">{msg.username}</span>
                <span className="text-biblenow-neutral-400 text-xs ml-2">{formatTime(msg.timestamp)}</span>
                {msg.isHandRaised && (
                  <span className="ml-2 text-biblenow-gold-500">
                    <Hand size={14} />
                  </span>
                )}
              </div>
              <p className="text-biblenow-neutral-700 text-sm mt-1">{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <div className="border-t border-biblenow-neutral-200 p-3">
        <div className="flex space-x-2">
          <Button 
            onClick={() => setIsHandRaised(!isHandRaised)}
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "flex-shrink-0",
              isHandRaised ? "bg-biblenow-gold-100 text-biblenow-gold-600 border-biblenow-gold-300" : ""
            )}
          >
            <Hand size={18} />
          </Button>
          
          <div className="relative flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              className="w-full py-2 px-3 bg-biblenow-neutral-50 border border-biblenow-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-biblenow-brown-400 focus:border-biblenow-brown-400"
            />
            <Button 
              onClick={handleSendMessage}
              type="button"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-biblenow-brown-600 hover:bg-biblenow-brown-700"
            >
              <Send size={14} />
            </Button>
          </div>
        </div>
        {isHandRaised && (
          <div className="mt-2 text-xs text-biblenow-gold-600 bg-biblenow-gold-50 p-2 rounded border border-biblenow-gold-100">
            <span className="font-medium">Hand raised:</span> Your message will be highlighted for the streamer.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
