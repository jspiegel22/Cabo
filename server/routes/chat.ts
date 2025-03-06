import express from 'express';
import { ChatbotService } from '../services/chatbot';

const router = express.Router();
const chatbotService = new ChatbotService();

// Create a new chat session
router.post('/sessions', async (req, res) => {
  try {
    const { userId } = req.body;
    const session = await chatbotService.createSession(userId);
    res.json(session);
  } catch (error) {
    console.error('Error creating chat session:', error);
    res.status(500).json({ error: 'Failed to create chat session' });
  }
});

// Send a message in a chat session
router.post('/sessions/:sessionId/messages', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;
    const response = await chatbotService.sendMessage(Number(sessionId), message);
    res.json(response);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get a chat session
router.get('/sessions/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await chatbotService.getSession(Number(sessionId));
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    console.error('Error getting chat session:', error);
    res.status(500).json({ error: 'Failed to get chat session' });
  }
});

export default router; 