import { NextResponse } from 'next/server';
import { getTranslatedJob } from 'lib/getTranslatedJob';

export async function POST(req: Request) {
  const { job, lang } = await req.json();

  if (!job || !lang) {
    return NextResponse.json({ error: 'Missing job or lang' }, { status: 400 });
  }

  try {
    const translated = await getTranslatedJob(job, lang);
    return NextResponse.json(translated);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to translate job' }, { status: 500 });
  }
}
