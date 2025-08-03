// Smart Content Generation Platform - Main Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

let currentTemplate = null;
let generatedContent = {};

function initializeApp() {
    setupNavigation();
    setupTemplateSelection();
    setupFormHandlers();
    initializeAnalytics();
    setupSocialModal();
}

// Navigation Functions
function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            switchTab(targetTab);
            
            // Update active nav tab
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

function switchTab(tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// Template Selection Functions
function setupTemplateSelection() {
    const templateCards = document.querySelectorAll('.template-card');
    
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            const template = card.dataset.template;
            selectTemplate(template);
        });
    });
}

function selectTemplate(template) {
    currentTemplate = template;
    
    // Switch to content generator tab
    switchTab('content-generator');
    document.querySelector('.nav-tab[data-tab="content-generator"]').classList.add('active');
    document.querySelector('.nav-tab[data-tab="template-selection"]').classList.remove('active');
    
    // Hide all generator sections
    const generatorSections = document.querySelectorAll('.generator-section');
    generatorSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the selected template generator
    const templateMap = {
        'blog-post': 'blog-generator',
        'social-media': 'social-generator',
        'technical-docs': 'tech-docs-generator',
        'marketing-copy': 'blog-generator' // Using blog generator for marketing copy
    };
    
    const targetGenerator = document.getElementById(templateMap[template]);
    if (targetGenerator) {
        targetGenerator.style.display = 'block';
    }
}

// Form Handlers
function setupFormHandlers() {
    // Hashtag count slider
    const hashtagSlider = document.getElementById('social-hashtags');
    const hashtagCount = document.getElementById('hashtag-count');
    
    if (hashtagSlider && hashtagCount) {
        hashtagSlider.addEventListener('input', (e) => {
            hashtagCount.textContent = e.target.value;
        });
    }
    
    // Post time selector
    const postTimeSelect = document.getElementById('post-time');
    const scheduleDatetime = document.getElementById('schedule-datetime');
    
    if (postTimeSelect && scheduleDatetime) {
        postTimeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'schedule') {
                scheduleDatetime.style.display = 'block';
            } else {
                scheduleDatetime.style.display = 'none';
            }
        });
    }
    
    // Platform tabs
    const platformTabs = document.querySelectorAll('.platform-tab');
    platformTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            platformTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const platform = tab.dataset.platform;
            updatePlatformContent(platform);
        });
    });
}

// Content Generation Functions
function generateBlogPost() {
    const topic = document.getElementById('blog-topic').value;
    const tone = document.getElementById('blog-tone').value;
    const length = document.getElementById('blog-length').value;
    const audience = document.getElementById('blog-audience').value;
    const outline = document.getElementById('blog-outline').value;
    
    if (!topic.trim()) {
        showMessage('Please enter a topic for your blog post.', 'error');
        return;
    }
    
    // Show loading state
    const generateBtn = document.querySelector('#blog-generator .generate-btn');
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<div class="loading"></div> Generating...';
    generateBtn.disabled = true;
    
    // Simulate AI generation (replace with actual AI API call)
    setTimeout(() => {
        const blogContent = generateBlogContent(topic, tone, length, audience, outline);
        displayBlogOutput(blogContent);
        
        // Reset button
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
    }, 3000);
}

function generateBlogContent(topic, tone, length, audience, outline) {
    // Mock AI-generated content (replace with actual AI API)
    const lengthWords = {
        'short': 400,
        'medium': 750,
        'long': 1200
    };
    
    const toneStyles = {
        'professional': 'authoritative and informative',
        'casual': 'relaxed and conversational',
        'friendly': 'warm and approachable',
        'authoritative': 'expert and confident',
        'conversational': 'engaging and personal'
    };
    
    const content = `# ${capitalizeFirst(topic)}: A Comprehensive Guide

## Introduction

In today's digital landscape, understanding ${topic} has become increasingly important for ${audience || 'professionals and enthusiasts alike'}. This ${toneStyles[tone]} guide will explore the key aspects of ${topic} and provide you with actionable insights.

## Key Points

${outline ? outline.split('\n').map(point => point.trim() ? `- ${point.trim()}` : '').filter(Boolean).join('\n') : `- Understanding the fundamentals of ${topic}
- Best practices and implementation strategies
- Common challenges and how to overcome them
- Future trends and considerations`}

## Main Content

${topic} represents a significant opportunity for growth and innovation. By adopting a ${tone} approach, we can better understand its implications and applications.

### Getting Started

The journey into ${topic} begins with a solid foundation of knowledge. Whether you're a beginner or have some experience, it's essential to understand the core concepts that drive success in this area.

### Advanced Strategies

For those looking to take their understanding further, advanced strategies in ${topic} include:

1. **Strategic Planning**: Developing a comprehensive approach
2. **Implementation**: Putting theory into practice
3. **Optimization**: Continuously improving your results
4. **Measurement**: Tracking progress and success metrics

### Best Practices

Success in ${topic} requires attention to detail and commitment to best practices:

- Regular analysis and optimization
- Staying updated with industry trends
- Building strong foundational knowledge
- Networking with other professionals

## Conclusion

${topic} continues to evolve and present new opportunities. By maintaining a ${tone} approach and focusing on ${audience ? `the needs of ${audience}` : 'continuous learning'}, you can achieve significant results.

Remember that success in ${topic} is a journey, not a destination. Stay curious, keep learning, and don't hesitate to experiment with new approaches.

---

*This content was generated using AI assistance and optimized for SEO and readability.*`;

    return {
        content: content,
        wordCount: lengthWords[length] || 750,
        readabilityScore: Math.floor(Math.random() * 20) + 75, // 75-95
        seoScore: Math.floor(Math.random() * 15) + 80 // 80-95
    };
}

function displayBlogOutput(blogData) {
    document.getElementById('blog-output').style.display = 'block';
    document.getElementById('blog-content').textContent = blogData.content;
    document.getElementById('blog-word-count').textContent = blogData.wordCount;
    document.getElementById('blog-readability').textContent = blogData.readabilityScore + '/100';
    document.getElementById('blog-seo-score').textContent = blogData.seoScore + '/100';
    
    // Store generated content
    generatedContent.blog = blogData;
    
    // Scroll to output
    document.getElementById('blog-output').scrollIntoView({ behavior: 'smooth' });
}

function generateSocialContent() {
    const content = document.getElementById('social-content').value;
    const platform = document.getElementById('social-platform').value;
    const tone = document.getElementById('social-tone').value;
    const hashtagCount = document.getElementById('social-hashtags').value;
    const cta = document.getElementById('social-cta').value;
    
    if (!content.trim()) {
        showMessage('Please describe the content you want to create.', 'error');
        return;
    }
    
    // Show loading state
    const generateBtn = document.querySelector('#social-generator .generate-btn');
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<div class="loading"></div> Generating...';
    generateBtn.disabled = true;
    
    // Simulate AI generation
    setTimeout(() => {
        const socialData = generateSocialMediaContent(content, platform, tone, hashtagCount, cta);
        displaySocialOutput(socialData);
        
        // Reset button
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
    }, 2500);
}

function generateSocialMediaContent(content, platform, tone, hashtagCount, cta) {
    const toneStyles = {
        'engaging': '🚀 Ready to dive in?',
        'professional': 'Discover the latest insights:',
        'fun': '🎉 Hey there, amazing people!',
        'inspirational': '✨ Dream big, achieve bigger!',
        'informative': '📚 Here\'s what you need to know:'
    };
    
    const ctaTexts = {
        'visit': '👆 Visit our website for more!',
        'follow': '💙 Follow us for daily inspiration!',
        'share': '🔄 Share if you found this helpful!',
        'comment': '💬 What are your thoughts? Comment below!',
        'custom': '🔗 Take action today!'
    };
    
    const hashtags = generateHashtags(content, parseInt(hashtagCount));
    
    const caption = `${toneStyles[tone]}

${content}

${cta ? ctaTexts[cta] || ctaTexts.custom : ''}

${platform === 'twitter' ? '🧵 Thread below 👇' : ''}
${platform === 'linkedin' ? 'What\'s your experience with this?' : ''}
${platform === 'instagram' ? 'Double tap if you agree! 💖' : ''}`;

    return {
        caption: caption,
        hashtags: hashtags,
        platform: platform,
        optimizations: generatePlatformOptimizations(caption, hashtags, platform)
    };
}

function generateHashtags(content, count) {
    const baseHashtags = [
        '#ContentCreation', '#DigitalMarketing', '#SocialMedia', '#Innovation',
        '#Productivity', '#Success', '#Motivation', '#Business', '#Growth',
        '#Technology', '#Inspiration', '#Leadership', '#Strategy', '#Tips',
        '#Learning', '#Community', '#Networking', '#Trends', '#Creative',
        '#Professional', '#Entrepreneur', '#Marketing', '#Branding', '#Goals'
    ];
    
    // Generate topic-specific hashtags based on content
    const words = content.toLowerCase().match(/\b\w+\b/g) || [];
    const topicHashtags = words
        .filter(word => word.length > 4)
        .slice(0, 5)
        .map(word => `#${capitalizeFirst(word)}`);
    
    const allHashtags = [...baseHashtags, ...topicHashtags];
    const selectedHashtags = [];
    
    for (let i = 0; i < count && i < allHashtags.length; i++) {
        const randomIndex = Math.floor(Math.random() * allHashtags.length);
        const hashtag = allHashtags[randomIndex];
        if (!selectedHashtags.includes(hashtag)) {
            selectedHashtags.push(hashtag);
        }
    }
    
    return selectedHashtags;
}

function generatePlatformOptimizations(caption, hashtags, platform) {
    const optimizations = {
        instagram: {
            title: 'Instagram Optimization',
            content: `${caption}\n\n${hashtags.join(' ')}`,
            tips: ['Use high-quality visuals', 'Post during peak hours (6-9 PM)', 'Use Stories for extra engagement']
        },
        twitter: {
            title: 'Twitter/X Optimization',
            content: `${caption.substring(0, 200)}...\n\n${hashtags.slice(0, 3).join(' ')}`,
            tips: ['Keep it under 280 characters', 'Use threads for longer content', 'Engage with replies quickly']
        },
        facebook: {
            title: 'Facebook Optimization',
            content: `${caption}\n\n${hashtags.slice(0, 5).join(' ')}`,
            tips: ['Use native video when possible', 'Ask questions to boost engagement', 'Post when your audience is most active']
        },
        linkedin: {
            title: 'LinkedIn Optimization',
            content: `${caption}\n\n${hashtags.slice(0, 5).join(' ')}`,
            tips: ['Add professional context', 'Tag relevant connections', 'Share industry insights']
        }
    };
    
    return optimizations;
}

function displaySocialOutput(socialData) {
    document.getElementById('social-output').style.display = 'block';
    document.getElementById('social-caption').textContent = socialData.caption;
    
    // Display hashtags
    const hashtagsContainer = document.getElementById('social-hashtags-output');
    hashtagsContainer.innerHTML = '';
    socialData.hashtags.forEach(hashtag => {
        const span = document.createElement('span');
        span.className = 'hashtag';
        span.textContent = hashtag;
        hashtagsContainer.appendChild(span);
    });
    
    // Store generated content
    generatedContent.social = socialData;
    
    // Update platform content
    updatePlatformContent(socialData.platform);
    
    // Scroll to output
    document.getElementById('social-output').scrollIntoView({ behavior: 'smooth' });
}

function updatePlatformContent(platform) {
    if (!generatedContent.social) return;
    
    const platformContent = document.getElementById('platform-content');
    const optimization = generatedContent.social.optimizations[platform];
    
    if (optimization) {
        platformContent.innerHTML = `
            <div class="platform-optimization">
                <h5>${optimization.title}</h5>
                <div class="optimized-content">${optimization.content}</div>
                <div class="platform-tips">
                    <strong>Tips:</strong>
                    <ul>
                        ${optimization.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
}

function generateTechnicalDocs() {
    const docType = document.getElementById('doc-type').value;
    const language = document.getElementById('doc-language').value;
    const codeInput = document.getElementById('code-input').value;
    const docStyle = document.getElementById('doc-style').value;
    const includeExamples = document.getElementById('include-examples').checked;
    
    if (!codeInput.trim()) {
        showMessage('Please provide code or API specifications to document.', 'error');
        return;
    }
    
    // Show loading state
    const generateBtn = document.querySelector('#tech-docs-generator .generate-btn');
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<div class="loading"></div> Generating...';
    generateBtn.disabled = true;
    
    // Simulate AI generation
    setTimeout(() => {
        const docsContent = generateTechDocsContent(docType, language, codeInput, docStyle, includeExamples);
        displayTechDocsOutput(docsContent);
        
        // Reset button
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
    }, 3500);
}

function generateTechDocsContent(docType, language, codeInput, docStyle, includeExamples) {
    // Mock documentation generation
    const docTypes = {
        'api': 'API Documentation',
        'code': 'Code Documentation',
        'user-guide': 'User Guide',
        'readme': 'README Documentation'
    };
    
    const content = `# ${docTypes[docType]}

## Overview

This documentation provides comprehensive information about the ${language} implementation provided.

## Code Analysis

The following ${language} code has been analyzed:

\`\`\`${language}
${codeInput}
\`\`\`

## Documentation

### Functions/Methods

Based on the code analysis, the following functions and methods have been identified:

${includeExamples ? `
### Examples

\`\`\`${language}
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

\`\`\`${language}
import { yourFunction } from 'your-package-name';

const result = yourFunction(parameters);
\`\`\`

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.

---

*Documentation generated automatically with AI assistance.*`;

    return content;
}

function displayTechDocsOutput(content) {
    document.getElementById('tech-docs-output').style.display = 'block';
    document.getElementById('tech-docs-content').textContent = content;
    
    // Store generated content
    generatedContent.techDocs = content;
    
    // Scroll to output
    document.getElementById('tech-docs-output').scrollIntoView({ behavior: 'smooth' });
}

// Social Media Publishing Modal
function setupSocialModal() {
    // Modal will be opened by schedulePost function
}

function schedulePost() {
    if (!generatedContent.social) {
        showMessage('Please generate social media content first.', 'error');
        return;
    }
    
    document.getElementById('social-publishing-modal').style.display = 'flex';
}

function closeSocialModal() {
    document.getElementById('social-publishing-modal').style.display = 'none';
}

function publishToSelectedPlatforms() {
    const selectedPlatforms = [];
    const platformOptions = document.querySelectorAll('.platform-option input[type="checkbox"]:checked');
    
    platformOptions.forEach(checkbox => {
        const platform = checkbox.closest('.platform-option').dataset.platform;
        selectedPlatforms.push(platform);
    });
    
    if (selectedPlatforms.length === 0) {
        showMessage('Please select at least one platform to publish to.', 'error');
        return;
    }
    
    // Simulate publishing
    showMessage(`Content scheduled for publishing to: ${selectedPlatforms.join(', ')}`, 'success');
    closeSocialModal();
    
    // Update analytics (simulated)
    updateAnalyticsAfterPublish(selectedPlatforms);
}

// Utility Functions
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showMessage('Content copied to clipboard!', 'success');
    }).catch(() => {
        showMessage('Failed to copy content.', 'error');
    });
}

function downloadContent(elementId, filename) {
    const element = document.getElementById(elementId);
    const content = element.textContent;
    
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage(`Content downloaded as ${filename}`, 'success');
}

function exportToPlatform() {
    // This would integrate with actual documentation platforms
    showMessage('Export feature coming soon! For now, use the copy or download options.', 'info');
}

function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of main content
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(messageDiv, mainContent.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Analytics Functions
function initializeAnalytics() {
    // Initialize Chart.js for analytics
    const ctx = document.getElementById('performanceChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Content Generated',
                    data: [65, 78, 90, 120, 140, 160],
                    borderColor: 'rgb(102, 126, 234)',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Engagement Rate',
                    data: [28, 35, 42, 48, 55, 62],
                    borderColor: 'rgb(118, 75, 162)',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

function updateAnalyticsAfterPublish(platforms) {
    // Simulate updating analytics after publishing
    const totalGenerated = document.querySelector('.metric-card .metric-value');
    if (totalGenerated) {
        const current = parseInt(totalGenerated.textContent.replace(',', ''));
        totalGenerated.textContent = (current + platforms.length).toLocaleString();
    }
}

// Export functions for use in HTML
window.generateBlogPost = generateBlogPost;
window.generateSocialContent = generateSocialContent;
window.generateTechnicalDocs = generateTechnicalDocs;
window.schedulePost = schedulePost;
window.closeSocialModal = closeSocialModal;
window.publishToSelectedPlatforms = publishToSelectedPlatforms;
window.copyToClipboard = copyToClipboard;
window.downloadContent = downloadContent;
window.exportToPlatform = exportToPlatform; 