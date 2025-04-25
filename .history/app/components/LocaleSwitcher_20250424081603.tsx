'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LocaleSwitcher() {
  const pathname = usePathname();

  const removeLocale = (path: string) => {
    return path.startsWith('/en') ? path.slice(3) :
           path.startsWith('/ko') ? path.slice(3) :
           path.startsWith('/ru') ? path.slice(3) :
           path.startsWith('/uz') ? path.slice(3) : path;
  };

  return (
    <div className="flex gap-2">
      <Link href={`/en${removeLocale(pathname)}`}>English</Link>
      <Link href={`/ko${removeLocale(pathname)}`}>한국어</Link>
      <Link href={`/ru${removeLocale(pathname)}`}>Русский</Link>
      <Link href={`/uz${removeLocale(pathname)}`}>O‘zbek</Link>
    </div>
  );
}