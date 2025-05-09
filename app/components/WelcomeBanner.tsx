'use client';

import { Typewriter } from 'react-simple-typewriter';
import Link from 'next/link';
import 'styles/welcomeBanner.css';

export default function WelcomeBanner() {
  return (
    <div className="welcome-container">
      <div className="welcome-banner">
        <p className="welcome-message">
          <Typewriter
            words={[
              '지금 바로 Raska Job을 시작하세요!',
              '외국인 노동자를 위한 최고의 일자리 플랫폼!',
              '지금 가입하고 무료로 이용해보세요.'
            ]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
          <br />
          <Link href="/register" className="signup-link">
            무료 회원가입 →
          </Link>
        </p>
      </div>
    </div>
  );
}
