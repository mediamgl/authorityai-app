import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Users, Eye, Share2, Clock, Target, Award } from 'lucide-react'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalShares: 0,
    authorityScore: 0,
    contentCount: 0,
    engagementRate: 0,
    viralPredictionAccuracy: 0,
    monthlyGrowth: 0,
    topPerformingContent: []
  })

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setAnalytics({
        totalViews: 15420,
        totalShares: 892,
        authorityScore: 87,
        contentCount: 12,
        engagementRate: 8.4,
        viralPredictionAccuracy: 94,
        monthlyGrowth: 12,
        topPerformingContent: [
          {
            id: 1,
            title: 'The Future of AI in Enterprise Decision Making',
            views: 3240,
            shares: 189,
            viralScore: 92
          },
          {
            id: 2,
            title: 'Remote Work Productivity: Metrics vs Trust',
            views: 2890,
            shares: 167,
            viralScore: 85
          },
          {
            id: 3,
            title: 'Cybersecurity in the Age of Distributed Teams',
            views: 2100,
            shares: 134,
            viralScore: 78
          }
        ]
      })
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
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
          <LoadingSpinner size="large" text="Loading analytics..." />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="mr-3 text-authority-blue" size={28} />
            Analytics & Insights
          </h1>
          <p className="text-gray-600 mt-1">
            Track your thought leadership impact and authority growth
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Authority Score</p>
                <p className="text-3xl font-bold text-authority-blue">{analytics.authorityScore}/100</p>
                <p className="text-sm text-success">+5 this month</p>
              </div>
              <div className="w-12 h-12 bg-authority-blue bg-opacity-10 rounded-lg flex items-center justify-center">
                <Award className="text-authority-blue" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
                <p className="text-sm text-success">+{analytics.monthlyGrowth}% this month</p>
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
                <p className="text-3xl font-bold text-gray-900">{analytics.totalShares}</p>
                <p className="text-sm text-success">+8% this month</p>
              </div>
              <div className="w-12 h-12 bg-authority-gold bg-opacity-10 rounded-lg flex items-center justify-center">
                <Share2 className="text-authority-gold" size={24} />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Engagement Rate</p>
                <p className="text-3xl font-bold text-gray-900">{analytics.engagementRate}%</p>
                <p className="text-sm text-success">Above average</p>
              </div>
              <div className="w-12 h-12 bg-success bg-opacity-10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-success" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Published Content</span>
                <span className="font-semibold">{analytics.contentCount} pieces</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Avg. Engagement Rate</span>
                <span className="font-semibold">{analytics.engagementRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Viral Prediction Accuracy</span>
                <span className="font-semibold text-success">{analytics.viralPredictionAccuracy}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Monthly Growth</span>
                <span className="font-semibold text-success">+{analytics.monthlyGrowth}%</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Authority Growth</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Industry Recognition</span>
                <span className="font-semibold text-success">Growing</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Thought Leadership Score</span>
                <span className="font-semibold">{analytics.authorityScore}/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Content Quality Score</span>
                <span className="font-semibold">92/100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Influence Reach</span>
                <span className="font-semibold">High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Content</h3>
          <div className="space-y-4">
            {analytics.topPerformingContent.map((content, index) => (
              <div key={content.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-6 h-6 bg-authority-blue text-white text-sm font-bold rounded">
                      {index + 1}
                    </span>
                    <h4 className="font-medium text-gray-900 line-clamp-1">
                      {content.title}
                    </h4>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Eye size={14} className="mr-1" />
                    {content.views.toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <Share2 size={14} className="mr-1" />
                    {content.shares}
                  </span>
                  <span className={getViralScoreColor(content.viralScore)}>
                    {content.viralScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  Your content performs 23% better than industry average
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-authority-blue rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  AI-related topics generate the highest engagement
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-authority-gold rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">
                  Tuesday and Wednesday posts receive 40% more shares
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Target className="text-authority-blue mt-1" size={16} />
                <p className="text-sm text-gray-700">
                  Focus on AI and remote work topics for maximum impact
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Target className="text-authority-blue mt-1" size={16} />
                <p className="text-sm text-gray-700">
                  Publish content on Tuesday-Wednesday for optimal reach
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <Target className="text-authority-blue mt-1" size={16} />
                <p className="text-sm text-gray-700">
                  Increase posting frequency to 2-3 times per week
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="card">
          <div className="text-center py-8">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              Detailed charts, competitor analysis, and predictive insights are in development.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>• Engagement trends</span>
              <span>• Audience insights</span>
              <span>• ROI tracking</span>
              <span>• Competitor analysis</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AnalyticsPage

