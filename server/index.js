const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OpenAI } = require('openai')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/authorityai', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  tier: { type: String, default: 'starter' },
  onboardingCompleted: { type: Boolean, default: false },
  profile: {
    expertise: [String],
    voiceProfile: String,
    authorityScore: { type: Number, default: 0 },
    writingSamples: [String]
  },
  apiKeys: {
    openai: String,
    anthropic: String
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

// Content Schema
const contentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: String, required: true },
  topics: [String],
  viralScore: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  analytics: {
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    engagement: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Content = mongoose.model('Content', contentSchema)

// Interview Session Schema
const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topics: [String],
  template: { type: String, required: true },
  questions: [{
    question: String,
    response: String,
    timestamp: { type: Date, default: Date.now }
  }],
  synthesis: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

const Interview = mongoose.model('Interview', interviewSchema)

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access token required' })
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' })
    }
    req.user = user
    next()
  })
}

// Routes

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, company, role } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      company,
      role
    })

    await user.save()

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        role: user.role,
        tier: user.tier,
        onboardingCompleted: user.onboardingCompleted
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Demo account
    if (email === 'demo@authorityai.com' && password === 'demo123') {
      const token = jwt.sign(
        { userId: 'demo', email: 'demo@authorityai.com' },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      )

      return res.json({
        token,
        user: {
          id: 'demo',
          name: 'Demo User',
          email: 'demo@authorityai.com',
          company: 'Demo Company',
          role: 'executive',
          tier: 'professional',
          onboardingCompleted: true
        }
      })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        role: user.role,
        tier: user.tier,
        onboardingCompleted: user.onboardingCompleted
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    if (req.user.userId === 'demo') {
      return res.json({
        user: {
          id: 'demo',
          name: 'Demo User',
          email: 'demo@authorityai.com',
          company: 'Demo Company',
          role: 'executive',
          tier: 'professional',
          onboardingCompleted: true
        }
      })
    }

    const user = await User.findById(req.user.userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        role: user.role,
        tier: user.tier,
        onboardingCompleted: user.onboardingCompleted,
        profile: user.profile
      }
    })
  } catch (error) {
    console.error('Auth check error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Viral Velocity Routes
app.get('/api/viral-velocity/topics', authenticateToken, async (req, res) => {
  try {
    // Mock trending topics - in production, this would fetch from real APIs
    const topics = [
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
      }
    ]

    res.json({ topics })
  } catch (error) {
    console.error('Topics fetch error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Interview Routes
app.post('/api/interview/start', authenticateToken, async (req, res) => {
  try {
    const { topics, template } = req.body

    const interview = new Interview({
      userId: req.user.userId === 'demo' ? 'demo' : req.user.userId,
      topics,
      template
    })

    await interview.save()

    // Generate first question
    const firstQuestion = await generateDynamicQuestion(topics, template, [])

    interview.questions.push({
      question: firstQuestion,
      response: '',
      timestamp: new Date()
    })

    await interview.save()

    res.json({
      sessionId: interview._id,
      question: firstQuestion,
      progress: 0
    })
  } catch (error) {
    console.error('Interview start error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

app.post('/api/interview/:sessionId/respond', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.params
    const { response } = req.body

    const interview = await Interview.findById(sessionId)
    if (!interview) {
      return res.status(404).json({ message: 'Interview session not found' })
    }

    // Update last question with response
    const lastQuestion = interview.questions[interview.questions.length - 1]
    lastQuestion.response = response

    // Generate next question or complete interview
    const progress = (interview.questions.length / 6) * 100
    
    if (interview.questions.length >= 6 || progress >= 90) {
      interview.completed = true
      await interview.save()
      
      return res.json({
        completed: true,
        progress: 100,
        message: 'Interview completed successfully'
      })
    }

    // Generate next question
    const nextQuestion = await generateDynamicQuestion(
      interview.topics,
      interview.template,
      interview.questions
    )

    interview.questions.push({
      question: nextQuestion,
      response: '',
      timestamp: new Date()
    })

    await interview.save()

    res.json({
      question: nextQuestion,
      progress: Math.min(progress + 16, 90),
      completed: false
    })
  } catch (error) {
    console.error('Interview response error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Content Generation Routes
app.post('/api/content/generate', authenticateToken, async (req, res) => {
  try {
    const { sessionId } = req.body

    const interview = await Interview.findById(sessionId)
    if (!interview || !interview.completed) {
      return res.status(400).json({ message: 'Interview not completed' })
    }

    // Generate content using OpenAI
    const content = await generateContent(interview)

    const newContent = new Content({
      userId: req.user.userId === 'demo' ? 'demo' : req.user.userId,
      title: content.title,
      type: interview.template,
      content: content.body,
      topics: interview.topics,
      viralScore: Math.floor(Math.random() * 20) + 80 // Mock viral score
    })

    await newContent.save()

    res.json({
      contentId: newContent._id,
      title: content.title,
      content: content.body,
      viralScore: newContent.viralScore
    })
  } catch (error) {
    console.error('Content generation error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Helper Functions
async function generateDynamicQuestion(topics, template, previousQuestions) {
  try {
    const context = `
    Topics: ${topics.join(', ')}
    Template: ${template}
    Previous questions: ${previousQuestions.map(q => q.question).join('; ')}
    Previous responses: ${previousQuestions.map(q => q.response).join('; ')}
    `

    const prompt = `
    You are an expert interviewer conducting a dynamic interview for thought leadership content creation.
    
    Context: ${context}
    
    Generate the next intelligent question that:
    1. Builds on previous responses
    2. Challenges the user's thinking
    3. Extracts unique insights and expertise
    4. Is relevant to the selected topics and template
    5. Helps develop a comprehensive position
    
    Question:
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.7
    })

    return response.choices[0].message.content.trim()
  } catch (error) {
    console.error('Question generation error:', error)
    return "What unique perspective do you bring to this topic based on your experience?"
  }
}

async function generateContent(interview) {
  try {
    const responses = interview.questions
      .filter(q => q.response)
      .map(q => `Q: ${q.question}\nA: ${q.response}`)
      .join('\n\n')

    const prompt = `
    Based on this interview about ${interview.topics.join(' and ')}, 
    create a ${interview.template} (1000-2000 words) that:
    
    1. Establishes the author's authority and expertise
    2. Provides unique insights and perspectives
    3. Includes relevant examples and evidence
    4. Has a clear, compelling argument
    5. Ends with actionable recommendations
    
    Interview responses:
    ${responses}
    
    Generate a professional title and comprehensive content:
    `

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      temperature: 0.7
    })

    const content = response.choices[0].message.content.trim()
    const lines = content.split('\n')
    const title = lines[0].replace(/^(Title:|#)\s*/, '')
    const body = lines.slice(1).join('\n').trim()

    return { title, body }
  } catch (error) {
    console.error('Content generation error:', error)
    return {
      title: 'Generated Content',
      body: 'Content generation is currently unavailable. Please try again later.'
    }
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`AuthorityAI server running on port ${PORT}`)
})

