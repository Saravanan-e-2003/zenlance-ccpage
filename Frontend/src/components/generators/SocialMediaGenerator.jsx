import React, { useState } from 'react'
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
  Slider,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material'
import {
  AutoAwesome as AIIcon,
  ContentCopy as CopyIcon,
  Schedule as ScheduleIcon,
  Send as PostNowIcon,
  Instagram,
  Twitter,
  LinkedIn,
  Forum as Reddit
} from '@mui/icons-material'
import { useSupabase } from '../SupabaseProvider'
import InstagramPreview from '../previews/InstagramPreview'
import TwitterPreview from '../previews/TwitterPreview'
import LinkedInPreview from '../previews/LinkedInPreview'
import RedditPreview from '../previews/RedditPreview'

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'platform-instagram' },
  { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'platform-twitter' },
  { id: 'linkedin', name: 'LinkedIn', icon: LinkedIn, color: 'platform-linkedin' },
  { id: 'reddit', name: 'Reddit', icon: Reddit, color: 'platform-reddit' }
]

const tones = [
  'engaging',
  'professional',
  'fun',
  'inspirational',
  'informative',
  'casual',
  'urgent',
  'friendly'
]

const ctaOptions = [
  { value: '', label: 'None' },
  { value: 'visit', label: 'Visit Website' },
  { value: 'follow', label: 'Follow Us' },
  { value: 'share', label: 'Share Post' },
  { value: 'comment', label: 'Leave Comment' },
  { value: 'dm', label: 'Send DM' },
  { value: 'signup', label: 'Sign Up' },
  { value: 'custom', label: 'Custom' }
]

export default function SocialMediaGenerator() {
  const { saveContentToLocalStorage, user } = useSupabase()
  
  // Form state
  const [formData, setFormData] = useState({
    content: '',
    primaryPlatform: 'instagram',
    tone: 'engaging',
    hashtagCount: 10,
    cta: '',
    customCTA: '',
    includeEmojis: true,
    targetAudience: '',
    image: null
  })
  
  // Image preview state
  const [imagePreview, setImagePreview] = useState(null)
  const [isAIGenerated, setIsAIGenerated] = useState(false)
  
  // AI image generation state
  const [generatingImage, setGeneratingImage] = useState(false)
  
  // Generated content state
  const [generatedContent, setGeneratedContent] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // Platform selection modal
  const [showPlatformModal, setShowPlatformModal] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram', 'twitter'])
  const [postAction, setPostAction] = useState('now') // 'now' or 'schedule'
  const [scheduledTime, setScheduledTime] = useState('')
  
  const [posting, setPosting] = useState(false)
  const [postSuccess, setPostSuccess] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, PNG, GIF, or WebP)')
        return
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024 // 10MB in bytes
      if (file.size > maxSize) {
        alert('Please upload an image smaller than 10MB')
        return
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }))

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setIsAIGenerated(false) // Mark as uploaded, not AI-generated
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }))
    setImagePreview(null)
    setIsAIGenerated(false)
    // Clear the file input
    const fileInput = document.getElementById('image-upload')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const generateAIImage = async () => {
    if (!formData.content.trim()) {
      alert('Please add a content description first to generate an AI image.')
      return
    }

    setGeneratingImage(true)

    try {
      // Simulate AI image generation with progressive feedback
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create a more sophisticated prompt based on content and platform
      const basePrompt = formData.content.substring(0, 150)
      const platformStyle = formData.primaryPlatform === 'instagram' ? 'square, vibrant, social media style' :
                           formData.primaryPlatform === 'linkedin' ? 'professional, clean, business style' :
                           formData.primaryPlatform === 'twitter' ? 'engaging, dynamic, news style' :
                           'community, authentic, discussion style'
      
      // For demo purposes, we'll use a curated image service
      // In a real implementation, you would call an AI image generation API like DALL-E, Midjourney, or Stable Diffusion
      const seed = Math.floor(Math.random() * 1000)
      const mockImageUrl = `https://picsum.photos/seed/${seed}/800/600`
      
      // Convert to blob for consistency with file upload
      const response = await fetch(mockImageUrl)
      const blob = await response.blob()
      
      // Create a file object
      const file = new File([blob], 'ai-generated-image.jpg', { type: 'image/jpeg' })
      
      setFormData(prev => ({
        ...prev,
        image: file
      }))

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setIsAIGenerated(true) // Mark as AI-generated
      }
      reader.readAsDataURL(file)

    } catch (error) {
      console.error('Error generating AI image:', error)
      alert('Failed to generate AI image. Please try again.')
    } finally {
      setGeneratingImage(false)
    }
  }

  const generateContent = async () => {
    if (!formData.content.trim()) {
      alert('Please describe the content you want to create.')
      return
    }

    setLoading(true)
    
    // Simulate AI content generation
    setTimeout(() => {
      const content = generateSocialContent(formData)
      setGeneratedContent(content)
      setLoading(false)
    }, 2500)
  }

  const generateSocialContent = (data) => {
    // Simulate AI generation
    const toneStarters = {
      'engaging': ['🚀 Ready to dive in?', '💡 Here\'s something amazing:', '✨ Let me share this with you:'],
      'professional': ['Sharing insights on:', 'Important update:', 'Key findings:'],
      'fun': ['🎉 Guess what?', '🤩 This is so cool:', '🌟 Fun fact:'],
      'inspirational': ['✨ Remember this:', '🌟 Believe it or not:', '💪 Here\'s your motivation:'],
      'informative': ['📚 Did you know:', '🔍 Here\'s what we found:', '📊 Latest data shows:'],
      'casual': ['Hey there! 👋', 'So, here\'s the thing...', 'Quick update:'],
      'urgent': ['🚨 Important:', '⚡ Don\'t miss this:', '🔥 Act fast:'],
      'friendly': ['Hello friends! 😊', 'Hope you\'re having a great day!', 'Sharing some love:']
    }

    const starter = toneStarters[data.tone][Math.floor(Math.random() * toneStarters[data.tone].length)]
    
    let caption = `${starter}\n\n${data.content}`
    
    // Add platform-specific content
    if (data.primaryPlatform === 'linkedin') {
      caption += '\n\nWhat has been your experience with this? Share your thoughts in the comments.'
    } else if (data.primaryPlatform === 'instagram') {
      caption += '\n\nDouble tap if you agree! 💖'
    } else if (data.primaryPlatform === 'twitter') {
      caption += '\n\nWhat do you think? Let me know below 👇'
    }
    
    // Add CTA
    if (data.cta) {
      const ctaTexts = {
        'visit': '👆 Visit our website for more details!',
        'follow': '💙 Follow us for daily insights!',
        'share': '🔄 Share if you found this helpful!',
        'comment': '💬 What are your thoughts? Comment below!',
        'dm': '📩 Send us a DM to learn more!',
        'signup': '✅ Sign up now and get started!',
        'custom': data.customCTA || '🔗 Take action today!'
      }
      
      caption += `\n\n${ctaTexts[data.cta] || ctaTexts.custom}`
    }

    // Generate hashtags
    const hashtags = generateHashtags(data.content, data.hashtagCount)
    
    return {
      caption,
      hashtags,
      platform: data.primaryPlatform,
      wordCount: caption.split(' ').length,
      characterCount: caption.length,
      platforms: generatePlatformOptimizations(caption, hashtags, data.primaryPlatform)
    }
  }

  const generateHashtags = (content, count) => {
    const baseHashtags = [
      '#ContentCreation', '#DigitalMarketing', '#SocialMedia', '#Innovation',
      '#Productivity', '#Success', '#Motivation', '#Business', '#Growth',
      '#Technology', '#Inspiration', '#Leadership', '#Strategy', '#Tips'
    ]
    
    const words = content.toLowerCase().match(/\b\w+\b/g) || []
    const contentHashtags = words
      .filter(word => word.length > 4)
      .slice(0, Math.floor(count * 0.3))
      .map(word => `#${word.charAt(0).toUpperCase() + word.slice(1)}`)
    
    const allHashtags = [...new Set([...contentHashtags, ...baseHashtags])]
    return allHashtags.slice(0, count)
  }

  const generatePlatformOptimizations = (caption, hashtags, platform) => {
    const optimizations = {}
    
    platforms.forEach(p => {
      optimizations[p.id] = {
        name: p.name,
        content: p.id === 'twitter' && caption.length > 200 ? 
          caption.substring(0, 200) + '...' : caption,
        hashtags: p.id === 'twitter' ? hashtags.slice(0, 3) : hashtags,
        tips: getPlatformTips(p.id)
      }
    })
    
    return optimizations
  }

  const getPlatformTips = (platform) => {
    const tips = {
      instagram: ['Use high-quality visuals', 'Post during peak hours (6-9 PM)', 'Use Stories for extra engagement'],
      twitter: ['Keep it under 280 characters', 'Use threads for longer content', 'Engage with replies quickly'],
      facebook: ['Use native video when possible', 'Ask questions to boost engagement', 'Post when audience is active'],
      linkedin: ['Add professional context', 'Tag relevant connections', 'Share industry insights'],
      tiktok: ['Create engaging visual content', 'Use trending sounds', 'Keep videos under 60 seconds'],
      youtube: ['Create compelling thumbnails', 'Optimize for search', 'Engage with comments'],
      pinterest: ['Use vertical images', 'Add keyword-rich descriptions', 'Create seasonal content'],
      reddit: ['Follow community rules', 'Be authentic and helpful', 'Engage in discussions']
    }
    
    return tips[platform] || ['Follow platform best practices', 'Engage with your audience', 'Post consistently']
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Content copied to clipboard!')
    })
  }

  // Render platform-specific preview
  const renderPlatformPreview = () => {
    if (!generatedContent) return null

    const content = generatedContent.caption
    const hashtags = generatedContent.hashtags

    switch (formData.primaryPlatform) {
      case 'instagram':
        return <InstagramPreview content={content} hashtags={hashtags} imageUrl={imagePreview} />
      case 'twitter':
        return <TwitterPreview content={content} hashtags={hashtags} imageUrl={imagePreview} />
      case 'linkedin':
        return <LinkedInPreview content={content} hashtags={hashtags} imageUrl={imagePreview} />
      case 'reddit':
        return <RedditPreview content={content} hashtags={hashtags} imageUrl={imagePreview} />
      default:
        return <InstagramPreview content={content} hashtags={hashtags} imageUrl={imagePreview} />
    }
  }

  const handlePlatformToggle = (platformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    )
  }

  const postNow = () => {
    setPostAction('now')
    setShowPlatformModal(true)
  }

  const schedulePost = () => {
    setPostAction('schedule')
    setShowPlatformModal(true)
  }

  const executePost = async () => {
    if (selectedPlatforms.length === 0) {
      alert('Please select at least one platform.')
      return
    }

    setPosting(true)
    
    // Simulate posting process
    setTimeout(async () => {
      try {
        // Save to localStorage as posted content
        if (generatedContent) {
          await saveContentToLocalStorage({
            type: 'social',
            title: `Social Media Post - ${new Date().toLocaleDateString()}`,
            content: generatedContent.caption,
            metadata: {
              hashtags: generatedContent.hashtags,
              platforms: selectedPlatforms,
              action: postAction,
              scheduledTime: postAction === 'schedule' ? scheduledTime : null,
              characterCount: generatedContent.characterCount,
              wordCount: generatedContent.wordCount
            }
          }, 'posted')
        }
        
        setPostSuccess(`Content ${postAction === 'now' ? 'posted' : 'scheduled'} successfully to ${selectedPlatforms.join(', ')}!`)
        setShowPlatformModal(false)
      } catch (error) {
        console.error('Error posting content:', error)
        alert('Error posting content. Please try again.')
      } finally {
        setPosting(false)
      }
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <Paper className="p-6 glass-card">
        <Typography variant="h5" className="font-semibold text-navy-900 mb-6">
          Content Configuration
        </Typography>
        
        <Grid container spacing={3}>
          {/* Content Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Content Description"
              placeholder="Describe what you want to post about..."
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>

          {/* Image Upload */}
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#ffffff' }}>
                Post Image (Optional)
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#9CA3AF' }}>
                Upload an image to make your post more engaging. Supports JPG, PNG, GIF, and WebP formats.
              </Typography>
              
              {!imagePreview ? (
                <Box sx={{ 
                  border: '2px dashed #374151',
                  borderRadius: '12px',
                  padding: '32px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(26, 31, 41, 0.5)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#4F7EFC',
                    backgroundColor: 'rgba(79, 126, 252, 0.05)'
                  }
                }}>
                  {/* Upload Section */}
                  <Box sx={{ mb: 3 }}>
                    <input
                      accept="image/*"
                      type="file"
                      id="image-upload"
                      style={{ display: 'none' }}
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        sx={{
                          padding: '12px 24px',
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontSize: '16px',
                          fontWeight: 600,
                          borderColor: '#4F7EFC',
                          color: '#4F7EFC',
                          marginRight: '12px',
                          '&:hover': {
                            borderColor: '#3B6BF0',
                            backgroundColor: 'rgba(79, 126, 252, 0.1)'
                          }
                        }}
                      >
                        📷 Choose Image
                      </Button>
                    </label>
                    
                    {/* AI Generation Button */}
                    <Button
                      variant="contained"
                      onClick={generateAIImage}
                      disabled={generatingImage || !formData.content.trim()}
                      sx={{
                        padding: '12px 24px',
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 600,
                        backgroundColor: '#8B6DFF',
                        color: '#ffffff',
                        '&:hover': {
                          backgroundColor: '#7C5CFF'
                        },
                        '&:disabled': {
                          backgroundColor: 'rgba(139, 109, 255, 0.3)',
                          color: 'rgba(255, 255, 255, 0.5)'
                        }
                      }}
                    >
                      {generatingImage ? (
                        <>
                          <CircularProgress size={16} sx={{ color: 'white', mr: 1 }} />
                          Generating...
                        </>
                      ) : (
                        '🎨 Generate with AI'
                      )}
                    </Button>
                  </Box>

                  <Typography variant="body2" sx={{ color: '#9CA3AF', mb: 1 }}>
                    Upload your own image or generate one using AI
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#9CA3AF', mb: 1 }}>
                    You can also drag and drop an image here
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: '#6B7280' }}>
                    Max file size: 10MB • AI generation uses your content description
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ 
                  border: '1px solid #374151',
                  borderRadius: '12px',
                  padding: '16px',
                  backgroundColor: 'rgba(26, 31, 41, 0.5)'
                }}>
                  <Box sx={{ 
                    position: 'relative',
                    display: 'inline-block',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    maxWidth: '100%'
                  }}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{
                        maxWidth: '100%',
                        maxHeight: '300px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    
                    {/* AI Generated Badge */}
                    {isAIGenerated && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          backgroundColor: 'rgba(139, 109, 255, 0.9)',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        🎨 AI
                      </Box>
                    )}
                    
                    {/* Remove Button */}
                    <Button
                      onClick={removeImage}
                      sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        minWidth: '32px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.9)'
                        }
                      }}
                    >
                      ✕
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
                    {isAIGenerated && (
                      <Chip
                        icon={<span style={{ fontSize: '12px' }}>🎨</span>}
                        label="AI Generated"
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(139, 109, 255, 0.15)',
                          color: '#8B6DFF',
                          border: '1px solid rgba(139, 109, 255, 0.3)',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      />
                    )}
                    <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                      {isAIGenerated 
                        ? 'AI-generated image ready! You can generate a new one or upload your own.'
                        : 'Image uploaded successfully! You can replace it by choosing a new image or generating with AI.'
                      }
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Platform and Tone */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Primary Platform</InputLabel>
              <Select
                value={formData.primaryPlatform}
                label="Primary Platform"
                onChange={(e) => handleInputChange('primaryPlatform', e.target.value)}
              >
                {platforms.map((platform) => (
                  <MenuItem key={platform.id} value={platform.id}>
                    <div className="flex items-center space-x-2">
                      <platform.icon />
                      <span>{platform.name}</span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tone</InputLabel>
              <Select
                value={formData.tone}
                label="Tone"
                onChange={(e) => handleInputChange('tone', e.target.value)}
              >
                {tones.map((tone) => (
                  <MenuItem key={tone} value={tone}>
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Hashtag Count */}
          <Grid item xs={12} md={6}>
            <Typography variant="body2" className="text-navy-700 mb-2">
              Number of Hashtags: {formData.hashtagCount}
            </Typography>
            <Slider
              value={formData.hashtagCount}
              onChange={(e, value) => handleInputChange('hashtagCount', value)}
              min={3}
              max={30}
              marks
              step={1}
              sx={{
                color: '#0f172a',
                '& .MuiSlider-thumb': {
                  bgcolor: '#0f172a',
                }
              }}
            />
          </Grid>

          {/* Call to Action */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Call-to-Action</InputLabel>
              <Select
                value={formData.cta}
                label="Call-to-Action"
                onChange={(e) => handleInputChange('cta', e.target.value)}
              >
                {ctaOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Custom CTA */}
          {formData.cta === 'custom' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Custom Call-to-Action"
                placeholder="Enter your custom call-to-action..."
                value={formData.customCTA}
                onChange={(e) => handleInputChange('customCTA', e.target.value)}
              />
            </Grid>
          )}

          {/* Target Audience */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Target Audience (Optional)"
              placeholder="e.g., entrepreneurs, students, professionals"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            />
          </Grid>

          {/* Include Emojis Toggle */}
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.includeEmojis}
                  onChange={(e) => handleInputChange('includeEmojis', e.target.checked)}
                  color="primary"
                />
              }
              label="Include Emojis"
              className="text-navy-700"
            />
          </Grid>
        </Grid>

        {/* Generate Button */}
        <Box className="mt-6 text-center">
          <Button
            variant="contained"
            size="large"
            onClick={generateContent}
            disabled={loading || !formData.content.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : <AIIcon />}
            className="navy-gradient px-8 py-3"
            sx={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
              }
            }}
          >
            {loading ? 'Generating...' : 'Generate Social Content'}
          </Button>
        </Box>
      </Paper>

      {/* Success Message */}
      {postSuccess && (
        <Alert 
          severity="success" 
          onClose={() => setPostSuccess('')}
          sx={{
            bgcolor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}
        >
          {postSuccess}
        </Alert>
      )}

      {/* Generated Content Display */}
      {generatedContent && (
        <Paper className="p-6 glass-card">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5" className="font-semibold text-navy-900">
              Generated Content
            </Typography>
            
            <div className="flex space-x-2">
              <Button
                variant="outlined"
                startIcon={<CopyIcon />}
                onClick={() => copyToClipboard(generatedContent.caption)}
                className="border-navy-300 text-navy-700 hover:bg-navy-50"
              >
                Copy
              </Button>
              <Button
                variant="outlined"
                startIcon={<ScheduleIcon />}
                onClick={schedulePost}
                className="border-navy-300 text-navy-700 hover:bg-navy-50"
              >
                Schedule
              </Button>
              <Button
                variant="contained"
                startIcon={<PostNowIcon />}
                onClick={postNow}
                className="primary-gradient"
                sx={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)',
                  }
                }}
              >
                Post Now
              </Button>
            </div>
          </div>

          <Grid container spacing={4}>
            {/* Left Column - Preview and Caption */}
            <Grid item xs={12} md={8}>
              {/* Platform Preview */}
              <Card className="mb-4">
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-3">
                    {platforms.find(p => p.id === formData.primaryPlatform)?.name || 'Platform'} Preview
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    padding: '20px',
                    backgroundColor: formData.primaryPlatform === 'twitter' ? '#000000' : 
                                    formData.primaryPlatform === 'reddit' ? '#1a1a1b' :
                                    formData.primaryPlatform === 'linkedin' ? '#f3f2ef' : '#f8f9fa',
                    borderRadius: '12px',
                    minHeight: '400px',
                    alignItems: 'center'
                  }}>
                    {renderPlatformPreview()}
                  </Box>
                </CardContent>
              </Card>

              {/* Caption */}
              <Card className="mb-4">
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-3">
                    Caption
                  </Typography>
                  <Typography 
                    variant="body1" 
                    className="whitespace-pre-wrap text-navy-800 leading-relaxed"
                    sx={{ fontFamily: 'monospace' }}
                  >
                    {generatedContent.caption}
                  </Typography>
                </CardContent>
              </Card>

              {/* Platform Optimizations */}
              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-3">
                    Platform Optimizations
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(generatedContent.platforms).slice(0, 4).map(([platformId, data]) => (
                      <Grid item xs={12} sm={6} key={platformId}>
                        <Paper className="p-3 bg-navy-50">
                          <Typography variant="subtitle2" className="font-semibold text-navy-900 mb-2">
                            {data.name}
                          </Typography>
                          <Typography variant="caption" className="text-navy-600 block mb-2">
                            {data.content.substring(0, 100)}...
                          </Typography>
                          <div className="flex flex-wrap gap-1">
                            {data.hashtags.slice(0, 3).map((tag, index) => (
                              <Chip key={index} label={tag} size="small" />
                            ))}
                          </div>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Hashtags and Metrics */}
            <Grid item xs={12} md={4}>
              <Card className="mb-4">
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-3">
                    Hashtags
                  </Typography>
                  <div className="flex flex-wrap gap-1">
                    {generatedContent.hashtags.map((hashtag, index) => (
                      <Chip
                        key={index}
                        label={hashtag}
                        size="small"
                        className="navy-gradient text-white mb-1"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-3">
                    Content Metrics
                  </Typography>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-navy-600">Words:</span>
                      <span className="font-semibold">{generatedContent.wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Characters:</span>
                      <span className="font-semibold">{generatedContent.characterCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Hashtags:</span>
                      <span className="font-semibold">{generatedContent.hashtags.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Platform Selection Modal */}
      <Dialog 
        open={showPlatformModal} 
        onClose={() => setShowPlatformModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" className="font-semibold text-navy-900">
            {postAction === 'now' ? 'Post Now' : 'Schedule Post'}
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body1" className="text-navy-600 mb-4">
            Select the platforms where you want to {postAction === 'now' ? 'post immediately' : 'schedule your post'}:
          </Typography>

          <Grid container spacing={2} className="mb-6">
            {platforms.map((platform) => {
              const IconComponent = platform.icon
              const isSelected = selectedPlatforms.includes(platform.id)
              
              return (
                <Grid item xs={12} sm={6} md={4} key={platform.id}>
                  <Paper 
                    className={`p-3 cursor-pointer transition-all duration-200 ${
                      isSelected ? 'bg-navy-100 border-2 border-navy-300' : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePlatformToggle(platform.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handlePlatformToggle(platform.id)}
                        color="primary"
                      />
                      <div className={`platform-icon ${platform.color}`}>
                        <IconComponent />
                      </div>
                      <Typography variant="body2" className="font-medium">
                        {platform.name}
                      </Typography>
                    </div>
                  </Paper>
                </Grid>
              )
            })}
          </Grid>

          {postAction === 'schedule' && (
            <div>
              <Divider className="my-4" />
              <Typography variant="h6" className="font-semibold text-navy-900 mb-3">
                Schedule Details
              </Typography>
              <TextField
                fullWidth
                type="datetime-local"
                label="Schedule Date & Time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          )}
        </DialogContent>
        
        <DialogActions className="p-4">
          <Button 
            onClick={() => setShowPlatformModal(false)}
            className="text-navy-600"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={executePost}
            disabled={posting || selectedPlatforms.length === 0}
            startIcon={posting ? <CircularProgress size={20} /> : <PostNowIcon />}
            className="navy-gradient"
            sx={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
              }
            }}
          >
            {posting ? 'Processing...' : (postAction === 'now' ? 'Post Now' : 'Schedule Post')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
} 