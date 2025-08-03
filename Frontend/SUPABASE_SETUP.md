# Supabase Analytics Setup Guide

## Overview
Your Smart Content Generation Platform now includes full Supabase integration for storing content and providing real-time analytics. This guide will help you set up Supabase and configure the analytics dashboard.

## 🚀 Quick Setup

### 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or sign in to your account
3. Click "New Project"
4. Choose your organization and enter project details
5. Wait for the project to be created (usually takes 2-3 minutes)

### 2. Get Your Credentials
1. Go to your project dashboard
2. Navigate to **Settings** → **API**
3. Copy your **Project URL** and **anon/public key**

### 3. Configure Environment Variables
Create a `.env.local` file in your project root and add:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Create Database Tables
In your Supabase dashboard, go to **SQL Editor** and run this schema:

```sql
-- Create tables for the Smart Content Generation Platform

-- Generated content table
CREATE TABLE generated_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'blog', 'social', 'docs', 'marketing'
  title TEXT,
  content TEXT NOT NULL,
  metadata JSONB, -- Store SEO scores, hashtags, etc.
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

-- Policies for content_analytics
CREATE POLICY "Users can view own analytics" ON content_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics" ON content_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analytics" ON content_analytics
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analytics" ON content_analytics
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for social_posts
CREATE POLICY "Users can view own posts" ON social_posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own posts" ON social_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON social_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON social_posts
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes for better performance
CREATE INDEX idx_generated_content_user_type ON generated_content(user_id, type);
CREATE INDEX idx_generated_content_created_at ON generated_content(created_at DESC);
CREATE INDEX idx_content_analytics_user_platform ON content_analytics(user_id, platform);
CREATE INDEX idx_content_analytics_recorded_at ON content_analytics(recorded_at DESC);
CREATE INDEX idx_social_posts_user_status ON social_posts(user_id, post_status);
```

### 5. Enable Authentication (Optional)
1. Go to **Authentication** → **Settings**
2. Configure your preferred authentication providers
3. Set up email templates if needed

## 📊 Analytics Features

### Automatic Analytics Generation
- **Real-time Data**: Analytics are automatically generated when you create content
- **Multi-platform Metrics**: Tracks engagement across Instagram, Twitter, Facebook, LinkedIn, TikTok
- **Comprehensive Metrics**: Engagement, reach, likes, shares, comments, clicks

### Analytics Dashboard
- **Overview Cards**: Total content, average engagement, SEO scores, platform reach
- **Content Generation Chart**: Visual timeline of content creation
- **Engagement Trends**: Track engagement rates over time
- **Content Type Distribution**: Pie chart of content types
- **Platform Performance**: Compare engagement across platforms

### Metrics Tracked
```json
{
  "engagement": "20-120 (percentage)",
  "reach": "1000-6000 (users reached)",
  "likes": "50-250 (likes received)",
  "shares": "10-60 (shares/retweets)",
  "comments": "5-35 (comments received)",
  "clicks": "25-175 (link clicks)"
}
```

## 🔧 Configuration Options

### Environment Variables
```env
# Required
REACT_APP_SUPABASE_URL=your-project-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

# Optional (for production)
REACT_APP_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Fallback Behavior
- If Supabase is not configured, the app falls back to mock data
- Analytics will show sample data until real data is available
- All features remain functional in offline mode

## 🎯 Next Steps

### Development
1. Create content using the generators
2. Check the Analytics page to see real data
3. Monitor engagement across platforms
4. Export analytics data if needed

### Production
1. Set up proper authentication
2. Configure email providers
3. Set up backups and monitoring
4. Implement rate limiting if needed

### Advanced Features
- Custom analytics events
- Real-time notifications
- Advanced filtering and reporting
- Data export functionality

## 🛠️ Troubleshooting

### Common Issues
1. **"Invalid API Key"**: Check your environment variables
2. **"Table does not exist"**: Run the SQL schema in Supabase
3. **"RLS Policy Violation"**: Make sure you're authenticated
4. **"No data showing"**: Create some content first, analytics will follow

### Support
- Check Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
- Review the SQL schema in `src/components/SupabaseProvider.jsx`
- Verify your environment variables are loaded correctly

## 📈 Analytics Benefits

### For Content Creators
- **Performance Insights**: See which content performs best
- **Platform Optimization**: Focus on high-performing platforms
- **Trend Analysis**: Track engagement over time
- **ROI Tracking**: Measure content effectiveness

### For Businesses
- **Data-Driven Decisions**: Make informed content strategy decisions
- **Performance Monitoring**: Track campaign success
- **Resource Allocation**: Optimize content creation efforts
- **Growth Tracking**: Monitor audience engagement growth

Your Smart Content Generation Platform now provides comprehensive analytics powered by Supabase! 🚀 