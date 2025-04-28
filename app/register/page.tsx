
// ////////////pastdagi koreyscha vaqtincha unversal LanguageSwitcher o`rnatilgunga qadar


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';
// import styles from 'styles/register.module.css';

// export default function RegisterPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [errors, setErrors] = useState({ name: '', email: '', password: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);
//   const [agreedToTerms, setAgreedToTerms] = useState(false);
//   const [googleError, setGoogleError] = useState('');

//   const checkPasswordStrength = (password: string) => {
//     let strength = 0;
//     if (password.length >= 6) strength += 1;
//     if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
//     if (/\d/.test(password)) strength += 1;
//     if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
//     return strength;
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = { name: '', email: '', password: '' };

//     if (!form.name.trim()) {
//       newErrors.name = '이름을 입력해주세요.';
//       valid = false;
//     }

//     if (!form.email.trim()) {
//       newErrors.email = '이메일을 입력해주세요.';
//       valid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = '올바른 이메일 형식을 입력해주세요.';
//       valid = false;
//     }

//     if (!form.password) {
//       newErrors.password = '비밀번호를 입력해주세요.';
//       valid = false;
//     } else if (form.password.length < 6) {
//       newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));

//     if (name === 'password') {
//       setPasswordStrength(checkPasswordStrength(value));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setGoogleError('');

//     if (!validateForm()) return;

//     if (!agreedToTerms) {
//       alert('약관 및 개인정보처리방침에 동의해주세요.');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const res = await fetch('/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert('회원가입이 완료되었습니다!');
//         router.push('/login');
//       } else {
//         alert(data.error || '오류가 발생했습니다.');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('서버 연결 중 오류가 발생했습니다.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setGoogleError('');
//     try {
//       setIsLoading(true);
//       await signIn('google', { callbackUrl: '/' });
//     } catch (err) {
//       console.error(err);
//       setGoogleError('Google 로그인 중 오류가 발생했습니다.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className={styles.container}>
//       <h1 className={styles.title}>회원가입</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.inputGroup}>
//           <input
//             type="text"
//             name="name"
//             placeholder="이름"
//             value={form.name}
//             onChange={handleChange}
//             className={styles.input}
//           />
//           {errors.name && <span className={styles.error}>{errors.name}</span>}
//         </div>

//         <div className={styles.inputGroup}>
//           <input
//             type="email"
//             name="email"
//             placeholder="이메일 주소"
//             value={form.email}
//             onChange={handleChange}
//             className={styles.input}
//           />
//           {errors.email && <span className={styles.error}>{errors.email}</span>}
//         </div>

//         <div className={styles.inputGroup}>
//           <div className={styles.passwordContainer}>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               placeholder="비밀번호"
//               value={form.password}
//               onChange={handleChange}
//               className={styles.input}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className={styles.togglePassword}
//             >
//               {showPassword ? '숨기기' : '보이기'}
//             </button>
//           </div>
//           {errors.password && <span className={styles.error}>{errors.password}</span>}
//           <div className={styles.strengthMeter}>
//             {[1, 2, 3, 4].map((i) => (
//               <div
//                 key={i}
//                 className={`${styles.strengthBar} ${
//                   i <= passwordStrength
//                     ? passwordStrength >= 3
//                       ? 'filled'
//                       : passwordStrength >= 2
//                       ? 'filled medium'
//                       : 'filled weak'
//                     : ''
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         <div className={styles.checkboxContainer}>
//           <input
//             type="checkbox"
//             id="terms"
//             checked={agreedToTerms}
//             onChange={(e) => setAgreedToTerms(e.target.checked)}
//             className={styles.checkbox}
//           />
//           <label htmlFor="terms">
//             <a href="/terms" className={styles.loginLink}>이용약관</a> 및{' '}
//             <a href="/privacy" className={styles.loginLink}>개인정보처리방침</a>에 동의합니다.
//           </label>
//         </div>

//         <button
//           type="submit"
//           disabled={!agreedToTerms || isLoading}
//           className={styles.submitButton}
//         >
//           {isLoading ? '처리 중...' : '회원가입'}
//         </button>

//         <div className={styles.divider}>
//           <div className={styles.dividerLine} />
//           <span className={styles.dividerText}>또는</span>
//           <div className={styles.dividerLine} />
//         </div>

//         <button
//           onClick={handleGoogleSignIn}
//           type="button"
//           className="google-button"
//           disabled={isLoading}
//         >
//           {isLoading ? '처리 중...' : 'Google 계정으로 가입'}
//         </button>
//         {googleError && <p className={styles.error}>{googleError}</p>}

//         <p className={styles.loginLink}>
//           이미 계정이 있으신가요? <a href="/login">로그인</a>
//         </p>
//       </form>
//     </main>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';
// import styles from 'styles/register.module.css';

// export default function RegisterPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [errors, setErrors] = useState({ name: '', email: '', password: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);
//   const [agreedTerms, setAgreedTerms] = useState(false);
//   const [agreedPrivacy, setAgreedPrivacy] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [googleError, setGoogleError] = useState('');

//   const checkPasswordStrength = (password: string) => {
//     let strength = 0;
//     if (password.length >= 6) strength += 1;
//     if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
//     if (/\d/.test(password)) strength += 1;
//     if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
//     return strength;
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = { name: '', email: '', password: '' };

//     if (!form.name.trim()) {
//       newErrors.name = '이름을 입력해주세요.';
//       valid = false;
//     }
//     if (!form.email.trim()) {
//       newErrors.email = '이메일을 입력해주세요.';
//       valid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = '올바른 이메일 형식을 입력해주세요.';
//       valid = false;
//     }
//     if (!form.password) {
//       newErrors.password = '비밀번호를 입력해주세요.';
//       valid = false;
//     } else if (form.password.length < 6) {
//       newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
//       valid = false;
//     }
//     setErrors(newErrors);
//     return valid;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));

//     if (name === 'password') {
//       setPasswordStrength(checkPasswordStrength(value));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setGoogleError('');

//     if (!validateForm()) return;

//     if (!agreedTerms || !agreedPrivacy) {
//       alert('이용약관 및 개인정보처리방침에 동의해주세요.');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const res = await fetch('/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert('회원가입이 완료되었습니다!');
//         router.push('/login');
//       } else {
//         alert(data.error || '오류가 발생했습니다.');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('서버 연결 중 오류가 발생했습니다.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     setGoogleError('');
//     try {
//       setIsLoading(true);
//       await signIn('google', { callbackUrl: '/' });
//     } catch (err) {
//       console.error(err);
//       setGoogleError('Google 로그인 중 오류가 발생했습니다.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleContinue = () => {
//     if (!agreedTerms || !agreedPrivacy) {
//       alert('모든 약관에 동의해주세요.');
//       return;
//     }
//     setShowForm(true);
//   };

//   return (
//     <main className={styles.container}>
//       <h1 className={styles.title}>Raska Job 플랫폼에 오신 것을 환영합니다! 🎉</h1>

//       {!showForm ? (
//         <>
//           <div className={styles.card}>
//             <h2 className={styles.subTitle}>이용약관 (Terms and Conditions)</h2>
//             <div className={styles.scrollBox}>
//             <div>
//         Raska Job 이용약관 (Terms and Conditions)
// 1. 플랫폼 소개 (Platform Introduction)

// Raska Job 플랫폼은 사용자가 아르바이트 및 정규직 구인공고를 등록하고, 구직자는 이를 검색하고 지원할 수 있도록 지원하는 서비스입니다.
// 이용자는 본 플랫폼을 사용함으로써 본 이용약관에 동의한 것으로 간주됩니다.
// 2. 회원가입 및 이용자 의무 (Registration and User Obligations)

//     회원은 정확하고 진실된 정보를 제공해야 합니다.

//     타인의 명의 도용, 허위 정보 입력은 금지됩니다.

//     비밀번호 관리 책임은 회원 본인에게 있습니다.

//     플랫폼 사용 시 현지 법률 및 규정을 준수해야 합니다.

// 3. 구인공고 등록 규칙 (Job Posting Rules)

//     모든 구인공고는 사실에 근거해야 합니다.

//     허위, 과장, 불법 또는 사기성 공고는 금지됩니다.

//     급여, 근무시간, 근무지 등의 주요 정보를 명확히 기재해야 합니다.

//     플랫폼은 자체 판단으로 부적절한 공고를 삭제할 수 있습니다.

// 4. 구직자 의무 (Job Seeker Obligations)

//     구직자는 사실에 근거하여 지원해야 합니다.

//     이중 지원, 허위 지원, 악성 댓글 작성은 금지됩니다.

// 5. 서비스 이용 제한 및 중단 (Service Restriction and Termination)

//     이용자가 본 약관을 위반할 경우, 플랫폼은 사전 통보 없이 서비스 이용을 제한하거나 중단할 수 있습니다.

//     서버 점검, 시스템 오류 등으로 인해 일시적으로 서비스가 중단될 수 있습니다.

// 6. 개인정보 보호 (Personal Information Protection)

//     개인정보는 '개인정보처리방침'에 따라 안전하게 관리됩니다.

//     사용자는 언제든지 개인정보 열람, 수정, 삭제를 요청할 수 있습니다.

// 7. 책임의 한계 (Limitation of Liability)

//     플랫폼은 구인구직 매칭 과정에서 발생하는 문제에 대해 법적 책임을 지지 않습니다.

//     거래 및 계약은 사용자 간의 자율적인 판단에 의해 이루어집니다.

// 8. 광고 및 외부 링크 (Advertisements and External Links)

//     플랫폼에는 외부 링크나 광고가 포함될 수 있으며, 외부 사이트에서 제공하는 서비스나 정보에 대해 책임을 지지 않습니다.

// 9. 약관 변경 (Modification of Terms)

//     본 이용약관은 사전 공지 없이 변경될 수 있습니다.

//     변경된 약관은 플랫폼에 게시되며, 변경 후에도 서비스를 이용할 경우 변경된 약관에 동의한 것으로 간주됩니다.

// 10. 준거법 및 관할 법원 (Governing Law and Jurisdiction)

//     본 약관은 대한민국 법률에 따라 해석되고 적용됩니다.

//     서비스 이용과 관련하여 발생하는 분쟁에 대해 관할 법원은 서울중앙지방법원으로 합니다.
//        </div>              <p>회원가입 또는 공고 등록을 통해, 사용자는 본 플랫폼의 이용약관 및 개인정보처리방침에 동의하는 것으로 간주됩니다.</p>
//               <p>모든 구인공고는 정확하고 진실된 정보여야 합니다. 허위, 불법, 사기성 공고는 금지됩니다.</p>
//               <p>근무지, 급여, 근무시간 등 주요 정보를 명확히 기재해야 합니다.</p>
//               <p>본 이용약관은 사전 고지 없이 변경될 수 있으며, 변경 시 웹사이트를 통해 공지됩니다.</p>
//             </div>
//             <div className={styles.checkboxContainer}>
//               <input
//                 type="checkbox"
//                 id="agree-terms"
//                 checked={agreedTerms}
//                 onChange={(e) => setAgreedTerms(e.target.checked)}
//               />
//               <label htmlFor="agree-terms">이용약관에 동의합니다.</label>
//             </div>
//           </div>

//           <div className={styles.card}>
//             <h2 className={styles.subTitle}>개인정보처리방침 (Privacy Policy)</h2>
//             <div className={styles.scrollBox}>
//             <div>
//     Raska Job 개인정보처리방침 (Privacy Policy)
// 1. 수집하는 개인정보 항목 (Personal Information We Collect)

//     회원 가입 시: 이름, 이메일, 비밀번호

//     공고 등록 시: 회사명, 연락처, 근무지 정보

//     고객센터 이용 시: 문의 내용, 추가 연락처

// 2. 개인정보 수집 방법 (How We Collect Information)

//     회원가입 양식, 구인공고 등록 양식, 고객센터 문의 양식을 통해 수집합니다.

//     쿠키(cookie), 로그 분석을 통해 자동 수집될 수 있습니다.

// 3. 개인정보 이용 목적 (Purpose of Collecting Personal Information)

//     회원 관리 (본인 확인, 가입 의사 확인, 불만 처리 등)

//     구인·구직 매칭 서비스 제공

//     공지사항 전달 및 마케팅 활용 (동의한 경우)

//     법령 및 약관 위반 방지

// 4. 개인정보 보유 및 이용 기간 (Retention and Use Period)

//     회원 탈퇴 시 또는 수집 목적 달성 시까지 보관합니다.

//     관련 법령에 따라 일정 기간 보관해야 할 경우에는 해당 기간 동안 보관합니다.

//         전자상거래법에 의한 소비자 불만 및 분쟁 처리 기록: 3년

//         통신비밀보호법에 의한 로그인 기록: 3개월

// 5. 개인정보 제3자 제공 (Provision to Third Parties)

//     원칙적으로 회원의 개인정보를 외부에 제공하지 않습니다.

//     단, 법률에 의거하거나 사용자의 동의를 받은 경우에 한해 제공할 수 있습니다.

// 6. 개인정보 처리 위탁 (Entrustment to Third Parties)

//     서비스 향상을 위해 일부 업무를 외부 전문 업체에 위탁할 수 있습니다.

//     위탁 시, 계약을 통해 개인정보 보호 조치를 취합니다.

// 7. 개인정보 파기 절차 및 방법 (Destruction of Personal Information)

//     목적이 달성된 후 별도의 DB로 옮겨지거나 즉시 파기합니다.

//     전자적 파일 형태는 복구 불가능한 방법으로 삭제하며, 서면 문서는 분쇄 또는 소각합니다.

// 8. 이용자 및 법정대리인의 권리 (User and Legal Representative Rights)

//     본인의 개인정보에 대해 열람, 수정, 삭제를 요청할 수 있습니다.

//     만 14세 미만 아동의 경우, 법정대리인이 대신 권리를 행사할 수 있습니다.

// 9. 개인정보 보호를 위한 기술적/관리적 대책 (Security Measures)

//     개인정보는 암호화되어 저장됩니다.

//     해킹 및 바이러스에 대비한 시스템적 보안 조치를 시행하고 있습니다.

//     개인정보 접근 권한을 최소화하여 직원 교육을 실시합니다.

// 10. 개인정보 보호책임자 (Privacy Protection Officer)

//     이름: 시스템 관리자

//     이메일: support@raska-job.com

//     문의사항이 있을 경우 위 담당자에게 연락 주시기 바랍니다.

// 11. 고지의 의무 (Duty to Notify)

//     개인정보처리방침은 변경될 수 있으며, 변경 시 웹사이트를 통해 사전 공지합니다.
//       </div>              <p>수집된 개인정보는 오직 구직/구인 매칭을 위해 사용됩니다.</p>
//               <p>개인정보는 제3자에게 제공되지 않습니다.</p>
//               <p>회원은 언제든지 개인정보 열람 및 삭제를 요청할 수 있습니다.</p>
//             </div>
//             <div className={styles.checkboxContainer}>
//               <input
//                 type="checkbox"
//                 id="agree-privacy"
//                 checked={agreedPrivacy}
//                 onChange={(e) => setAgreedPrivacy(e.target.checked)}
//               />
//               <label htmlFor="agree-privacy">개인정보처리방침에 동의합니다.</label>
//             </div>
//           </div>

//           <div className={styles.fixedButton}>
//             <button
//               onClick={handleContinue}
//               disabled={!(agreedTerms && agreedPrivacy)}
//               className={styles.continueButton}
//             >
//               계속하기
//             </button>
//           </div>
//         </>
//       ) : (
//         <form onSubmit={handleSubmit} className={styles.form}>
//           {/* Form Part */}
//           <div className={styles.inputGroup}>
//             <input
//               type="text"
//               name="name"
//               placeholder="이름"
//               value={form.name}
//               onChange={handleChange}
//               className={styles.input}
//             />
//             {errors.name && <span className={styles.error}>{errors.name}</span>}
//           </div>

//           <div className={styles.inputGroup}>
//             <input
//               type="email"
//               name="email"
//               placeholder="이메일 주소"
//               value={form.email}
//               onChange={handleChange}
//               className={styles.input}
//             />
//             {errors.email && <span className={styles.error}>{errors.email}</span>}
//           </div>

//           <div className={styles.inputGroup}>
//             <div className={styles.passwordContainer}>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="비밀번호"
//                 value={form.password}
//                 onChange={handleChange}
//                 className={styles.input}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className={styles.togglePassword}
//               >
//                 {showPassword ? '숨기기' : '보이기'}
//               </button>
//             </div>
//             {errors.password && <span className={styles.error}>{errors.password}</span>}

//             <div className={styles.strengthMeter}>
//               {[1, 2, 3, 4].map((i) => (
//                 <div
//                   key={i}
//                   className={`${styles.strengthBar} ${
//                     i <= passwordStrength
//                       ? passwordStrength >= 3
//                         ? 'filled'
//                         : passwordStrength >= 2
//                         ? 'filled medium'
//                         : 'filled weak'
//                       : ''
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={styles.submitButton}
//           >
//             {isLoading ? '처리 중...' : '회원가입'}
//           </button>

//           <div className={styles.divider}>
//             <div className={styles.dividerLine} />
//             <span className={styles.dividerText}>또는</span>
//             <div className={styles.dividerLine} />
//           </div>

//           <button
//             onClick={handleGoogleSignIn}
//             type="button"
//             className={styles.googleButton}
//             disabled={isLoading}
//           >
//             {isLoading ? '처리 중...' : (
//               <>
//                 <img src="/google-icon.svg" alt="Google" className={styles.googleIcon} />
//                 Google 계정으로 가입
//               </>
//             )}
//           </button>

//           {googleError && <p className={styles.error}>{googleError}</p>}

//           <p className={styles.loginLink}>
//             이미 계정이 있으신가요? <a href="/login">로그인</a>
//           </p>
//         </form>
//       )}
//     </main>
//   );
// }

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
        body: JSON.stringify(form),
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