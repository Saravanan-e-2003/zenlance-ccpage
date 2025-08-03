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
  Alert,
  CircularProgress,
  Chip
} from '@mui/material'
import {
  AutoAwesome as AIIcon,
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  TrendingUp as MarketingIcon
} from '@mui/icons-material'
import { useSupabase } from '../SupabaseProvider'

const copyTypes = [
  { value: 'ad', label: 'Advertisement Copy' },
  { value: 'email', label: 'Email Marketing' },
  { value: 'landing', label: 'Landing Page' },
  { value: 'social-ad', label: 'Social Media Ad' },
  { value: 'product', label: 'Product Description' }
]

const tones = [
  'persuasive',
  'urgent',
  'friendly',
  'professional',
  'exciting',
  'trustworthy',
  'casual',
  'authoritative'
]

const objectives = [
  'increase-sales',
  'generate-leads',
  'brand-awareness',
  'drive-traffic',
  'promote-event',
  'customer-retention'
]

export default function MarketingCopyGenerator() {
  const { saveContentToLocalStorage, user } = useSupabase()
  
  const [formData, setFormData] = useState({
    copyType: 'ad',
    product: '',
    targetAudience: '',
    tone: 'persuasive',
    objective: 'increase-sales',
    keyBenefits: '',
    callToAction: '',
    budget: '',
    constraints: ''
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

  const generateMarketingCopy = async () => {
    if (!formData.product.trim()) {
      alert('Please enter a product or service to create marketing copy for.')
      return
    }

    setLoading(true)
    
    setTimeout(async () => {
      const content = generateCopyContent(formData)
      setGeneratedContent(content)
      setLoading(false)
      
      if (user) {
        try {
          await saveContentToLocalStorage({
            type: 'marketing',
            title: content.title,
            content: content.content,
            metadata: {
              copyType: formData.copyType,
              tone: formData.tone,
              objective: formData.objective,
              targetAudience: formData.targetAudience,
              wordCount: content.wordCount,
              conversionScore: content.conversionScore
            }
          }, 'draft')
          setSaveSuccess('Marketing copy saved as draft!')
          setTimeout(() => setSaveSuccess(''), 3000)
        } catch (error) {
          console.error('Error saving marketing copy:', error)
        }
      }
    }, 2500)
  }

  const generateCopyContent = (data) => {
    const copyTypeLabels = {
      'ad': 'Advertisement',
      'email': 'Email Marketing Campaign',
      'landing': 'Landing Page Copy',
      'social-ad': 'Social Media Advertisement',
      'product': 'Product Description'
    }

    const title = `${copyTypeLabels[data.copyType]} - ${data.product}`
    
    let content = ''
    
    switch (data.copyType) {
      case 'ad':
        content = generateAdCopy(data)
        break
      case 'email':
        content = generateEmailCopy(data)
        break
      case 'landing':
        content = generateLandingPageCopy(data)
        break
      case 'social-ad':
        content = generateSocialAdCopy(data)
        break
      case 'product':
        content = generateProductDescription(data)
        break
      default:
        content = generateAdCopy(data)
    }

    return {
      title,
      content,
      copyType: data.copyType,
      wordCount: content.split(' ').length,
      conversionScore: Math.floor(Math.random() * 20) + 75,
      engagementScore: Math.floor(Math.random() * 15) + 80,
      suggestions: generateOptimizationSuggestions(data)
    }
  }

  const generateAdCopy = (data) => {
    const urgencyWords = data.tone === 'urgent' ? 'Do not wait! Limited time offer!' : ''
    
    return `🚀 Discover ${data.product} - Transform Your ${data.targetAudience ? data.targetAudience : 'Business'} Today!

${data.keyBenefits ? `✅ ${data.keyBenefits.split(',').map(b => b.trim()).join('\n✅ ')}` : `✅ Proven results
✅ Easy to use
✅ Expert support`}

${urgencyWords}

${data.callToAction || 'Get Started Now'} 👆

#${data.product.replace(/\s+/g, '')} #Marketing #Growth`
  }

  const generateEmailCopy = (data) => {
    return `Subject: ${data.tone === 'urgent' ? '⚡ Last Chance:' : '🌟'} ${data.product} is Here!

Hi there!

${data.targetAudience ? `As a ${data.targetAudience}` : 'We know you are busy'}, you deserve solutions that actually work.

That is why we are excited to introduce ${data.product}.

${data.keyBenefits ? `Here is what makes it special:
${data.keyBenefits.split(',').map(b => `• ${b.trim()}`).join('\n')}` : `Here is what makes it special:
• Saves you time and money
• Easy implementation
• Proven results`}

${data.tone === 'urgent' ? 'This offer expires soon.' : 'Ready to get started?'}

${data.callToAction || 'Click here to learn more'} →

Best regards,
The Team

P.S. ${data.tone === 'urgent' ? 'Only 24 hours left!' : 'Questions? Just reply to this email.'}`
  }

  const generateLandingPageCopy = (data) => {
    return `# ${data.product}: The Solution You've Been Looking For

## Transform Your ${data.targetAudience ? data.targetAudience.charAt(0).toUpperCase() + data.targetAudience.slice(1) : 'Business'} Today

${data.keyBenefits ? `### Why Choose ${data.product}?

${data.keyBenefits.split(',').map(b => `**${b.trim()}** - Experience the difference that quality makes.`).join('\n\n')}` : `### Why Choose ${data.product}?

**Proven Results** - Join thousands of satisfied customers.

**Easy to Use** - Get started in minutes, not hours.

**Expert Support** - Our team is here to help you succeed.`}

### Ready to Get Started?

${data.tone === 'urgent' ? '⚡ Limited Time Offer - Act Now!' : '🚀 Join the Success Story'}

${data.callToAction || 'Start Your Free Trial Today'}

*${data.constraints || 'No credit card required. Cancel anytime.'}*

---

💡 Still have questions? Contact our support team 24/7.`
  }

  const generateSocialAdCopy = (data) => {
    return `🎯 ${data.targetAudience ? data.targetAudience.charAt(0).toUpperCase() + data.targetAudience.slice(1) : 'Everyone'} is talking about ${data.product}!

${data.keyBenefits ? `Here is why:
${data.keyBenefits.split(',').map(b => `🔥 ${b.trim()}`).join('\n')}` : `Here is why:
🔥 Game-changing results
🔥 Easy to implement
🔥 Trusted by experts`}

${data.tone === 'urgent' ? '⏰ Limited spots available!' : '✨ Ready to join them?'}

👆 ${data.callToAction || 'Learn More'}`
  }

  const generateProductDescription = (data) => {
    return `## ${data.product}

${data.keyBenefits ? `**Key Features:**
${data.keyBenefits.split(',').map(b => `• ${b.trim()}`).join('\n')}` : `**Key Features:**
• Premium quality materials
• User-friendly design
• Excellent customer support`}

**Perfect for:** ${data.targetAudience || 'Anyone looking for quality and reliability'}

**What is Included:**
• Complete ${data.product}
• User manual and setup guide
• 30-day money-back guarantee
• Free customer support

${data.tone === 'urgent' ? '🔥 **Limited Time:** Special pricing available now!' : '💡 **Pro Tip:** Order now for fastest delivery!'}

${data.callToAction || 'Add to Cart'}`
  }

  const generateOptimizationSuggestions = (data) => {
    const suggestions = [
      'Consider A/B testing different headlines',
      'Add social proof and testimonials',
      'Include urgency indicators if appropriate',
      'Optimize call-to-action placement',
      'Test different value propositions'
    ]

    if (data.tone === 'urgent') {
      suggestions.push('Add countdown timers for urgency')
    }
    
    if (data.copyType === 'email') {
      suggestions.push('Test subject line variations')
    }

    return suggestions.slice(0, 3)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Marketing copy copied to clipboard!')
    })
  }

  const downloadCopy = () => {
    if (!generatedContent) return
    
    const blob = new Blob([generatedContent.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `${generatedContent.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    alert('Marketing copy downloaded successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <Paper className="p-6 glass-card">
        <Typography variant="h5" className="font-semibold text-navy-900 mb-6">
          Marketing Copy Configuration
        </Typography>
        
        <Grid container spacing={3}>
          {/* Copy Type and Tone */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Copy Type</InputLabel>
              <Select
                value={formData.copyType}
                label="Copy Type"
                onChange={(e) => handleInputChange('copyType', e.target.value)}
              >
                {copyTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
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

          {/* Product and Audience */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product/Service"
              placeholder="Enter your product or service name"
              value={formData.product}
              onChange={(e) => handleInputChange('product', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Target Audience"
              placeholder="e.g., small business owners, fitness enthusiasts"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
            />
          </Grid>

          {/* Objective and CTA */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Marketing Objective</InputLabel>
              <Select
                value={formData.objective}
                label="Marketing Objective"
                onChange={(e) => handleInputChange('objective', e.target.value)}
              >
                {objectives.map((obj) => (
                  <MenuItem key={obj} value={obj}>
                    {obj.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Call-to-Action"
              placeholder="e.g., Shop Now, Get Started, Learn More"
              value={formData.callToAction}
              onChange={(e) => handleInputChange('callToAction', e.target.value)}
            />
          </Grid>

          {/* Key Benefits */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Key Benefits"
              placeholder="List key benefits separated by commas"
              value={formData.keyBenefits}
              onChange={(e) => handleInputChange('keyBenefits', e.target.value)}
            />
          </Grid>

          {/* Constraints */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Additional Notes/Constraints"
              placeholder="Any specific requirements, limitations, or notes"
              value={formData.constraints}
              onChange={(e) => handleInputChange('constraints', e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Generate Button */}
        <Box className="mt-6 text-center">
          <Button
            variant="contained"
            size="large"
            onClick={generateMarketingCopy}
            disabled={loading || !formData.product.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : <AIIcon />}
            className="navy-gradient px-8 py-3"
            sx={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
              }
            }}
          >
            {loading ? 'Generating Copy...' : 'Generate Marketing Copy'}
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

      {/* Generated Copy Display */}
      {generatedContent && (
        <Paper className="p-6 glass-card">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5" className="font-semibold text-navy-900">
              Generated Marketing Copy
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
                onClick={downloadCopy}
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
            {/* Marketing Copy Content */}
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-3 flex items-center">
                    <MarketingIcon className="mr-2" />
                    Marketing Copy
                  </Typography>
                  <div 
                    className="prose max-w-none text-navy-800 leading-relaxed whitespace-pre-wrap"
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      lineHeight: 1.7,
                      padding: '1rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0'
                    }}
                  >
                    {generatedContent.content}
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Copy Metrics and Suggestions */}
            <Grid item xs={12} lg={4}>
              <Card className="mb-4">
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-4">
                    Copy Metrics
                  </Typography>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-navy-600">Word Count:</span>
                      <span className="font-semibold">{generatedContent.wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Conversion Score:</span>
                      <span className="font-semibold text-green-600">{generatedContent.conversionScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Engagement Score:</span>
                      <span className="font-semibold text-blue-600">{generatedContent.engagementScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Copy Type:</span>
                      <span className="font-semibold">{formData.copyType.toUpperCase()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-3">
                    Optimization Suggestions
                  </Typography>
                  
                  <div className="space-y-2">
                    {generatedContent.suggestions.map((suggestion, index) => (
                      <Chip
                        key={index}
                        label={suggestion}
                        size="small"
                        className="w-full h-auto p-2 text-xs leading-relaxed"
                        sx={{
                          bgcolor: 'rgba(15, 23, 42, 0.1)',
                          color: '#0f172a',
                          fontWeight: 400,
                          justifyContent: 'flex-start',
                          '& .MuiChip-label': {
                            whiteSpace: 'normal',
                            textAlign: 'left'
                          }
                        }}
                      />
                    ))}
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