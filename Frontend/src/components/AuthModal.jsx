import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material'
import { useSupabase } from './SupabaseProvider'

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

export default function AuthModal({ open, onClose }) {
  const { signIn, signUp, user } = useSupabase()
  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
    setError('')
    setSuccess('')
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(formData.email, formData.password)
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Successfully signed in!')
        setTimeout(() => {
          onClose()
        }, 1000)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    }

    setLoading(false)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const { error } = await signUp(formData.email, formData.password)
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Account created! Check your email to verify your account.')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    }

    setLoading(false)
  }

  if (user) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Account</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Signed in as: <strong>{user.email}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can now view your personal analytics and saved content.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="h2" className="gradient-text">
          Sign In to View Analytics
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Access your personal analytics and saved content
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <TabPanel value={activeTab} index={0}>
          <Box component="form" onSubmit={handleSignIn}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              margin="normal"
              required
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Box component="form" onSubmit={handleSignUp}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              margin="normal"
              required
              autoComplete="email"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              margin="normal"
              required
              autoComplete="new-password"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              margin="normal"
              required
              autoComplete="new-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
          </Box>
        </TabPanel>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          {activeTab === 0 
            ? "Don't have an account? Click Sign Up above."
            : "Already have an account? Click Sign In above."
          }
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Use Without Account
        </Button>
      </DialogActions>
    </Dialog>
  )
} 