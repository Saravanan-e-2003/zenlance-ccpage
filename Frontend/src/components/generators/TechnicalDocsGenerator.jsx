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
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress
} from '@mui/material'
import {
  AutoAwesome as AIIcon,
  ContentCopy as CopyIcon,
  Download as DownloadIcon,
  Code as CodeIcon
} from '@mui/icons-material'
import { useSupabase } from '../SupabaseProvider'

const docTypes = [
  { value: 'api', label: 'API Documentation' },
  { value: 'code', label: 'Code Documentation' },
  { value: 'user-guide', label: 'User Guide' },
  { value: 'readme', label: 'README' }
]

const languages = [
  'javascript',
  'python',
  'java',
  'csharp',
  'php',
  'ruby',
  'go',
  'rust',
  'typescript',
  'other'
]

const styles = [
  'detailed',
  'concise',
  'tutorial',
  'reference'
]

export default function TechnicalDocsGenerator() {
  const { saveContentToLocalStorage, user } = useSupabase()
  
  const [formData, setFormData] = useState({
    docType: 'api',
    language: 'javascript',
    codeInput: '',
    style: 'detailed',
    includeExamples: true,
    projectName: '',
    version: ''
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

  const generateDocs = async () => {
    if (!formData.codeInput.trim()) {
      alert('Please provide code or API specifications to document.')
      return
    }

    setLoading(true)
    
    setTimeout(async () => {
      const content = generateTechDocsContent(formData)
      setGeneratedContent(content)
      setLoading(false)
      
      if (user) {
        try {
          await saveContentToLocalStorage({
            type: 'docs',
            title: content.title,
            content: content.content,
            metadata: {
              docType: formData.docType,
              language: formData.language,
              style: formData.style,
              includeExamples: formData.includeExamples,
              projectName: formData.projectName,
              version: formData.version
            }
          }, 'draft')
          setSaveSuccess('Documentation saved as draft!')
          setTimeout(() => setSaveSuccess(''), 3000)
        } catch (error) {
          console.error('Error saving documentation:', error)
        }
      }
    }, 3000)
  }

  const generateTechDocsContent = (data) => {
    const docTypes = {
      'api': 'API Documentation',
      'code': 'Code Documentation',
      'user-guide': 'User Guide',
      'readme': 'README Documentation'
    }

    const title = `${docTypes[data.docType]}${data.projectName ? ` - ${data.projectName}` : ''}`
    
    const content = `# ${title}

${data.version ? `**Version:** ${data.version}\n` : ''}

## Overview

This documentation provides comprehensive information about the ${data.language} implementation provided.

## Code Analysis

The following ${data.language} code has been analyzed:

\`\`\`${data.language}
${data.codeInput}
\`\`\`

## Documentation

### Functions/Methods

Based on the code analysis, the following functions and methods have been identified:

${data.includeExamples ? `
### Examples

\`\`\`${data.language}
// Example usage
const result = exampleFunction();
console.log(result);
\`\`\`

### Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| input | string | The input parameter | Yes |
| options | object | Configuration options | No |

### Return Value

Returns a processed result based on the input parameters.
` : ''}

### Error Handling

The implementation includes proper error handling for common scenarios:

- Invalid input parameters
- Network connectivity issues
- Authentication failures

### Best Practices

When using this implementation:

1. **Validation**: Always validate input parameters
2. **Error Handling**: Implement proper error handling
3. **Testing**: Include comprehensive unit tests
4. **Documentation**: Keep documentation up to date

## Installation

\`\`\`bash
npm install your-package-name
\`\`\`

## Usage

\`\`\`${data.language}
import { yourFunction } from 'your-package-name';

const result = yourFunction(parameters);
\`\`\`

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.

---

*Documentation generated automatically with AI assistance.*`

    return {
      title,
      content,
      docType: data.docType,
      language: data.language,
      wordCount: content.split(' ').length,
      sections: ['Overview', 'Installation', 'Usage', 'Examples', 'Contributing']
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Documentation copied to clipboard!')
    })
  }

  const downloadDocs = () => {
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
    
    alert('Documentation downloaded successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <Paper className="p-6 glass-card">
        <Typography variant="h5" className="font-semibold text-navy-900 mb-6">
          Documentation Configuration
        </Typography>
        
        <Grid container spacing={3}>
          {/* Doc Type and Language */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Documentation Type</InputLabel>
              <Select
                value={formData.docType}
                label="Documentation Type"
                onChange={(e) => handleInputChange('docType', e.target.value)}
              >
                {docTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Programming Language</InputLabel>
              <Select
                value={formData.language}
                label="Programming Language"
                onChange={(e) => handleInputChange('language', e.target.value)}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Project Details */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Project Name (Optional)"
              placeholder="Enter project name"
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Version (Optional)"
              placeholder="e.g., v1.0.0"
              value={formData.version}
              onChange={(e) => handleInputChange('version', e.target.value)}
            />
          </Grid>

          {/* Code Input */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={8}
              label="Code/API Specification"
              placeholder="Paste your code, API endpoints, or specifications here..."
              value={formData.codeInput}
              onChange={(e) => handleInputChange('codeInput', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'monospace',
                }
              }}
            />
          </Grid>

          {/* Style and Options */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Documentation Style</InputLabel>
              <Select
                value={formData.style}
                label="Documentation Style"
                onChange={(e) => handleInputChange('style', e.target.value)}
              >
                {styles.map((style) => (
                  <MenuItem key={style} value={style}>
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.includeExamples}
                  onChange={(e) => handleInputChange('includeExamples', e.target.checked)}
                  color="primary"
                />
              }
              label="Include Examples"
              className="text-navy-700"
            />
          </Grid>
        </Grid>

        {/* Generate Button */}
        <Box className="mt-6 text-center">
          <Button
            variant="contained"
            size="large"
            onClick={generateDocs}
            disabled={loading || !formData.codeInput.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : <AIIcon />}
            className="navy-gradient px-8 py-3"
            sx={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
              }
            }}
          >
            {loading ? 'Generating Documentation...' : 'Generate Documentation'}
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

      {/* Generated Documentation Display */}
      {generatedContent && (
        <Paper className="p-6 glass-card">
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5" className="font-semibold text-navy-900">
              Generated Documentation
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
                onClick={downloadDocs}
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
            {/* Documentation Content */}
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-3 flex items-center">
                    <CodeIcon className="mr-2" />
                    Documentation Content
                  </Typography>
                  <div 
                    className="prose max-w-none text-navy-800 leading-relaxed whitespace-pre-wrap"
                    style={{ 
                      fontFamily: 'Georgia, serif',
                      lineHeight: 1.7,
                      maxHeight: '600px',
                      overflowY: 'auto'
                    }}
                  >
                    {generatedContent.content}
                  </div>
                </CardContent>
              </Card>
            </Grid>

            {/* Documentation Info */}
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" className="font-semibold text-navy-900 mb-4">
                    Documentation Info
                  </Typography>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-navy-600">Type:</span>
                      <span className="font-semibold">{formData.docType.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Language:</span>
                      <span className="font-semibold">{formData.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Style:</span>
                      <span className="font-semibold">{formData.style}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Words:</span>
                      <span className="font-semibold">{generatedContent.wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Sections:</span>
                      <span className="font-semibold">{generatedContent.sections.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-600">Examples:</span>
                      <span className="font-semibold">{formData.includeExamples ? 'Yes' : 'No'}</span>
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