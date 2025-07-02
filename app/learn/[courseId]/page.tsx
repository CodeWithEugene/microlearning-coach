"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Play, CheckCircle, Clock, BookOpen, Star, ArrowLeft, ArrowRight, Trophy, Target, Users } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"

export default function LearnPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [userProgress, setUserProgress] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.courseId && user) {
      fetchCourseData()
    }
  }, [params.courseId, user])

  const fetchCourseData = async () => {
    try {
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("id", params.courseId)
        .single()

      if (courseError) throw courseError

      // Fetch course modules
      const { data: modulesData, error: modulesError } = await supabase
        .from("modules")
        .select("*")
        .eq("course_id", params.courseId)
        .order("order_index")

      if (modulesError) throw modulesError

      // Fetch user progress
      const { data: progressData, error: progressError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("course_id", params.courseId)

      if (progressError) throw progressError

      setCourse(courseData)
      setModules(modulesData || [])
      setUserProgress(progressData || [])

      // Set first module as selected if none selected
      if (modulesData && modulesData.length > 0 && !selectedModule) {
        setSelectedModule(modulesData[0])
      }
    } catch (error) {
      console.error("Error fetching course data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getModuleProgress = (moduleId) => {
    const progress = userProgress.find((p) => p.module_id === moduleId)
    return progress ? progress.progress_percentage : 0
  }

  const isModuleCompleted = (moduleId) => {
    const progress = userProgress.find((p) => p.module_id === moduleId)
    return progress ? progress.completed : false
  }

  const markModuleAsCompleted = async (moduleId) => {
    if (!user) return

    try {
      const { data, error } = await supabase.from("user_progress").upsert({
        user_id: user.id,
        course_id: params.courseId,
        module_id: moduleId,
        progress_percentage: 100,
        completed: true,
        completed_at: new Date().toISOString(),
      })

      if (error) throw error

      // Update local state
      setUserProgress((prev) => {
        const existing = prev.find((p) => p.module_id === moduleId)
        if (existing) {
          return prev.map((p) =>
            p.module_id === moduleId
              ? { ...p, progress_percentage: 100, completed: true, completed_at: new Date().toISOString() }
              : p,
          )
        } else {
          return [
            ...prev,
            {
              user_id: user.id,
              course_id: params.courseId,
              module_id: moduleId,
              progress_percentage: 100,
              completed: true,
              completed_at: new Date().toISOString(),
            },
          ]
        }
      })

      // Award XP (you can implement this based on your XP system)
      const module = modules.find((m) => m.id === moduleId)
      if (module && module.xp_reward) {
        // Update user XP in profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("xp")
          .eq("id", user.id)
          .single()

        if (!profileError && profileData) {
          await supabase
            .from("profiles")
            .update({ xp: (profileData.xp || 0) + module.xp_reward })
            .eq("id", user.id)
        }
      }
    } catch (error) {
      console.error("Error marking module as completed:", error)
    }
  }

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const openModuleInNewWindow = (module) => {
    const videoId = getYouTubeVideoId(module.video_url)
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      const windowFeatures = "width=800,height=600,scrollbars=yes,resizable=yes"
      const newWindow = window.open("", "_blank", windowFeatures)

      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${module.title} - Microlearning Coach</title>
          <style>
            body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; }
            .container { max-width: 800px; margin: 0 auto; }
            .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .video-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; }
            .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
            .actions { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
            .btn { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; }
            .btn:hover { background: #2563eb; }
            .btn:disabled { background: #9ca3af; cursor: not-allowed; }
            .completed { background: #10b981; }
            .completed:hover { background: #059669; }
            .module-info { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
            .duration { background: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #6b7280; }
            .xp-reward { background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0 0 8px 0; color: #1f2937;">${module.title}</h1>
              <p style="margin: 0; color: #6b7280;">${module.description}</p>
              <div class="module-info">
                <span class="duration">⏱️ ${module.duration} min</span>
                <span class="xp-reward">⭐ +${module.xp_reward} XP</span>
              </div>
            </div>
            
            <div class="video-container">
              <iframe 
                src="${embedUrl}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
            
            <div class="actions">
              <button 
                id="completeBtn" 
                class="btn ${isModuleCompleted(module.id) ? "completed" : ""}"
                onclick="markComplete()"
                ${isModuleCompleted(module.id) ? "disabled" : ""}
              >
                ${isModuleCompleted(module.id) ? "✅ Completed" : "✓ Mark as Complete"}
              </button>
            </div>
          </div>
          
          <script>
            function markComplete() {
              const btn = document.getElementById('completeBtn');
              btn.textContent = '✅ Completed';
              btn.classList.add('completed');
              btn.disabled = true;
              
              // Send message to parent window
              if (window.opener) {
                window.opener.postMessage({
                  type: 'MODULE_COMPLETED',
                  moduleId: '${module.id}'
                }, '*');
              }
            }
          </script>
        </body>
        </html>
      `)

      newWindow.document.close()
    }
  }

  // Listen for messages from child windows
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "MODULE_COMPLETED") {
        markModuleAsCompleted(event.data.moduleId)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const completedModules = modules.filter((module) => isModuleCompleted(module.id)).length
  const courseProgress = modules.length > 0 ? (completedModules / modules.length) * 100 : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course not found</h1>
          <Link href="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Course Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Badge variant="outline">{course.difficulty}</Badge>
                    {course.is_premium && (
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">Premium</Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration} minutes
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.modules_count} modules
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {course.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students_count?.toLocaleString() || 0} students
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Course Completion</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {completedModules} of {modules.length} modules
                    </span>
                  </div>
                  <Progress value={courseProgress} className="h-3 mb-4" />
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      {completedModules} completed
                    </div>
                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      <Trophy className="w-4 h-4" />
                      {modules.reduce(
                        (total, module) => total + (isModuleCompleted(module.id) ? module.xp_reward : 0),
                        0,
                      )}{" "}
                      XP earned
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modules List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Course Modules</CardTitle>
                <CardDescription>Click on any module to start learning</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {modules.map((module, index) => (
                    <div
                      key={module.id}
                      className={`p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                        selectedModule?.id === module.id
                          ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600"
                          : ""
                      }`}
                      onClick={() => setSelectedModule(module)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            isModuleCompleted(module.id)
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {isModuleCompleted(module.id) ? <CheckCircle className="w-4 h-4" /> : index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{module.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                            {module.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {module.duration}m
                            </span>
                            <span className="flex items-center gap-1">
                              <Trophy className="w-3 h-3" />+{module.xp_reward} XP
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Module Details */}
          <div className="lg:col-span-2">
            {selectedModule ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{selectedModule.title}</CardTitle>
                      <CardDescription className="text-base mb-4">{selectedModule.description}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedModule.duration} minutes
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />+{selectedModule.xp_reward} XP
                        </div>
                      </div>
                    </div>
                    {isModuleCompleted(selectedModule.id) && (
                      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Video Preview */}
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      {selectedModule.video_url && getYouTubeVideoId(selectedModule.video_url) ? (
                        <img
                          src={`https://img.youtube.com/vi/${getYouTubeVideoId(selectedModule.video_url)}/maxresdefault.jpg`}
                          alt={selectedModule.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500 dark:text-gray-400">Video Preview</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button onClick={() => openModuleInNewWindow(selectedModule)} className="flex-1" size="lg">
                        <Play className="w-4 h-4 mr-2" />
                        Start Learning
                      </Button>

                      {isModuleCompleted(selectedModule.id) ? (
                        <Button variant="outline" disabled size="lg">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </Button>
                      ) : (
                        <Button variant="outline" onClick={() => markModuleAsCompleted(selectedModule.id)} size="lg">
                          Mark Complete
                        </Button>
                      )}
                    </div>

                    <Separator />

                    {/* Module Navigation */}
                    <div className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const currentIndex = modules.findIndex((m) => m.id === selectedModule.id)
                          if (currentIndex > 0) {
                            setSelectedModule(modules[currentIndex - 1])
                          }
                        }}
                        disabled={modules.findIndex((m) => m.id === selectedModule.id) === 0}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => {
                          const currentIndex = modules.findIndex((m) => m.id === selectedModule.id)
                          if (currentIndex < modules.length - 1) {
                            setSelectedModule(modules[currentIndex + 1])
                          }
                        }}
                        disabled={modules.findIndex((m) => m.id === selectedModule.id) === modules.length - 1}
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Select a Module to Start Learning
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose any module from the list to begin your learning journey.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
