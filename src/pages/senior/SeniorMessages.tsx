import { useState } from "react";
import SeniorLayout from "@/components/layout/SeniorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, Send, Paperclip, Image, Video, MapPin,
  Phone, Search, MoreVertical, Star, Archive
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SeniorMessages = () => {
  const { toast } = useToast();
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  
  const [chats] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      lastMessage: "I'll be there in 15 minutes for the grocery shopping",
      timestamp: "2 min ago",
      unread: 2,
      type: "volunteer",
      online: true
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg",
      lastMessage: "The tech setup is complete. Everything should work now!",
      timestamp: "1 hour ago",
      unread: 0,
      type: "volunteer",
      online: false
    },
    {
      id: 3,
      name: "Admin Support",
      avatar: "/placeholder.svg",
      lastMessage: "Your request has been approved and volunteers have been notified",
      timestamp: "3 hours ago",
      unread: 1,
      type: "admin",
      online: true
    },
    {
      id: 4,
      name: "Emma Davis",
      avatar: "/placeholder.svg",
      lastMessage: "Thank you for the lovely afternoon! The books were wonderful",
      timestamp: "Yesterday",
      unread: 0,
      type: "volunteer",
      online: false
    }
  ]);

  const [messages] = useState([
    {
      id: 1,
      chatId: 1,
      sender: "volunteer",
      content: "Hi! I'm Sarah, your assigned volunteer for today's grocery shopping. I'm getting ready to head out.",
      timestamp: "10:30 AM",
      type: "text"
    },
    {
      id: 2,
      chatId: 1,
      sender: "me",
      content: "Hello Sarah! Thank you so much. I have the shopping list ready. Do you need me to send it to you?",
      timestamp: "10:32 AM",
      type: "text"
    },
    {
      id: 3,
      chatId: 1,
      sender: "volunteer",
      content: "Yes, please! You can send it as a photo or just type it out - whatever works best for you.",
      timestamp: "10:33 AM",
      type: "text"
    },
    {
      id: 4,
      chatId: 1,
      sender: "me",
      content: "Here's my shopping list",
      timestamp: "10:35 AM",
      type: "image",
      attachment: "/placeholder.svg"
    },
    {
      id: 5,
      chatId: 1,
      sender: "volunteer",
      content: "Perfect! I can see the list clearly. I'll pick up everything and should be back by 11:30 AM. I'll call you when I'm outside.",
      timestamp: "10:37 AM",
      type: "text"
    },
    {
      id: 6,
      chatId: 1,
      sender: "volunteer",
      content: "I'm sharing my location so you can track my progress",
      timestamp: "10:38 AM",
      type: "location",
      location: { lat: 40.7128, lng: -74.0060, address: "Main Street Grocery Store" }
    },
    {
      id: 7,
      chatId: 1,
      sender: "volunteer",
      content: "I'll be there in 15 minutes for the grocery shopping",
      timestamp: "Just now",
      type: "text"
    }
  ]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      toast({
        title: "Message Sent",
        description: "Your message has been delivered",
      });
      setNewMessage("");
    }
  };

  const handleAttachment = (type: string) => {
    toast({
      title: "Attachment",
      description: `${type} attachment feature would open here`,
    });
  };

  const currentChatMessages = messages.filter(msg => msg.chatId === selectedChat);
  const currentChat = chats.find(chat => chat.id === selectedChat);

  return (
    <SeniorLayout>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
          
          {/* Chat List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Messages</span>
                <Button size="sm" variant="outline">
                  <Search className="w-4 h-4" />
                </Button>
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 border-b ${
                      selectedChat === chat.id ? 'bg-muted/30' : ''
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={chat.avatar} alt={chat.name} />
                          <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm truncate">{chat.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                            {chat.unread > 0 && (
                              <Badge className="bg-primary text-xs">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {chat.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 flex flex-col">
            {currentChat && (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={currentChat.avatar} alt={currentChat.name} />
                        <AvatarFallback>{currentChat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{currentChat.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {currentChat.online ? 'Online now' : 'Last seen 2 hours ago'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentChatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === 'me'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.type === 'text' && (
                          <p className="text-sm">{message.content}</p>
                        )}
                        
                        {message.type === 'image' && (
                          <div>
                            <p className="text-sm mb-2">{message.content}</p>
                            <div className="bg-muted/20 rounded p-2 flex items-center gap-2">
                              <Image className="w-4 h-4" />
                              <span className="text-xs">shopping-list.jpg</span>
                            </div>
                          </div>
                        )}
                        
                        {message.type === 'location' && (
                          <div>
                            <p className="text-sm mb-2">{message.content}</p>
                            <div className="bg-muted/20 rounded p-2 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <div>
                                <p className="text-xs font-semibold">Live Location</p>
                                <p className="text-xs">{message.location?.address}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAttachment('image')}
                    >
                      <Image className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAttachment('video')}
                    >
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAttachment('file')}
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAttachment('location')}
                    >
                      <MapPin className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </SeniorLayout>
  );
};

export default SeniorMessages;