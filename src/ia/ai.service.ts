// src/ai/ai.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'mock-key', // Remove se não tiver .env
    });
  }

  async generateProductDescription(productName: string): Promise<string> {
    // Modo mock - remove se tiver chave real
    if (!process.env.OPENAI_API_KEY) {
      return `Descrição simulada para ${productName}`;
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Gere uma descrição para: ${productName}`
          }
        ],
        max_tokens: 100,
      });

      return response.choices[0]?.message?.content || 'Sem descrição';
    } catch (error) {
      console.error('Erro na IA:', error);
      return 'Descrição não disponível';
    }
  }
}