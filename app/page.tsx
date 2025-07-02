"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Trophy, Clock, Star, Play, Users, Zap, Target, ChevronRight, Flame } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { supabase } from "@/lib/supabase"

export default function HomePage() {
  const { user, loading } = useAuth()
  const [userProfile, setUserProfile] = useState(null)
  const [courses, setCourses] = useState([])
  const [streak, setStreak] = useState(7)
  const [todayProgress, setTodayProgress] = useState(65)

  useEffect(() => {
    if (user) {
      fetchUserProfile()
      fetchCourses()
    }
  }, [user])

  const fetchUserProfile = async () => {
    if (!user) return

    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (data) {
      setUserProfile(data)
      setStreak(data.streak || 0)
    }
  }

  const fetchCourses = async () => {
    const { data, error } = await supabase.from("courses").select("*").limit(6)

    if (data) {
      setCourses(data)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Microlearning Made Simple
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Learn Anything in
                <span className="text-blue-600 dark:text-blue-400"> 5 Minutes</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Master new skills with bite-sized lessons that fit perfectly into your busy schedule. Personalized
                learning paths powered by AI.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/auth">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Learning Free
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                  Browse Courses
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
                <div className="text-gray-600 dark:text-gray-400">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                <div className="text-gray-600 dark:text-gray-400">Micro Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">95%</div>
                <div className="text-gray-600 dark:text-gray-400">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Microlearning Coach?</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Designed specifically for busy professionals and students who want to learn efficiently
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Clock className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <CardTitle>Bite-Sized Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Learn in 3-7 minute focused sessions that fit into any schedule
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <CardTitle>Personalized Paths</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    AI-powered recommendations based on your goals and learning style
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Trophy className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <CardTitle>Gamified Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Earn points, badges, and maintain streaks to stay motivated
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Start Learning Today</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Choose the plan that works for you</p>
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
              <span>Starting from</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">KSh 499</span>
              <span>/month</span>
            </div>
            <Link href="/pricing">
              <Button size="lg">View All Plans</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {userProfile?.full_name || user.email}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Ready to continue your learning journey?</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full">
                <Flame className="w-4 h-4" />
                <span className="font-semibold">{streak} day streak</span>
              </div>
              <Avatar>
                <AvatarImage
                  src={userProfile?.avatar_url || "/placeholder.svg"}
                  alt={userProfile?.full_name || "User"}
                />
                <AvatarFallback>
                  {(userProfile?.full_name || user.email || "U")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Today's Goal</p>
                    <div className="flex items-center gap-2">
                      <Progress value={todayProgress} className="w-16 h-2" />
                      <span className="text-sm font-semibold">{todayProgress}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Level</p>
                    <p className="font-semibold">{userProfile?.level || 1}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">XP</p>
                    <p className="font-semibold">{userProfile?.xp?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Streak</p>
                    <p className="font-semibold">{streak} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Courses Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recommended Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CourseCard({ course }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary">{course.category}</Badge>
          <div className="flex items-center gap-1">
            {course.is_premium ? (
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">Premium</Badge>
            ) : (
              <Badge variant="outline" className="text-green-600 border-green-600">
                Free
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {course.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration} min
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.modules_count} modules
            </div>
          </div>
          <Badge variant="outline">{course.difficulty}</Badge>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {course.rating}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4" />
              {course.students_count?.toLocaleString() || 0}
            </div>
          </div>
        </div>

        <Link href={`/learn/${course.id}`}>
          <Button className="w-full group-hover:bg-blue-600 transition-colors">
            <Play className="w-4 h-4 mr-2" />
            Start Course
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
