import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const OnboardingPage = () => {
  const navigate = useNavigate()
  const { updateProfile } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    expertise: [],
    writingSamples: '',
    voiceProfile: '',
    goals: []
  })

  const steps = [
    { id: 1, title: 'Expertise Areas', description: 'Define your areas of authority' },
    { id: 2, title: 'Voice & Style', description: 'Help us learn your writing voice' },
    { id: 3, title: 'Goals & Objectives', description: 'Set your thought leadership goals' }
  ]

  const expertiseOptions = [
    'Digital Transformation',
    'Enterprise Software',
    'Team Leadership',
    'Strategic Planning',
    'Artificial Intelligence',
    'Cybersecurity',
    'Data Analytics',
    'Cloud Computing',
    'Product Management',
    'Marketing Strategy',
    'Sales Operations',
    'Financial Planning',
    'Human Resources',
    'Operations Management',
    'Innovation Management'
  ]

  const goalOptions = [
    'Build industry recognition',
    'Generate qualified leads',
    'Establish thought leadership',
    'Grow professional network',
    'Share knowledge and insights',
    'Drive business growth',
    'Influence industry trends',
    'Build personal brand'
  ]

  const handleExpertiseToggle = (expertise) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.includes(expertise)
        ? prev.expertise.filter(e => e !== expertise)
        : [...prev.expertise, expertise]
    }))
  }

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const handleNext = () => {
    if (currentStep === 1 && formData.expertise.length === 0) {
      toast.error('Please select at least one expertise area')
      return
    }
    
    if (currentStep === 2 && !formData.writingSamples.trim()) {
      toast.error('Please provide a writing sample')
      return
    }
    
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    if (formData.goals.length === 0) {
      toast.error('Please select at least one goal')
      return
    }

    setLoading(true)
    
    try {
      const result = await updateProfile({
        onboardingCompleted: true,
        profile: {
          expertise: formData.expertise,
          writingSamples: [formData.writingSamples],
          voiceProfile: formData.voiceProfile,
          goals: formData.goals,
          authorityScore: Math.floor(Math.random() * 30) + 50 // Initial score
        }
      })
      
      if (result.success) {
        toast.success('Profile setup completed!')
        navigate('/dashboard')
      }
    } catch (error) {
      toast.error('Failed to complete setup')
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What are your areas of expertise?
        </h2>
        <p className="text-gray-600">
          Select the topics where you have legitimate authority to contribute. 
          This ensures your content is authentic and credible.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {expertiseOptions.map((expertise) => (
          <button
            key={expertise}
            onClick={() => handleExpertiseToggle(expertise)}
            className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
              formData.expertise.includes(expertise)
                ? 'border-authority-blue bg-authority-blue bg-opacity-10 text-authority-blue'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            {expertise}
          </button>
        ))}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Choose areas where you have professional experience, 
          education, or demonstrated expertise. Quality over quantity is key for 
          building authentic authority.
        </p>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Help us learn your writing voice
        </h2>
        <p className="text-gray-600">
          Provide a writing sample so we can maintain your authentic voice 
          in generated content.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Writing Sample (200-500 words)
          </label>
          <textarea
            value={formData.writingSamples}
            onChange={(e) => setFormData(prev => ({ ...prev, writingSamples: e.target.value }))}
            placeholder="Share your perspective on a recent industry trend or challenge in your field. This helps us understand your unique voice, style, and approach to communication..."
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-blue focus:border-transparent resize-none"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formData.writingSamples.length}/500 characters
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Communication Style (Optional)
          </label>
          <select
            value={formData.voiceProfile}
            onChange={(e) => setFormData(prev => ({ ...prev, voiceProfile: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-authority-blue"
          >
            <option value="">Select your preferred style</option>
            <option value="professional">Professional & Formal</option>
            <option value="conversational">Conversational & Approachable</option>
            <option value="analytical">Analytical & Data-Driven</option>
            <option value="visionary">Visionary & Forward-Thinking</option>
            <option value="practical">Practical & Solution-Oriented</option>
          </select>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Privacy Note:</strong> Your writing samples are used only to 
          train your personal voice model and are never shared or used for other purposes.
        </p>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What are your thought leadership goals?
        </h2>
        <p className="text-gray-600">
          Understanding your objectives helps us tailor content recommendations 
          and measure your success.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {goalOptions.map((goal) => (
          <button
            key={goal}
            onClick={() => handleGoalToggle(goal)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              formData.goals.includes(goal)
                ? 'border-authority-blue bg-authority-blue bg-opacity-10 text-authority-blue'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                formData.goals.includes(goal)
                  ? 'border-authority-blue bg-authority-blue'
                  : 'border-gray-300'
              }`}>
                {formData.goals.includes(goal) && (
                  <CheckCircle size={12} className="text-white" />
                )}
              </div>
              <span className="font-medium">{goal}</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <strong>Success Tracking:</strong> We'll help you measure progress 
          toward these goals through our analytics dashboard and authority scoring system.
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'border-authority-blue bg-authority-blue text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle size={20} />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-authority-blue' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-authority-blue' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          
          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </button>
            
            <div className="text-sm text-gray-500">
              Step {currentStep} of {steps.length}
            </div>
            
            <button
              onClick={handleNext}
              disabled={loading}
              className="btn-primary flex items-center"
            >
              {loading ? (
                <LoadingSpinner size="small" color="white" />
              ) : (
                <>
                  {currentStep === 3 ? 'Complete Setup' : 'Next'}
                  <ArrowRight size={16} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage

