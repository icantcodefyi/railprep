import { Hono } from 'hono';
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { stream } from 'hono/streaming';

type Bindings = {
  GEMINI_API_KEY?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.post('/chat', async (c) => {
  try {
    const { messages, lessonContext } = await c.req.json();
    
    // Use the provided API key
    const apiKey = c.env?.GEMINI_API_KEY || process.env.GEMINI_API_KEY || 'AIzaSyD64r3ZlEFrU0gWGPmOqxMW5HRVdpzVH84';
    
    if (!apiKey) {
      return c.json({ error: 'API key not configured' }, 500);
    }

    const systemPrompt = lessonContext 
      ? `You are a helpful AI tutor assistant for Indian Railway exam preparation (RRB NTPC, Group D, ALP, JE, etc.). The student is currently studying: "${lessonContext.title}". 

Context from the lesson:
${lessonContext.content}

Your role:
- Help students understand concepts from this lesson
- Clarify doubts and provide clear explanations
- Create memory tricks and mnemonics when asked
- Explain concepts in simple, exam-focused language
- Provide quick revision tips
- If asked about topics outside this lesson, still help but mention it's beyond the current lesson scope
- Be encouraging and supportive
- Keep answers concise and exam-oriented (railway exams are time-bound, so focus on quick learning techniques)

Remember: Railway exams require quick recall and skim-through knowledge, so emphasize memory tricks and shortcuts!`
      : 'You are a helpful AI tutor assistant for Indian Railway exam preparation. Help students with their questions clearly, concisely, and provide memory tricks when possible.';

    const google = createGoogleGenerativeAI({ apiKey });
    const model = google('gemini-2.5-flash');
    
    const result = streamText({
      model,
      system: systemPrompt,
      messages,
      temperature: 0.7,
    });

    return stream(c, async (stream) => {
      for await (const chunk of result.textStream) {
        await stream.write(chunk);
      }
    });
  } catch (error) {
    console.error('Chat error:', error);
    return c.json({ error: 'Failed to process chat request' }, 500);
  }
});

export default app;
