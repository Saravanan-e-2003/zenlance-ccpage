import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Container
} from '@mui/material'
import {
  Article as BlogIcon,
  Share as SocialIcon,
  Code as DocsIcon,
  Campaign as MarketingIcon,
  AutoAwesome as AIIcon
} from '@mui/icons-material'

const templates = [
  {
    id: 'blog-post',
    title: 'Blog Post Generator',
    description: 'Create engaging blog posts with SEO optimization and custom tone matching',
    icon: BlogIcon,
    features: ['SEO Optimized', 'Custom Tone', 'Readability Score'],
    gradient: 'from-blue-500 to-purple-600',
    color: 'primary'
  },
  {
    id: 'social-media',
    title: 'Social Media Scheduler',
    description: 'Generate captions, hashtags and schedule posts across multiple platforms',
    icon: SocialIcon,
    features: ['Auto Hashtags', 'Multi-Platform', 'Scheduling', 'Post Now'],
    gradient: 'from-pink-500 to-rose-600',
    color: 'secondary'
  },
  {
    id: 'technical-docs',
    title: 'Technical Documentation',
    description: 'Generate documentation from code comments and API specifications',
    icon: DocsIcon,
    features: ['Code Analysis', 'API Docs', 'Auto-Format'],
    gradient: 'from-green-500 to-teal-600',
    color: 'success'
  },
  {
    id: 'marketing-copy',
    title: 'Marketing Copy',
    description: 'Create compelling marketing content for ads, emails, and landing pages',
    icon: MarketingIcon,
    features: ['A/B Testing', 'Conversion Focus', 'Brand Voice'],
    gradient: 'from-orange-500 to-red-600',
    color: 'warning'
  }
]

export default function TemplateSelection({ onTemplateSelect }) {
  return (
    <Container maxWidth="lg" className="apple-glass-bg apple-glass-grid" sx={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      mt: 8,
      mb: 8,
      px: { xs: 1, sm: 4 },
      py: { xs: 2, sm: 6 },
    }}>
      {/* Header Section */}
      <Box className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="navy-gradient rounded-full p-4 inline-flex">
            <AIIcon className="text-white text-4xl" />
          </div>
        </div>
        <Typography 
          variant="h2" 
          component="h1" 
          className="gradient-text font-bold mb-4 text-shadow-lg"
          sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
        >
          Choose Your Content Template
        </Typography>
        <Typography 
          variant="h6" 
          className="text-navy-600 max-w-2xl mx-auto"
          sx={{ fontWeight: 400 }}
        >
          Select a template to get started with AI-powered content generation. 
          Each template is optimized for specific content types and platforms.
        </Typography>
      </Box>

      {/* Template Grid */}
      <Grid container spacing={4}>
        {templates.map((template) => {
          const IconComponent = template.icon
          
          return (
            <Grid item xs={12} sm={6} lg={3} key={template.id}>
              <Card 
                className="apple-glass-card h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                  }
                }}
                onClick={() => onTemplateSelect(template.id)}
              >
                {/* Card Header with Icon */}
                <Box className="relative">
                  <div className={`bg-gradient-to-br ${template.gradient} h-2`} />
                  <CardContent className="pt-6" sx={{ position: 'relative', zIndex: 1 }}>
                    <div className="flex justify-center mb-4">
                      <div className="navy-gradient w-16 h-16 rounded-xl flex items-center justify-center" style={{boxShadow: '0 2px 12px 0 rgba(80,120,255,0.18)'}}>
                        <IconComponent className="text-white text-2xl" />
                      </div>
                    </div>
                    
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      className="font-semibold text-navy-900 text-center mb-3"
                      sx={{ color: '#E5E7EB', textShadow: '0 2px 8px rgba(80,120,255,0.10)' }}
                    >
                      {template.title}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      className="text-navy-600 text-center mb-4 leading-relaxed"
                      sx={{ color: '#B0B8C1' }}
                    >
                      {template.description}
                    </Typography>
                    
                    {/* Feature Tags */}
                    <Box className="flex flex-wrap gap-2 justify-center mb-4">
                      {template.features.map((feature) => (
                        <Chip
                          key={feature}
                          label={feature}
                          size="small"
                          className="text-xs"
                          sx={{
                            bgcolor: 'rgba(80,120,255,0.08)',
                            color: '#B0B8C1',
                            fontWeight: 500,
                            border: '1px solid rgba(120, 140, 255, 0.10)',
                            borderRadius: '8px',
                            '&:hover': {
                              bgcolor: 'rgba(80,120,255,0.16)',
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Box>

                {/* Card Actions */}
                <CardActions className="mt-auto p-4 pt-0" sx={{ zIndex: 1 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    className="apple-blue-btn navy-gradient text-white font-medium py-3 rounded-lg transition-all duration-300"
                    sx={{
                      width: '100%',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      letterSpacing: '0.01em',
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onTemplateSelect(template.id)
                    }}
                  >
                    Select Template
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {/* Additional Features Section */}
      <Box className="mt-16" sx={{ zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div className="text-center">
              <div className="primary-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <AIIcon className="text-white text-xl" />
              </div>
              <Typography variant="h6" className="font-semibold text-navy-900 mb-2">
                AI-Powered Generation
              </Typography>
              <Typography variant="body2" className="text-navy-600">
                Advanced AI algorithms create high-quality, original content tailored to your needs
              </Typography>
            </div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <div className="text-center">
              <div className="primary-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <SocialIcon className="text-white text-xl" />
              </div>
              <Typography variant="h6" className="font-semibold text-navy-900 mb-2">
                Multi-Platform Support
              </Typography>
              <Typography variant="body2" className="text-navy-600">
                Optimize content for Instagram, Twitter, LinkedIn, Facebook, and more platforms
              </Typography>
            </div>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <div className="text-center">
              <div className="primary-gradient w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BlogIcon className="text-white text-xl" />
              </div>
              <Typography variant="h6" className="font-semibold text-navy-900 mb-2">
                SEO Optimization
              </Typography>
              <Typography variant="body2" className="text-navy-600">
                Built-in SEO analysis ensures your content ranks well in search engines
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
} 