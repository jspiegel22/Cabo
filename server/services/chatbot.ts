import OpenAI from 'openai';
import { db } from '../db';
import { chatSessions } from '../schema';
import { eq } from 'drizzle-orm';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful concierge for Everything Cabo, a luxury travel platform in Cabo San Lucas, Mexico. 
You can assist with:
- Finding and booking villas, hotels, and resorts
- Yacht charters and water activities
- Adventure tours and excursions
- Restaurant recommendations and reservations
- Transportation services
- General travel advice about Cabo San Lucas

Always be professional, courteous, and knowledgeable about luxury travel experiences in Cabo.`;

export class ChatbotService {
  async createSession(userId: number) {
    const session = await db.insert(chatSessions).values({
      userId,
      messages: [],
    }).returning();
    return session[0];
  }

  async getSession(sessionId: number) {
    return await db.query.chatSessions.findFirst({
      where: eq(chatSessions.id, sessionId),
    });
  }

  async sendMessage(sessionId: number, userMessage: string) {
    const session = await this.getSession(sessionId);
    if (!session) throw new Error('Session not found');

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...session.messages as { role: string, content: string }[],
      { role: 'user', content: userMessage }
    ];

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      const assistantMessage = completion.choices[0].message;
      const updatedMessages = [...session.messages as any[], 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: assistantMessage.content }
      ];

      await db.update(chatSessions)
        .set({ messages: updatedMessages })
        .where(eq(chatSessions.id, sessionId));

      return {
        message: assistantMessage.content,
        sessionId,
      };
    } catch (error) {
      console.error('Error in chat completion:', error);
      throw new Error('Failed to generate response');
    }
  }
} 