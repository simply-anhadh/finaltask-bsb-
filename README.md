# Agentic AI Planner 🌱

Turn big goals into actionable, adaptive weekly plans — powered by AI 🚀

## Features

- **AI-Powered Planning**: Uses OpenAI GPT-4o-mini to generate personalized roadmaps
- **Mentor Styles**: Choose from Coach (tough-love), Zen Monk (calm), or Tech Bro (hype)
- **Interactive Roadmap**: Hexagonal zigzag visualization with progress tracking
- **Weekly Breakdown**: Detailed tasks, resources, reflections, and mentor tips
- **Progress Tracking**: XP system and completion states
- **PDF Export**: Download your roadmap as a styled PDF
- **Responsive Design**: Works beautifully on all devices

## Setup

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

3. **Add OpenAI API Key**
   - Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Add it to your `.env` file:
     ```
     VITE_OPENAI_API_KEY=your_actual_api_key_here
     ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Usage

1. **Set Your Goal**: Enter what you want to achieve
2. **Choose Timeframe**: Select how many weeks you want to dedicate
3. **Pick Mentor Style**: Choose the coaching approach that motivates you
4. **Generate Plan**: Let AI create your personalized roadmap
5. **Track Progress**: Mark weeks as complete and earn XP
6. **Export**: Download your roadmap as a PDF

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **AI**: OpenAI GPT-4o-mini
- **PDF Export**: jsPDF
- **Icons**: Lucide React

## Security Note

The current setup exposes the OpenAI API key in the frontend for demo purposes. In production, you should:

1. Create a backend API endpoint
2. Store the API key securely on the server
3. Make requests through your backend
4. Implement proper authentication and rate limiting

## License

MIT License - feel free to use this for your own projects!