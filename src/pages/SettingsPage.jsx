import React, { useState } from 'react'
import { Settings, User, Key, Bell, Shield, Save, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const SettingsPage = () => {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [showApiKeys, setShowApiKeys] = useState({
    openai: false,
    anthropic: false
  })
  const [settings, setSettings] = useState({
    profile: {
      name: 'Demo User',
      email: 'demo@authorityai.com',
      company: 'Demo Company',
      role: 'executive',
      bio: 'Experienced executive focused on digital transformation and AI implementation.',
      linkedin: '',
      twitter: ''
    },
    apiKeys: {
      openai: '',
      anthropic: ''
    },
    notifications: {
      emailUpdates: true,
      trendAlerts: true,
      contentReminders: false,
      weeklyReports: true,
      viralAlerts: true
    },
    preferences: {
      timezone: 'America/New_York',
      language: 'en',
      contentLength: 'medium',
      writingStyle: 'professional'
    }
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'api-keys', name: 'API Keys', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield }
  ]

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Settings saved successfully!')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  const toggleApiKeyVisibility = (keyType) => {
    setShowApiKeys(prev => ({
      ...prev,
      [keyType]: !prev[keyType]
    }))
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              profile: { ...prev.profile, name: e.target.value }
            }))}
            className="input-field"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              profile: { ...prev.profile, email: e.target.value }
            }))}
            className="input-field"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </label>
          <input
            type="text"
            value={settings.profile.company}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              profile: { ...prev.profile, company: e.target.value }
            }))}
            className="input-field"
            placeholder="Enter your company"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            value={settings.profile.role}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              profile: { ...prev.profile, role: e.target.value }
            }))}
            className="input-field"
          >
            <option value="ceo">CEO/Founder</option>
            <option value="executive">Executive/VP</option>
            <option value="director">Director</option>
            <option value="manager">Manager</option>
            <option value="consultant">Consultant</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Bio
        </label>
        <textarea
          value={settings.profile.bio}
          onChange={(e) => setSettings(prev => ({
            ...prev,
            profile: { ...prev.profile, bio: e.target.value }
          }))}
          className="input-field h-24 resize-none"
          placeholder="Brief description of your professional background and expertise..."
        />
        <p className="text-xs text-gray-500 mt-1">
          This helps AuthorityAI understand your background for better content generation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={settings.profile.linkedin}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              profile: { ...prev.profile, linkedin: e.target.value }
            }))}
            className="input-field"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Twitter/X Profile
          </label>
          <input
            type="url"
            value={settings.profile.twitter}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              profile: { ...prev.profile, twitter: e.target.value }
            }))}
            className="input-field"
            placeholder="https://twitter.com/yourusername"
          />
        </div>
      </div>
    </div>
  )

  const renderAPIKeysTab = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">BYOK - Bring Your Own Keys</h4>
        <p className="text-sm text-blue-700">
          Add your own API keys for complete cost control and transparency. 
          Your keys are encrypted and never shared. You only pay for what you use.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OpenAI API Key
          </label>
          <div className="relative">
            <input
              type={showApiKeys.openai ? 'text' : 'password'}
              value={settings.apiKeys.openai}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                apiKeys: { ...prev.apiKeys, openai: e.target.value }
              }))}
              placeholder="sk-..."
              className="input-field pr-10"
            />
            <button
              type="button"
              onClick={() => toggleApiKeyVisibility('openai')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showApiKeys.openai ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-500">
              Used for content generation and dynamic interviews
            </p>
            <p className="text-xs text-gray-500">
              Get your key at: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-authority-blue hover:underline">platform.openai.com/api-keys</a>
            </p>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anthropic API Key (Optional)
          </label>
          <div className="relative">
            <input
              type={showApiKeys.anthropic ? 'text' : 'password'}
              value={settings.apiKeys.anthropic}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                apiKeys: { ...prev.apiKeys, anthropic: e.target.value }
              }))}
              placeholder="sk-ant-..."
              className="input-field pr-10"
            />
            <button
              type="button"
              onClick={() => toggleApiKeyVisibility('anthropic')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showApiKeys.anthropic ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-500">
              Alternative AI provider for content generation
            </p>
            <p className="text-xs text-gray-500">
              Get your key at: <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-authority-blue hover:underline">console.anthropic.com</a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-yellow-600 mt-0.5" size={16} />
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">Cost Transparency</h4>
            <p className="text-sm text-yellow-700">
              With BYOK, you see exactly what each AI interaction costs. Typical content generation costs $0.10-$0.50 per piece.
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Email Notifications</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Weekly Reports</h5>
              <p className="text-sm text-gray-500">Receive weekly summaries of your content performance</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.weeklyReports}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                notifications: { ...prev.notifications, weeklyReports: e.target.checked }
              }))}
              className="h-4 w-4 text-authority-blue focus:ring-authority-blue border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Trend Alerts</h5>
              <p className="text-sm text-gray-500">Get notified about viral opportunities in your expertise areas</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.trendAlerts}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                notifications: { ...prev.notifications, trendAlerts: e.target.checked }
              }))}
              className="h-4 w-4 text-authority-blue focus:ring-authority-blue border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Viral Alerts</h5>
              <p className="text-sm text-gray-500">Immediate notifications when topics are predicted to go viral</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.viralAlerts}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                notifications: { ...prev.notifications, viralAlerts: e.target.checked }
              }))}
              className="h-4 w-4 text-authority-blue focus:ring-authority-blue border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Content Reminders</h5>
              <p className="text-sm text-gray-500">Reminders to create regular thought leadership content</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.contentReminders}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                notifications: { ...prev.notifications, contentReminders: e.target.checked }
              }))}
              className="h-4 w-4 text-authority-blue focus:ring-authority-blue border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Content Preferences</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Content Length
            </label>
            <select
              value={settings.preferences.contentLength}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, contentLength: e.target.value }
              }))}
              className="input-field"
            >
              <option value="short">Short (800-1200 words)</option>
              <option value="medium">Medium (1200-1800 words)</option>
              <option value="long">Long (1800-2500 words)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Writing Style
            </label>
            <select
              value={settings.preferences.writingStyle}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, writingStyle: e.target.value }
              }))}
              className="input-field"
            >
              <option value="professional">Professional & Formal</option>
              <option value="conversational">Conversational & Approachable</option>
              <option value="analytical">Analytical & Data-Driven</option>
              <option value="visionary">Visionary & Forward-Thinking</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-800 mb-2">Security Status</h4>
        <p className="text-sm text-green-700">
          Your account is secure. All data is encrypted and API keys are stored securely.
        </p>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Account Security</h4>
        <div className="space-y-4">
          <button className="btn-secondary w-full justify-start">
            Change Password
          </button>
          <button className="btn-secondary w-full justify-start">
            Enable Two-Factor Authentication
          </button>
          <button className="btn-secondary w-full justify-start">
            View Login History
          </button>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Data Management</h4>
        <div className="space-y-4">
          <button className="btn-secondary w-full justify-start">
            Download Data Export
          </button>
          <button className="btn-secondary w-full justify-start">
            Request Data Deletion
          </button>
        </div>
      </div>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-medium text-red-800 mb-2">Danger Zone</h4>
        <p className="text-sm text-red-700 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="btn-secondary text-error border-error hover:bg-error hover:text-white">
          Delete Account
        </button>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Settings className="mr-3 text-authority-blue" size={28} />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your account, API keys, and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-authority-blue text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} className="mr-3" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="card">
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'api-keys' && renderAPIKeysTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
              {activeTab === 'security' && renderSecurityTab()}
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="btn-primary flex items-center"
                >
                  {loading ? (
                    <LoadingSpinner size="small" color="white" />
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SettingsPage

