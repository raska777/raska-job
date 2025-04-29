
// 'use client';

// import { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import 'styles/postjob.css';

// interface FormData {
//   work_type: string;
//   work_days: string;
//   work_hours: string;
//   custom_work_hours?: string;
//   salary: string;
//   salary_type: string;
//   language: string;
//   accepts_foreigners: boolean;
//   contact: string;
//   location: string;
//   description?: string;
// }

// const cities = [
//   '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
//   '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도',
//   '경상북도', '경상남도', '제주도'
// ];

// const workTypes = [
//   '정규직', '계약직', '파트타임', '아르바이트', '인턴', '프리랜서'
// ];

// const languages = [
//   '한국어', '영어', '중국어', '일본어', '베트남어', '러시아어', '기타'
// ];

// export default function PostJob() {
//   const { data: session } = useSession();

//   const [form, setForm] = useState<FormData>({
//     work_type: '',
//     work_days: '',
//     work_hours: '',
//     salary: '',
//     salary_type: '월급',
//     language: '',
//     accepts_foreigners: false,
//     contact: '',
//     location: '',
//     description: ''
//   });

//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
//   // SMS tasdiqlash uchun yangi state'lar
//   const [verificationCode, setVerificationCode] = useState('');
//   const [isCodeSent, setIsCodeSent] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [verificationError, setVerificationError] = useState('');

//   if (!session) {
//     return (
//       <main className="post-job-container">
//         <p className="login-prompt">
//           공고를 올리려면 <a href="/login" className="login-link">로그인</a> 해주세요.
//         </p>
//       </main>
//     );
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target as HTMLInputElement;
    
//     if (type === 'checkbox') {
//       const checked = (e.target as HTMLInputElement).checked;
//       setForm(prevForm => ({ ...prevForm, [name]: checked }));
//     } else {
//       setForm(prevForm => ({ ...prevForm, [name]: value }));
//     }
//   };

//   // SMS kodini yuborish funksiyasi
//   const sendVerificationCode = async () => {
//     const phoneRegex = /^01[0|1]-?\d{3,4}-?\d{4}$/;
//     if (!phoneRegex.test(form.contact)) {
//       setError('올바른 전화번호 형식을 입력하세요! (예: 010-1234-5678)');
//       return;
//     }

//     try {
//       setError('');
//       setSuccessMessage('인증 코드를 발송 중입니다...');
      
//       // Bu yerda SMS yuborish API chaqiruvi bo'lishi kerak
//       // Mock response
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       setIsCodeSent(true);
//       setSuccessMessage('인증 코드가 전송되었습니다. 5분 내로 입력해주세요.');
//     } catch (err) {
//       setError('인증 코드 발송에 실패했습니다. 다시 시도해주세요.');
//     }
//   };

//   // SMS kodini tasdiqlash funksiyasi
//   const verifyCode = async () => {
//     if (!verificationCode) {
//       setVerificationError('인증 코드를 입력해주세요');
//       return;
//     }

//     try {
//       setVerificationError('');
//       setSuccessMessage('인증 코드 확인 중...');
      
//       // Bu yerda kodni tekshirish API chaqiruvi bo'lishi kerak
//       // Mock verification
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       if (verificationCode === '123456') { // Test uchun har doim 123456 kod ishlaydi
//         setIsVerified(true);
//         setSuccessMessage('인증이 완료되었습니다! 이제 공고를 작성할 수 있습니다.');
//       } else {
//         throw new Error('Invalid code');
//       }
//     } catch (err) {
//       setVerificationError('잘못된 인증 코드입니다. 다시 시도해주세요.');
//       console.error('Verification error:', err); 
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation
//     if (!form.work_type || !form.work_days || !form.work_hours || 
//         !form.salary || !form.language || !form.contact || !form.location) {
//       setError('필수 항목을 모두 입력해주세요!');
//       return;
//     }

//     setError('');
//     setIsFormSubmitted(true);
//     setSuccessMessage('✅ 처리 중입니다. 잠시만 기다려주세요...');

//     try {
//       const response = await fetch('/api/post', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           ...form,
//           work_hours: form.work_hours === '직접입력' ? form.custom_work_hours : form.work_hours,
//           salary: `${form.salary} ${form.salary_type}`,
//           creator: session.user?.id,
//         }),
//       });

//       if (response.ok) {
//         setSuccessMessage('✅ 공고가 성공적으로 등록되었습니다!');
//         setTimeout(() => {
//           setIsFormVisible(false);
//           setIsFormSubmitted(false);
//           setSuccessMessage('');
//           setForm({
//             work_type: '',
//             work_days: '',
//             work_hours: '',
//             salary: '',
//             salary_type: '월급',
//             language: '',
//             accepts_foreigners: false,
//             contact: '',
//             location: '',
//             description: ''
//           });
//           // Reset verification states
//           setIsVerified(false);
//           setIsCodeSent(false);
//           setVerificationCode('');
//         }, 2000);
//       } else {
//         throw new Error('공고 등록 실패');
//       }
//     } catch (error) {
//       setError('공고 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
//       setIsFormSubmitted(false);
//     }
//   };

//   return (
//     <main className="post-job-container">
//       <h2 className="form-title">구인 공고 등록</h2>

//       {!isFormVisible && (
//         <button onClick={() => setIsFormVisible(true)} className="upload-btn">
//           공고 작성
//         </button>
//       )}

//       {isFormVisible && (
//         <>
//           {!isVerified ? (
//             <div className="verification-section">
//               <h3>전화번호 인증</h3>
//               <p>공고를 등록하기 전에 전화번호 인증이 필요합니다.</p>
              
//               <div className="form-group">
//                 <label className="form-label">전화번호 *</label>
//                 <div className="phone-input-group">
//                   <input
//                     type="text"
//                     name="contact"
//                     value={form.contact}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="010-1234-5678"
//                     required
//                     disabled={isCodeSent}
//                   />
//                   {!isCodeSent && (
//                     <button 
//                       type="button" 
//                       onClick={sendVerificationCode}
//                       className="send-code-btn"
//                     >
//                       인증번호 전송
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {isCodeSent && (
//                 <div className="form-group">
//                   <label className="form-label">인증 코드 *</label>
//                   <div className="code-input-group">
//                     <input
//                       type="text"
//                       value={verificationCode}
//                       onChange={(e) => setVerificationCode(e.target.value)}
//                       className="form-input"
//                       placeholder="6자리 인증 코드"
//                       required
//                     />
//                     <button 
//                       type="button" 
//                       onClick={verifyCode}
//                       className="verify-btn"
//                     >
//                       인증하기
//                     </button>
//                   </div>
//                   {verificationError && <p className="error-message">{verificationError}</p>}
//                   <p className="form-hint">테스트용: 인증 코드는 '123456' 입니다</p>
//                 </div>
//               )}

//               {successMessage && <p className="success-message">{successMessage}</p>}
//               {error && <p className="error-message">{error}</p>}

//               <button
//                 type="button"
//                 className="cancel-btn"
//                 onClick={() => {
//                   setIsFormVisible(false);
//                   setIsCodeSent(false);
//                   setVerificationCode('');
//                   setError('');
//                 }}
//               >
//                 취소
//               </button>
//             </div>
//           ) : (
//             <>
//               {!isFormSubmitted ? (
//                 <form onSubmit={handleSubmit} className="job-form">
//                   {error && <p className="error-message">{error}</p>}

//                   <div className="form-group">
//                     <label className="form-label">근무 형태 *</label>
//                     <select
//                       name="work_type"
//                       value={form.work_type}
//                       onChange={handleChange}
//                       className="form-input"
//                       required
//                     >
//                       <option value="">선택하세요</option>
//                       {workTypes.map(type => (
//                         <option key={type} value={type}>{type}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">근무 요일 *</label>
//                     <input
//                       type="text"
//                       name="work_days"
//                       value={form.work_days}
//                       onChange={handleChange}
//                       className="form-input"
//                       placeholder="예: 월-금, 주5일"
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">근무 시간 *</label>
//                     <select
//                       name="work_hours"
//                       value={form.work_hours}
//                       onChange={handleChange}
//                       className="form-input"
//                       required
//                     >
//                       <option value="">선택하세요</option>
//                       <option value="주간 (09:00-18:00)">주간 (09:00-18:00)</option>
//                       <option value="야간 (22:00-06:00)">야간 (22:00-06:00)</option>
//                       <option value="2교대">2교대</option>
//                       <option value="3교대">3교대</option>
//                       <option value="직접입력">직접입력</option>
//                     </select>
//                     {form.work_hours === '직접입력' && (
//                       <input
//                         type="text"
//                         name="custom_work_hours"
//                         value={form.custom_work_hours || ''}
//                         onChange={handleChange}
//                         className="form-input"
//                         placeholder="예: 08:00 ~ 17:00"
//                         required
//                       />
//                     )}
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">급여 *</label>
//                     <div className="salary-group">
//                       <input
//                         type="text"
//                         name="salary"
//                         value={form.salary}
//                         onChange={handleChange}
//                         className="form-input"
//                         placeholder="금액 입력"
//                         required
//                       />
//                       <select
//                         name="salary_type"
//                         value={form.salary_type}
//                         onChange={handleChange}
//                         className="form-input"
//                       >
//                         <option value="월급">월급</option>
//                         <option value="일급">일급</option>
//                         <option value="시급">시급</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">필요 언어 *</label>
//                     <select
//                       name="language"
//                       value={form.language}
//                       onChange={handleChange}
//                       className="form-input"
//                       required
//                     >
//                       <option value="">선택하세요</option>
//                       {languages.map(lang => (
//                         <option key={lang} value={lang}>{lang}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="form-group checkbox-group">
//                     <label className="checkbox-label">
//                       <input
//                         type="checkbox"
//                         name="accepts_foreigners"
//                         checked={form.accepts_foreigners}
//                         onChange={handleChange}
//                       />
//                       외국인 지원 가능
//                     </label>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">근무 지역 *</label>
//                     <select
//                       name="location"
//                       value={form.location}
//                       onChange={handleChange}
//                       className="form-input"
//                       required
//                     >
//                       <option value="">선택하세요</option>
//                       {cities.map(city => (
//                         <option key={city} value={city}>{city}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">추가 설명</label>
//                     <textarea
//                       name="description"
//                       value={form.description}
//                       onChange={handleChange}
//                       className="form-textarea"
//                       placeholder="업무 내용, 자격 요건, 복리후생 등 추가 정보를 입력해주세요"
//                       rows={4}
//                     />
//                   </div>

//                   <div className="button-group">
//                     <button type="submit" className="submit-btn">공고 등록</button>
//                     <button
//                       type="button"
//                       className="cancel-btn"
//                       onClick={() => {
//                         setIsFormVisible(false);
//                         setIsVerified(false);
//                       }}
//                     >
//                       취소
//                     </button>
//                   </div>
//                 </form>
//               ) : (
//                 <div className="success-message">
//                   <p>{successMessage}</p>
//                   <div className="loading-spinner"></div>
//                 </div>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </main>
//   );
// }

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import 'styles/postjob.css';

interface FormData {
  work_type: string;
  work_days: string;
  work_hours: string;
  custom_work_hours?: string;
  salary: string;
  salary_type: string;
  language: string;
  accepts_foreigners: boolean;
  contact: string;
  location: string;
  description?: string;
}

const cities = [
  '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
  '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도',
  '경상북도', '경상남도', '제주도'
];

const workTypes = [
  '정규직', '계약직', '파트타임', '아르바이트', '인턴', '프리랜서'
];

const languages = [
  '한국어', '영어', '중국어', '일본어', '베트남어', '러시아어', '기타'
];

export default function PostJob() {
  const { data: session } = useSession();

  const [form, setForm] = useState<FormData>({
    work_type: '',
    work_days: '',
    work_hours: '',
    salary: '',
    salary_type: '월급',
    language: '',
    accepts_foreigners: false,
    contact: '',
    location: '',
    description: ''
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  // SMS tasdiqlash uchun yangi state'lar
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  if (!session) {
    return (
      <main className="post-job-container">
        <p className="login-prompt">
          공고를 올리려면 <a href="/login" className="login-link">로그인</a> 해주세요.
        </p>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prevForm => ({ ...prevForm, [name]: checked }));
    } else {
      setForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  };

  // SMS kodini yuborish funksiyasi
  const sendVerificationCode = async () => {
    const phoneRegex = /^01[0|1]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(form.contact)) {
      setError('올바른 전화번호 형식을 입력하세요! (예: 010-1234-5678)');
      return;
    }

    try {
      setError('');
      setSuccessMessage('인증 코드를 발송 중입니다...');
      
      // Bu yerda SMS yuborish API chaqiruvi bo'lishi kerak
      // Mock response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsCodeSent(true);
      setSuccessMessage('인증 코드가 전송되었습니다. 5분 내로 입력해주세요.');
    } catch (err) {
      setError('인증 코드 발송에 실패했습니다. 다시 시도해주세요.');
      console.error('SMS sending error:', err); // err ni ishlatish uchun qo'shilgan
    }
  };

  // SMS kodini tasdiqlash funksiyasi
  const verifyCode = async () => {
    if (!verificationCode) {
      setVerificationError('인증 코드를 입력해주세요');
      return;
    }

    try {
      setVerificationError('');
      setSuccessMessage('인증 코드 확인 중...');
      
      // Bu yerda kodni tekshirish API chaqiruvi bo'lishi kerak
      // Mock verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (verificationCode === '123456') { // Test uchun har doim 123456 kod ishlaydi
        setIsVerified(true);
        setSuccessMessage('인증이 완료되었습니다! 이제 공고를 작성할 수 있습니다.');
      } else {
        throw new Error('Invalid code');
      }
    } catch (err) {
      setVerificationError('잘못된 인증 코드입니다. 다시 시도해주세요.');
      console.error('Verification error:', err); // err ni ishlatish uchun qo'shilgan
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.work_type || !form.work_days || !form.work_hours || 
        !form.salary || !form.language || !form.contact || !form.location) {
      setError('필수 항목을 모두 입력해주세요!');
      return;
    }

    setError('');
    setIsFormSubmitted(true);
    setSuccessMessage('✅ 처리 중입니다. 잠시만 기다려주세요...');

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          work_hours: form.work_hours === '직접입력' ? form.custom_work_hours : form.work_hours,
          salary: `${form.salary} ${form.salary_type}`,
          creator: session.user?.id,
        }),
      });

      if (response.ok) {
        setSuccessMessage('✅ 공고가 성공적으로 등록되었습니다!');
        setTimeout(() => {
          setIsFormVisible(false);
          setIsFormSubmitted(false);
          setSuccessMessage('');
          setForm({
            work_type: '',
            work_days: '',
            work_hours: '',
            salary: '',
            salary_type: '월급',
            language: '',
            accepts_foreigners: false,
            contact: '',
            location: '',
            description: ''
          });
          // Reset verification states
          setIsVerified(false);
          setIsCodeSent(false);
          setVerificationCode('');
        }, 2000);
      } else {
        throw new Error('공고 등록 실패');
      }
    } catch (error) {
      setError('공고 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Submission error:', error); // error ni ishlatish uchun qo'shilgan
      setIsFormSubmitted(false);
    }
  };

  return (
    <main className="post-job-container">
      <h2 className="form-title">구인 공고 등록</h2>

      {!isFormVisible && (
        <button onClick={() => setIsFormVisible(true)} className="upload-btn">
          공고 작성
        </button>
      )}

      {isFormVisible && (
        <>
          {!isVerified ? (
            <div className="verification-section">
              <h3>전화번호 인증</h3>
              <p>공고를 등록하기 전에 전화번호 인증이 필요합니다.</p>
              
              <div className="form-group">
                <label className="form-label">전화번호 *</label>
                <div className="phone-input-group">
                  <input
                    type="text"
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="010-1234-5678"
                    required
                    disabled={isCodeSent}
                  />
                  {!isCodeSent && (
                    <button 
                      type="button" 
                      onClick={sendVerificationCode}
                      className="send-code-btn"
                    >
                      인증번호 전송
                    </button>
                  )}
                </div>
              </div>

              {isCodeSent && (
                <div className="form-group">
                  <label className="form-label">인증 코드 *</label>
                  <div className="code-input-group">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="form-input"
                      placeholder="6자리 인증 코드"
                      required
                    />
                    <button 
                      type="button" 
                      onClick={verifyCode}
                      className="verify-btn"
                    >
                      인증하기
                    </button>
                  </div>
                  {verificationError && <p className="error-message">{verificationError}</p>}
                  <p className="form-hint">테스트용: 인증 코드는 '123456' 입니다</p>
                </div>
              )}

              {successMessage && <p className="success-message">{successMessage}</p>}
              {error && <p className="error-message">{error}</p>}

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setIsFormVisible(false);
                  setIsCodeSent(false);
                  setVerificationCode('');
                  setError('');
                }}
              >
                취소
              </button>
            </div>
          ) : (
            <>
              {!isFormSubmitted ? (
                <form onSubmit={handleSubmit} className="job-form">
                  {error && <p className="error-message">{error}</p>}

                  <div className="form-group">
                    <label className="form-label">근무 형태 *</label>
                    <select
                      name="work_type"
                      value={form.work_type}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">선택하세요</option>
                      {workTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">근무 요일 *</label>
                    <input
                      type="text"
                      name="work_days"
                      value={form.work_days}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="예: 월-금, 주5일"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">근무 시간 *</label>
                    <select
                      name="work_hours"
                      value={form.work_hours}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">선택하세요</option>
                      <option value="주간 (09:00-18:00)">주간 (09:00-18:00)</option>
                      <option value="야간 (22:00-06:00)">야간 (22:00-06:00)</option>
                      <option value="2교대">2교대</option>
                      <option value="3교대">3교대</option>
                      <option value="직접입력">직접입력</option>
                    </select>
                    {form.work_hours === '직접입력' && (
                      <input
                        type="text"
                        name="custom_work_hours"
                        value={form.custom_work_hours || ''}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="예: 08:00 ~ 17:00"
                        required
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">급여 *</label>
                    <div className="salary-group">
                      <input
                        type="text"
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="금액 입력"
                        required
                      />
                      <select
                        name="salary_type"
                        value={form.salary_type}
                        onChange={handleChange}
                        className="form-input"
                      >
                        <option value="월급">월급</option>
                        <option value="일급">일급</option>
                        <option value="시급">시급</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">필요 언어 *</label>
                    <select
                      name="language"
                      value={form.language}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">선택하세요</option>
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="accepts_foreigners"
                        checked={form.accepts_foreigners}
                        onChange={handleChange}
                      />
                      외국인 지원 가능
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="form-label">근무 지역 *</label>
                    <select
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">선택하세요</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">추가 설명</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="form-textarea"
                      placeholder="업무 내용, 자격 요건, 복리후생 등 추가 정보를 입력해주세요"
                      rows={4}
                    />
                  </div>

                  <div className="button-group">
                    <button type="submit" className="submit-btn">공고 등록</button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {
                        setIsFormVisible(false);
                        setIsVerified(false);
                      }}
                    >
                      취소
                    </button>
                  </div>
                </form>
              ) : (
                <div className="success-message">
                  <p>{successMessage}</p>
                  <div className="loading-spinner"></div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}