import React, { useState } from 'react'
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Tabs, 
  Tab, 
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { 
  Psychology as BrainIcon,
  ViewModule as TemplateIcon,
  Create as GenerateIcon,
  Analytics as AnalyticsIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material'

// Import components
import TemplateSelection from './components/TemplateSelection'
import ContentGenerator from './components/ContentGenerator'
import Analytics from './components/Analytics'
import SupabaseProvider, { useSupabase } from './components/SupabaseProvider'
import AuthModal from './components/AuthModal'

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

function AppContent() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const { user, signOut } = useSupabase()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setActiveTab(1) // Switch to content generator tab
  }

  const handleAuthClick = () => {
    if (user) {
      signOut()
    } else {
      setAuthModalOpen(true)
    }
  }

  const handleMobileMenuToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen)
  }

  const handleMobileTabChange = (newValue) => {
    setActiveTab(newValue)
    setMobileDrawerOpen(false)
  }

  return (
      <div className="min-h-screen" style={{ backgroundColor: '#0F1419' }}>
        {/* Header */}
        <AppBar 
          position="sticky" 
          className="glass-card"
          sx={{ 
            bgcolor: 'rgba(15, 20, 25, 0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(55, 65, 81, 0.3)',
            boxShadow: '0 1px 0 0 rgba(255, 255, 255, 0.05)',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Brand Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <BrainIcon 
                sx={{ 
                  fontSize: { xs: 28, sm: 32 },
                  background: 'linear-gradient(135deg, #4F7EFC, #6B8FFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mr: { xs: 1.5, sm: 2 }
                }} 
              />
              <Typography 
                variant="h5" 
                component="h1" 
                className="gradient-text font-bold"
                sx={{ 
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Smart Content Generator
              </Typography>
              <Typography 
                variant="h6" 
                component="h1" 
                className="gradient-text font-bold"
                sx={{ 
                  fontSize: '1.125rem',
                  display: { xs: 'block', sm: 'none' }
                }}
              >
                Content Gen
              </Typography>
            </Box>
            
            {/* Desktop Navigation */}
            {!isMobile && (
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    minHeight: 48,
                    textTransform: 'none',
                    fontWeight: 500,
                    color: theme.palette.text.secondary,
                    minWidth: { md: 120, lg: 140 },
                  },
                  '& .Mui-selected': {
                    color: theme.palette.primary.main,
                  }
                }}
              >
                <Tab 
                  icon={<TemplateIcon />} 
                  label="Templates" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<GenerateIcon />} 
                  label="Generate" 
                  iconPosition="start"
                />
                <Tab 
                  icon={<AnalyticsIcon />} 
                  label="History" 
                  iconPosition="start"
                />
              </Tabs>
            )}
            
            {/* Auth Button */}
            <Button
              variant="outlined"
              startIcon={!isMobile ? <PersonIcon /> : null}
              onClick={handleAuthClick}
              sx={{ 
                ml: { xs: 1, sm: 2 },
                minWidth: { xs: 40, sm: 'auto' },
                px: { xs: isMobile ? 1 : 1.5, sm: 2 },
                '& .MuiButton-startIcon': {
                  margin: isMobile ? 0 : undefined
                }
              }}
            >
              {isMobile ? <PersonIcon /> : (user ? 'Sign Out' : 'Sign In')}
            </Button>
          </Toolbar>
        </AppBar>

        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={handleMobileMenuToggle}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: 280,
              backgroundColor: '#1A1F29',
              borderRight: '1px solid rgba(55, 65, 81, 0.3)',
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(55, 65, 81, 0.3)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BrainIcon 
                sx={{ 
                  fontSize: 28,
                  background: 'linear-gradient(135deg, #4F7EFC, #6B8FFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mr: 1.5
                }} 
              />
              <Typography 
                variant="h6" 
                className="gradient-text font-bold"
                sx={{ fontSize: '1.125rem' }}
              >
                Content Generator
              </Typography>
            </Box>
            
            <IconButton
              onClick={handleMobileMenuToggle}
              sx={{ 
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'white'
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ pt: 0 }}>
            <ListItem
              button
              selected={activeTab === 0}
              onClick={() => handleMobileTabChange(0)}
              sx={{
                py: 2,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(79, 126, 252, 0.15)',
                  borderRight: '3px solid #4F7EFC',
                },
                '&:hover': {
                  backgroundColor: 'rgba(79, 126, 252, 0.08)',
                }
              }}
            >
              <ListItemIcon sx={{ color: activeTab === 0 ? '#4F7EFC' : '#9CA3AF' }}>
                <TemplateIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Templates" 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    color: activeTab === 0 ? '#4F7EFC' : '#ffffff',
                    fontWeight: activeTab === 0 ? 600 : 500
                  } 
                }} 
              />
            </ListItem>

            <ListItem
              button
              selected={activeTab === 1}
              onClick={() => handleMobileTabChange(1)}
              sx={{
                py: 2,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(79, 126, 252, 0.15)',
                  borderRight: '3px solid #4F7EFC',
                },
                '&:hover': {
                  backgroundColor: 'rgba(79, 126, 252, 0.08)',
                }
              }}
            >
              <ListItemIcon sx={{ color: activeTab === 1 ? '#4F7EFC' : '#9CA3AF' }}>
                <GenerateIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Generate" 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    color: activeTab === 1 ? '#4F7EFC' : '#ffffff',
                    fontWeight: activeTab === 1 ? 600 : 500
                  } 
                }} 
              />
            </ListItem>

            <ListItem
              button
              selected={activeTab === 2}
              onClick={() => handleMobileTabChange(2)}
              sx={{
                py: 2,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(79, 126, 252, 0.15)',
                  borderRight: '3px solid #4F7EFC',
                },
                '&:hover': {
                  backgroundColor: 'rgba(79, 126, 252, 0.08)',
                }
              }}
            >
              <ListItemIcon sx={{ color: activeTab === 2 ? '#4F7EFC' : '#9CA3AF' }}>
                <AnalyticsIcon />
              </ListItemIcon>
              <ListItemText 
                primary="History" 
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    color: activeTab === 2 ? '#4F7EFC' : '#ffffff',
                    fontWeight: activeTab === 2 ? 600 : 500
                  } 
                }} 
              />
            </ListItem>
          </List>

          <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid rgba(55, 65, 81, 0.3)' }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PersonIcon />}
              onClick={() => {
                handleAuthClick()
                setMobileDrawerOpen(false)
              }}
              sx={{ justifyContent: 'flex-start' }}
            >
              {user ? 'Sign Out' : 'Sign In'}
            </Button>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Container 
          maxWidth="xl" 
          sx={{ 
            py: { xs: 3, sm: 4, md: 6 },
            px: { xs: 2, sm: 3 }
          }}
        >
          <TabPanel value={activeTab} index={0}>
            <TemplateSelection onTemplateSelect={handleTemplateSelect} />
          </TabPanel>
          
          <TabPanel value={activeTab} index={1}>
            <ContentGenerator selectedTemplate={selectedTemplate} />
          </TabPanel>
          
          <TabPanel value={activeTab} index={2}>
            <Analytics />
          </TabPanel>
        </Container>
        
        <AuthModal 
          open={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
        />
      </div>
  )
}

function App() {
  return (
    <SupabaseProvider>
      <AppContent />
    </SupabaseProvider>
  )
}

export default App 