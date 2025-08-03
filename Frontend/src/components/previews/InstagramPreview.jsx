import React from 'react'
import { Box, Typography, IconButton, Avatar } from '@mui/material'
import { 
  MoreHoriz as MoreIcon,
  FavoriteBorder as HeartIcon,
  ChatBubbleOutline as CommentIcon,
  Send as ShareIcon,
  BookmarkBorder as SaveIcon
} from '@mui/icons-material'

export default function InstagramPreview({ content, hashtags = [], imageUrl = null }) {
  // Mock user data
  const mockUser = {
    username: 'your_brand',
    profileImage: '/api/placeholder/40/40',
    isVerified: true
  }

  // Format hashtags
  const hashtagText = hashtags.length > 0 ? hashtags.map(tag => `#${tag}`).join(' ') : ''
  const fullCaption = `${content}${hashtagText ? `\n\n${hashtagText}` : ''}`

  return (
    <Box 
      sx={{ 
        maxWidth: 468,
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #dbdbdb',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '14px 16px',
        borderBottom: '1px solid #efefef'
      }}>
        <Avatar 
          src={mockUser.profileImage}
          sx={{ 
            width: 32, 
            height: 32, 
            marginRight: '12px',
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            border: '2px solid transparent',
            backgroundClip: 'padding-box'
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            sx={{ 
              fontSize: '14px', 
              fontWeight: 600, 
              color: '#262626',
              lineHeight: '18px'
            }}
          >
            {mockUser.username}
            {mockUser.isVerified && (
              <Box component="span" sx={{ marginLeft: '4px', color: '#1da1f2' }}>
                ✓
              </Box>
            )}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: '#262626' }}>
          <MoreIcon />
        </IconButton>
      </Box>

      {/* Image Section */}
      <Box 
        sx={{ 
          width: '100%',
          height: 468,
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #efefef',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {imageUrl ? (
          <img 
            src={imageUrl}
            alt="Post content"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
              }}
            >
              📸
            </Box>
            <Typography 
              sx={{ 
                position: 'absolute',
                bottom: '16px',
                color: '#8e8e8e',
                fontSize: '12px'
              }}
            >
              Your image will appear here
            </Typography>
          </>
        )}
      </Box>

      {/* Action Buttons */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px'
      }}>
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <IconButton size="small" sx={{ color: '#262626', padding: '8px' }}>
            <HeartIcon sx={{ fontSize: '24px' }} />
          </IconButton>
          <IconButton size="small" sx={{ color: '#262626', padding: '8px' }}>
            <CommentIcon sx={{ fontSize: '24px' }} />
          </IconButton>
          <IconButton size="small" sx={{ color: '#262626', padding: '8px' }}>
            <ShareIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </Box>
        <IconButton size="small" sx={{ color: '#262626', padding: '8px' }}>
          <SaveIcon sx={{ fontSize: '24px' }} />
        </IconButton>
      </Box>

      {/* Likes */}
      <Box sx={{ padding: '0 16px 8px' }}>
        <Typography 
          sx={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#262626',
            lineHeight: '18px'
          }}
        >
          1,247 likes
        </Typography>
      </Box>

      {/* Caption */}
      <Box sx={{ padding: '0 16px 16px' }}>
        <Typography 
          sx={{ 
            fontSize: '14px', 
            color: '#262626',
            lineHeight: '18px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          <Box component="span" sx={{ fontWeight: 600, marginRight: '8px' }}>
            {mockUser.username}
          </Box>
          {fullCaption.split(/(\s+)/).map((word, index) => {
            if (word.startsWith('#') && word.length > 1) {
              return (
                <Box 
                  key={index} 
                  component="span" 
                  sx={{ color: '#00376b', cursor: 'pointer' }}
                >
                  {word}
                </Box>
              )
            }
            return word
          })}
        </Typography>
        
        {/* View all comments */}
        <Typography 
          sx={{ 
            fontSize: '14px', 
            color: '#8e8e8e',
            marginTop: '8px',
            cursor: 'pointer'
          }}
        >
          View all 23 comments
        </Typography>
        
        {/* Time */}
        <Typography 
          sx={{ 
            fontSize: '10px', 
            color: '#8e8e8e',
            marginTop: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.2px'
          }}
        >
          2 HOURS AGO
        </Typography>
      </Box>
    </Box>
  )
} 