import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { 
  KeyboardArrowUp as UpvoteIcon,
  KeyboardArrowDown as DownvoteIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  BookmarkBorder as SaveIcon,
  MoreHoriz as MoreIcon,
  Cake as CakeIcon
} from '@mui/icons-material'

export default function RedditPreview({ content, hashtags = [], imageUrl = null }) {
  // Mock user and subreddit data
  const mockData = {
    subreddit: 'r/marketing',
    username: 'u/yourbrand',
    time: '2 hours ago',
    upvotes: Math.floor(Math.random() * 500) + 100,
    comments: Math.floor(Math.random() * 50) + 10,
    awards: Math.floor(Math.random() * 3)
  }

  // Format content (Reddit doesn't typically use hashtags, but we'll include them)
  const hashtagText = hashtags.length > 0 ? hashtags.map(tag => `#${tag}`).join(' ') : ''
  const fullContent = `${content}${hashtagText ? `\n\n${hashtagText}` : ''}`

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  return (
    <Box 
      sx={{ 
        maxWidth: 640,
        backgroundColor: '#1a1a1b',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid #343536',
        fontFamily: 'Noto Sans,Arial,sans-serif'
      }}
    >
      {/* Post Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '8px 12px',
        gap: '4px'
      }}>
        {/* Subreddit Icon */}
        <Box 
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#ff4500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'white',
            fontWeight: 'bold',
            marginRight: '4px'
          }}
        >
          r/
        </Box>

        <Typography 
          sx={{ 
            fontSize: '12px', 
            fontWeight: 700, 
            color: '#ffffff',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          {mockData.subreddit}
        </Typography>

        <Typography 
          sx={{ 
            fontSize: '12px', 
            color: '#818384',
            margin: '0 4px'
          }}
        >
          •
        </Typography>

        <Typography 
          sx={{ 
            fontSize: '12px', 
            color: '#818384'
          }}
        >
          Posted by
        </Typography>

        <Typography 
          sx={{ 
            fontSize: '12px', 
            color: '#818384',
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          {mockData.username}
        </Typography>

        <Typography 
          sx={{ 
            fontSize: '12px', 
            color: '#818384',
            margin: '0 4px'
          }}
        >
          •
        </Typography>

        <Typography 
          sx={{ 
            fontSize: '12px', 
            color: '#818384'
          }}
        >
          {mockData.time}
        </Typography>

        {/* Awards */}
        {mockData.awards > 0 && (
          <Box sx={{ marginLeft: '8px', display: 'flex', gap: '2px' }}>
            {Array.from({ length: mockData.awards }, (_, i) => (
              <Box 
                key={i}
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: '#ffd700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '8px'
                }}
              >
                🏆
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex' }}>
        {/* Voting Section */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4px 12px',
          backgroundColor: '#1a1a1b',
          width: 40
        }}>
          <IconButton 
            size="small" 
            sx={{ 
              color: '#818384',
              padding: '2px',
              '&:hover': {
                backgroundColor: 'rgba(215, 218, 220, 0.1)',
                color: '#ff4500'
              }
            }}
          >
            <UpvoteIcon sx={{ fontSize: '20px' }} />
          </IconButton>

          <Typography 
            sx={{ 
              fontSize: '12px', 
              fontWeight: 700,
              color: '#d7dadc',
              margin: '2px 0',
              minWidth: '20px',
              textAlign: 'center'
            }}
          >
            {formatNumber(mockData.upvotes)}
          </Typography>

          <IconButton 
            size="small" 
            sx={{ 
              color: '#818384',
              padding: '2px',
              '&:hover': {
                backgroundColor: 'rgba(215, 218, 220, 0.1)',
                color: '#7193ff'
              }
            }}
          >
            <DownvoteIcon sx={{ fontSize: '20px' }} />
          </IconButton>
        </Box>

        {/* Content Section */}
        <Box sx={{ flex: 1, padding: '8px 12px 12px 0' }}>
          {/* Post Title/Content */}
          <Typography 
            sx={{ 
              fontSize: '18px', 
              fontWeight: 500,
              color: '#d7dadc',
              lineHeight: '22px',
              marginBottom: '8px',
              wordBreak: 'break-word'
            }}
          >
            {content}
          </Typography>

          {/* Hashtags (if any) */}
          {hashtags.length > 0 && (
            <Typography 
              sx={{ 
                fontSize: '14px', 
                color: '#4fbcff',
                lineHeight: '18px',
                marginBottom: '8px'
              }}
            >
              {hashtags.map(tag => `#${tag}`).join(' ')}
            </Typography>
          )}

          {/* Image Section */}
          {imageUrl ? (
            <Box 
              sx={{ 
                width: '100%',
                height: 'auto',
                maxHeight: 400,
                borderRadius: '4px',
                border: '1px solid #343536',
                marginBottom: '8px',
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
                height: 300,
                backgroundColor: '#272729',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                border: '1px solid #343536',
                position: 'relative',
                marginBottom: '8px'
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '8px',
                  backgroundColor: '#ff4500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}
              >
                🖼️
              </Box>
              <Typography 
                sx={{ 
                  position: 'absolute',
                  bottom: '12px',
                  color: '#818384',
                  fontSize: '12px'
                }}
              >
                Your image will appear here
              </Typography>
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '8px'
          }}>
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: '2px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(215, 218, 220, 0.1)'
                }
              }}
            >
              <CommentIcon sx={{ fontSize: '16px', color: '#818384', marginRight: '6px' }} />
              <Typography 
                sx={{ 
                  fontSize: '12px', 
                  color: '#818384',
                  fontWeight: 700
                }}
              >
                {mockData.comments} Comments
              </Typography>
            </Box>

            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: '2px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(215, 218, 220, 0.1)'
                }
              }}
            >
              <ShareIcon sx={{ fontSize: '16px', color: '#818384', marginRight: '6px' }} />
              <Typography 
                sx={{ 
                  fontSize: '12px', 
                  color: '#818384',
                  fontWeight: 700
                }}
              >
                Share
              </Typography>
            </Box>

            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: '2px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(215, 218, 220, 0.1)'
                }
              }}
            >
              <SaveIcon sx={{ fontSize: '16px', color: '#818384', marginRight: '6px' }} />
              <Typography 
                sx={{ 
                  fontSize: '12px', 
                  color: '#818384',
                  fontWeight: 700
                }}
              >
                Save
              </Typography>
            </Box>

            <IconButton 
              size="small" 
              sx={{ 
                color: '#818384',
                padding: '4px',
                marginLeft: 'auto',
                '&:hover': {
                  backgroundColor: 'rgba(215, 218, 220, 0.1)'
                }
              }}
            >
              <MoreIcon sx={{ fontSize: '16px' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  )
} 