
'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bot,
  MessageSquare,
  Paperclip,
  Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const initialConversations = [
  { 
    id: 1, 
    name: 'John Doe', 
    boat: 'Sea Ray 240', 
    lastMessage: 'What\'s the status on the engine?', 
    unread: 2, 
    online: true, 
    avatar: 'https://placehold.co/40x40.png?text=JD',
    messages: [
      { from: 'customer', text: 'Hey, just checking in on my Sea Ray. Any updates on the engine diagnostics?', time: '10:40 AM' },
      { from: 'me', text: 'Hi John, we\'ve identified the issue with the fuel injector. We\'re sourcing the part now and expect it to arrive tomorrow.', time: '10:42 AM' },
      { from: 'customer', text: 'Great, thanks for the quick update! What\'s the estimated cost for the part and labor?', time: '10:43 AM' },
    ]
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    boat: 'Boston Whaler', 
    lastMessage: 'Thanks for the update!', 
    unread: 0, 
    online: false, 
    avatar: 'https://placehold.co/40x40.png?text=JS',
    messages: [
       { from: 'me', text: 'Hi Jane, your Boston Whaler is all set and ready for pickup.', time: 'Yesterday' },
       { from: 'customer', text: 'Thanks for the update!', time: 'Yesterday' },
    ]
  },
  { 
    id: 3, 
    name: 'Robert Brown', 
    boat: 'Grady-White', 
    lastMessage: 'Can you check the bilge pump?', 
    unread: 0, 
    online: true, 
    avatar: 'https://placehold.co/40x40.png?text=RB',
    messages: [
       { from: 'customer', text: 'Can you check the bilge pump? It wasn\'t working last time I was out.', time: '3:20 PM' },
    ]
  },
];

type Message = { from: 'customer' | 'me', text: string, time: string };
type Conversation = typeof initialConversations[0];


export default function MessagingPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [suggested, setSuggested] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const canSuggestReplies = selectedConversation && selectedConversation.messages.length > 0 && selectedConversation.messages[selectedConversation.messages.length - 1].from === 'customer';

  useEffect(() => {
    // @ts-ignore
    if (scrollAreaRef.current?.scrollTo) {
        // @ts-ignore
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [selectedConversation?.messages]);
  
  useEffect(() => {
    // Clear suggestions when conversation changes
    setSuggested([]);
  }, [selectedConversation])


  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const msg: Message = {
        from: 'me',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, msg],
        lastMessage: newMessage,
      };

      setSelectedConversation(updatedConversation);
      setConversations(conversations.map(c => c.id === updatedConversation.id ? updatedConversation : c));
      setNewMessage('');
      setSuggested([]);
    }
  };

  const handleSendSuggestion = (reply: string) => {
     if (selectedConversation) {
      const msg: Message = {
        from: 'me',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
       const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, msg],
        lastMessage: reply,
      };

      setSelectedConversation(updatedConversation);
      setConversations(conversations.map(c => c.id === updatedConversation.id ? updatedConversation : c));
      setSuggested([]);
    }
  }

  const handleGenerateSuggestions = async () => {
    if (!canSuggestReplies || !selectedConversation) return;

    setLoadingSuggestions(true);
    setSuggested([]);
    try {
      // Mock AI suggestions for demo purposes
      const mockSuggestions = [
        "I'll check on that for you right away.",
        "Thanks for following up. Let me get you an update.",
        "I'll have the technician provide a status report today."
      ];
      setSuggested(mockSuggestions);
    } catch (error) {
      console.error("Failed to get suggestions", error);
    }
    setLoadingSuggestions(false);
  }

  return (
    <div className="h-[calc(100vh-theme(spacing.28))] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="md:col-span-1 lg:col-span-1 flex flex-col border-r">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold font-headline">Chats</h1>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((convo) => (
            <div 
              key={convo.id} 
              className={cn(
                "flex items-center gap-3 p-4 border-b hover:bg-muted/50 cursor-pointer",
                selectedConversation?.id === convo.id && 'bg-muted/50'
              )}
              onClick={() => setSelectedConversation(convo)}
            >
              <Avatar className="h-12 w-12 border">
                 <AvatarImage src={convo.avatar} alt={convo.name} data-ai-hint="person portrait"/>
                 <AvatarFallback>{convo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <p className="font-semibold">{convo.name}</p>
                <p className="text-sm text-muted-foreground">{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && <Badge>{convo.unread}</Badge>}
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="md:col-span-2 lg:col-span-3 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-headline">{selectedConversation.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedConversation.boat} - Active Job: JOB-001</p>
              </div>
            </div>
            <ScrollArea className="flex-1 p-6 bg-muted/30" ref={scrollAreaRef}>
                <div className="flex flex-col gap-4">
                    {selectedConversation.messages.map((msg, index) => (
                        <div key={index} className={cn('flex items-end gap-2', msg.from === 'me' ? 'justify-end' : 'justify-start')}>
                            {msg.from === 'customer' && <Avatar className="h-8 w-8"><AvatarImage src={selectedConversation.avatar} alt="Customer" data-ai-hint="person portrait" /></Avatar>}
                            <div className={cn('max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2', msg.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-card border')}>
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-xs mt-1 text-right opacity-70">{msg.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="p-4 border-t bg-background">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={handleGenerateSuggestions} disabled={loadingSuggestions || !canSuggestReplies}>
                  <Bot className="h-4 w-4 mr-2"/>
                  {loadingSuggestions ? "Generating..." : "Suggest Replies"}
                </Button>
                {loadingSuggestions && (
                  <>
                    <Skeleton className="h-9 w-24 rounded-md" />
                    <Skeleton className="h-9 w-32 rounded-md" />
                    <Skeleton className="h-9 w-28 rounded-md" />
                  </>
                )}
                {suggested.map((reply, i) => (
                  <Button key={i} variant="outline" size="sm" className="bg-accent/10 border-accent/50 text-accent-foreground hover:bg-accent/20" onClick={() => handleSendSuggestion(reply)}>{reply}</Button>
                ))}
              </div>
              <div className="relative">
                <Input 
                  placeholder="Type a message..." 
                  className="pr-24"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-primary" onClick={handleSendMessage}>
                    Send <Send className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center bg-muted/30">
            <MessageSquare className="h-16 w-16 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-bold font-headline">Select a conversation</h2>
            <p className="mt-2 text-muted-foreground">Choose a chat from the left panel to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
}
