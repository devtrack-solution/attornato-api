import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'

@Injectable()
export class OpenAiService {
  private openai: OpenAI

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  async generateCode(prompt: string): Promise<string> {
    const response = await this.openai.completions.create({
      model: 'code-davinci-002', // ou 'gpt-3.5-turbo-instruct'
      prompt,
      max_tokens: 300,
      temperature: 0.3,
    })

    return response.choices[0]?.text ?? ''
  }
}
