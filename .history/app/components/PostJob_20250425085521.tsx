

// "use client";
// import { useState } from "react";
// import { useSession } from "next-auth/react"; 
// import "styles/postjob.css";

// interface FormData {
//   work_type: string;
//   work_days: string;
//   work_hours: string;
//   salary: string;
//   language: string;
//   visa_type: string;
//   contact: string;
//   location: string;
// }

// export default function PostJob() {
//   const [form, setForm] = useState<FormData>({
//     work_type: "",
//     work_days: "",
//     work_hours: "",
//     salary: "",
//     language: "",
//     visa_type: "",
//     contact: "",
//     location: "",
//   });

//   const { data: session } = useSession();
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [error, setError] = useState("");

//   if (!session) {
//     return (
//       <main className="post-job-container">
//         <p className="login-prompt">
//           Elon berish uchun iltimos, avval&nbsp;
//           <a href="/login" className="login-link">
//             login
//           </a>&nbsp;qiling.
//         </p>
//       </main>
//     );
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const cleanedForm = Object.fromEntries(
//       Object.entries(form).map(([key, value]) => [key, value.trim()])
//     );

//     const isEmpty = Object.values(cleanedForm).some((value) => value === "");
//     if (isEmpty) {
//       setError("Iltimos, barcha maydonlarni to'ldiring!");
//       return;
//     }

//     const phoneRegex = /^01[0|1]-?\d{3,4}-?\d{4}$/;
//     if (!phoneRegex.test(cleanedForm.contact)) {
//       setError(
//         "Iltimos, to'g'ri Koreya raqam kiriting! (01012345678 yoki 010-1234-5678)"
//       );
//       return;
//     }

//     setError("");

//     const response = await fetch("/api/post", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ...cleanedForm,
//         creator: session?.user?.id,
//       }),
//     });

//     const responseData = await response.json();

//     // Log response to diagnose the issue
//     console.log("Response status:", response.status);
//     console.log("Response data:", responseData);

//     if (response.ok) {
//       alert("Ish eloni MongoDB ga saqlandi! ✅");
//       setForm({
//         work_type: "",
//         work_days: "",
//         work_hours: "",
//         salary: "",
//         language: "",
//         visa_type: "",
//         contact: "",
//         location: "",
//       });
//       setIsFormVisible(false);
//     } else {
//       alert(`Xatolik! Saqlanmadi! ❌ ${responseData.error}`);
//     }
//   };

//   const handleButtonClick = () => {
//     setIsFormVisible(true);
//   };

//   const handleCancel = () => {
//     setIsFormVisible(false);
//     setForm({
//       work_type: "",
//       work_days: "",
//       work_hours: "",
//       salary: "",
//       language: "",
//       visa_type: "",
//       contact: "",
//       location: "",
//     });
//     setError("");
//   };

//   const fields: Array<{ label: string; name: keyof FormData; placeholder: string }> = [
//     { label: "Ish turi", name: "work_type", placeholder: "Ish turi (to'liq yoki qisman)" },
//     { label: "Ish kunlari", name: "work_days", placeholder: "Dushanbadan Jumagacha" },
//     { label: "Ish soatlari", name: "work_hours", placeholder: "9:00 - 18:00" },
//     { label: "Maosh", name: "salary", placeholder: "Maosh (raqamda)" },
//     { label: "Til", name: "language", placeholder: "Ingliz tili, koreys tili" },
//     { label: "Viza turi", name: "visa_type", placeholder: "Ish vizasi (E-9, D-10 va h.k.)" },
//     { label: "Telefon raqam", name: "contact", placeholder: "01012345678 yoki 010-1234-5678" },
//     { label: "Shahar", name: "location", placeholder: "Shahar (masalan, Seul)" },
//   ];

//   return (
//     <main className="post-job-container">
//       <h2 className="form-title">Ish eloni qo'shish</h2>

//       {!isFormVisible && session && (
//         <button
//           onClick={handleButtonClick}
//           className="upload-btn"
//         >
//           Elon yuklash
//         </button>
//       )}

//       {isFormVisible && (
//         <form onSubmit={handleSubmit} className="job-form">
//           {error && <p className="error-message">{error}</p>}

//           {fields.map((field) => (
//             <div className="form-group" key={field.name}>
//               <label className="form-label">{field.label}</label>
//               <input
//                 type="text"
//                 name={field.name}
//                 placeholder={field.placeholder}
//                 value={form[field.name]}
//                 onChange={handleChange}
//                 className="form-input"
//               />
//             </div>
//           ))}

//           <div className="button-group">
//             <button
//               type="submit"
//               className="submit-btn"
//             >
//               Yuborish
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="cancel-btn"
//             >
//               Bekor qilish
//             </button>
//           </div>
//         </form>
//       )}
//     </main>
//   );
// }


"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import "styles/postjob.css";

interface FormData {
  work_type: string;
  work_days: string;
  work_hours: string;
  salary: string;
  language: string;
  visa_type: string;
  contact: string;
  location: string;
}

export default function PostJob() {
  const [form, setForm] = useState<FormData>({
    work_type: "",
    work_days: "",
    work_hours: "",
    salary: "",
    language: "",
    visa_type: "",
    contact: "",
    location: "",
  });

  const { data: session } = useSession();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [error, setError] = useState("");

  if (!session) {
    return (
      <main className="post-job-container">
        <p className="login-prompt">
          공고를 올리시려면 먼저&nbsp;
          <a href="/login" className="login-link">
            로그인
          </a>&nbsp;해주세요.
        </p>
      </main>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedForm = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value.trim()])
    );

    const isEmpty = Object.values(cleanedForm).some((value) => value === "");
    if (isEmpty) {
      setError("모든 항목을 입력해주세요!");
      return;
    }

    const phoneRegex = /^01[0|1]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(cleanedForm.contact)) {
      setError(
        "정확한 한국 전화번호를 입력해주세요! (예: 01012345678 또는 010-1234-5678)"
      );
      return;
    }

    setError("");

    const response = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...cleanedForm,
        creator: session?.user?.id,
      }),
    });

    const responseData = await response.json();

    console.log("Response status:", response.status);
    console.log("Response data:", responseData);

    if (response.ok) {
      alert("구인 공고가 성공적으로 등록되었습니다! ✅");
      setForm({
        work_type: "",
        work_days: "",
        work_hours: "",
        salary: "",
        language: "",
        visa_type: "",
        contact: "",
        location: "",
      });
      setIsFormVisible(false);
    } else {
      alert(`오류 발생! 등록 실패 ❌ ${responseData.error}`);
    }
  };

  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setForm({
      work_type: "",
      work_days: "",
      work_hours: "",
      salary: "",
      language: "",
      visa_type: "",
      contact: "",
      location: "",
    });
    setError("");
  };

  const fields: Array<{ label: string; name: keyof FormData; placeholder: string }> = [
    { label: "근무 형태", name: "work_type", placeholder: "예: 정규직, 파트타임" },
    { label: "근무 요일", name: "work_days", placeholder: "예: 월요일 ~ 금요일" },
    { label: "근무 시간", name: "work_hours", placeholder: "예: 9:00 - 18:00" },
    { label: "급여", name: "salary", placeholder: "숫자만 입력 (예: 200만원)" },
    { label: "언어", name: "language", placeholder: "예: 한국어, 영어 가능자" },
    { label: "비자 종류", name: "visa_type", placeholder: "예: E-9, D-10 등" },
    { label: "연락처", name: "contact", placeholder: "01012345678 또는 010-1234-5678" },
    { label: "지역", name: "location", placeholder: "예: 서울, 인천" },
  ];

  return (
    <main className="post-job-container">
      <h2 className="form-title">구인 공고 등록</h2>

      {!isFormVisible && session && (
        <button
          onClick={handleButtonClick}
          className="upload-btn"
        >
          공고 작성하기
        </button>
      )}

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="job-form">
          {error && <p className="error-message">{error}</p>}

          {fields.map((field) => (
            <div className="form-group" key={field.name}>
              <label className="form-label">{field.label}</label>
              <input
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          ))}

          <div className="button-group">
            <button
              type="submit"
              className="submit-btn"
            >
              등록하기
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-btn"
            >
              취소
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
