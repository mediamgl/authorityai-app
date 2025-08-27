# AuthorityAI - Transform Your Expertise Into Influence

A revolutionary AI-powered thought leadership platform that builds authentic authority through intelligent conversation and sophisticated content generation.

## 🚀 Features

### Core Capabilities
- **Viral Velocity Engine**: Predict trending topics before they peak with AI-powered trend analysis
- **Dynamic Interview System**: Zero pre-scripted questions; fully adaptive conversations that learn and challenge users
- **Authority Content Generation**: Create 1000-2000 word position papers that establish genuine expertise
- **BYOK Transparency**: Bring your own AI keys for complete cost control and transparency

### Key Differentiators
- Authority-first methodology (content only within validated expertise areas)
- Predictive trend intelligence (identify viral opportunities before competitors)
- Conversational expertise extraction (sophisticated dialogue system)
- Long-form foundation strategy (substantial papers that slice into multiple content pieces)

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for utility-first styling
- **React Router** for navigation
- **React Hook Form** for form management
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **OpenAI API** for content generation
- **bcryptjs** for password hashing

### Development Tools
- **Vite** for build tooling
- **Concurrently** for running dev servers
- **Nodemon** for backend hot reload
- **PostCSS** and **Autoprefixer** for CSS processing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- OpenAI API key

### Quick Start

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd authorityai-app
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start development servers**
```bash
npm run dev
```

This will start:
- Frontend dev server on `http://localhost:3000`
- Backend API server on `http://localhost:5000`

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Required
MONGODB_URI=mongodb://localhost:27017/authorityai
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=your-openai-api-key

# Optional
PORT=5000
NODE_ENV=development
```

## 🏗 Project Structure

```
authorityai-app/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React contexts (Auth, Theme)
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── styles/            # CSS and styling
│   └── types/             # TypeScript type definitions
├── server/                # Backend Express application
│   ├── models/            # MongoDB models
│   ├── routes/            # API route handlers
│   ├── middleware/        # Express middleware
│   └── utils/             # Backend utilities
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run client       # Start only frontend
npm run server       # Start only backend

# Production
npm run build        # Build frontend for production
npm start           # Start production server
npm run preview     # Preview production build
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

#### Viral Velocity Engine
- `GET /api/viral-velocity/topics` - Get trending topics
- `POST /api/viral-velocity/synthesis` - Generate topic synthesis

#### Interview System
- `POST /api/interview/start` - Start new interview session
- `POST /api/interview/:sessionId/respond` - Submit interview response
- `GET /api/interview/:sessionId` - Get interview session

#### Content Generation
- `POST /api/content/generate` - Generate content from interview
- `GET /api/content` - Get user's content
- `PUT /api/content/:id` - Update content

## 🎨 Design System

### Color Palette
- **Authority Blue**: `#1B365D` - Primary brand color
- **Insight Gold**: `#D4AF37` - Accent color for highlights
- **Neutral Charcoal**: `#2C3E50` - Text and interface elements
- **Clean White**: `#FFFFFF` - Background and content areas

### Typography
- **Primary**: Inter (headings, interface)
- **Secondary**: Merriweather (content, emphasis)

### Component Classes
```css
.btn-primary        # Primary button styling
.btn-secondary      # Secondary button styling
.btn-accent         # Accent button styling
.card              # Card container
.card-hover        # Hoverable card
.input-field       # Form input styling
.viral-score-high  # High viral score badge
.authority-badge   # Authority indicator
```

## 🚀 Deployment

### Bolt.new Deployment

This project is optimized for bolt.new deployment:

1. **Upload the entire project** to bolt.new
2. **Install dependencies** automatically handled
3. **Set environment variables** in bolt.new settings
4. **Deploy** with one click

### Manual Deployment

#### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

#### Backend (Railway/Render)
```bash
# Set environment variables
# Deploy server/ directory
```

#### Full-Stack (Railway)
```bash
# Deploy entire project
# Set build command: npm run build
# Set start command: npm start
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation and sanitization
- Rate limiting (production)
- Environment variable protection

## 📊 Monitoring and Analytics

### Built-in Analytics
- Content performance tracking
- User engagement metrics
- Authority score calculation
- Viral prediction accuracy

### Integration Ready
- Google Analytics
- Mixpanel
- PostHog
- Custom analytics dashboard

## 🧪 Testing

### Frontend Testing
```bash
npm run test          # Run frontend tests
npm run test:coverage # Test coverage report
```

### Backend Testing
```bash
npm run test:server   # Run backend tests
npm run test:e2e      # End-to-end tests
```

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./docs/contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder
- **Issues**: Create an issue on GitHub
- **Email**: support@authorityai.com
- **Discord**: Join our community server

## 🗺 Roadmap

### Phase 1 (Current)
- ✅ Core platform development
- ✅ Viral Velocity Engine
- ✅ Dynamic interview system
- ✅ Content generation

### Phase 2 (Next)
- 🔄 Multi-platform distribution
- 🔄 Advanced analytics dashboard
- 🔄 Team collaboration features
- 🔄 White-label capabilities

### Phase 3 (Future)
- 📋 Enterprise integrations
- 📋 Custom AI model training
- 📋 Advanced personalization
- 📋 International expansion

---

**AuthorityAI** - Transform Your Expertise Into Influence

Built with ❤️ for thought leaders who value authenticity over volume.

