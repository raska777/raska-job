// app/api/ai-help/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type AllowedTopic = 'VISA' | 'WORK' | 'LEGAL' | 'DOCUMENTS' | 'LIVING' | 'EDUCATION' | 'OTHER';

const ALLOWED_TOPICS: Record<AllowedTopic, string[]> = {
    VISA: [
      // Visa types
      'E-9', 'H-2', 'E-7', 'F-2', 'D-2', 'D-4', 'F-4', 'A-1', 'C-3', 'D-8', 'F-6', 
      'G-1', 'H-1', 'E-6', 'E-10', 'D-10', 'F-1', 'F-5',
      // Visa terms
      'viza', 'vizasi', 'visa', 'viza turi', 'viza muddati', 'viza uzaytirish',
      'viza rasmiylashtirish', 'viza amal qilish muddati', 'viza bekor qilish',
      'viza qayta olish', 'viza holati', 'viza rad etish', 'viza shartlari',
      // Processes
      'viza arizasi', 'viza hujjatlari', 'viza uchun hujjatlar', 'viza topshirish',
      'viza yigimi', 'viza puli', 'viza narxi', 'viza xizmati',
      // Specific cases
      'ishchi viza', 'mutaxassis viza', 'mehmon ishchi', 'turist viza',
      'oʻquv viza', 'tadqiqot viza', 'investor viza', 'oilaviy viza',
      'doimiy yashash vizasi', 'diplomatik viza'
    ],
    WORK: [
      // Employment systems
      'EPS', 'Employment Permit System', '고용허가제',
      // Contracts
      'ish shartnomasi', 'shartnoma', 'mehnat shartnomasi', 'shartnoma shartlari',
      'shartnoma muddati', 'shartnoma uzaytirish', 'shartnoma bekor qilish',
      'shartnoma oʻzgartirish', 'shartnoma buzish', 'shartnoma namunasi',
      // Wages
      'ish haqi', 'oylik maosh', 'soatlik ish haqi', 'minimal ish haqi',
      'qoʻshimcha toʻlov', 'bonus', 'pensiya', 'soliq', 'ish haqini hisoblash',
      'ish haqi kechikishi', 'ish haqini talab qilish',
      // Working conditions
      'ish vaqti', 'ish soatlari', 'qoshimcha ish', 'dam olish', 'taʼtil',
      'mehnat sharoitlari', 'ish xavfsizligi', 'kasalik davri', 'homiladorlik',
      // Job related
      'ish joyi', 'ish qidirish', 'ishchi', 'ish beruvchi', 'ish oʻrinlari',
      'ish tashlash', 'ishdan boʻshatish', 'ishga qabul', 'ish staji',
      // Specific issues
      'ishlatilish', 'ekspluatatsiya', 'ish haqi ololmaslik', 'ish joyida zoʻravonlik',
      'diskriminatsiya', 'nojiz holat', 'ishda baxtsiz hodisa', 'kasallik'
    ],
    LEGAL: [
      // Legal terms
      'qonuniy ish', 'noqonuniy ish', 'huquqiy masalalar', 'sud jarayoni',
      'qonun', 'huquq', 'jazo', 'jarima', 'huquqbuzarlik', 'qonun buzilishi',
      // Specific cases
      'ish haqi ololmaslik', 'shartnoma buzilishi', 'ekspluatatsiya',
      'ish joyida zoʻravonlik', 'diskriminatsiya', 'jinsiy zoʻravonlik',
      'oʻgʻirlik', 'firibgarlik', 'poraxoʻrlik', 'tazyiq',
      // Legal processes
      'shikoyat qilish', 'sudga murojaat', 'huquqiy yordam', 'advokat',
      'sudlanish', 'guvoh', 'dalil', 'sud qarori', 'apellyatsiya',
      // Organizations
      'mehnat inspeksiyasi', 'immigratsiya idorasi', 'politsiya',
      'inson huquqlari tashkiloti', 'ishchi uyushmasi'
    ],
    DOCUMENTS: [
      // Document types
      'hujjat', 'hujjat tayyorlash', 'ariza namunalari', 'royxatdan otish',
      'viza arizasi', 'pasport', 'ID karta', 'sertifikat', 'diplom',
      'tibbiy koʻrik', 'guvohnoma', 'fotosurat', 'yashash ruxsatnomasi',
      // Specific documents
      'ish shartnomasi', 'bank hisob varagʻi', 'soliq dekloratsiyasi',
      'sugʻurta polisi', 'mehnat daftarchasi', 'ish kitobchasi',
      // Processes
      'tasdiqlash', 'notarius', 'apostil', 'tarjima', 'hujjat topshirish',
      'hujjat tekshirish', 'hujjatni qayta olish', 'hujjat yoʻqolishi',
      // Institutions
      'konsullik', 'notariat', 'tadbirkorlik palatasi', 'universitet',
      'shifoxona', 'soliq idorasi'
    ],
    LIVING: [
      // Accommodation
      'yashash joyi', 'yotoqxona', 'kvartira', 'ijara', 'uy ijarasi',
      'hostel', 'goshiwon', 'hasookjib', 'kvartira narxi', 'depozit',
      // Utilities
      'kommunal', 'elektr', 'gaz', 'suv', 'isitish', 'internet', 'telefon',
      'chiqindilar', 'tozalik', 'kommunal toʻlovlar',
      // Daily life
      'manzil', 'hayot', 'turizm', 'dam olish', 'park', 'madaniyat', 'anʼanalar',
      'festival', 'bayram', 'milliy taomlar',
      // Transportation
      'transport', 'metro', 'avtobus', 'taksi', 'velosiped', 'haydovchilik guvohnomasi',
      'mashina ijarasi', 'aviabilety', 'poyezd', 'tezkor temir yoʻl',
      // Shopping
      'doʻkon', 'bozor', 'narxlar', 'aksiya', 'chegirma', 'onlayn xarid',
      'koreys mahsulotlari', 'halol ovqat', 'oziq-ovqat',
      // Community
      'jamiyat', 'mahalla', 'qoʻshnilar', 'chet elliklar', 'musulmonlar',
      'masjid', 'cherkov', 'ibodatxona', 'milliy guruhlar'
    ],
    EDUCATION: [
      // Education types
      'ta\'lim', 'universitet', 'maktab', 'kollej', 'litsey', 'kurs', 'trening',
      'seminar', 'konferensiya', 'malaka oshirish',
      // Study processes
      'oqish', 'imtihon', 'grant', 'stipendiya', 'oqish puli', 'darsliklar',
      'ilmiy ish', 'dissertatsiya', 'diplom', 'sertifikat',
      // Language
      'til kursi', 'koreys tili', 'ingliz tili', 'TOPIK', 'til bilish darajasi',
      'tarjimon', 'til sinovi', 'til oʻrganish',
      // Student life
      'talaba', 'talaba viza', 'talaba yotoqxonasi', 'talaba hayoti',
      'talaba klubi', 'xalqaro talabalar', 'talaba loyihalari',
      // Institutions
      'Seul universiteti', 'KAIST', 'Yonsei', 'Korea universiteti',
      'ta\'lim vazirligi', 'til markazi'
    ],
    OTHER: [
      // Finance
      'soliq', 'bank ishlari', 'pul o\'tkazma', 'valyuta', 'koreys voni',
      'bank kartasi', 'kredit', 'qarz', 'hisob raqam', 'bankomat',
      // Health
      'sogliqni saqlash', 'tibbiy sugurta', 'shifoxona', 'vrach', 'dorixona',
      'tekshiruv', 'emlash', 'koronavirus', 'psixologik yordam',
      // Emergency
      'favqulodda holat', 'politsiya', 'tez yordam', 'yong\'in', 'halokat',
      'xavf', 'qutqaruv', 'tayanch telefon raqamlar',
      // Special cases
      'zavodda yiqilish', 'ishda jarohat', 'kasallik', 'nogironlik',
      'homiladorlik', 'bola tug\'ish', 'o\'lim', 'janaza',
      // Miscellaneous
      'haydovchilik guvohnomasi', 'haydovchilik sinovi', 'mobil ilova',
      'foydali dasturlar', 'telefon aloqasi', 'internet', 'pochta', 'poshta'
    ]
  };
  
  const KOREAN_TERMS: Record<string, string> = {
    // Visa types
    'E-9': '비전문취업(E-9) 비자',
    'H-2': '방문취업(H-2) 비자',
    'E-7': '전문직(E-7) 비자',
    'F-2': '거주(F-2) 비자',
    'D-2': '유학(D-2) 비자',
    'D-4': '일반연수(D-4) 비자',
    'F-4': '재외동포(F-4) 비자',
    'A-1': '외교(A-1) 비자',
    'C-3': '단기방문(C-3) 비자',
    
    // Work terms
    'EPS': '고용허가제 (Employment Permit System)',
    'ish shartnomasi': '근로계약서',
    'ish haqi': '임금',
    'noqonuniy ish': '불법 취업',
    'ish joyi': '직장',
    'ishchi': '근로자',
    
    // Documents
    'viza arizasi': '비자 신청서',
    'pasport': '여권',
    'hujjat': '서류',
    'tasdiqlash': '확인',
    
    // Living
    'yashash joyi': '거주지',
    'kvartira': '아파트',
    'ijara': '임대',
    'kommunal': '공과금',
    
    // Education
    'ta\'lim': '교육',
    'universitet': '대학교',
    'stipendiya': '장학금',
    'til kursi': '언어 과정',
    
    // Other
    'soliq': '세금',
    'tibbiy sugurta': '건강보험',
    'bank ishlari': '은행 업무',
    'pul o\'tkazma': '송금',
    'valyuta': '외환',
    'zavodda yiqilish': '공장에서 넘어짐',
    'sogliqni saqlash': '건강 관리',
    
    // Legal terms
    'qonun': '법률',
    'huquq': '권리',
    'jazo': '처벌',
    'sud': '법원',
    
    // Emergency
    'favqulodda holat': '비상 사태',
    'tez yordam': '응급 처치'
  };
  
  const OFFICIAL_RESOURCES = {
    VISA: 'https://www.hikorea.go.kr (Hi Korea - Immigration Portal)',
    WORK: [
      'https://www.eps.go.kr (EPS Korea)',
      'https://www.moel.go.kr (Ministry of Employment and Labor)'
    ].join('\n'),
    LEGAL: [
      'https://www.law.go.kr (Korean Law Information Center)',
      'https://www.nhrc.go.kr (National Human Rights Commission)'
    ].join('\n'),
    DOCUMENTS: [
      'https://www.gov.kr (Korean Government)',
      'https://www.minwon.go.kr (Government 24)'
    ].join('\n'),
    LIVING: 'https://www.liveinkorea.kr (Live in Korea - Foreigner Support)',
    EDUCATION: 'https://www.studyinkorea.go.kr (Study in Korea)',
    HEALTH: 'https://www.nhis.or.kr (National Health Insurance Service)',
    GENERAL: [
      'https://www.korea.net (Official Korea Portal)',
      'https://www.1345.go.kr (Immigration Contact Center)'
    ].join('\n')
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
        model: 'gpt-3.5-turbo', // ✅ recommended stable model
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