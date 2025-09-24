import { useState } from "react";
import VolunteerLayout from "@/components/layout/VolunteerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, Star, Trophy, Gift, Target, Calendar, Heart,
  Crown, Medal, Zap, Users, CheckCircle, Clock, MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VolunteerRewards = () => {
  const { toast } = useToast();

  const [currentLevel] = useState({
    level: 3,
    title: "Community Helper",
    currentXP: 2850,
    nextLevelXP: 3500,
    totalTasks: 23,
    totalHours: 67
  });

  const [badges] = useState([
    {
      id: 1,
      name: "First Helper",
      description: "Completed your first task",
      icon: Star,
      earned: true,
      earnedDate: "2023-12-01",
      rarity: "common"
    },
    {
      id: 2,
      name: "Shopping Assistant",
      description: "Completed 10 shopping tasks",
      icon: Gift,
      earned: true,
      earnedDate: "2024-01-10",
      rarity: "common"
    },
    {
      id: 3,
      name: "Tech Guru",
      description: "Helped 5 seniors with technology",
      icon: Zap,
      earned: true,
      earnedDate: "2024-01-08",
      rarity: "rare"
    },
    {
      id: 4,
      name: "Companion",
      description: "Spent 20+ hours in companionship visits",
      icon: Heart,
      earned: true,
      earnedDate: "2024-01-15",
      rarity: "rare"
    },
    {
      id: 5,
      name: "5-Star Helper",
      description: "Maintain 5-star rating for 10 tasks",
      icon: Crown,
      earned: true,
      earnedDate: "2024-01-12",
      rarity: "epic"
    },
    {
      id: 6,
      name: "Marathon Helper",
      description: "Complete 50 tasks",
      icon: Trophy,
      earned: false,
      progress: 23,
      target: 50,
      rarity: "epic"
    },
    {
      id: 7,
      name: "Community Champion",
      description: "Help 25 different seniors",
      icon: Users,
      earned: false,
      progress: 8,
      target: 25,
      rarity: "legendary"
    },
    {
      id: 8,
      name: "Emergency Hero",
      description: "Respond to 5 urgent requests",
      icon: Medal,
      earned: false,
      progress: 2,
      target: 5,
      rarity: "rare"
    }
  ]);

  const [rewards] = useState([
    {
      id: 1,
      name: "Coffee Shop Gift Card",
      description: "$10 gift card to local coffee shop",
      cost: 500,
      category: "gift_card",
      available: true,
      icon: Gift
    },
    {
      id: 2,
      name: "Volunteer T-Shirt",
      description: "Official volunteer program t-shirt",
      cost: 750,
      category: "merchandise",
      available: true,
      icon: Award
    },
    {
      id: 3,
      name: "Restaurant Voucher",
      description: "$25 voucher for local restaurants",
      cost: 1000,
      category: "gift_card",
      available: true,
      icon: Gift
    },
    {
      id: 4,
      name: "Volunteer of the Month",
      description: "Featured in newsletter and website",
      cost: 1500,
      category: "recognition",
      available: true,
      icon: Crown
    },
    {
      id: 5,
      name: "Amazon Gift Card",
      description: "$50 Amazon gift card",
      cost: 2000,
      category: "gift_card",
      available: false,
      icon: Gift
    }
  ]);

  const [recentAchievements] = useState([
    {
      id: 1,
      name: "5-Star Helper",
      description: "Earned 5-star rating from Mrs. Anderson",
      xpGained: 100,
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Tech Guru",
      description: "Helped Dorothy with smart TV setup",
      xpGained: 150,
      date: "2024-01-14"
    },
    {
      id: 3,
      name: "Task Completed",
      description: "Grocery shopping for Robert Chen",
      xpGained: 75,
      date: "2024-01-13"
    }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: "Sarah Johnson", points: 4500, tasksCompleted: 67 },
    { rank: 2, name: "Michael Chen", points: 4200, tasksCompleted: 62 },
    { rank: 3, name: "You", points: 2850, tasksCompleted: 23, isCurrentUser: true },
    { rank: 4, name: "Emma Davis", points: 2650, tasksCompleted: 28 },
    { rank: 5, name: "David Wilson", points: 2400, tasksCompleted: 31 }
  ]);

  const handleRedeemReward = (rewardName: string, cost: number) => {
    if (currentLevel.currentXP >= cost) {
      toast({
        title: "Reward Redeemed! 🎉",
        description: `You've successfully redeemed ${rewardName}. Check your email for details.`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${cost - currentLevel.currentXP} more points to redeem this reward.`,
        variant: "destructive"
      });
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "border-gray-300 bg-gray-50";
      case "rare": return "border-blue-300 bg-blue-50";
      case "epic": return "border-purple-300 bg-purple-50";
      case "legendary": return "border-yellow-300 bg-yellow-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-600";
      case "rare": return "text-blue-600";
      case "epic": return "text-purple-600";
      case "legendary": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  const progressToNextLevel = (currentLevel.currentXP / currentLevel.nextLevelXP) * 100;

  return (
    <VolunteerLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Rewards & Badges</h1>
          <p className="text-muted-foreground">Earn rewards and recognition for your amazing volunteer work</p>
        </div>

        {/* Current Level & Progress */}
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold text-primary">Level {currentLevel.level}</span>
              </div>
              <h2 className="text-xl font-semibold text-primary mb-1">{currentLevel.title}</h2>
              <p className="text-sm text-muted-foreground">
                {currentLevel.currentXP} / {currentLevel.nextLevelXP} XP to next level
              </p>
            </div>
            
            <Progress value={progressToNextLevel} className="h-3 mb-4" />
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{currentLevel.totalTasks}</p>
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{currentLevel.totalHours}</p>
                <p className="text-sm text-muted-foreground">Hours Volunteered</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{currentLevel.currentXP}</p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="rewards">Rewards Store</TabsTrigger>
            <TabsTrigger value="achievements">Recent</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="badges" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <Card key={badge.id} className={`${getRarityColor(badge.rarity)} ${badge.earned ? '' : 'opacity-60'}`}>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                        badge.earned ? 'bg-primary/20' : 'bg-gray-200'
                      }`}>
                        <badge.icon className={`w-8 h-8 ${badge.earned ? 'text-primary' : 'text-gray-400'}`} />
                      </div>
                      
                      <h3 className={`font-semibold mb-1 ${getRarityTextColor(badge.rarity)}`}>
                        {badge.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                      
                      <Badge className={`${getRarityTextColor(badge.rarity)} text-xs`} variant="outline">
                        {badge.rarity}
                      </Badge>
                      
                      {badge.earned ? (
                        <div className="mt-2">
                          <Badge className="bg-green-600 text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Earned {badge.earnedDate}
                          </Badge>
                        </div>
                      ) : (
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">
                            Progress: {badge.progress || 0} / {badge.target}
                          </p>
                          <Progress 
                            value={((badge.progress || 0) / (badge.target || 1)) * 100} 
                            className="mt-1 h-2"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-1">Your Points Balance</h3>
              <p className="text-2xl font-bold text-blue-600">{currentLevel.currentXP} XP</p>
              <p className="text-sm text-blue-600">Available to spend on rewards</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <Card key={reward.id} className={reward.available ? '' : 'opacity-60'}>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-primary/20 rounded-full flex items-center justify-center">
                        <reward.icon className="w-8 h-8 text-primary" />
                      </div>
                      
                      <h3 className="font-semibold mb-1">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                      
                      <div className="mb-3">
                        <Badge className="bg-primary text-white font-semibold">
                          {reward.cost} XP
                        </Badge>
                      </div>
                      
                      <Button 
                        onClick={() => handleRedeemReward(reward.name, reward.cost)}
                        disabled={!reward.available || currentLevel.currentXP < reward.cost}
                        className="w-full"
                      >
                        {!reward.available ? 'Out of Stock' : 
                         currentLevel.currentXP < reward.cost ? 'Insufficient Points' : 'Redeem'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <h3 className="text-xl font-semibold">Recent Achievements</h3>
            {recentAchievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.name}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {achievement.date}
                      </p>
                    </div>
                    
                    <Badge className="bg-green-600">
                      +{achievement.xpGained} XP
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <h3 className="text-xl font-semibold">Monthly Leaderboard</h3>
            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <Card key={entry.rank} className={entry.isCurrentUser ? 'border-primary bg-primary/5' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        entry.rank === 1 ? 'bg-yellow-500' :
                        entry.rank === 2 ? 'bg-gray-400' :
                        entry.rank === 3 ? 'bg-orange-500' : 'bg-gray-600'
                      }`}>
                        {entry.rank === 1 ? <Crown className="w-5 h-5" /> : entry.rank}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className={`font-semibold ${entry.isCurrentUser ? 'text-primary' : ''}`}>
                          {entry.name} {entry.isCurrentUser && '(You)'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {entry.tasksCompleted} tasks completed
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-lg">{entry.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerRewards;