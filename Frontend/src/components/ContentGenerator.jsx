import React, { useState, useEffect } from 'react'
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert
} from '@mui/material'

// Import individual generators
import BlogGenerator from './generators/BlogGenerator'
import SocialMediaGenerator from './generators/SocialMediaGenerator'
import TechnicalDocsGenerator from './generators/TechnicalDocsGenerator'
import MarketingCopyGenerator from './generators/MarketingCopyGenerator'

const generators = {
  'blog-post': {
    component: BlogGenerator,
    title: 'Blog Post Generator',
    description: 'Create engaging blog posts with AI assistance'
  },
  'social-media': {
    component: SocialMediaGenerator,
    title: 'Social Media Content Scheduler',
    description: 'Generate engaging social media content with AI-powered captions and hashtags'
  },
  'technical-docs': {
    component: TechnicalDocsGenerator,
    title: 'Technical Documentation Generator',
    description: 'Generate comprehensive documentation from code comments and API specifications'
  },
  'marketing-copy': {
    component: MarketingCopyGenerator,
    title: 'Marketing Copy Generator',
    description: 'Create compelling marketing content for ads, emails, and landing pages'
  }
}

export default function ContentGenerator({ selectedTemplate }) {
  const [currentGenerator, setCurrentGenerator] = useState(null)

  useEffect(() => {
    if (selectedTemplate && generators[selectedTemplate]) {
      setCurrentGenerator(selectedTemplate)
    }
  }, [selectedTemplate])

  if (!currentGenerator) {
    return (
      <Container maxWidth="lg">
        <Paper className="p-8 text-center glass-card">
          <Typography variant="h4" className="text-navy-900 mb-4">
            Select a Template to Get Started
          </Typography>
          <Typography variant="body1" className="text-navy-600">
            Choose a content template from the Templates tab to begin generating AI-powered content.
          </Typography>
        </Paper>
      </Container>
    )
  }

  const generator = generators[currentGenerator]
  const GeneratorComponent = generator.component

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box className="text-center mb-8">
        <Typography 
          variant="h3" 
          component="h1" 
          className="gradient-text font-bold mb-2"
        >
          {generator.title}
        </Typography>
        <Typography 
          variant="h6" 
          className="text-navy-600"
          sx={{ fontWeight: 400 }}
        >
          {generator.description}
        </Typography>
      </Box>

      {/* Template Change Alert */}
      {selectedTemplate && (
        <Alert 
          severity="info" 
          className="mb-6"
          sx={{
            bgcolor: 'rgba(14, 165, 233, 0.1)',
            border: '1px solid rgba(14, 165, 233, 0.2)',
            '& .MuiAlert-icon': {
              color: '#0ea5e9'
            }
          }}
        >
          You're now using the <strong>{generator.title}</strong>. 
          Switch templates anytime from the Templates tab.
        </Alert>
      )}

      {/* Generator Component */}
      <GeneratorComponent />
    </Container>
  )
} 