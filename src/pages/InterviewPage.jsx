import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MessageCircle, Mic, MicOff, Send, Lightbulb, ArrowLeft } from 'lucide-react'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'
import axios from 'axios'

const InterviewPage = () => {
  const navigate = useNavigate()
  const { sessionId } = useParams()
  const [loading, setLoading] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState(sessionId)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [progress, setProgress] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [conversation, setConversation] = useState([])
  const [template, setTemplate] = useState('')
  const [topics, setTopics] = useState([])
  const [showTemplateSelection, setShowTemplateSelection] = useState(!sessionId)

  const templates = [
    {
      id: 'opinion-piece',
      name: 'Opinion Piece',
      description: '800-1200 words • Clear position with call to action',
      estimatedQuestions: '4-5 questions',
      icon: '📝'
    },
    {
      id: 'industry-analysis',
      name: 'Industry Analysis',
      description: '1200-1800 words • Market trends and strategic insights',
      estimatedQuestions: '5-6 questions',
      icon: '📊'
    },
    {
      id: 'position-paper',
      name: 'Position Paper',
      description: '1500-2500 words • Policy and technical analysis',
      estimatedQuestions: '6-7 questions',
      icon: '📋'
    },
    {
      id: 'executive-commentary',
      name: 'Executive Commentary',
      description: '1000-1500 words • Leadership perspective and vision',
      estimatedQuestions: '5-6 questions',
      icon: '👔'
    }
  ]

  useEffect(() => {
    if (sessionId) {
      loadInterviewSession()
    } else {
      loadTopicsFromSession()
    }
  }, [sessionId])

  const loadTopicsFromSession = () => {
    const selectedTopics = JSON.parse(sessionStorage.getItem('selectedTopics') || '[]')
    const synthesis = JSON.parse(sessionStorage.getItem('topicSynthesis') || 'null')
    
    if (selectedTopics.length === 0) {
      toast.error('No topics selected. Redirecting to Viral Velocity.')
      navigate('/viral-velocity')
      return
    }
    
    setTopics(selectedTopics)
  }

  const loadInterviewSession = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/interview/${sessionId}`)
      const session = response.data
      
      setCurrentQuestion(session.currentQuestion)
      setProgress(session.progress)
      setConversation(session.conversation || [])
      setTemplate(session.template)
      setTopics(session.topics)
    } catch (error) {
      console.error('Failed to load interview session:', error)
      toast.error('Failed to load interview session')
      navigate('/viral-velocity')
    } finally {
      setLoading(false)
    }
  }

  const startInterview = async (selectedTemplate) => {
    try {
      setLoading(true)
      setTemplate(selectedTemplate)
      
      const response = await axios.post('/api/interview/start', {
        topics,
        template: selectedTemplate
      })
      
      setCurrentSessionId(response.data.sessionId)
      setCurrentQuestion(response.data.question)
      setProgress(response.data.progress)
      setShowTemplateSelection(false)
      
      // Add first question to conversation
      setConversation([{
        type: 'question',
        content: response.data.question,
        timestamp: new Date()
      }])
      
      toast.success('Interview started! Let\'s explore your insights.')
    } catch (error) {
      console.error('Failed to start interview:', error)
      toast.error('Failed to start interview')
    } finally {
      setLoading(false)
    }
  }

  const submitResponse = async () => {
    if (!response.trim()) {
      toast.error('Please provide a response')
      return
    }

    try {
      setLoading(true)
      
      // Add response to conversation
      const newConversation = [...conversation, {
        type: 'response',
        content: response,
        timestamp: new Date()
      }]
      setConversation(newConversation)
      
      const result = await axios.post(`/api/interview/${currentSessionId}/respond`, {
        response: response.trim()
      })
      
      setResponse('')
      setProgress(result.data.progress)
      
      if (result.data.completed) {
        toast.success('Interview completed! Generating your content...')
        navigate(`/content/generate?session=${currentSessionId}`)
      } else {
        setCurrentQuestion(result.data.question)
        
        // Add next question to conversation
        setConversation(prev => [...prev, {
          type: 'question',
          content: result.data.question,
          timestamp: new Date()
        }])
      }
    } catch (error) {
      console.error('Failed to submit response:', error)
      toast.error('Failed to submit response')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      submitResponse()
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording logic would go here
      setIsRecording(false)
      toast.success('Recording stopped')
    } else {
      // Start recording logic would go here
      setIsRecording(true)
      toast.success('Recording started')
    }
  }

  const getInspirationPrompt = () => {
    const prompts = [
      "Think about a specific example from your experience...",
      "What would you tell a colleague facing this challenge?",
      "How has your perspective on this evolved over time?",
      "What evidence supports your viewpoint?",
      "What are the potential counterarguments to consider?"
    ]
    return prompts[Math.floor(Math.random() * prompts.length)]
  }

  if (loading && !currentQuestion) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="large" text="Preparing your interview..." />
        </div>
      </Layout>
    )
  }

  if (showTemplateSelection) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <button
              onClick={() => navigate('/viral-velocity')}
              className="flex items-center text-authority-blue hover:text-authority-blue/80 transition-colors mb-6"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to topic selection
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Content Format
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the type of content you want to create. This determines the 
              interview structure and final output format.
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => startInterview(tmpl.id)}
                className="card-hover cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{tmpl.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tmpl.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{tmpl.description}</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span>{tmpl.estimatedQuestions}</span>
                    <span>•</span>
                    <span>10-15 minutes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Topics Preview */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Selected Topics</h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((topicId, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-authority-blue bg-opacity-10 text-authority-blue rounded-full text-sm"
                >
                  Topic {topicId}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageCircle className="mr-3 text-authority-blue" size={28} />
              Dynamic Interview
            </h1>
            <p className="text-gray-600 mt-1">
              {template.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} • 
              Extracting your unique insights and expertise
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Progress</div>
            <div className="w-32 progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm font-medium text-gray-700 mt-1">
              {Math.round(progress)}% Complete
            </div>
          </div>
        </div>

        {/* Conversation History */}
        {conversation.length > 2 && (
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Conversation History</h3>
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {conversation.slice(0, -1).map((item, index) => (
                <div key={index} className={`text-sm ${
                  item.type === 'question' 
                    ? 'text-authority-blue font-medium' 
                    : 'text-gray-700 ml-4'
                }`}>
                  {item.type === 'question' ? 'Q: ' : 'A: '}{item.content}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Question */}
        <div className="card">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-authority-blue bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="text-authority-blue" size={20} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">
                  Question {conversation.filter(c => c.type === 'question').length}
                </h3>
                <span className="text-sm text-gray-500">
                  AI-generated based on your responses
                </span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-900 font-medium leading-relaxed">
                  {currentQuestion}
                </p>
              </div>
              
              {progress > 50 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Challenge Mode:</strong> This question is designed to 
                    challenge your thinking and extract deeper insights based on 
                    your previous responses.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Response Input */}
        <div className="card">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Your Response</h3>
              <button
                onClick={() => toast.info(getInspirationPrompt())}
                className="flex items-center text-authority-blue hover:text-authority-blue/80 text-sm"
              >
                <Lightbulb size={16} className="mr-1" />
                Need inspiration?
              </button>
            </div>
            
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts, experiences, and insights. Be specific and draw from your expertise..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-blue focus:border-transparent resize-none"
              disabled={loading}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleRecording}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isRecording
                      ? 'bg-error text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff size={16} className="mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic size={16} className="mr-2" />
                      Voice Input
                    </>
                  )}
                </button>
                
                <span className="text-sm text-gray-500">
                  {response.length} characters • Ctrl+Enter to submit
                </span>
              </div>
              
              <button
                onClick={submitResponse}
                disabled={loading || !response.trim()}
                className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
                  loading || !response.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {loading ? (
                  <LoadingSpinner size="small" color="white" />
                ) : (
                  <>
                    Submit Response
                    <Send size={16} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">💡 Interview Tips</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Be specific and draw from your real experiences</li>
            <li>• Include examples, data, or case studies when relevant</li>
            <li>• Don't worry about perfect grammar - focus on your insights</li>
            <li>• The AI will challenge your thinking to extract deeper perspectives</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default InterviewPage

