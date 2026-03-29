import { NextResponse } from 'next/server';
import { resumeContext } from '@/lib/chatbot-data';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: 'DeepSeek API key not configured' },
        { status: 500 }
      );
    }

    const systemMessage = {
      role: 'system',
      content: `You are Rini, Pranshu Kumar's AI assistant. Answer questions about him based on his resume:

${resumeContext}

Rules:
1. Keep responses short and punchy (max 2-3 sentences or a short list).
2. Use markdown for better formatting (bullet points for lists, bold for emphasis).
3. Do not mention yourself as an AI too often.
4. If asked about something not in the resume, just say you don't have that info but highlight a related strength.`
    };

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [systemMessage, ...messages],
        stream: false,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
