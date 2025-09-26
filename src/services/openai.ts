import { Goal, Roadmap } from '../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const SYSTEM_PROMPT = `You are an expert AI mentor. Given a goal, timeframe (weeks), and mentor style, generate a JSON roadmap with:
- milestones (list of strings)
- weeks: { "Week 1": { "tasks": [], "resources": [], "reflection": "", "mentorTip": "" }, ... }

The mentor styles are:
- coach: Direct, motivating, no-nonsense approach with tough-love language
- zen: Peaceful, mindful, balanced guidance with calm wisdom
- techbro: Energetic, ambitious, growth-focused with startup/tech terminology

Make the plan practical, actionable, and tailored to the mentor style. Include specific tasks, real resources (URLs when possible), thoughtful reflections, and mentor tips that match the chosen style.

Return ONLY valid JSON, no additional text.`;

export const generateRoadmapWithAI = async (goal: Goal): Promise<Roadmap> => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not found. Please add VITE_OPENAI_API_KEY to your .env file.');
  }

  const userPrompt = `Goal: ${goal.text}
Timeframe: ${goal.timeframe} weeks
Mentor Style: ${goal.mentorStyle}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please check your usage quota and billing status at platform.openai.com');
      }
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from OpenAI API');
    }

    try {
      const roadmap = JSON.parse(content) as Roadmap;
      
      // Validate the structure
      if (!roadmap.milestones || !roadmap.weeks) {
        throw new Error('Invalid roadmap structure received from AI');
      }

      return roadmap;
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse AI response as JSON');
    }
  } catch (error) {
    console.error('Error generating roadmap:', error);
    throw error;
  }
};