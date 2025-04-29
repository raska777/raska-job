

'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import styles from 'styles/register.module.css';
import { FcGoogle } from 'react-icons/fc'; 
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function RegisterPage() {
  const router = useRouter();
  const termsContentRef = useRef<HTMLDivElement | null>(null);
  const privacyContentRef = useRef<HTMLDivElement | null>(null);
  


  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [googleError, setGoogleError] = useState('');
  const [currentStep, setCurrentStep] = useState<'welcome' | 'terms' | 'privacy' | 'register'>('welcome');
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', password: '' };

    if (!form.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요.';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleError('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          agreedToTerms: true, // 👉 Buni ham yuboramiz
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('회원가입이 완료되었습니다!');
        router.push('/login');
      } else {
        alert(data.error || '오류가 발생했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('서버 연결 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleError('');
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl: '/' });
    } catch (err) {
      console.error(err);
      setGoogleError('Google 로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTop = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  

  if (currentStep === 'welcome') {
    return (
      <main className={styles.welcomeContainer}>
        <div className={styles.welcomeCard}>
          <div className={styles.welcomeHeader}>
            <div className={styles.logo}>Raska Job</div>
            <h1 className={styles.welcomeTitle}>구인구직 플랫폼에 오신 것을 환영합니다!</h1>
            <p className={styles.welcomeSubtitle}>아르바이트부터 정규직까지, 당신의 꿈의 직장을 찾아보세요</p>
          </div>
          
          <div className={styles.welcomeFeatures}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>💼</div>
              <h3>다양한 구인공고</h3>
              <p>수천 개의 아르바이트 및 정규직 공고</p>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>안전한 플랫폼</h3>
              <p>검증된 기업들의 신뢰할 수 있는 공고</p>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>빠른 지원</h3>
              <p>간편한 프로필로 1분 만에 지원하기</p>
            </div>
          </div>
          
          <button 
            onClick={() => setCurrentStep('terms')}
            className={styles.welcomeButton}
          >
            무료로 시작하기
          </button>
          
          <p className={styles.loginPrompt}>
            이미 계정이 있으신가요?{' '}
            <a href="/login" className={styles.loginLink}>로그인하기</a>
          </p>
        </div>
      </main>
    );
  }
  if (currentStep === 'terms' || currentStep === 'privacy') {
    return (
      <main className={styles.termsMainContainer}>
        <div className={styles.termsCard}>
          <div className={styles.termsHeader}>
            <h1 className={styles.termsMainTitle}>
              {activeTab === 'terms' ? '이용약관' : '개인정보처리방침'}
            </h1>
            <p className={styles.termsDescription}>
              서비스를 이용하기 전에 약관을 읽고 동의해주세요
            </p>
          </div>
          
          <div className={styles.termsTabs}>
            <button
              className={`${styles.termsTab} ${activeTab === 'terms' ? styles.activeTab : ''}`}
              onClick={() => {
                setActiveTab('terms');
                scrollToTop(termsContentRef);
              }}
            >
              이용약관
            </button>
            <button
              className={`${styles.termsTab} ${activeTab === 'privacy' ? styles.activeTab : ''}`}
              onClick={() => {
                setActiveTab('privacy');
                scrollToTop(privacyContentRef);
              }}
            >
              개인정보처리방침
            </button>
          </div>
          
          <div className={styles.termsContentContainer}>
            {activeTab === 'terms' ? (
              <div ref={termsContentRef} className={styles.termsContent}>
                <h2 className={styles.termsSectionTitle}>Raska Job 이용약관</h2>
                
                <section className={styles.termsSection}>
                  <h3>1. 플랫폼 소개</h3>
                  <p>
                    Raska Job 플랫폼은 사용자가 아르바이트 및 정규직 구인공고를 등록하고, 
                    구직자는 이를 검색하고 지원할 수 있도록 지원하는 서비스입니다.
                    이용자는 본 플랫폼을 사용함으로써 본 이용약관에 동의한 것으로 간주됩니다.
                  </p>
                </section>
                
                <section className={styles.termsSection}>
                  <h3>2. 회원가입 및 이용자 의무</h3>
                  <ul>
                    <li>회원은 정확하고 진실된 정보를 제공해야 합니다.</li>
                    <li>타인의 명의 도용, 허위 정보 입력은 금지됩니다.</li>
                    <li>비밀번호 관리 책임은 회원 본인에게 있습니다.</li>
                    <li>플랫폼 사용 시 현지 법률 및 규정을 준수해야 합니다.</li>
                  </ul>
                </section>
                
                <section className={styles.termsSection}>
                  <h3>3. 구인공고 등록 규칙</h3>
                  <ul>
                    <li>모든 구인공고는 사실에 근거해야 합니다.</li>
                    <li>허위, 과장, 불법 또는 사기성 공고는 금지됩니다.</li>
                    <li>급여, 근무시간, 근무지 등의 주요 정보를 명확히 기재해야 합니다.</li>
                    <li>플랫폼은 자체 판단으로 부적절한 공고를 삭제할 수 있습니다.</li>
                  </ul>
                </section>
                
                <section className={styles.termsSection}>
                  <h3>4. 구직자 의무</h3>
                  <ul>
                    <li>구직자는 사실에 근거하여 지원해야 합니다.</li>
                    <li>이중 지원, 허위 지원, 악성 댓글 작성은 금지됩니다.</li>
                  </ul>
                </section>
                
                <section className={styles.termsSection}>
                  <h3>5. 서비스 이용 제한 및 중단</h3>
                  <ul>
                    <li>이용자가 본 약관을 위반할 경우, 플랫폼은 사전 통보 없이 서비스 이용을 제한하거나 중단할 수 있습니다.</li>
                    <li>서버 점검, 시스템 오류 등으로 인해 일시적으로 서비스가 중단될 수 있습니다.</li>
                  </ul>
                </section>
              </div>
            ) : (
              <div ref={privacyContentRef} className={styles.termsContent}>
                <h2 className={styles.termsSectionTitle}>Raska Job 개인정보처리방침</h2>
                
                <section className={styles.termsSection}>
                  <h3>1. 수집하는 개인정보 항목</h3>
                  <ul>
                    <li>회원 가입 시: 이름, 이메일, 비밀번호</li>
                    <li>공고 등록 시: 회사명, 연락처, 근무지 정보</li>
                    <li>고객센터 이용 시: 문의 내용, 추가 연락처</li>
                  </ul>
                </section>
                
                <section className={styles.termsSection}>
                  <h3>2. 개인정보 수집 방법</h3>
                  <p>
                    회원가입 양식, 구인공고 등록 양식, 고객센터 문의 양식을 통해 수집합니다.
                    쿠키(cookie), 로그 분석을 통해 자동 수집될 수 있습니다.
                  </p>
                </section>
                
                <section className={styles.termsSection}>
                  <h3>3. 개인정보 이용 목적</h3>
                  <ul>
                    <li>회원 관리 (본인 확인, 가입 의사 확인, 불만 처리 등)</li>
                    <li>구인·구직 매칭 서비스 제공</li>
                    <li>공지사항 전달 및 마케팅 활용 (동의한 경우)</li>
                    <li>법령 및 약관 위반 방지</li>
                  </ul>
                </section>
                
                <section className={styles.termsSection}>
                  <h3>4. 개인정보 보유 및 이용 기간</h3>
                  <ul>
                    <li>회원 탈퇴 시 또는 수집 목적 달성 시까지 보관합니다.</li>
                    <li>관련 법령에 따라 일정 기간 보관해야 할 경우에는 해당 기간 동안 보관합니다.</li>
                    <li>전자상거래법에 의한 소비자 불만 및 분쟁 처리 기록: 3년</li>
                    <li>통신비밀보호법에 의한 로그인 기록: 3개월</li>
                  </ul>
                </section>
              </div>
            )}
          </div>
          
          <div className={styles.termsAgreementBox}>
            <label className={styles.termsCheckboxLabel}>
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className={styles.termsCheckbox}
              />
              <span>위 이용약관과 개인정보 처리방침에 동의합니다</span>
            </label>
          </div>
          
          <div className={styles.termsButtonGroup}>
            <button 
              onClick={() => setCurrentStep('welcome')}
              className={styles.termsBackButton}
            >
              뒤로
            </button>
            <button
              onClick={() => setCurrentStep('register')}
              disabled={!agreedToTerms}
              className={styles.termsContinueButton}
            >
              동의하고 계속하기
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.registerCard}>
        <div className={styles.registerHeader}>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>기본 정보를 입력해주세요</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>이름</label>
            <input
              type="text"
              name="name"
              placeholder="이름을 입력해주세요"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>이메일 주소</label>
            <input
              type="email"
              name="email"
              placeholder="example@example.com"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>비밀번호</label>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="6자리 이상 입력해주세요"
                value={form.password}
                onChange={handleChange}
                className={styles.input}
              />
             <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className={styles.togglePassword}
>
  {showPassword ? (
    <FiEyeOff size={20} />
  ) : (
    <FiEye size={20} />
  )}
</button>

            </div>
            {errors.password && <span className={styles.error}>{errors.password}</span>}
            <div className={styles.passwordStrength}>
              <span>비밀번호 강도: </span>
              <div className={styles.strengthMeter}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`${styles.strengthBar} ${
                      i <= passwordStrength
                        ? passwordStrength >= 3
                          ? styles.filledStrong
                          : passwordStrength >= 2
                          ? styles.filledMedium
                          : styles.filledWeak
                        : ''
                    }`}
                  />
                ))}
              </div>
              <span className={styles.strengthText}>
                {passwordStrength === 0 && '매우 약함'}
                {passwordStrength === 1 && '약함'}
                {passwordStrength === 2 && '보통'}
                {passwordStrength === 3 && '강함'}
                {passwordStrength === 4 && '매우 강함'}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? (
              <span className={styles.buttonLoading}>
                <span className={styles.spinner}></span> 처리 중...
              </span>
            ) : (
              '회원가입 완료'
            )}
          </button>

          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            <span className={styles.dividerText}>또는</span>
            <div className={styles.dividerLine} />
          </div>

          <button
  onClick={handleGoogleSignIn}
  type="button"
  className={styles.googleButton}
  disabled={isLoading}
>
  <FcGoogle className={styles.googleIcon} size={24} />
  Google 계정으로 가입
</button>
          {googleError && <p className={styles.error}>{googleError}</p>}

          <p className={styles.loginPrompt}>
            이미 계정이 있으신가요?{' '}
            <a href="/login" className={styles.loginLink}>로그인하기</a>
          </p>
        </form>
      </div>
    </main>
  );
}