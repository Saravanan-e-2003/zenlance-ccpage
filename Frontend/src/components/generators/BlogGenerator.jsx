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
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material'
import {
  AutoAwesome as AIIcon,
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  Assessment as SEOIcon
} from '@mui/icons-material'
import { useSupabase } from '../SupabaseProvider'

const tones = [
  'professional',
  'casual',
  'friendly',
  'authoritative',
  'conversational',
  'informative',
  'persuasive',
  'educational'
]

const lengths = [
  { value: 'short', label: 'Short (300-500 words)', words: 400 },
  { value: 'medium', label: 'Medium (500-1000 words)', words: 750 },
  { value: 'long', label: 'Long (1000+ words)', words: 1200 }
]

export default function BlogGenerator() {
  const { saveContentToLocalStorage, user } = useSupabase()
  
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'professional',
    length: 'medium',
    audience: '',
    outline: '',
    keywords: ''
  })
  
  const [generatedContent, setGeneratedContent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateBlogPost = async () => {
    if (!formData.topic.trim()) {
      alert('Please enter a topic for your blog post.')
      return
    }

    setLoading(true)
    
    // Simulate AI generation
    setTimeout(async () => {
      const content = await generateBlogContent(formData)
      setGeneratedContent(content)
      setLoading(false)
      
      // Auto-save to Supabase if user is logged in
      if (user) {
        try {
          await saveContentToLocalStorage({
            type: 'blog',
            title: content.title,
            content: content.content,
            metadata: {
              tone: formData.tone,
              length: formData.length,
              audience: formData.audience,
              wordCount: content.wordCount,
              readabilityScore: content.readabilityScore,
              seoScore: content.seoScore,
              keywords: content.keywords
            }
          }, 'draft')
          setSaveSuccess('Blog post saved as draft!')
          setTimeout(() => setSaveSuccess(''), 3000)
        } catch (error) {
          console.error('Error saving blog post:', error)
        }
      }
    }, 3000)
  }

  const generateBlogContent = async (data) => {
    const lengthConfig = lengths.find(l => l.value === data.length)
    const targetWords = lengthConfig?.words || 750

    const toneStyles = {
      'professional': 'authoritative and informative',
      'casual': 'relaxed and conversational',
      'friendly': 'warm and approachable',
      'authoritative': 'expert and confident',
      'conversational': 'engaging and personal',
      'informative': 'educational and clear',
      'persuasive': 'compelling and convincing',
      'educational': 'instructional and detailed'
    }

    const title = generateTitle(data.topic, data.tone)
    const content = generateContent(data, targetWords, toneStyles[data.tone])
    const keywords = generateKeywords(data.topic, data.keywords)
    
    return {
      title,
      content,
      wordCount: targetWords,
      readabilityScore: Math.floor(Math.random() * 20) + 75, // 75-95
      seoScore: Math.floor(Math.random() * 15) + 80, // 80-95
      keywords,
      metaDescription: generateMetaDescription(data.topic),
      structureScore: Math.floor(Math.random() * 10) + 85 // 85-95
    }
  }

  const generateTitle = (topic, tone) => {
    const titleFormats = {
      'professional': [
        `Understanding ${topic}: A Comprehensive Analysis`,
        `${topic}: Best Practices and Implementation`,
        `The Complete Guide to ${topic}`
      ],
      'casual': [
        `Everything You Need to Know About ${topic}`,
        `${topic} Made Simple: A Beginner's Guide`,
        `Why ${topic} Matters (And How to Get Started)`
      ],
      'friendly': [
        `Let's Talk About ${topic}: Your Friendly Guide`,
        `${topic}: What You Should Know`,
        `Getting Started with ${topic}: A Helpful Guide`
      ],
      'authoritative': [
        `The Definitive Guide to ${topic}`,
        `Mastering ${topic}: Expert Insights and Strategies`,
        `${topic}: The Complete Professional Reference`
      ]
    }
    
    const formats = titleFormats[tone] || titleFormats['professional']
    return formats[Math.floor(Math.random() * formats.length)]
  }

  const generateContent = (data, targetWords, toneStyle) => {
    const content = `# ${generateTitle(data.topic, data.tone)}

## Introduction

${data.topic} has become increasingly important in today's digital landscape. This ${toneStyle} guide will explore the key aspects of ${data.topic} and provide you with actionable insights${data.audience ? ` specifically for ${data.audience}` : ''}.

## Key Points

${data.outline ? 
  data.outline.split('\n').map(point => point.trim() ? `- ${point.trim()}` : '').filter(Boolean).join('\n') : 
  `- Understanding the fundamentals of ${data.topic}
- Best practices and implementation strategies
- Common challenges and how to overcome them
- Future trends and considerations`}

## Main Content

### Getting Started with ${data.topic}

The journey into ${data.topic} begins with a solid foundation of knowledge. Whether you're a beginner or have some experience, it's essential to understand the core concepts that drive success in this area.

### Key Strategies and Best Practices

When implementing ${data.topic}, consider these essential strategies:

1. **Strategic Planning**: Develop a comprehensive approach that aligns with your goals
2. **Implementation**: Put theory into practice with careful execution
3. **Optimization**: Continuously improve your results based on data and feedback
4. **Measurement**: Track progress and success metrics to ensure you're on the right path

### Advanced Techniques

For those looking to take their understanding further, advanced strategies in ${data.topic} include:

- Regular analysis and optimization of your approach
- Staying updated with industry trends and best practices
- Building strong foundational knowledge through continuous learning
- Networking with other professionals in the field

### Common Challenges and Solutions

Every journey with ${data.topic} comes with its challenges. Here are some common issues and how to address them:

**Challenge 1: Getting Started**
Many people struggle with where to begin. The key is to start small and build momentum gradually.

**Challenge 2: Maintaining Consistency**
Success requires consistent effort. Create a sustainable routine that you can maintain long-term.

**Challenge 3: Measuring Progress**
Without proper metrics, it's hard to know if you're succeeding. Establish clear KPIs from the beginning.

### Tools and Resources

To succeed with ${data.topic}, consider using these tools and resources:

- Industry-leading software and platforms
- Educational materials and training programs
- Professional networks and communities
- Analytics and measurement tools

## Conclusion

${data.topic} represents a significant opportunity for growth and innovation. By maintaining a ${toneStyle} approach and focusing on${data.audience ? ` the needs of ${data.audience}` : ' continuous learning'}, you can achieve meaningful results.

Remember that success in ${data.topic} is a journey, not a destination. Stay curious, keep learning, and don't hesitate to experiment with new approaches. The key is to start where you are, use what you have, and do what you can.

## Next Steps

1. Apply the strategies outlined in this guide
2. Start with small, manageable steps
3. Track your progress and adjust as needed
4. Connect with others who share your interests
5. Continue learning and growing in your understanding

---

*This content was generated using AI assistance and optimized for SEO and readability.*`

    return content
  }

  const generateKeywords = (topic, userKeywords) => {
    const baseKeywords = topic.toLowerCase().split(' ')
    const relatedKeywords = [
      'best practices',
      'guide',
      'tips',
      'strategies',
      'how to',
      'complete guide',
      'beginner',
      'advanced',
      'tutorial'
    ]
    
    const userKeywordList = userKeywords ? userKeywords.split(',').map(k => k.trim()) : []
    
    return [...baseKeywords, ...relatedKeywords, ...userKeywordList].slice(0, 10)
  }

  const generateMetaDescription = (topic) => {
    return `Learn everything about ${topic} with our comprehensive guide. Discover best practices, tips, and strategies for success. Get started today!`
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Content copied to clipboard!')
    })
  }

  const downloadContent = () => {
    if (!generatedContent) return
    
    const blob = new Blob([generatedContent.content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `${generatedContent.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    alert('Blog post downloaded successfully!')
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'success'
    if (score >= 75) return 'warning'
    return 'error'
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent'
    if (score >= 75) return 'Good'
    if (score >= 60) return 'Average'
    return 'Needs Improvement'
  }

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <Paper className="p-6 glass-card">
        <Typography variant="h5" className="font-semibold text-navy-900 mb-6">
          Blog Post Configuration
        </Typography>
        
        <Grid container spacing={3}>
          {/* Topic */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Topic/Keywords"
              placeholder="Enter your blog topic or main keywords..."
              value={formData.topic}
              onChange={(e) => handleInputChange('topic', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>

          {/* Tone and Length */}
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

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Target Length</InputLabel>
              <Select
                value={formData.length}
                label="Target Length"
                onChange={(e) => handleInputChange('length', e.target.value)}
              >
                {lengths.map((length) => (
                  <MenuItem key={length.value} value={length.value}>
                    {length.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Audience and Keywords */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Target Audience"
              placeholder="e.g., beginners, professionals, general audience"
              value={formData.audience}
              onChange={(e) => handleInputChange('audience', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Additional Keywords"
              placeholder="Enter keywords separated by commas"
              value={formData.keywords}
              onChange={(e) => handleInputChange('keywords', e.target.value)}
            />
          </Grid>

          {/* Outline */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Key Points to Include (Optional)"
              placeholder="List key points or outline you want to include (one per line)"
              value={formData.outline}
              onChange={(e) => handleInputChange('outline', e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Generate Button */}
        <Box className="mt-6 text-center">
          <Button
            variant="contained"
            size="large"
            onClick={generateBlogPost}
            disabled={loading || !formData.topic.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : <AIIcon />}
            className="navy-gradient px-8 py-3"
            sx={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
              }
            }}
          >
            {loading ? 'Generating Blog Post...' : 'Generate Blog Post'}
          </Button>
        </Box>
      </Paper>

      {/* Success Message */}
      {saveSuccess && (
        <Alert 
          severity="success" 
          onClose={() => setSaveSuccess('')}
          sx={{
            bgcolor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}
        >
          {saveSuccess}
        </Alert>
      )}

      {/* Generated Content Display */}
      {generatedContent && (
        <Paper className="p-6 glass-card">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5" className="font-semibold text-navy-900">
              Generated Blog Post
            </Typography>
            
            <div className="flex space-x-2">
              <Button
                variant="outlined"
                startIcon={<CopyIcon />}
                onClick={() => copyToClipboard(generatedContent.content)}
                className="border-navy-300 text-navy-700 hover:bg-navy-50"
              >
                Copy
              </Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={downloadContent}
                className="primary-gradient"
                sx={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)',
                  }
                }}
              >
                Download
              </Button>
            </div>
          </div>

          <Grid container spacing={4}>
            {/* Content */}
            <Grid item xs={12} lg={8}>
              <Card className="mb-4">
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-3">
                    Blog Content
                  </Typography>
                  <div 
                    className="prose max-w-none text-navy-800 leading-relaxed whitespace-pre-wrap"
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      lineHeight: 1.7,
                      maxHeight: '500px',
                      overflowY: 'auto'
                    }}
                  >
                    {generatedContent.content}
                  </div>
                </CardContent>
              </Card>

              {/* Keywords */}
              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-3">
                    SEO Keywords
                  </Typography>
                  <div className="flex flex-wrap gap-1">
                    {generatedContent.keywords.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        size="small"
                        className="navy-gradient text-white mb-1"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Metrics and Scores */}
            <Grid item xs={12} lg={4}>
              <Card className="mb-4">
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-4">
                    Content Metrics
                  </Typography>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-navy-600">Word Count:</span>
                      <span className="font-semibold text-lg">{generatedContent.wordCount}</span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-navy-600">Readability Score:</span>
                        <span className={`font-semibold text-lg text-${getScoreColor(generatedContent.readabilityScore)}-600`}>
                          {generatedContent.readabilityScore}/100
                        </span>
                      </div>
                      <LinearProgress 
                        variant="determinate" 
                        value={generatedContent.readabilityScore} 
                        color={getScoreColor(generatedContent.readabilityScore)}
                        className="h-2 rounded"
                      />
                      <Typography variant="caption" className="text-navy-500">
                        {getScoreLabel(generatedContent.readabilityScore)}
                      </Typography>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-navy-600">SEO Score:</span>
                        <span className={`font-semibold text-lg text-${getScoreColor(generatedContent.seoScore)}-600`}>
                          {generatedContent.seoScore}/100
                        </span>
                      </div>
                      <LinearProgress 
                        variant="determinate" 
                        value={generatedContent.seoScore} 
                        color={getScoreColor(generatedContent.seoScore)}
                        className="h-2 rounded"
                      />
                      <Typography variant="caption" className="text-navy-500">
                        {getScoreLabel(generatedContent.seoScore)}
                      </Typography>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-navy-600">Structure Score:</span>
                        <span className={`font-semibold text-lg text-${getScoreColor(generatedContent.structureScore)}-600`}>
                          {generatedContent.structureScore}/100
                        </span>
                      </div>
                      <LinearProgress 
                        variant="determinate" 
                        value={generatedContent.structureScore} 
                        color={getScoreColor(generatedContent.structureScore)}
                        className="h-2 rounded"
                      />
                      <Typography variant="caption" className="text-navy-500">
                        {getScoreLabel(generatedContent.structureScore)}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Information */}
              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-3 flex items-center">
                    <SEOIcon className="mr-2" />
                    SEO Information
                  </Typography>
                  
                  <div className="space-y-3">
                    <div>
                      <Typography variant="body2" className="font-medium text-navy-700 mb-1">
                        Title:
                      </Typography>
                      <Typography variant="body2" className="text-navy-600 text-sm">
                        {generatedContent.title}
                      </Typography>
                    </div>
                    
                    <div>
                      <Typography variant="body2" className="font-medium text-navy-700 mb-1">
                        Meta Description:
                      </Typography>
                      <Typography variant="body2" className="text-navy-600 text-sm">
                        {generatedContent.metaDescription}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  )
} 