import React from 'react'
import { Box, Typography, IconButton, Avatar } from '@mui/material'
import { 
  MoreHoriz as MoreIcon,
  ChatBubbleOutline as ReplyIcon,
  Repeat as RetweetIcon,
  FavoriteBorder as LikeIcon,
  Share as ShareIcon,
  BarChart as ViewsIcon
} from '@mui/icons-material'

export default function TwitterPreview({ content, hashtags = [], imageUrl = null }) {
  // Mock user data
  const mockUser = {
    name: 'Your Brand',
    username: 'yourbrand',
    profileImage: '/api/placeholder/40/40',
    isVerified: true
  }

  // Format hashtags and mentions
  const hashtagText = hashtags.length > 0 ? hashtags.map(tag => `#${tag}`).join(' ') : ''
  const fullContent = `${content}${hashtagText ? ` ${hashtagText}` : ''}`

  // Mock engagement numbers
  const mockStats = {
    replies: Math.floor(Math.random() * 50) + 5,
    retweets: Math.floor(Math.random() * 200) + 20,
    likes: Math.floor(Math.random() * 500) + 100,
    views: Math.floor(Math.random() * 5000) + 1000
  }

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <Box 
      sx={{ 
        maxWidth: 598,
        backgroundColor: '#000000',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #2f3336',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        padding: '12px 16px',
        gap: '12px'
      }}>
        <Avatar 
          src={mockUser.profileImage}
          sx={{ 
            width: 40, 
            height: 40,
            backgroundColor: '#1d9bf0'
          }}
        />
        
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {/* User Info */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            marginBottom: '2px'
          }}>
            <Typography 
              sx={{ 
                fontSize: '15px', 
                fontWeight: 700, 
                color: '#ffffff',
                lineHeight: '20px'
              }}
            >
              {mockUser.name}
            </Typography>
            {mockUser.isVerified && (
              <Box 
                component="span" 
                sx={{ 
                  color: '#1d9bf0',
                  fontSize: '16px',
                  lineHeight: 1
                }}
              >
                ✓
              </Box>
            )}
            <Typography 
              sx={{ 
                fontSize: '15px', 
                color: '#71767b',
                lineHeight: '20px'
              }}
            >
              @{mockUser.username}
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '15px', 
                color: '#71767b',
                lineHeight: '20px'
              }}
            >
              ·
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '15px', 
                color: '#71767b',
                lineHeight: '20px'
              }}
            >
              2h
            </Typography>
          </Box>

          {/* Content */}
          <Typography 
            sx={{ 
              fontSize: '15px', 
              color: '#ffffff',
              lineHeight: '20px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              marginBottom: imageUrl ? '12px' : '12px'
            }}
          >
            {fullContent.split(/(\s+)/).map((word, index) => {
              if (word.startsWith('#') && word.length > 1) {
                return (
                  <Box 
                    key={index} 
                    component="span" 
                    sx={{ color: '#1d9bf0', cursor: 'pointer' }}
                  >
                    {word}
                  </Box>
                )
              } else if (word.startsWith('@') && word.length > 1) {
                return (
                  <Box 
                    key={index} 
                    component="span" 
                    sx={{ color: '#1d9bf0', cursor: 'pointer' }}
                  >
                    {word}
                  </Box>
                )
              }
              return word
            })}
          </Typography>

          {/* Image Section */}
          {imageUrl && (
            <Box 
              sx={{ 
                width: '100%',
                maxHeight: 400,
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #2f3336',
                marginBottom: '12px'
              }}
            >
              <img 
                src={imageUrl}
                alt="Post content"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '400px',
                  objectFit: 'cover'
                }}
              />
            </Box>
          )}

          {/* Engagement Stats */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '16px',
            marginTop: '12px',
            color: '#71767b'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#71767b', 
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(29, 155, 240, 0.1)',
                    color: '#1d9bf0'
                  }
                }}
              >
                <ReplyIcon sx={{ fontSize: '18px' }} />
              </IconButton>
              <Typography sx={{ fontSize: '13px', color: '#71767b' }}>
                {mockStats.replies}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#71767b', 
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 186, 124, 0.1)',
                    color: '#00ba7c'
                  }
                }}
              >
                <RetweetIcon sx={{ fontSize: '18px' }} />
              </IconButton>
              <Typography sx={{ fontSize: '13px', color: '#71767b' }}>
                {formatNumber(mockStats.retweets)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#71767b', 
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(249, 24, 128, 0.1)',
                    color: '#f91880'
                  }
                }}
              >
                <LikeIcon sx={{ fontSize: '18px' }} />
              </IconButton>
              <Typography sx={{ fontSize: '13px', color: '#71767b' }}>
                {formatNumber(mockStats.likes)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#71767b', 
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(29, 155, 240, 0.1)',
                    color: '#1d9bf0'
                  }
                }}
              >
                <ViewsIcon sx={{ fontSize: '18px' }} />
              </IconButton>
              <Typography sx={{ fontSize: '13px', color: '#71767b' }}>
                {formatNumber(mockStats.views)}
              </Typography>
            </Box>

            <IconButton 
              size="small" 
              sx={{ 
                color: '#71767b', 
                padding: '4px',
                marginLeft: 'auto',
                '&:hover': {
                  backgroundColor: 'rgba(29, 155, 240, 0.1)',
                  color: '#1d9bf0'
                }
              }}
            >
              <ShareIcon sx={{ fontSize: '18px' }} />
            </IconButton>
          </Box>
        </Box>

        <IconButton 
          size="small" 
          sx={{ 
            color: '#71767b',
            padding: '4px',
            '&:hover': {
              backgroundColor: 'rgba(113, 118, 123, 0.1)'
            }
          }}
        >
          <MoreIcon sx={{ fontSize: '18px' }} />
        </IconButton>
      </Box>
    </Box>
  )
} 