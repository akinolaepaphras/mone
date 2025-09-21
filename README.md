# 💰 Mono - AI-Powered Personal Finance Dashboard

A modern, minimalist personal finance application that uses AI to provide personalized financial insights and advice.

## ✨ Features

- **🔐 Google OAuth Authentication** - Secure login with Gmail integration
- **📊 Automated Transaction Parsing** - AI-powered email analysis to extract financial transactions
- **💡 Personalized AI Financial Coach** - Context-aware advice using Google Gemini
- **📈 Interactive Charts & Visualizations** - Beautiful spending breakdowns and insights
- **🎯 Goal-Based Onboarding** - Customized experience based on financial goals
- **💬 Intelligent Chat Interface** - Conversational AI that maintains context
- **📱 Responsive Design** - Clean, modern UI with smooth animations

## 🏗️ Architecture

### Frontend
- **Next.js 15** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Shadcn/ui** components
- **Recharts** for data visualization

### Backend  
- **FastAPI** (Python)
- **Google Generative AI (Gemini)** for insights
- **Gmail API** for transaction parsing
- **MongoDB** for data storage
- **Google OAuth 2.0** for authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB Atlas account
- Google Cloud Console project with Gmail API enabled
- Google AI Studio API key

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

#### Backend (.env)
```env
GOOGLE_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
MONGODB_URI=your_mongodb_connection_string
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mono-finance.git
   cd mono-finance
   ```

2. **Setup Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```

3. **Setup Frontend**
   ```bash
   cd frontend/mono-core
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 🔧 Deployment

### Free Hosting Options

#### Backend (Render - Free)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set root directory to `backend`
4. Add environment variables
5. Deploy!

#### Frontend (Vercel - Free)
1. Connect your GitHub repository to Vercel
2. Set root directory to `frontend/mono-core`
3. Add `NEXT_PUBLIC_BACKEND_URL` environment variable
4. Deploy!

## 📁 Project Structure

```
mono/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application
│   ├── database.py         # MongoDB operations
│   ├── auth.py             # Authentication logic
│   └── requirements.txt    # Python dependencies
├── frontend/
│   └── mono-core/          # Next.js frontend
│       ├── app/            # App router pages
│       ├── components/     # React components
│       └── lib/            # Utility functions
├── archive/                # Original designs and prototypes
│   └── original-designs/   # Previous UI iterations
└── README.md
```

## 🎯 User Flow

1. **Authentication** - Google OAuth login
2. **Onboarding** - Name, goals, income, rent, debts
3. **Email Parsing** - Automatic transaction extraction
4. **Dashboard** - AI insights and spending visualization
5. **Chat Interface** - Conversational financial advice

## 🤖 AI Features

- **Transaction Categorization** - Smart categorization of expenses
- **Spending Analysis** - Identify patterns and red flags  
- **Personalized Advice** - Context-aware recommendations
- **Conversational Chat** - Natural language financial coaching
- **Goal Alignment** - Advice tailored to user's financial goals

## 🔒 Security

- Google OAuth 2.0 authentication
- Secure token management
- Environment variable protection
- CORS configuration
- Input validation and sanitization

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js, TypeScript, Tailwind CSS, Framer Motion |
| Backend | FastAPI, Python, Pydantic |
| Database | MongoDB Atlas |
| AI/ML | Google Generative AI (Gemini) |
| Auth | Google OAuth 2.0, Gmail API |
| Deployment | Vercel (Frontend), Render (Backend) |
| Charts | Recharts, Shadcn/ui |

## 📈 Roadmap

- [ ] Bank account integration (Plaid)
- [ ] Budget tracking and alerts
- [ ] Investment portfolio analysis  
- [ ] Bill payment reminders
- [ ] Expense photo scanning
- [ ] Multi-currency support
- [ ] Financial goal progress tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Generative AI for powerful financial insights
- Shadcn/ui for beautiful components
- Vercel and Render for free hosting
- MongoDB Atlas for reliable database hosting

---

**Built with ❤️ by Epaphras Akinola**