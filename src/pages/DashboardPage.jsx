import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  MessageCircle, 
  FileText, 
  BarChart3,
  Plus,
  ArrowRight,
  Clock,
  Eye,
  Share2
} from 'lucide-react'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../contexts/AuthContext'

const DashboardPage = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalContent: 0,
    totalViews: 0,
    totalShares: 0,
    authorityScore: 0
  })
  const [recentContent, setRecentContent] = useState([])
  const [trendingTopics, setTrendingTopics] = useState([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStats({
        totalContent: 12,
        totalViews: 8420,
        totalShares: 342,
        authorityScore: 87
      })
      
      setRecentContent([
        {
          id: 1,
          title: 'The Future of AI in Enterprise Decision Making',
          type: 'Opinion Piece',
          status: 'published',
          views: 1240,
          shares: 89,
          createdAt: '2024-01-15',
          viralScore: 92
        },
        {
          id: 2,
          title: 'Remote Work Productivity: Metrics vs Trust',
          type: 'Industry Analysis',
          status: 'draft',
          views: 0,
          shares: 0,
          createdAt: '2024-01-14',
          viralScore: 85
        },
        {
          id: 3,
          title: 'Cybersecurity in the Age of Distributed Teams',
          type: 'Position Paper',
          status: 'published',
          views: 890,
          shares: 67,
          createdAt: '2024-01-12',
          viralScore: 78
        }
      ])
      
      setTrendingTopics([
        {
          id: 1,
          title: 'AI Ethics in Healthcare Decision Making',
          viralScore: 94,
          relevance: 'High',
          engagement: '3.2k',
          timeframe: '6 hours'
        },
        {
          id: 2,
          title: 'Quantum Computing Breakthrough Applications',
          viralScore: 89,
          relevance: 'Medium',
          engagement: '2.8k',
          timeframe: '4 hours'
        },
        {
          id: 3,
          title: 'Sustainable Technology Investment Trends',
          viralScore: 86,
          relevance: 'High',
          engagement: '2.1k',
          timeframe: '8 hours'
        }
      ])
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
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

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="large" text="Loading your dashboard..." />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-authority-blue to-authority-blue/80 rounded-xl text-white p-6">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-blue-100 mb-4">
            Ready to transform your expertise into influence? Let's create some 
            thought leadership content that establishes your authority.
          </p>
          <Link 
            to="/viral-velocity" 
            className="btn-accent inline-flex items-center"
          >
            Start New Content
            <Plus className="ml-2" size={16} />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Content</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalContent}</p>
              </div>
              <div className="w-12 h-12 bg-authority-blue bg-opacity-10 rounded-lg flex items-center justify-center">
                <FileText className="text-authority-blue" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-success bg-opacity-10 rounded-lg flex items-center justify-center">
                <Eye className="text-success" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Shares</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalShares}</p>
              </div>
              <div className="w-12 h-12 bg-authority-gold bg-opacity-10 rounded-lg flex items-center justify-center">
                <Share2 className="text-authority-gold" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Authority Score</p>
                <p className="text-2xl font-bold text-gray-900">{stats.authorityScore}/100</p>
              </div>
              <div className="w-12 h-12 bg-authority-blue bg-opacity-10 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-authority-blue" size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Content */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Content</h2>
              <Link 
                to="/content" 
                className="text-authority-blue hover:text-authority-blue/80 text-sm font-medium flex items-center"
              >
                View all
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentContent.map((content) => (
                <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:border-authority-blue hover:border-opacity-30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 line-clamp-2">
                      {content.title}
                    </h3>
                    <span className={`${getViralScoreColor(content.viralScore)} ml-2`}>
                      {content.viralScore}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(content.status)}`}>
                        {content.status}
                      </span>
                      <span>{content.type}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        {content.views}
                      </span>
                      <span className="flex items-center">
                        <Share2 size={14} className="mr-1" />
                        {content.shares}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {recentContent.length === 0 && (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No content yet</p>
                <p className="text-sm text-gray-400 mb-4">
                  Create your first piece of thought leadership content
                </p>
                <Link to="/viral-velocity" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Trending Topics */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Trending in Your Expertise</h2>
              <Link 
                to="/viral-velocity" 
                className="text-authority-blue hover:text-authority-blue/80 text-sm font-medium flex items-center"
              >
                Explore all
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {trendingTopics.map((topic) => (
                <div key={topic.id} className="border border-gray-200 rounded-lg p-4 hover:border-authority-blue hover:border-opacity-30 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 line-clamp-2">
                      {topic.title}
                    </h3>
                    <span className={`${getViralScoreColor(topic.viralScore)} ml-2`}>
                      {topic.viralScore}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        topic.relevance === 'High' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'
                      }`}>
                        {topic.relevance} relevance
                      </span>
                      <span>{topic.engagement} engagements</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {topic.timeframe} ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/viral-velocity" className="card-hover">
            <div className="w-12 h-12 bg-authority-blue bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-authority-blue" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Viral Velocity Engine</h3>
            <p className="text-gray-600 mb-4">
              Discover trending topics with viral potential in your expertise areas.
            </p>
            <div className="flex items-center text-authority-blue font-medium">
              Explore trends
              <ArrowRight size={16} className="ml-1" />
            </div>
          </Link>

          <Link to="/interview" className="card-hover">
            <div className="w-12 h-12 bg-authority-gold bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="text-authority-gold" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Dynamic Interview</h3>
            <p className="text-gray-600 mb-4">
              Engage in intelligent conversation that extracts your unique insights.
            </p>
            <div className="flex items-center text-authority-blue font-medium">
              Start interview
              <ArrowRight size={16} className="ml-1" />
            </div>
          </Link>

          <Link to="/analytics" className="card-hover">
            <div className="w-12 h-12 bg-success bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-success" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics & Insights</h3>
            <p className="text-gray-600 mb-4">
              Track your thought leadership impact and authority growth.
            </p>
            <div className="flex items-center text-authority-blue font-medium">
              View analytics
              <ArrowRight size={16} className="ml-1" />
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardPage

