import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          level: number
          xp: number
          streak: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          level?: number
          xp?: number
          streak?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          level?: number
          xp?: number
          streak?: number
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          difficulty: string
          duration: number
          modules_count: number
          rating: number
          students_count: number
          image_url: string | null
          is_premium: boolean
          created_at: string
          updated_at: string
        }
      }
      modules: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string
          video_url: string
          duration: number
          order_index: number
          xp_reward: number
          created_at: string
          updated_at: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          module_id: string | null
          progress_percentage: number
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
