"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Trophy,
  Star,
  Clock,
  BookOpen,
  Award,
  Flame,
  Target,
  Calendar,
  TrendingUp,
  Edit,
  Settings,
  Download,
  Share,
  Mail,
  MapPin,
  GraduationCap,
  CheckCircle,
  Medal,
  Zap,
  Play,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Kimani",
    email: "alex.kimani@email.com",
    bio: "Passionate learner focused on digital marketing and technology. Always looking to expand my skillset and stay ahead of industry trends.",
    location: "Nairobi, Kenya",
    occupation: "Digital Marketing Specialist",
    education: "Bachelor's in Business Administration",
    learningGoals: ["Advance my career", "Learn new skills", "Personal development"],
    interests: ["Technology", "Marketing", "Business", "Design"],
  })

  const userStats = {
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    streak: 7,
    totalCourses: 15,
    completedCourses: 8,
    totalHours: 45.5,
    certificates: 5,
    joinDate: "March 2024",
  }

  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first course",
      icon: GraduationCap,
      unlocked: true,
      unlockedDate: "March 15, 2024",
      rarity: "common",
    },
    {
      id: 2,
      name: "Week Warrior",
      description: "Maintain a 7-day learning streak",
      icon: Flame,
      unlocked: true,
      unlockedDate: "April 2, 2024",
      rarity: "uncommon",
    },
    {
      id: 3,
      name: "Quiz Master",
      description: "Score 100% on 10 quizzes",
      icon: Trophy,
      unlocked: true,
      unlockedDate: "April 20, 2024",
      rarity: "rare",
    },
    {
      id: 4,
      name: "Speed Learner",
      description: "Complete 5 courses in one month",
      icon: Zap,
      unlocked: true,
      unlockedDate: "May 1, 2024",
      rarity: "rare",
    },
    {
      id: 5,
      name: "Knowledge Seeker",
      description: "Explore 5 different course categories",
      icon: BookOpen,
      unlocked: true,
      unlockedDate: "May 15, 2024",
      rarity: "uncommon",
    },
    {
      id: 6,
      name: "Perfectionist",
      description: "Complete 3 courses with 100% score",
      icon: Star,
      unlocked: false,
      unlockedDate: null,
      rarity: "epic",
    },
    {
      id: 7,
      name: "Marathon Learner",
      description: "Maintain a 30-day learning streak",
      icon: Medal,
      unlocked: false,
      unlockedDate: null,
      rarity: "legendary",
    },
    {
      id: 8,
      name: "Course Collector",
      description: "Complete 25 courses",
      icon: Award,
    },
  ]

  const recentActivity = [
    {
      type: "course_completed",
      title: "Digital Marketing Essentials",
      date: "2 days ago",
      xp: 150,
    },
    {
      type: "achievement_unlocked",
      title: "Speed Learner",
      date: "1 week ago",
      xp: 100,
    },
    {
      type: "quiz_completed",
      title: "Python Basics Quiz",
      date: "1 week ago",
      score: 95,
      xp: 50,
    },
    {
      type: "course_started",
      title: "UI/UX Design Fundamentals",
      date: "2 weeks ago",
      xp: 0,
    },
  ]

  const learningStats = [
    { label: "Courses Completed", value: userStats.completedCourses, total: userStats.totalCourses, icon: BookOpen },
    { label: "Learning Hours", value: userStats.totalHours, unit: "hrs", icon: Clock },
    { label: "Current Streak", value: userStats.streak, unit: "days", icon: Flame },
    { label: "Certificates Earned", value: userStats.certificates, icon: Award },
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800"
      case "uncommon":
        return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30"
      case "rare":
        return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30"
      case "epic":
        return "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30"
      case "legendary":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30"
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800"
    }
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profileData.name} />
                    <AvatarFallback className="text-2xl">
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{userStats.level}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{profileData.name}</h1>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{profileData.occupation}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {profileData.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Joined {userStats.joinDate}
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => setIsEditing(!isEditing)} variant="outline" className="mt-4 md:mt-0">
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </div>

                  {/* XP Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Level {userStats.level} Progress
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {userStats.xp} / {userStats.nextLevelXp} XP
                      </span>
                    </div>
                    <Progress value={(userStats.xp / userStats.nextLevelXp) * 100} className="h-3" />
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {learningStats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <stat.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {stat.value}
                            {stat.unit && stat.unit}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Learning Progress */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Course Completion Rate</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {Math.round((userStats.completedCourses / userStats.totalCourses) * 100)}%
                        </span>
                      </div>
                      <Progress value={(userStats.completedCourses / userStats.totalCourses) * 100} />

                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {userStats.completedCourses}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {userStats.totalCourses - userStats.completedCourses}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {achievements
                        .filter((a) => a.unlocked)
                        .slice(0, 3)
                        .map((achievement) => (
                          <div
                            key={achievement.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <div className={`p-2 rounded-lg ${getRarityColor(achievement.rarity)}`}>
                              <achievement.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">{achievement.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className="text-xs">
                                {achievement.rarity}
                              </Badge>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {achievement.unlockedDate}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Current Streak */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      Current Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                      {userStats.streak}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">days</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Keep it up! You're doing great.</p>
                  </CardContent>
                </Card>

                {/* Learning Goals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Learning Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {profileData.learningGoals.map((goal, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Interests */}
                <Card>
                  <CardHeader>
                    <CardTitle>Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profileData.interests.map((interest, index) => (
                        <Badge key={index} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Achievements</CardTitle>
                <CardDescription>
                  Unlock achievements by completing courses, maintaining streaks, and reaching milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={`transition-all ${
                        achievement.unlocked
                          ? "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800"
                          : "opacity-60"
                      }`}
                    >
                      <CardContent className="p-4 text-center">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                            achievement.unlocked
                              ? getRarityColor(achievement.rarity)
                              : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                          }`}
                        >
                          <achievement.icon className="w-8 h-8" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{achievement.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              achievement.unlocked
                                ? getRarityColor(achievement.rarity).replace("bg-", "border-").replace("text-", "text-")
                                : ""
                            }`}
                          >
                            {achievement.rarity}
                          </Badge>
                          {achievement.unlocked && (
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          )}
                        </div>
                        {achievement.unlockedDate && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Unlocked {achievement.unlockedDate}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning journey over the past few weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        {activity.type === "course_completed" && (
                          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        )}
                        {activity.type === "achievement_unlocked" && (
                          <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        )}
                        {activity.type === "quiz_completed" && (
                          <Star className="w-5 h-5 text-green-600 dark:text-green-400" />
                        )}
                        {activity.type === "course_started" && (
                          <Play className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {activity.type === "course_completed" && "Completed Course"}
                          {activity.type === "achievement_unlocked" && "Achievement Unlocked"}
                          {activity.type === "quiz_completed" && "Quiz Completed"}
                          {activity.type === "course_started" && "Started Course"}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">{activity.title}</p>
                        {activity.score && (
                          <p className="text-sm text-green-600 dark:text-green-400">Score: {activity.score}%</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                        {activity.xp > 0 && (
                          <Badge variant="outline" className="mt-1">
                            +{activity.xp} XP
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your personal information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input
                        id="occupation"
                        value={profileData.occupation}
                        onChange={(e) => setProfileData({ ...profileData, occupation: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="education">Education</Label>
                    <Input
                      id="education"
                      value={profileData.education}
                      onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</Label>
                      <p className="text-gray-900 dark:text-white">{profileData.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</Label>
                      <p className="text-gray-900 dark:text-white">{profileData.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</Label>
                      <p className="text-gray-900 dark:text-white">{profileData.bio}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</Label>
                      <p className="text-gray-900 dark:text-white">{profileData.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Occupation</Label>
                      <p className="text-gray-900 dark:text-white">{profileData.occupation}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Education</Label>
                      <p className="text-gray-900 dark:text-white">{profileData.education}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Account Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download Learning Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Share className="w-4 h-4 mr-2" />
                      Share Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Preferences
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                    >
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
