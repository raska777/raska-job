// app/api/ai-help/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type AllowedTopic = 'VISA' | 'WORK' | 'LEGAL' | 'DOCUMENTS' | 'LIVING' | 'EDUCATION' | 'OTHER';

const ALLOWED_TOPICS: Record<AllowedTopic, string[]> = {
  VISA: ['E-9', 'H-2', 'E-7', 'F-2', 'D-2', 'D-4', 'F-4', 'A-1', 'C-3', 'viza', 'vizasi', 'visa'],
  WORK: ['EPS', 'ish shartnomasi', 'ish haqi', 'ish vaqti', 'tatil', 'mehnat sharoitlari', 'ish joyi', 'ish qidirish', 'ishchi'],
  LEGAL: ['qonuniy ish', 'noqonuniy ish', 'huquqiy masalalar', 'sud jarayoni', 'qonun', 'huquq', 'jazo'],
  DOCUMENTS: ['hujjat tayyorlash', 'ariza namunalari', 'royxatdan otish', 'viza arizasi', 'pasport', 'hujjat', 'tasdiqlash'],
  LIVING: ['yashash joyi', 'kvartira', 'ijara', 'kommunal', 'manzil', 'hayot', 'turizm'],
  EDUCATION: ['ta\'lim', 'universitet', 'maktab', 'oqish', 'stipendiya', 'grant', 'til kursi'],
  OTHER: ['soliq', 'sogliqni saqlash', 'tibbiy sugurta', 'bank ishlari', 'pul o\'tkazma', 'valyuta']
};

const KOREAN_TERMS: Record<string, string> = {
  'E-9': '비전문취업(E-9) 비자',
  'H-2': '방문취업(H-2) 비자',
  'E-7': '전문직(E-7) 비자',
  'F-2': '거주(F-2) 비자',
  'EPS': '고용허가제 (Employment Permit System)',
  'ish shartnomasi': '근로계약서',
  'ish haqi': '임금',
  'noqonuniy ish': '불법 취업',
  'viza arizasi': '비자 신청서',
  'pasport': '여권',
  'soliq': '세금',
  'tibbiy sugurta': '건강보험'
};

const OFFICIAL_RESOURCES = {
  VISA: 'https://www.hikorea.go.kr',
  WORK: 'https://www.eps.go.kr',
  LEGAL: 'https://www.law.go.kr',
  DOCUMENTS: 'https://www.gov.kr',
  GENERAL: 'https://www.korea.net'
};

export async function POST(req: NextRequest) {
  try {
    const { question, conversationId } = await req.json();

    // Validate input
    if (!question || typeof question !== 'string' || question.trim().length < 5) {
      return NextResponse.json(
        { error: 'Noto‘g‘ri so‘rov formati. Iltimos, 5 ta belgidan ko‘proq savol yuboring.' },
        { status: 400 }
      );
    }

    // Analyze question and get context
    const { topic, keywords } = analyzeQuestion(question);
    if (!topic) return standardResponse();

    // Create enhanced system prompt with context
    const systemPrompt = createSystemPrompt(topic, keywords, conversationId);
    
    // Get AI response with error handling
    const aiResponse = await getAIResponse(question, systemPrompt);
    if (!aiResponse) throw new Error('AI javob qaytarmadi');

    // Format the final response
    const formattedResponse = formatResponse(aiResponse, topic, keywords);

    return NextResponse.json({
      answer: formattedResponse,
      topic,
      keywords,
      resources: getTopicResources(topic)
    });

  } catch (error) {
    console.error('AI API xatosi:', error);
    return NextResponse.json(
      { 
        error: 'Server xatosi. Iltimos, keyinroq urinib ko‘ring.',
        details: error instanceof Error ? error.message : 'Noma\'lum xato'
      },
      { status: 500 }
    );
  }
}

interface QuestionAnalysis {
  topic: AllowedTopic | null;
  keywords: string[];
}

function analyzeQuestion(question: string): QuestionAnalysis {
  const lower = question.toLowerCase();
  const foundKeywords: string[] = [];
  let detectedTopic: AllowedTopic | null = null;

  // Check each topic category
  for (const [topic, keywords] of Object.entries(ALLOWED_TOPICS)) {
    for (const kw of keywords) {
      if (lower.includes(kw.toLowerCase())) {
        foundKeywords.push(kw);
        if (!detectedTopic) {
          detectedTopic = topic as AllowedTopic;
        }
      }
    }
  }

  // Special case for visa types
  if (!detectedTopic) {
    for (const visa of ALLOWED_TOPICS.VISA) {
      if (new RegExp(`\\b${visa}\\b`, 'i').test(question)) {
        detectedTopic = 'VISA';
        foundKeywords.push(visa);
        break;
      }
    }
  }

  return {
    topic: detectedTopic,
    keywords: Array.from(new Set(foundKeywords))
};
}

function createSystemPrompt(topic: AllowedTopic, keywords: string[], conversationId?: string): string {
  const context = conversationId ? `\nConversation ID: ${conversationId}` : '';
  
  const basePrompt = `
Siz Koreyada yashovchi xorijlik ishchilar uchun immigratsiya, mehnat va yashash sharoitlari bo'yicha yordamchi botsiz.
Quyidagi qoidalarga qat'iy rioya qiling:

1. Faqat rasmiy manbalar (Koreya hukumati saytlari) asosida javob bering
2. Koreyacha va o‘zbekcha terminlardan foydalaning (har bir atama uchun qavsda koreyschasini yozing)
3. Javob aniq, tushunarli va amaliy bo‘lsin (max 500 ta belgi)
4. Muhim sanalar, muddatlar va talablarni ta'kidlang
5. 1345 Immigratsiya yoki 1644-1345 Mehnat qo'llab-quvvat markazlarini tavsiya qiling
${context}

Savol mavzusi: ${topic}
Kalit so‘zlar: ${keywords.join(', ')}
`;

  const topicSpecifics: Record<AllowedTopic, string> = {
    VISA: `
Viza bo'yicha quyidagilarga e'tibor bering:
- Aniq viza turi (${keywords.filter(kw => ALLOWED_TOPICS.VISA.includes(kw)).join(', ')})
- Talab qilinadigan hujjatlar ro'yxati
- Ariza topshirish va javob olish muddati
- Viza muddatini uzaytirish imkoniyatlari`,

    WORK: `
Ish huquqi bo'yicha quyidagilarga e'tibor bering:
- Mehnat shartnomasining muhim shartlari
- Ish haqi, bonus va qo'shimcha to'lovlar
- Ish vaqti va dam olish kunlari
- Ishni tark etish yoki o'zgartirish tartibi`,

    LEGAL: `
Huquqiy masalalar bo'yicha quyidagilarga e'tibor bering:
- Qonuniy va noqonuniy ish tafovutlari
- Huquqbuzarliklar uchun jazolar
- Yordam olish uchun manzillar (huquqiy yordam markazlari)`,

    DOCUMENTS: `
Hujjatlar bo'yicha quyidagilarga e'tibor bering:
- Talab qilinadigan hujjatlar ro'yxati
- Hujjatlarni to'ldirish namunalari
- Tasdiqlash va tekshirish jarayoni
- Hujjat topshirish manzillari`,

    LIVING: `
Yashash sharoitlari bo'yicha quyidagilarga e'tibor bering:
- Kvartira ijarasi shartlari
- Kommunal xizmatlar narxlari
- Transport va infratuzilma
- Madaniy moslashish masalalari`,

    EDUCATION: `
Ta'lim bo'yicha quyidagilarga e'tibor bering:
- O'qish uchun ruxsatnomalar
- Stipendiyalar va grantlar
- Til o'rganish imkoniyatlari
- Diplomlarni tan olish tartibi`,

    OTHER: `
Boshqa mavzular bo'yicha faqat rasmiy manbalarga tayaning:
- Soliq qonunchiligi
- Sog'liqni saqlash va sug'urta
- Bank xizmatlari va pul o'tkazmalari`
  };

  return basePrompt + (topicSpecifics[topic] || '');
}

async function getAIResponse(question: string, systemPrompt: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4', // ✅ recommended stable model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.2,           // More factual, less creative
        max_tokens: 600,            // Reasonable length to avoid timeout
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
  
      return completion.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      console.error('OpenAI API xatosi:', error);
      throw new Error('AI javobini olishda xato yuz berdi');
    }
  }
  

function formatResponse(response: string, topic: AllowedTopic, keywords: string[]): string {
  // Add Korean terms for keywords
  let formatted = response;
  for (const kw of keywords) {
    if (KOREAN_TERMS[kw]) {
      formatted = formatted.replace(
        new RegExp(`\\b${kw}\\b`, 'gi'), 
        `${kw} (${KOREAN_TERMS[kw]})`
      );
    }
  }

  // Add relevant resources
  const resources = getTopicResources(topic);
  if (resources) {
    formatted += `\n\n**Foydali manbalar:**\n${resources}`;
  }

  // Add contact information
  formatted += `\n\nAgar savolingizga javob topa olmagan bo'lsangiz, 1345 raqamiga murojaat qiling.`;

  return formatted;
}

function getTopicResources(topic: AllowedTopic): string {
  const links = [];
  
  // Always include general resources
  links.push(`- Umumiy ma'lumot: ${OFFICIAL_RESOURCES.GENERAL}`);
  
  // Add topic-specific resources
  if (topic === 'VISA') {
    links.push(`- Viza ma'lumotlari: ${OFFICIAL_RESOURCES.VISA}`);
  } else if (topic === 'WORK') {
    links.push(`- Ish huquqi: ${OFFICIAL_RESOURCES.WORK}`);
  }
  
  // Add legal resources for relevant topics
  if (['WORK', 'LEGAL', 'VISA'].includes(topic)) {
    links.push(`- Huquqiy ma'lumotlar: ${OFFICIAL_RESOURCES.LEGAL}`);
  }
  
  return links.join('\n');
}

function standardResponse() {
  return NextResponse.json({
    answer: `Kechirasiz, bu savol Koreya immigratsiya, mehnat yoki yashash masalalari doirasiga kirmaydi.
    
Agar savolingiz quyidagi mavzularga tegishli bo'lsa:
- Viza va immigratsiya
- Ish huquqi va shartnomalar
- Hujjatlar va rasmiy tartiblar
- Koreyada yashash sharoitlari

Iltimos, savolingizni aniqroq va batafsilroq yozib yuboring.

Yoki 1345 raqamiga bepul murojaat qiling.`,
    topic: 'OTHER',
    resources: OFFICIAL_RESOURCES.GENERAL
  });
}