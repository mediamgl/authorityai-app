import React from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  MessageCircle, 
  FileText, 
  Zap, 
  Shield, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Viral Velocity Engine',
      description: 'Predict trending topics before they peak with AI-powered trend analysis across multiple platforms.'
    },
    {
      icon: MessageCircle,
      title: 'Dynamic Interviews',
      description: 'Zero pre-scripted questions. Our AI adapts and challenges your thinking in real-time.'
    },
    {
      icon: FileText,
      title: 'Authority Content',
      description: 'Generate 1000-2000 word position papers that establish your expertise and thought leadership.'
    },
    {
      icon: Zap,
      title: 'Authentic Voice',
      description: 'Maintain your unique voice and style across all generated content with advanced AI training.'
    },
    {
      icon: Shield,
      title: 'BYOK Transparency',
      description: 'Bring your own AI keys for complete cost control and transparency. No hidden markups.'
    },
    {
      icon: Users,
      title: 'Expert Authority',
      description: 'Content generation only within your validated areas of expertise and professional authority.'
    }
  ]

  const benefits = [
    'Predict viral trends before your competitors',
    'Generate authentic thought leadership content',
    'Build genuine industry authority and influence',
    'Save 10+ hours per week on content creation',
    'Maintain complete cost transparency with BYOK',
    'Develop better thinking through AI challenges'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-authority-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-authority-blue">AuthorityAI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-authority-blue transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Expertise Into{' '}
            <span className="text-gradient">Influence</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The only AI platform that builds authentic thought leadership through 
            intelligent conversation and sophisticated content generation. No more 
            generic content—create authority-driven insights that shape industry conversations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/register" 
              className="btn-primary text-lg px-8 py-4 flex items-center"
            >
              Start Building Authority
              <ArrowRight className="ml-2" size={20} />
            </Link>
            
            <Link 
              to="/login" 
              className="btn-secondary text-lg px-8 py-4"
            >
              Watch Demo
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Free 14-day trial • No credit card required • BYOK model
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Revolutionary Thought Leadership Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlike content generation tools that create generic output, AuthorityAI 
              develops your authentic expertise into influential thought leadership.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-hover">
                <div className="w-12 h-12 bg-authority-blue bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-authority-blue" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How AuthorityAI Works
            </h2>
            <p className="text-lg text-gray-600">
              Four sophisticated stages that transform your expertise into influence
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-authority-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Authority Profile</h3>
              <p className="text-gray-600">
                We analyze your expertise, voice, and professional authority to create 
                your unique thought leadership profile.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-authority-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Viral Velocity</h3>
              <p className="text-gray-600">
                Our AI identifies trending topics with viral potential, filtered 
                specifically for your areas of expertise.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-authority-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Dynamic Interview</h3>
              <p className="text-gray-600">
                Engage in intelligent conversation that challenges your thinking 
                and extracts your unique insights and perspectives.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-authority-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Authority Content</h3>
              <p className="text-gray-600">
                Generate comprehensive position papers that establish your thought 
                leadership and can be adapted for any platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-authority-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Why Thought Leaders Choose AuthorityAI
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Stop creating content. Start building authority. AuthorityAI helps 
                you develop genuine thought leadership that creates lasting influence 
                in your industry.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-authority-gold mr-3 flex-shrink-0" size={20} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
              <p className="text-blue-100 mb-6">
                Join industry leaders who are already building authentic authority 
                with AuthorityAI's revolutionary platform.
              </p>
              
              <Link 
                to="/register" 
                className="btn-accent w-full text-center block"
              >
                Start Your Free Trial
              </Link>
              
              <p className="text-sm text-blue-200 mt-4 text-center">
                14-day free trial • Cancel anytime • BYOK pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-authority-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-xl font-bold">AuthorityAI</span>
              </div>
              <p className="text-gray-400">
                Transform your expertise into influence with AI-powered thought leadership.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AuthorityAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

