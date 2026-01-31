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
    
    const apiKey = c.env?.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return c.json({ error: 'API key not configured' }, 500);
    }

    const systemPrompt = lessonContext 
      ? `You are a helpful AI tutor assistant for railway exam preparation. The student is currently studying: "${lessonContext.title}". 
      
Context: ${lessonContext.content}

Help students understand concepts, clarify doubts, and provide explanations related to this lesson. Be concise, clear, and encouraging. If the question is outside the lesson scope, gently guide them back to the topic.`
      : 'You are a helpful AI tutor assistant for railway exam preparation. Help students with their questions clearly and concisely.';

    const google = createGoogleGenerativeAI({ apiKey });
    const model = google('gemini-1.5-flash');
    
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
