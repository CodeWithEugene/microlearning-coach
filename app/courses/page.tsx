"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, BookOpen, Star, Users, Play, TrendingUp, Award, Zap } from "lucide-react"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
    { value: "design", label: "Design" },
    { value: "finance", label: "Finance" },
    { value: "health", label: "Health & Wellness" },
    { value: "languages", label: "Languages" },
    { value: "personal-dev", label: "Personal Development" },
  ]

  const courses = [
    {
      id: 1,
      title: "Digital Marketing Essentials",
      description: "Master the fundamentals of digital marketing in bite-sized lessons",
      category: "Marketing",
      difficulty: "Beginner",
      duration: "45 min",
      modules: 12,
      rating: 4.8,
      students: 1234,
      image: "/placeholder.svg?height=200&width=300",
      price: "Free",
      isPremium: false,
      isPopular: true,
      progress: 0,
      tags: ["SEO", "Social Media", "Analytics"],
    },
    {
      id: 2,
      title: "Python Programming Basics",
      description: "Learn Python programming through interactive micro-lessons",
      category: "Technology",
      difficulty: "Beginner",
      duration: "60 min",
      modules: 15,
      rating: 4.9,
      students: 2156,
      image: "/placeholder.svg?height=200&width=300",
      price: "Premium",
      isPremium: true,
      isPopular: false,
      progress: 30,
      tags: ["Programming", "Python", "Coding"],
    },
    {
      id: 3,
      title: "Financial Literacy for Professionals",
      description: "Build essential financial skills for career growth",
      category: "Finance",
      difficulty: "Intermediate",
      duration: "35 min",
      modules: 10,
      rating: 4.7,
      students: 987,
      image: "/placeholder.svg?height=200&width=300",
      price: "Premium",
      isPremium: true,
      isPopular: false,
      progress: 0,
      tags: ["Finance", "Investment", "Budgeting"],
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      description: "Create beautiful and functional user interfaces",
      category: "Design",
      difficulty: "Beginner",
      duration: "50 min",
      modules: 14,
      rating: 4.6,
      students: 1567,
      image: "/placeholder.svg?height=200&width=300",
      price: "Premium",
      isPremium: true,
      isPopular: true,
      progress: 0,
      tags: ["Design", "UI", "UX", "Figma"],
    },
    {
      id: 5,
      title: "Effective Communication Skills",
      description: "Improve your communication in personal and professional settings",
      category: "Personal Development",
      difficulty: "Beginner",
      duration: "40 min",
      modules: 11,
      rating: 4.5,
      students: 2341,
      image: "/placeholder.svg?height=200&width=300",
      price: "Free",
      isPremium: false,
      isPopular: false,
      progress: 0,
      tags: ["Communication", "Leadership", "Soft Skills"],
    },
    {
      id: 6,
      title: "Data Analysis with Excel",
      description: "Master data analysis techniques using Microsoft Excel",
      category: "Business",
      difficulty: "Intermediate",
      duration: "55 min",
      modules: 16,
      rating: 4.4,
      students: 876,
      image: "/placeholder.svg?height=200&width=300",
      price: "Premium",
      isPremium: true,
      isPopular: false,
      progress: 0,
      tags: ["Excel", "Data Analysis", "Business Intelligence"],
    },
    {
      id: 7,
      title: "Mindfulness and Stress Management",
      description: "Learn techniques to manage stress and improve mental well-being",
      category: "Health",
      difficulty: "Beginner",
      duration: "30 min",
      modules: 8,
      rating: 4.7,
      students: 1432,
      image: "/placeholder.svg?height=200&width=300",
      price: "Free",
      isPremium: false,
      isPopular: false,
      progress: 0,
      tags: ["Mindfulness", "Wellness", "Mental Health"],
    },
    {
      id: 8,
      title: "JavaScript for Beginners",
      description: "Start your web development journey with JavaScript",
      category: "Technology",
      difficulty: "Beginner",
      duration: "65 min",
      modules: 18,
      rating: 4.8,
      students: 1876,
      image: "/placeholder.svg?height=200&width=300",
      price: "Premium",
      isPremium: true,
      isPopular: true,
      progress: 0,
      tags: ["JavaScript", "Web Development", "Programming"],
    },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "all" ||
      course.category.toLowerCase().replace(/\s+/g, "-") === selectedCategory ||
      course.category.toLowerCase() === selectedCategory

    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty.toLowerCase() === selectedDifficulty

    const matchesDuration =
      selectedDuration === "all" ||
      (selectedDuration === "short" && Number.parseInt(course.duration) <= 30) ||
      (selectedDuration === "medium" &&
        Number.parseInt(course.duration) > 30 &&
        Number.parseInt(course.duration) <= 60) ||
      (selectedDuration === "long" && Number.parseInt(course.duration) > 60)

    return matchesSearch && matchesCategory && matchesDifficulty && matchesDuration
  })

  const popularCourses = courses.filter((course) => course.isPopular)
  const freeCourses = courses.filter((course) => !course.isPremium)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Explore Courses</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover bite-sized learning experiences tailored to your goals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses, topics, or skills..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="short">{"< 30 min"}</SelectItem>
                  <SelectItem value="medium">30-60 min</SelectItem>
                  <SelectItem value="long">{"> 60 min"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All Courses
            </Button>
            <Button
              variant={selectedCategory === "technology" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("technology")}
            >
              <Zap className="w-4 h-4 mr-1" />
              Technology
            </Button>
            <Button
              variant={selectedCategory === "business" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("business")}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Business
            </Button>
            <Button
              variant={
                !courses.filter((c) => filteredCourses.includes(c) && !c.isPremium).length ? "outline" : "outline"
              }
              size="sm"
              onClick={() => {
                setSelectedCategory("all")
                // Filter for free courses - this would need more complex state management
              }}
            >
              Free Courses
            </Button>
          </div>
        </div>

        {/* Featured Sections */}
        {searchQuery === "" &&
          selectedCategory === "all" &&
          selectedDifficulty === "all" &&
          selectedDuration === "all" && (
            <div className="space-y-8 mb-8">
              {/* Popular Courses */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Popular This Week</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularCourses.slice(0, 3).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>

              {/* Free Courses */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Free Courses</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {freeCourses.slice(0, 3).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            </div>
          )}

        {/* All Courses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {searchQuery || selectedCategory !== "all" || selectedDifficulty !== "all" || selectedDuration !== "all"
                ? `Search Results (${filteredCourses.length})`
                : "All Courses"}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">{filteredCourses.length} courses found</div>
          </div>

          {filteredCourses.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No courses found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search criteria or browse our popular courses
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedDifficulty("all")
                    setSelectedDuration("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
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
            {course.isPopular && (
              <Badge variant="outline" className="text-orange-600 border-orange-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            )}
            {course.isPremium ? (
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
        {course.progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
              <span className="text-sm font-semibold">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.modules} modules
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
              {course.students.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button className="w-full group-hover:bg-blue-600 transition-colors">
          <Play className="w-4 h-4 mr-2" />
          {course.progress > 0 ? "Continue Course" : "Start Course"}
        </Button>
      </CardContent>
    </Card>
  )
}
