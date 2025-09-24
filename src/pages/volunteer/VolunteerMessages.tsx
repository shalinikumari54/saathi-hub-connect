import { useState } from "react";
import VolunteerLayout from "@/components/layout/VolunteerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, Send, Paperclip, Image, Video, MapPin,
  Phone, Search, MoreVertical, Star, Archive, Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VolunteerMessages = () => {
  const { toast } = useToast();
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  
  const [chats] = useState([
    {
      id: 1,
      name: "Margaret Anderson",
      avatar: "/placeholder.svg",
      lastMessage: "Thank you so much for the groceries! You're such a blessing.",
      timestamp: "5 min ago",
      unread: 1,
      type: "senior",
      online: true,
      relationship: "favorite"
    },
    {
      id: 2,
      name: "Robert Chen",
      avatar: "/placeholder.svg",
      lastMessage: "The appointment went well. Thank you for the ride!",
      timestamp: "2 hours ago",
      unread: 0,
      type: "senior",
      online: false,
      relationship: "regular"
    },
    {
      id: 3,
      name: "Admin Support",
      avatar: "/placeholder.svg",
      lastMessage: "Your monthly volunteer report is ready for review",
      timestamp: "1 day ago",
      unread: 2,
      type: "admin",
      online: true,
      relationship: "admin"
    },
    {
      id: 4,
      name: "Dorothy Williams",
      avatar: "/placeholder.svg",
      lastMessage: "I figured out the smart TV! Thank you for being so patient with me.",
      timestamp: "2 days ago",
      unread: 0,
      type: "senior",
      online: false,
      relationship: "regular"
    },
    {
      id: 5,
      name: "Frank Rodriguez",
      avatar: "/placeholder.svg",
      lastMessage: "Looking forward to our visit this Friday. I have new photos to show you!",
      timestamp: "3 days ago",
      unread: 0,
      type: "senior",
      online: true,
      relationship: "favorite"
    }
  ]);

  const [messages] = useState([
    {
      id: 1,
      chatId: 1,
      sender: "senior",
      content: "Hello John! I hope you're having a wonderful day. I wanted to thank you again for helping with my grocery shopping yesterday.",
      timestamp: "2:30 PM",
      type: "text"
    },
    {
      id: 2,
      chatId: 1,
      sender: "me",
      content: "Hi Mrs. Anderson! It was my pleasure helping you. I'm so glad everything worked out well. How are you feeling today?",
      timestamp: "2:32 PM",
      type: "text"
    },
    {
      id: 3,
      chatId: 1,
      sender: "senior",
      content: "I'm feeling much better now that my pantry is stocked! The fresh vegetables you picked were perfect. You have such a good eye for quality produce.",
      timestamp: "2:35 PM",
      type: "text"
    },
    {
      id: 4,
      chatId: 1,
      sender: "me",
      content: "That makes me so happy to hear! I always try to pick the best items. Did you try the recipe I mentioned for the zucchini?",
      timestamp: "2:40 PM",
      type: "text"
    },
    {
      id: 5,
      chatId: 1,
      sender: "senior",
      content: "Here's a photo of the delicious zucchini bread I made!",
      timestamp: "3:15 PM",
      type: "image",
      attachment: "/placeholder.svg"
    },
    {
      id: 6,
      chatId: 1,
      sender: "me",
      content: "Oh wow! That looks absolutely delicious! You're such an amazing baker. I'm so impressed!",
      timestamp: "3:20 PM",
      type: "text"
    },
    {
      id: 7,
      chatId: 1,
      sender: "senior",
      content: "Thank you so much for the groceries! You're such a blessing.",
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

  const getRelationshipIcon = (relationship: string) => {
    if (relationship === "favorite") return <Heart className="w-3 h-3 text-red-500" />;
    if (relationship === "admin") return <Star className="w-3 h-3 text-blue-500" />;
    return null;
  };

  return (
    <VolunteerLayout>
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
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1">
                            <h4 className="font-semibold text-sm truncate">{chat.name}</h4>
                            {getRelationshipIcon(chat.relationship)}
                          </div>
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
                          {chat.relationship === "favorite" && (
                            <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                              ⭐ Favorite
                            </Badge>
                          )}
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
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{currentChat.name}</h3>
                          {getRelationshipIcon(currentChat.relationship)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {currentChat.online ? 'Online now' : 'Last seen 2 hours ago'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4" />
                      </Button>
                      {currentChat.relationship === "senior" && (
                        <Button size="sm" variant="outline">
                          <MapPin className="w-4 h-4" />
                        </Button>
                      )}
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
                              <span className="text-xs">zucchini-bread.jpg</span>
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
    </VolunteerLayout>
  );
};

export default VolunteerMessages;