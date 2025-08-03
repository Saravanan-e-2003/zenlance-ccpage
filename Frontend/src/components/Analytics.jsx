import React, { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Tabs,
  Tab,
  LinearProgress,
  Button
} from '@mui/material'
import { Article as BlogIcon, Share as SocialIcon, Code as DocsIcon, Campaign as MarketingIcon, CheckCircle, Drafts } from '@mui/icons-material'
import { useSupabase } from './SupabaseProvider'

function getTypeIcon(type) {
  switch (type) {
    case 'blog': return <BlogIcon />
    case 'social': return <SocialIcon />
    case 'docs': return <DocsIcon />
    case 'marketing': return <MarketingIcon />
    default: return <Drafts />
  }
}

export default function History() {
  const { getContentFromLocalStorage, updateContentStatus, deleteContentFromLocalStorage } = useSupabase()
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState([])
  const [tab, setTab] = useState(0)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    setLoading(true)
    try {
      const result = getContentFromLocalStorage()
      if (result.success) setContent(result.data)
      else setContent([])
    } catch {
      setContent([])
    }
    setLoading(false)
  }

  const handlePost = async (id) => {
    const result = updateContentStatus(id, 'posted')
    if (result.success) {
      loadContent() // Reload to show updated status
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      const result = deleteContentFromLocalStorage(id)
      if (result.success) {
        loadContent() // Reload to show updated list
      }
    }
  }

  const filtered = tab === 0 ? content : content.filter(c => (tab === 1 ? c.status === 'draft' : c.status === 'posted'))

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box className="text-center py-12">
          <Typography variant="h4" className="text-navy-900 mb-4">
            Loading History...
          </Typography>
          <LinearProgress className="max-w-md mx-auto" />
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" className="apple-glass-bg apple-glass-grid" sx={{ mt: 8, mb: 8, py: { xs: 2, sm: 6 }, px: { xs: 1, sm: 4 } }}>
      <Box className="text-center mb-8">
        <Typography variant="h3" component="h1" className="gradient-text font-bold mb-2">
          History
        </Typography>
        <Typography variant="h6" className="text-navy-600 mb-4" sx={{ fontWeight: 400 }}>
          View all your generated and posted content drafts
        </Typography>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mb: 2 }}>
          <Tab label="All" />
          <Tab label="Drafts" />
          <Tab label="Posted" />
        </Tabs>
      </Box>
      {filtered.length === 0 ? (
        <Box className="text-center py-16">
          <Drafts sx={{ fontSize: 64, color: '#4F7EFC', mb: 2 }} />
          <Typography variant="h5" className="mb-2">No content yet</Typography>
          <Typography variant="body1" className="text-navy-600">Start generating content to see your history here.</Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filtered.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card className="apple-glass-card h-full">
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Box mr={2}>{getTypeIcon(item.type)}</Box>
                    <Typography variant="h6" className="font-semibold text-navy-900" sx={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title || 'Untitled'}</Typography>
                  </Box>
                  <Typography variant="body2" className="text-navy-600 mb-2">
                    {item.type ? item.type.charAt(0).toUpperCase() + item.type.slice(1) : 'Unknown'}
                    {' • '}
                    {item.status === 'posted' ? <><CheckCircle sx={{ fontSize: 16, color: '#10b981', mr: 0.5 }} />Posted</> : <><Drafts sx={{ fontSize: 16, color: '#f59e0b', mr: 0.5 }} />Draft</>}
                    {' • '}
                    {new Date(item.created_at).toLocaleString()}
                 </Typography>
                 <Typography variant="body2" sx={{ color: '#B0B8C1', minHeight: 48, mb: 1 }}>
                   {item.content ? (item.content.length > 100 ? item.content.slice(0, 100) + '...' : item.content) : 'No preview available.'}
                 </Typography>
                 <Box display="flex" gap={1} mt={2}>
                   {item.status === 'draft' && (
                     <Button 
                       size="small" 
                       variant="contained" 
                       className="apple-blue-btn"
                       onClick={() => handlePost(item.id)}
                     >
                       Post
                     </Button>
                   )}
                   <Button 
                     size="small" 
                     variant="outlined" 
                     color="error"
                     onClick={() => handleDelete(item.id)}
                   >
                     Delete
                   </Button>
                 </Box>
               </CardContent>
             </Card>
           </Grid>
         ))}
       </Grid>
     )}
   </Container>
  )
} 