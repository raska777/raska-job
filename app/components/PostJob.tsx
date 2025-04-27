
// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import 'styles/postjob.css';
// // import { Session } from 'inspector';

// interface FormData {
//   work_type: string;
//   work_days: string;
//   work_hours: string;
//   custom_work_hours?: string;
//   salary: string;
//   salary_type: string;
//   language: string;
//   visa_type: string[];
//   contact: string;
//   location: string;
// }

// const visaOptions = [
//   '무관', 'E-9', 'E-7', 'D-10', 'H-2', 'F-2', 'F-4', 'F-5', 'F-6',
//   'G-1', 'C-3', 'D-2', 'D-4', 'E-1', 'E-2', 'E-5', 'E-6', 'F-1', 'H-1', 'J-1', 'K-1'
// ];

// const cities = [
//   '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
//   '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도',
//   '경상북도', '경상남도', '제주도'
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
//     visa_type: [],
//     contact: '',
//     location: ''
//   });

//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   // const [isVisaDropdownOpen, setIsVisaDropdownOpen] = useState(false); // ❌ Agar visa dropdown ishlatilmasa, O'CHIRAMIZ  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

//   const visaDropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (visaDropdownRef.current && !visaDropdownRef.current.contains(event.target as Node)) {
//         setIsVisaDropdownOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     if (name === 'visa_type' && type === 'checkbox') {
//       const updatedVisas = form.visa_type.includes(value)
//         ? form.visa_type.filter(v => v !== value)
//         : [...form.visa_type, value];
//       setForm({ ...form, visa_type: updatedVisas });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const cleanedForm = {
//       ...form,
//       salary: `${form.salary} ${form.salary_type}`,
//       work_hours: form.work_hours === '직접입력' ? form.custom_work_hours : form.work_hours,
//     };

//     if (Object.values(cleanedForm).some(v => v === '' || v === undefined || (Array.isArray(v) && v.length === 0))) {
//       setError('모든 항목을 입력해주세요!');
//       return;
//     }

//     const phoneRegex = /^01[0|1]-?\d{3,4}-?\d{4}$/;
//     if (!phoneRegex.test(form.contact)) {
//       setError('정확한 전화번호를 입력하세요! (예: 010-1234-5678)');
//       return;
//     }

//     setError('');
//     setIsFormSubmitted(true);
//     setSuccessMessage('✅ 잠시만 기다려주세요...');

//     const response = await fetch('/api/post', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         ...cleanedForm,
//         creator: session?.user?.id, // Will be undefined if session or user is null
//       }),
//     });

//     if (response.ok) {
//       setTimeout(() => {
//         setSuccessMessage('✅ 공고가 성공적으로 등록되었습니다!');
//         setTimeout(() => {
//           setIsFormVisible(false);
//           setSuccessMessage('');
//           setIsFormSubmitted(false);
//           setForm({
//             work_type: '',
//             work_days: '',
//             work_hours: '',
//             salary: '',
//             salary_type: '월급',
//             language: '',
//             visa_type: [],
//             contact: '',
//             location: ''
//           });
//         }, 2000);
//       }, 2000);
//     } else {
//       setError('공고 등록 실패했습니다 ❌');
//       setIsFormSubmitted(false);
//     }
//   };

//   if (!session) {
//     return (
//       <main className="post-job-container">
//         <p className="login-prompt">
//           공고를 올리려면 <a href="/login" className="login-link">로그인</a> 해주세요.
//         </p>
//       </main>
//     );
//   }

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
//           {!setIsFormSubmitted ? (
//             <form onSubmit={handleSubmit} className="job-form">
//               {error && <p className="error-message">{error}</p>}

//               <div className="form-group">
//                 <label className="form-label">근무 형태</label>
//                 <input type="text" name="work_type" className="form-input" value={form.work_type} onChange={handleChange} placeholder="예: 정규직" />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">근무 요일</label>
//                 <input type="text" name="work_days" className="form-input" value={form.work_days} onChange={handleChange} placeholder="예: 월-금" />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">근무 시간</label>
//                 <select name="work_hours" className="form-input" value={form.work_hours} onChange={handleChange}>
//                   <option value="">선택하세요</option>
//                   <option value="주간 (09:00-18:00)">주간 (09:00-18:00)</option>
//                   <option value="야간 (22:00-06:00)">야간 (22:00-06:00)</option>
//                   <option value="2교대">2교대</option>
//                   <option value="3교대">3교대</option>
//                   <option value="직접입력">직접입력</option>
//                 </select>
//                 {form.work_hours === '직접입력' && (
//                   <input type="text" name="custom_work_hours" className="form-input" value={form.custom_work_hours || ''} onChange={handleChange} placeholder="08:00 ~ 17:00" />
//                 )}
//               </div>

//               <div className="form-group">
//                 <label className="form-label">급여</label>
//                 <div className="salary-group">
//                   <input type="text" name="salary" className="form-input" value={form.salary} onChange={handleChange} placeholder="금액 입력" />
//                   <select name="salary_type" className="form-input" value={form.salary_type} onChange={handleChange}>
//                     <option value="월급">월급</option>
//                     <option value="일급">일급</option>
//                     <option value="시급">시급</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label className="form-label">언어</label>
//                 <input type="text" name="language" className="form-input" value={form.language} onChange={handleChange} placeholder="예: 한국어" />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">연락처</label>
//                 <input type="text" name="contact" className="form-input" value={form.contact} onChange={handleChange} placeholder="010-1234-5678" />
//               </div>

//               <div className="form-group">
//                 <label className="form-label">지역</label>
//                 <select name="location" className="form-input" value={form.location} onChange={handleChange}>
//                   <option value="">선택하세요</option>
//                   {cities.map(city => <option key={city} value={city}>{city}</option>)}
//                 </select>
//               </div>

//               <div className="button-group">
//                 <button type="submit" className="submit-btn">등록</button>
//                 <button type="button" className="cancel-btn" onClick={() => setIsFormVisible(false)}>취소</button>
//               </div>
//             </form>
//           ) : (
//             <p className="success-message">{successMessage}</p>
//           )}
//         </>
//       )}
//     </main>
//   );
// }
// function setIsVisaDropdownOpen(arg0: boolean) {
//   throw new Error('Function not implemented.');
// }

// function setIsFormSubmitted(arg0: boolean) {
//   throw new Error('Function not implemented.');
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
  visa_type: string[];
  contact: string;
  location: string;
}

const cities = [
  '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
  '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도',
  '경상북도', '경상남도', '제주도'
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
    visa_type: [],
    contact: '',
    location: ''
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  if (!session) {
    return (
      <main className="post-job-container">
        <p className="login-prompt">
          공고를 올리려면 <a href="/login" className="login-link">로그인</a> 해주세요.
        </p>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedForm = {
      ...form,
      salary: `${form.salary} ${form.salary_type}`,
      work_hours: form.work_hours === '직접입력' ? form.custom_work_hours : form.work_hours,
    };

    if (Object.values(cleanedForm).some(v => v === '' || v === undefined || (Array.isArray(v) && v.length === 0))) {
      setError('모든 항목을 입력해주세요!');
      return;
    }

    const phoneRegex = /^01[0|1]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(form.contact)) {
      setError('정확한 전화번호를 입력하세요! (예: 010-1234-5678)');
      return;
    }

    setError('');
    setIsFormSubmitted(true);
    setSuccessMessage('✅ 잠시만 기다려주세요...');

    const response = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...cleanedForm,
        creator: session.user?.id,
      }),
    });

    if (response.ok) {
      setTimeout(() => {
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
            visa_type: [],
            contact: '',
            location: ''
          });
        }, 2000);
      }, 2000);
    } else {
      setError('공고 등록 실패했습니다 ❌');
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
    {!isFormSubmitted ? (
      <form onSubmit={handleSubmit} className="job-form">
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label className="form-label">근무 형태</label>
          <input
            type="text"
            name="work_type"
            value={form.work_type}
            onChange={handleChange}
            className="form-input"
            placeholder="예: 정규직"
          />
        </div>

        <div className="form-group">
          <label className="form-label">근무 요일</label>
          <input
            type="text"
            name="work_days"
            value={form.work_days}
            onChange={handleChange}
            className="form-input"
            placeholder="예: 월-금"
          />
        </div>

        <div className="form-group">
          <label className="form-label">근무 시간</label>
          <select
            name="work_hours"
            value={form.work_hours}
            onChange={handleChange}
            className="form-input"
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
              placeholder="08:00 ~ 17:00"
            />
          )}
        </div>

        <div className="form-group">
          <label className="form-label">급여</label>
          <div className="salary-group">
            <input
              type="text"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              className="form-input"
              placeholder="금액 입력"
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
          <label className="form-label">언어</label>
          <input
            type="text"
            name="language"
            value={form.language}
            onChange={handleChange}
            className="form-input"
            placeholder="예: 한국어"
          />
        </div>

        <div className="form-group">
          <label className="form-label">연락처</label>
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="form-input"
            placeholder="010-1234-5678"
          />
        </div>

        <div className="form-group">
          <label className="form-label">지역</label>
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">선택하세요</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">등록</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => setIsFormVisible(false)}
          >
            취소
          </button>
        </div>
      </form>
    ) : (
      <p className="success-message">{successMessage}</p>
    )}
  </>
)}

    </main>
  );
}
