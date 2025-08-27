import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  TrendingUp, 
  Filter, 
  RefreshCw, 
  ExternalLink, 
  Clock,
  Users,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const ViralVelocityPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [topics, setTopics] = useState([])
  const [selectedTopics, setSelectedTopics] = useState([])
  const [filters, setFilters] = useState({
    viralScore: 'all',
    relevance: 'all',
    timeframe: 'all'
  })
  const [synthesis, setSynthesis] = useState(null)

  useEffect(() => {
    loadTrendingTopics()
  }, [filters])

  useEffect(() => {
    if (selectedTopics.length >= 2) {
      generateSynthesis()
    } else {
      setSynthesis(null)
    }
  }, [selectedTopics])

  const loadTrendingTopics = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockTopics = [
        {
          id: 1,
          title: 'AI Ethics in Enterprise Decision Making',
          summary: 'New EU regulations spark debate about AI transparency and accountability in business decisions.',
          viralScore: 94,
          relevance: 'High',
          engagement: '3.2k',
          timeframe: '6 hours',
          sentiment: 'Mixed',
          source: 'TechCrunch',
          sourceUrl: 'https://techcrunch.com/ai-ethics-enterprise',
          category: 'Technology'
        },
        {
          id: 2,
          title: 'Remote Work Productivity Measurement',
          summary: 'Microsoft study reveals surprising data about productivity metrics and employee satisfaction.',
          viralScore: 89,
          relevance: 'High',
          engagement: '2.8k',
          timeframe: '4 hours',
          sentiment: 'Positive',
          source: 'Harvard Business Review',
          sourceUrl: 'https://hbr.org/remote-work-productivity',
          category: 'Business'
        },
        {
          id: 3,
          title: 'Quantum Computing Breakthrough Applications',
          summary: 'IBM announces practical quantum computing applications for financial modeling and optimization.',
          viralScore: 86,
          relevance: 'Medium',
          engagement: '2.1k',
          timeframe: '8 hours',
          sentiment: 'Positive',
          source: 'Nature',
          sourceUrl: 'https://nature.com/quantum-breakthrough',
          category: 'Technology'
        },
        {
          id: 4,
          title: 'Sustainable Technology Investment Trends',
          summary: 'ESG-focused tech investments reach record highs as companies prioritize sustainability.',
          viralScore: 82,
          relevance: 'High',
          engagement: '1.9k',
          timeframe: '12 hours',
          sentiment: 'Positive',
          source: 'Bloomberg',
          sourceUrl: 'https://bloomberg.com/sustainable-tech',
          category: 'Finance'
        },
        {
          id: 5,
          title: 'Cybersecurity in Distributed Teams',
          summary: 'Zero-trust architecture becomes essential as remote work creates new security challenges.',
          viralScore: 78,
          relevance: 'Medium',
          engagement: '1.5k',
          timeframe: '18 hours',
          sentiment: 'Concerned',
          source: 'Security Week',
          sourceUrl: 'https://securityweek.com/zero-trust',
          category: 'Security'
        },
        {
          id: 6,
          title: 'Leadership Communication in Crisis',
          summary: 'Study shows authentic leadership communication drives 40% better crisis outcomes.',
          viralScore: 75,
          relevance: 'High',
          engagement: '1.3k',
          timeframe: '1 day',
          sentiment: 'Positive',
          source: 'McKinsey',
          sourceUrl: 'https://mckinsey.com/leadership-crisis',
          category: 'Leadership'
        }
      ]
      
      setTopics(mockTopics)
    } catch (error) {
      console.error('Failed to load trending topics:', error)
      toast.error('Failed to load trending topics')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const generateSynthesis = async () => {
    try {
      const selectedTopicData = topics.filter(topic => 
        selectedTopics.includes(topic.id)
      )
      
      // Simulate AI synthesis
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setSynthesis({
        title: `The Intersection of ${selectedTopicData[0].title.split(' ').slice(0, 3).join(' ')} and ${selectedTopicData[1].title.split(' ').slice(0, 3).join(' ')}`,
        summary: `The convergence of ${selectedTopicData[0].title.toLowerCase()} and ${selectedTopicData[1].title.toLowerCase()} creates unique opportunities for thought leadership. This intersection addresses critical challenges facing modern organizations while highlighting emerging trends that will shape the future of business.`,
        angles: [
          'Strategic implications for enterprise decision-making',
          'Risk management and compliance considerations',
          'Future-proofing organizational capabilities',
          'Competitive advantages through early adoption'
        ],
        complexity: selectedTopics.length > 2 ? 'High' : 'Medium',
        estimatedLength: selectedTopics.length > 2 ? '1800-2200 words' : '1200-1600 words'
      })
    } catch (error) {
      console.error('Failed to generate synthesis:', error)
    }
  }

  const handleTopicSelect = (topicId) => {
    if (selectedTopics.includes(topicId)) {
      setSelectedTopics(prev => prev.filter(id => id !== topicId))
    } else if (selectedTopics.length < 3) {
      setSelectedTopics(prev => [...prev, topicId])
    } else {
      toast.error('You can select up to 3 topics maximum')
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    loadTrendingTopics()
  }

  const handleContinue = () => {
    if (selectedTopics.length < 2) {
      toast.error('Please select at least 2 topics to continue')
      return
    }
    
    // Store selected topics and synthesis in session storage
    sessionStorage.setItem('selectedTopics', JSON.stringify(selectedTopics))
    sessionStorage.setItem('topicSynthesis', JSON.stringify(synthesis))
    
    navigate('/interview')
  }

  const getViralScoreColor = (score) => {
    if (score >= 90) return 'viral-score-high'
    if (score >= 70) return 'viral-score-medium'
    return 'viral-score-low'
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-success'
      case 'negative':
        return 'text-error'
      case 'concerned':
        return 'text-warning'
      default:
        return 'text-gray-600'
    }
  }

  const filteredTopics = topics.filter(topic => {
    if (filters.viralScore !== 'all') {
      const minScore = parseInt(filters.viralScore)
      if (topic.viralScore < minScore) return false
    }
    
    if (filters.relevance !== 'all' && topic.relevance.toLowerCase() !== filters.relevance) {
      return false
    }
    
    return true
  })

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="large" text="Loading viral trends..." />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="mr-3 text-authority-blue" size={28} />
              Viral Velocity Engine
            </h1>
            <p className="text-gray-600 mt-1">
              Trending topics curated for your expertise • Last updated: 2 minutes ago
            </p>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn-secondary flex items-center"
          >
            <RefreshCw className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} size={16} />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>
            
            <select
              value={filters.viralScore}
              onChange={(e) => setFilters(prev => ({ ...prev, viralScore: e.target.value }))}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-authority-blue"
            >
              <option value="all">All Viral Scores</option>
              <option value="90">90+ (Extremely High)</option>
              <option value="80">80+ (High)</option>
              <option value="70">70+ (Medium)</option>
            </select>
            
            <select
              value={filters.relevance}
              onChange={(e) => setFilters(prev => ({ ...prev, relevance: e.target.value }))}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-authority-blue"
            >
              <option value="all">All Relevance</option>
              <option value="high">High Relevance</option>
              <option value="medium">Medium Relevance</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Topics List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className={`card-hover border-2 transition-all ${
                  selectedTopics.includes(topic.id)
                    ? 'border-authority-blue bg-authority-blue bg-opacity-5'
                    : 'border-gray-200'
                }`}
                onClick={() => handleTopicSelect(topic.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        selectedTopics.includes(topic.id)
                          ? 'border-authority-blue bg-authority-blue'
                          : 'border-gray-300'
                      }`}>
                        {selectedTopics.includes(topic.id) && (
                          <CheckCircle2 size={12} className="text-white" />
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{topic.summary}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className={getViralScoreColor(topic.viralScore)}>
                        Viral: {topic.viralScore}/100
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        topic.relevance === 'High' 
                          ? 'bg-success bg-opacity-10 text-success' 
                          : 'bg-warning bg-opacity-10 text-warning'
                      }`}>
                        {topic.relevance} relevance
                      </span>
                      <span className="flex items-center">
                        <Users size={14} className="mr-1" />
                        {topic.engagement}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {topic.timeframe} ago
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex flex-col items-end space-y-2">
                    <span className={`text-xs font-medium ${getSentimentColor(topic.sentiment)}`}>
                      {topic.sentiment}
                    </span>
                    <a
                      href={topic.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-authority-blue hover:text-authority-blue/80 flex items-center text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {topic.source}
                      <ExternalLink size={12} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selection Summary */}
          <div className="space-y-6">
            {/* Selected Topics */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">
                Selected Topics ({selectedTopics.length}/3)
              </h3>
              
              {selectedTopics.length === 0 ? (
                <div className="text-center py-6">
                  <AlertCircle className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Select 2-3 topics to generate synthesis
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedTopics.map((topicId) => {
                    const topic = topics.find(t => t.id === topicId)
                    return (
                      <div key={topicId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-900 line-clamp-2">
                          {topic?.title}
                        </span>
                        <button
                          onClick={() => handleTopicSelect(topicId)}
                          className="text-gray-400 hover:text-gray-600 ml-2"
                        >
                          ×
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Synthesis Preview */}
            {synthesis && (
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4">Synthesis Preview</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{synthesis.title}</h4>
                    <p className="text-sm text-gray-600">{synthesis.summary}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Potential angles:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {synthesis.angles.map((angle, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-authority-blue mr-2">•</span>
                          {angle}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Complexity: <span className="font-medium">{synthesis.complexity}</span>
                    </span>
                    <span className="text-gray-500">
                      Length: <span className="font-medium">{synthesis.estimatedLength}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={selectedTopics.length < 2}
              className={`w-full flex items-center justify-center ${
                selectedTopics.length >= 2
                  ? 'btn-primary'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-3 rounded-lg'
              }`}
            >
              Continue to Templates
              <ArrowRight className="ml-2" size={16} />
            </button>
            
            {selectedTopics.length < 2 && (
              <p className="text-xs text-gray-500 text-center">
                Select at least 2 topics to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ViralVelocityPage

