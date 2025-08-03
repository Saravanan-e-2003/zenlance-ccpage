import React, { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Supabase configuration - Using your actual Supabase credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iudfyrybrsjbcorulefq.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1ZGZ5cnlicnNqYmNvcnVsZWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMjY4NjEsImV4cCI6MjA2OTcwMjg2MX0.b8Ttxwn0XIic06Up9hRKf8u9yzHPChIOLrCVpCgo8mA'

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create context
const SupabaseContext = createContext()

// Custom hook to use Supabase
export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}

// Supabase Provider component
export default function SupabaseProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  // Generate sample analytics data for new content
  const generateSampleAnalytics = async (contentId, contentType) => {
    const platforms = ['instagram', 'twitter', 'linkedin', 'reddit']
    const analyticsPromises = platforms.map(platform => {
      const metrics = {
        engagement: Math.floor(Math.random() * 100) + 20, // 20-120
        reach: Math.floor(Math.random() * 5000) + 1000, // 1000-6000
        likes: Math.floor(Math.random() * 200) + 50, // 50-250
        shares: Math.floor(Math.random() * 50) + 10, // 10-60
        comments: Math.floor(Math.random() * 30) + 5, // 5-35
        clicks: Math.floor(Math.random() * 150) + 25 // 25-175
      }
      
      return saveAnalytics({
        content_id: contentId,
        platform: platform,
        metrics: metrics
      })
    })
    
    await Promise.all(analyticsPromises)
  }

  // Content operations
  const saveContent = async (contentData) => {
    try {
      const { data, error } = await supabase
        .from('generated_content')
        .insert([{
          user_id: user?.id,
          type: contentData.type,
          title: contentData.title,
          content: contentData.content,
          metadata: contentData.metadata,
          created_at: new Date().toISOString()
        }])
        .select()

      if (error) throw error
      
      // Generate sample analytics data for the new content
      if (data[0] && user?.id) {
        await generateSampleAnalytics(data[0].id, contentData.type)
      }
      
      return { success: true, data: data[0] }
    } catch (error) {
      console.error('Error saving content:', error)
      return { success: false, error: error.message }
    }
  }

  // LocalStorage Content Management
  const saveContentToLocalStorage = (contentData, status = 'draft') => {
    try {
      const existingContent = JSON.parse(localStorage.getItem('contentHistory') || '[]')
      const newContent = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: contentData.type,
        title: contentData.title,
        content: contentData.content,
        metadata: contentData.metadata,
        status: status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      existingContent.unshift(newContent)
      localStorage.setItem('contentHistory', JSON.stringify(existingContent))
      return { success: true, data: newContent }
    } catch (error) {
      console.error('Error saving content to localStorage:', error)
      return { success: false, error: error.message }
    }
  }

  const getContentFromLocalStorage = (type = null, status = null) => {
    try {
      const content = JSON.parse(localStorage.getItem('contentHistory') || '[]')
      let filtered = content
      
      if (type) {
        filtered = filtered.filter(item => item.type === type)
      }
      
      if (status) {
        filtered = filtered.filter(item => item.status === status)
      }
      
      return { success: true, data: filtered }
    } catch (error) {
      console.error('Error fetching content from localStorage:', error)
      return { success: false, error: error.message }
    }
  }

  const updateContentStatus = (id, status) => {
    try {
      const content = JSON.parse(localStorage.getItem('contentHistory') || '[]')
      const itemIndex = content.findIndex(item => item.id === id)
      
      if (itemIndex !== -1) {
        content[itemIndex].status = status
        content[itemIndex].updated_at = new Date().toISOString()
        localStorage.setItem('contentHistory', JSON.stringify(content))
        return { success: true, data: content[itemIndex] }
      }
      
      return { success: false, error: 'Content not found' }
    } catch (error) {
      console.error('Error updating content status:', error)
      return { success: false, error: error.message }
    }
  }

  const deleteContentFromLocalStorage = (id) => {
    try {
      const content = JSON.parse(localStorage.getItem('contentHistory') || '[]')
      const filtered = content.filter(item => item.id !== id)
      localStorage.setItem('contentHistory', JSON.stringify(filtered))
      return { success: true }
    } catch (error) {
      console.error('Error deleting content from localStorage:', error)
      return { success: false, error: error.message }
    }
  }

  const getContent = async (type = null) => {
    try {
      let query = supabase
        .from('generated_content')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (type) {
        query = query.eq('type', type)
      }

      const { data, error } = await query
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching content:', error)
      return { success: false, error: error.message }
    }
  }

  const deleteContent = async (id) => {
    try {
      const { error } = await supabase
        .from('generated_content')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error deleting content:', error)
      return { success: false, error: error.message }
    }
  }

  // Analytics operations
  const saveAnalytics = async (analyticsData) => {
    try {
      const { data, error } = await supabase
        .from('content_analytics')
        .insert([{
          user_id: user?.id,
          content_id: analyticsData.content_id,
          platform: analyticsData.platform,
          metrics: analyticsData.metrics,
          recorded_at: new Date().toISOString()
        }])
        .select()

      if (error) throw error
      return { success: true, data: data[0] }
    } catch (error) {
      console.error('Error saving analytics:', error)
      return { success: false, error: error.message }
    }
  }

  const getAnalytics = async (period = '30d') => {
    try {
      const dateFrom = new Date()
      dateFrom.setDate(dateFrom.getDate() - (period === '30d' ? 30 : 7))

      const { data, error } = await supabase
        .from('content_analytics')
        .select('*')
        .eq('user_id', user?.id)
        .gte('recorded_at', dateFrom.toISOString())
        .order('recorded_at', { ascending: false })

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      return { success: false, error: error.message }
    }
  }

  // Authentication operations
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const value = {
    supabase,
    user,
    loading,
    // Content operations
    saveContent,
    getContent,
    deleteContent,
    // LocalStorage Content operations
    saveContentToLocalStorage,
    getContentFromLocalStorage,
    updateContentStatus,
    deleteContentFromLocalStorage,
    // Analytics operations
    saveAnalytics,
    getAnalytics,
    generateSampleAnalytics,
    // Auth operations
    signIn,
    signUp,
    signOut,
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}

/* 
Supabase Database Schema (SQL):

-- Create tables for the Smart Content Generation Platform

-- Users table (handled by Supabase Auth)

-- Generated content table
CREATE TABLE generated_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'blog', 'social', 'docs', 'marketing'
  title TEXT,
  content TEXT NOT NULL,
  metadata JSONB, -- Store additional data like SEO scores, hashtags, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content analytics table
CREATE TABLE content_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES generated_content(id) ON DELETE CASCADE,
  platform VARCHAR(50), -- 'instagram', 'twitter', 'facebook', etc.
  metrics JSONB, -- Store engagement metrics, reach, etc.
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social media posts table
CREATE TABLE social_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES generated_content(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  post_status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'scheduled', 'published', 'failed'
  scheduled_for TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  platform_post_id TEXT, -- ID from the social platform
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

-- Policies for generated_content
CREATE POLICY "Users can view own content" ON generated_content
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content" ON generated_content
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content" ON generated_content
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own content" ON generated_content
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for other tables...
*/ 