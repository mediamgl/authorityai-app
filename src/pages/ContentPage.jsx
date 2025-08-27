import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { 
  FileText, 
  Download, 
  Share2, 
  Edit3, 
  Eye, 
  Copy,
  CheckCircle,
  Clock,
  BarChart3,
  ExternalLink
} from 'lucide-react'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'
import axios from 'axios'

const ContentPage = () => {
  const { contentId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const sessionId = searchParams.get('session')
  
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [content, setContent] = useState(null)
  const [editing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')

  useEffect(() => {
    if (sessionId) {
      generateContent()
    } else if (contentId) {
      loadContent()
    } else {
      loadContentList()
    }
  }, [contentId, sessionId])

  const generateContent = async () => {
    try {
      setGenerating(true)
      
      const response = await axios.post('/api/content/generate', {
        sessionId
      })
      
      setContent({
        id: response.data.contentId,
        title: response.data.title,
        content: response.data.content,
        viralScore: response.data.viralScore,
        type: 'Opinion Piece',
        status: 'draft',
        createdAt: new Date().toISOString(),
        analytics: {
          views: 0,
          shares: 0,
          engagement: 0
        }
      })
      
      toast.success('Content generated successfully!')
    } catch (error) {
      console.error('Failed to generate content:', error)
      toast.error('Failed to generate content')
      navigate('/dashboard')
    } finally {
      setGenerating(false)
    }
  }

  const loadContent = async () => {
    try {
      setLoading(true)
      // Mock content loading
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setContent({
        id: contentId,
        title: 'The Promise and Peril of AI-Powered Productivity Monitoring in Remote Work',
        content: `As organizations worldwide grapple with the complexities of remote work management, a new technological solution has emerged that promises to solve productivity concerns while potentially creating even greater challenges. The integration of artificial intelligence into productivity monitoring systems represents both an opportunity and a significant risk for the future of work.

## The Current Landscape

The shift to remote work has fundamentally altered how we measure and manage productivity. Traditional metrics—time spent at a desk, visible activity, in-person collaboration—have become obsolete overnight. In their place, organizations are increasingly turning to AI-powered monitoring tools that promise to provide objective, data-driven insights into employee performance.

These systems can track everything from keystroke patterns and application usage to email response times and video call participation. The technology is sophisticated, offering granular analytics that would have been impossible in traditional office environments. For executives under pressure to maintain productivity standards, these tools appear to offer a compelling solution.

## The Trust Paradox

However, my experience leading distributed teams at TechCorp has revealed a fundamental paradox: the more we monitor, the less we trust—and the less our teams trust us. When employees know their every digital move is being tracked and analyzed, it creates an environment of surveillance rather than empowerment.

This isn't merely a philosophical concern; it has measurable business impacts. Teams operating under intensive monitoring show decreased innovation, reduced risk-taking, and lower overall job satisfaction. The very productivity these systems aim to enhance can actually decline when trust erodes.

## The Human Element

What AI monitoring systems fundamentally miss is the human element of productivity. They can measure activity but not creativity. They can track time but not insight. They can monitor compliance but not commitment.

Real productivity in knowledge work often looks like staring out a window while processing complex problems, or having an impromptu conversation that sparks breakthrough thinking. These moments of apparent "inactivity" are often where the most valuable work happens—yet they're precisely what AI monitoring systems flag as concerning.

## A Better Path Forward

The solution isn't to abandon technology entirely, but to use it more thoughtfully. Instead of monitoring for surveillance, we should focus on monitoring for support. AI can help identify when team members are struggling, when workloads are unbalanced, or when collaboration patterns suggest communication breakdowns.

The key is transparency and employee agency. When monitoring tools are used to help rather than police, when data is shared openly rather than hoarded by management, and when employees have control over their own productivity metrics, technology becomes an enabler rather than an inhibitor.

## Recommendations for Leaders

1. **Start with trust, not surveillance.** Establish clear expectations and outcomes, then give teams the autonomy to achieve them.

2. **Make monitoring transparent.** If you're collecting data, share it with employees and involve them in interpreting what it means.

3. **Focus on outcomes, not activity.** Measure results and impact, not hours logged or applications used.

4. **Involve employees in tool selection.** When teams help choose their productivity tools, adoption and acceptance increase dramatically.

5. **Regular check-ins over constant monitoring.** Human connection and regular communication are more effective than algorithmic oversight.

## The Future of Work

As we navigate this new landscape, we must remember that productivity is ultimately about human potential, not machine metrics. The organizations that thrive in the remote work era will be those that use technology to amplify human capabilities rather than replace human judgment.

The promise of AI-powered productivity monitoring is real, but so is the peril. The choice of which path we take will define not just our productivity, but our workplace culture for years to come.`,
        type: 'Opinion Piece',
        status: 'draft',
        viralScore: 87,
        createdAt: '2024-01-15T10:30:00Z',
        analytics: {
          views: 1240,
          shares: 89,
          engagement: 7.2
        }
      })
    } catch (error) {
      console.error('Failed to load content:', error)
      toast.error('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  const loadContentList = () => {
    navigate('/dashboard')
  }

  const handleEdit = () => {
    setEditing(true)
    setEditedContent(content.content)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      
      // Mock save
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setContent(prev => ({ ...prev, content: editedContent }))
      setEditing(false)
      toast.success('Content updated successfully!')
    } catch (error) {
      toast.error('Failed to save changes')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content.content)
    toast.success('Content copied to clipboard!')
  }

  const handlePublish = async () => {
    try {
      setLoading(true)
      
      // Mock publish
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setContent(prev => ({ ...prev, status: 'published' }))
      toast.success('Content published successfully!')
    } catch (error) {
      toast.error('Failed to publish content')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-success bg-opacity-10 text-success'
      case 'draft':
        return 'bg-warning bg-opacity-10 text-warning'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getViralScoreColor = (score) => {
    if (score >= 90) return 'viral-score-high'
    if (score >= 70) return 'viral-score-medium'
    return 'viral-score-low'
  }

  if (generating) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <div className="mb-8">
              <LoadingSpinner size="large" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Generating Your Position Paper
            </h2>
            
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="text-success mr-2" size={16} />
                Analyzing conversation insights
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="text-success mr-2" size={16} />
                Applying template structure
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="text-success mr-2" size={16} />
                Integrating your voice profile
              </div>
              <div className="flex items-center text-sm text-authority-blue">
                <Clock className="animate-spin mr-2" size={16} />
                Finding authoritative sources
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="mr-2" size={16} />
                Generating citations
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="mr-2" size={16} />
                Final quality review
              </div>
            </div>
            
            <p className="text-gray-500 mt-6">
              Estimated completion: 2-3 minutes
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  if (loading && !content) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="large" text="Loading content..." />
        </div>
      </Layout>
    )
  }

  if (!content) {
    return (
      <Layout>
        <div className="text-center py-16">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No content found</h2>
          <p className="text-gray-500 mb-6">The content you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(content.status)}`}>
                {content.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{content.type}</span>
              <span>•</span>
              <span>{new Date(content.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span className={getViralScoreColor(content.viralScore)}>
                Viral Score: {content.viralScore}/100
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="btn-secondary flex items-center"
            >
              <Copy size={16} className="mr-2" />
              Copy
            </button>
            
            <button
              onClick={handleEdit}
              className="btn-secondary flex items-center"
            >
              <Edit3 size={16} className="mr-2" />
              Edit
            </button>
            
            {content.status === 'draft' && (
              <button
                onClick={handlePublish}
                disabled={loading}
                className="btn-primary flex items-center"
              >
                {loading ? (
                  <LoadingSpinner size="small" color="white" />
                ) : (
                  <>
                    <ExternalLink size={16} className="mr-2" />
                    Publish
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Views</p>
                <p className="text-2xl font-bold text-gray-900">{content.analytics.views.toLocaleString()}</p>
              </div>
              <Eye className="text-gray-400" size={24} />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shares</p>
                <p className="text-2xl font-bold text-gray-900">{content.analytics.shares}</p>
              </div>
              <Share2 className="text-gray-400" size={24} />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement</p>
                <p className="text-2xl font-bold text-gray-900">{content.analytics.engagement}%</p>
              </div>
              <BarChart3 className="text-gray-400" size={24} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card">
          {editing ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Edit Content</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditing(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? <LoadingSpinner size="small" color="white" /> : 'Save Changes'}
                  </button>
                </div>
              </div>
              
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-blue focus:border-transparent resize-none font-mono text-sm"
              />
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap content-text">
                {content.content}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {!editing && (
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Distribution Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-authority-blue hover:bg-authority-blue hover:bg-opacity-5 transition-colors">
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-2"></div>
                  <span className="text-sm font-medium">LinkedIn Article</span>
                </div>
              </button>
              
              <button className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-authority-blue hover:bg-authority-blue hover:bg-opacity-5 transition-colors">
                <div className="text-center">
                  <div className="w-8 h-8 bg-black rounded mx-auto mb-2"></div>
                  <span className="text-sm font-medium">Twitter Thread</span>
                </div>
              </button>
              
              <button className="flex items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-authority-blue hover:bg-authority-blue hover:bg-opacity-5 transition-colors">
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-600 rounded mx-auto mb-2"></div>
                  <span className="text-sm font-medium">Blog Post</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ContentPage

