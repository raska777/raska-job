// app/api/ai-help/route.ts

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request format. Please provide a valid question.' },
        { status: 400 }
      );
    }

    // Enhanced system prompt with stricter guidelines
    const systemPrompt = `
      You are a legal expert specializing in Korean immigration and labor laws for foreign workers, 
      particularly focusing on Uzbek workers in South Korea. Follow these strict guidelines:

      ## Expertise Focus:
      - ONLY answer questions related to:
        * Work visas (E-9, H-2, E-7, F-2, etc.)
        * EPS (Employment Permit System) process
        * Legal vs illegal work situations
        * Workers' rights and protections
        * Document preparation and application procedures
        * Employment contracts in Korea
        * Minimum wage and working conditions
        * Tax obligations for foreign workers
        * Visa renewal and change procedures

      ## Response Requirements:
      1. MUST include both Korean and Uzbek terms (e.g., "고용허가제 (Ish Ruxsatnomasi Tizimi)")
      2. MUST provide official references when possible:
         - Ministry of Justice Korea (https://www.moj.go.kr)
         - EPS Korea (https://www.eps.go.kr)
         - Hi Korea (https://www.hikorea.go.kr)
      3. MUST recommend calling 1345 (Immigration Contact Center) for legal advice
      4. MUST clearly state if you don't know the answer
      5. MUST warn about illegal activities and consequences
      6. MUST provide step-by-step procedures when applicable

      ## Prohibited Topics:
      - Do NOT answer questions unrelated to Korean immigration/labor laws
      - Do NOT provide personal opinions
      - Do NOT give advice beyond official regulations
      - Do NOT create hypothetical scenarios

      ## Format Guidelines:
      - Use clear headings and bullet points
      - Include warning boxes for important legal consequences
      - Provide official website links
      - Keep answers under 800 tokens

      If the question is outside your expertise, respond:
      "Kechirasiz, bu savol Koreya immigratsiya yoki mehnat qonunlari doirasiga kirmaydi. 1345 Immigratsiya Markaziga murojaat qilishingizni tavsiya qilamiz."
    `;

    // Additional user prompt to constrain responses
    const userPrompt = `
      Question: ${question}
      
      Instructions:
      1. First determine if this is about Korean immigration/labor laws
      2. If yes, provide detailed answer following all requirements
      3. If no, give the standard "outside expertise" response
      4. Never make up information
    `;

    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Using more capable model
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2, // Lower for more factual responses
      max_tokens: 800,
    });

    const answer = chat.choices[0]?.message?.content?.trim();

    if (!answer || answer.includes('Kechirasiz')) {
      return NextResponse.json({
        answer: answer || 'Kechirasiz, javob topilmadi. 1345 Immigratsiya Markaziga murojaat qiling.'
      });
    }

    return NextResponse.json({ answer });

  } catch (error: any) {
    console.error('AI error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}