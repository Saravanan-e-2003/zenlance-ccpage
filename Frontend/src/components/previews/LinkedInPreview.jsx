import React from 'react'
import { Box, Typography, IconButton, Avatar, Divider } from '@mui/material'
import { 
  MoreHoriz as MoreIcon,
  ThumbUpOffAlt as LikeIcon,
  ChatBubbleOutline as CommentIcon,
  Repeat as RepostIcon,
  Send as SendIcon,
  Public as PublicIcon
} from '@mui/icons-material'

export default function LinkedInPreview({ content, hashtags = [], imageUrl = null }) {
  // Mock user data
  const mockUser = {
    name: 'Your Brand',
    title: 'Marketing Professional',
    profileImage: '/api/placeholder/48/48',
    connections: '500+',
    time: '2h'
  }

  // Format hashtags
  const hashtagText = hashtags.length > 0 ? hashtags.map(tag => `#${tag}`).join(' ') : ''
  const fullContent = `${content}${hashtagText ? `\n\n${hashtagText}` : ''}`

  // Mock engagement numbers
  const mockStats = {
    likes: Math.floor(Math.random() * 200) + 50,
    comments: Math.floor(Math.random() * 30) + 5,
    reposts: Math.floor(Math.random() * 15) + 2
  }

  const formatNumber = (num) => {
    return num.toString()
  }

  return (
    <Box 
      sx={{ 
        maxWidth: 552,
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.2)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        padding: '12px 16px 8px',
        gap: '8px'
      }}>
        <Avatar 
          src={mockUser.profileImage}
          sx={{ 
            width: 48, 
            height: 48,
            backgroundColor: '#0a66c2'
          }}
        />
        
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {/* User Info */}
          <Box sx={{ marginBottom: '4px' }}>
            <Typography 
              sx={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#000000',
                lineHeight: '1.33333',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {mockUser.name}
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '12px', 
                color: 'rgba(0,0,0,0.6)',
                lineHeight: '1.33333'
              }}
            >
              {mockUser.title}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              marginTop: '4px'
            }}>
              <Typography 
                sx={{ 
                  fontSize: '12px', 
                  color: 'rgba(0,0,0,0.6)',
                  lineHeight: '1.33333'
                }}
              >
                {mockUser.time} •
              </Typography>
              <PublicIcon sx={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }} />
            </Box>
          </Box>
        </Box>

        <IconButton 
          size="small" 
          sx={{ 
            color: 'rgba(0,0,0,0.6)',
            padding: '4px',
            marginTop: '4px'
          }}
        >
          <MoreIcon sx={{ fontSize: '16px' }} />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ padding: '0 16px 12px' }}>
        <Typography 
          sx={{ 
            fontSize: '14px', 
            color: '#000000',
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          {fullContent.split(/(\s+)/).map((word, index) => {
            if (word.startsWith('#') && word.length > 1) {
              return (
                <Box 
                  key={index} 
                  component="span" 
                  sx={{ 
                    color: '#0a66c2', 
                    cursor: 'pointer',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {word}
                </Box>
              )
            } else if (word.startsWith('@') && word.length > 1) {
              return (
                <Box 
                  key={index} 
                  component="span" 
                  sx={{ 
                    color: '#0a66c2', 
                    cursor: 'pointer',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {word}
                </Box>
              )
            }
            return word
          })}
        </Typography>
      </Box>

      {/* Image Section */}
      {imageUrl ? (
        <Box 
          sx={{ 
            width: '100%',
            height: 'auto',
            maxHeight: 400,
            borderTop: '1px solid rgba(0,0,0,0.15)',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            overflow: 'hidden'
          }}
        >
          <img 
            src={imageUrl}
            alt="Post content"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover'
            }}
          />
        </Box>
      ) : (
        <Box 
          sx={{ 
            width: '100%',
            height: 277,
            backgroundColor: '#f3f2ef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid rgba(0,0,0,0.15)',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '8px',
              backgroundColor: '#0a66c2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold'
            }}
          >
            📷
          </Box>
          <Typography 
            sx={{ 
              position: 'absolute',
              bottom: '12px',
              color: 'rgba(0,0,0,0.6)',
              fontSize: '12px'
            }}
          >
            Your image will appear here
          </Typography>
        </Box>
      )}

      {/* Engagement Summary */}
      <Box sx={{ 
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Box sx={{
            width: '16px',
            height: '16px',
            backgroundColor: '#0a66c2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'white'
          }}>
            👍
          </Box>
          <Typography 
            sx={{ 
              fontSize: '12px', 
              color: 'rgba(0,0,0,0.6)',
              cursor: 'pointer',
              '&:hover': { color: '#0a66c2', textDecoration: 'underline' }
            }}
          >
            {mockStats.likes}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: '12px' }}>
          <Typography 
            sx={{ 
              fontSize: '12px', 
              color: 'rgba(0,0,0,0.6)',
              cursor: 'pointer',
              '&:hover': { color: '#0a66c2', textDecoration: 'underline' }
            }}
          >
            {mockStats.comments} comments
          </Typography>
          <Typography 
            sx={{ 
              fontSize: '12px', 
              color: 'rgba(0,0,0,0.6)',
              cursor: 'pointer',
              '&:hover': { color: '#0a66c2', textDecoration: 'underline' }
            }}
          >
            {mockStats.reposts} reposts
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(0,0,0,0.15)' }} />

      {/* Action Buttons */}
      <Box sx={{ 
        display: 'flex', 
        padding: '4px 0'
      }}>
        <Box 
          sx={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 8px',
            cursor: 'pointer',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)'
            }
          }}
        >
          <LikeIcon sx={{ fontSize: '20px', color: 'rgba(0,0,0,0.6)', marginRight: '8px' }} />
          <Typography 
            sx={{ 
              fontSize: '14px', 
              color: 'rgba(0,0,0,0.6)',
              fontWeight: 600
            }}
          >
            Like
          </Typography>
        </Box>

        <Box 
          sx={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 8px',
            cursor: 'pointer',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)'
            }
          }}
        >
          <CommentIcon sx={{ fontSize: '20px', color: 'rgba(0,0,0,0.6)', marginRight: '8px' }} />
          <Typography 
            sx={{ 
              fontSize: '14px', 
              color: 'rgba(0,0,0,0.6)',
              fontWeight: 600
            }}
          >
            Comment
          </Typography>
        </Box>

        <Box 
          sx={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 8px',
            cursor: 'pointer',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)'
            }
          }}
        >
          <RepostIcon sx={{ fontSize: '20px', color: 'rgba(0,0,0,0.6)', marginRight: '8px' }} />
          <Typography 
            sx={{ 
              fontSize: '14px', 
              color: 'rgba(0,0,0,0.6)',
              fontWeight: 600
            }}
          >
            Repost
          </Typography>
        </Box>

        <Box 
          sx={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 8px',
            cursor: 'pointer',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.08)'
            }
          }}
        >
          <SendIcon sx={{ fontSize: '20px', color: 'rgba(0,0,0,0.6)', marginRight: '8px' }} />
          <Typography 
            sx={{ 
              fontSize: '14px', 
              color: 'rgba(0,0,0,0.6)',
              fontWeight: 600
            }}
          >
            Send
          </Typography>
        </Box>
      </Box>
    </Box>
  )
} 