
// "use client";
// import { useState } from "react";
// import { useSession } from "next-auth/react"; 
// import "styles/postjob.css";

// // Formaning tipini aniqlaymiz
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

//   // Agar session mavjud bo'lmasa, foydalanuvchiga login qilishni so'rang
//   if (!session) {
//     return (
//       <main className="p-8">
//         <p className="text-red-600 text-lg font-semibold">
//           Elon berish uchun iltimos, avval&nbsp;
//           <a href="/login" className="underline text-blue-600">
//             login
//           </a>&nbsp;qiling.
//         </p>
//       </main>
//     );
//   }

//   // Inputlarni o'zgartirish
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
//       setError("Iltimos, barcha maydonlarni to‘ldiring!");
//       return;
//     }

//     const phoneRegex = /^01[0|1]-?\d{3,4}-?\d{4}$/;
//     if (!phoneRegex.test(cleanedForm.contact)) {
//       setError(
//         "Iltimos, to‘g‘ri Koreya raqam kiriting! (01012345678 yoki 010-1234-5678)"
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
//         creator: session?.user?.id, // ✅ to‘g‘ri nom bilan
//       }),
//     });

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
//       alert("Xatolik! Saqlanmadi! ❌");
//     }
//   };

//   // Formani ko'rsatish va o'chirish
//   const handleButtonClick = () => {
//     setIsFormVisible(true); // Formani ko'rsatish
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

//   // Input maydonlarini yaratish uchun fieldlar
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
  
//       {/* Login prompt */}
//       {!session && (
//         <p className="login-prompt">
//           Elon berish uchun iltimos, avval&nbsp;
//           <a href="/login" className="login-link">
//             login
//           </a>&nbsp;qiling.
//         </p>
//       )}
  
//       {/* Upload button */}
//       {!isFormVisible && session && (
//         <button
//           onClick={handleButtonClick}
//           className="upload-btn"
//         >
//           Elon yuklash
//         </button>
//       )}
  
//       {/* Form */}
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
//       setError("Iltimos, barcha maydonlarni to&apos;ldiring!");
//       return;
//     }

//     const phoneRegex = /^01[0|1]-?\d{3,4}-?\d{4}$/;
//     if (!phoneRegex.test(cleanedForm.contact)) {
//       setError(
//         "Iltimos, to&apos;g&apos;ri Koreya raqam kiriting! (01012345678 yoki 010-1234-5678)"
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
//       alert("Xatolik! Saqlanmadi! ❌");
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
//     { label: "Ish turi", name: "work_type", placeholder: "Ish turi (to&apos;liq yoki qisman)" },
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
//       <h2 className="form-title">Ish eloni qo&apos;shish</h2>

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
          Elon berish uchun iltimos, avval&nbsp;
          <a href="/login" className="login-link">
            login
          </a>&nbsp;qiling.
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
      setError("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    const phoneRegex = /^01[0|1]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(cleanedForm.contact)) {
      setError(
        "Iltimos, to'g'ri Koreya raqam kiriting! (01012345678 yoki 010-1234-5678)"
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

    // Log response to diagnose the issue
    console.log("Response status:", response.status);
    console.log("Response data:", responseData);

    if (response.ok) {
      alert("Ish eloni MongoDB ga saqlandi! ✅");
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
      alert(`Xatolik! Saqlanmadi! ❌ ${responseData.error}`);
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
    { label: "Ish turi", name: "work_type", placeholder: "Ish turi (to'liq yoki qisman)" },
    { label: "Ish kunlari", name: "work_days", placeholder: "Dushanbadan Jumagacha" },
    { label: "Ish soatlari", name: "work_hours", placeholder: "9:00 - 18:00" },
    { label: "Maosh", name: "salary", placeholder: "Maosh (raqamda)" },
    { label: "Til", name: "language", placeholder: "Ingliz tili, koreys tili" },
    { label: "Viza turi", name: "visa_type", placeholder: "Ish vizasi (E-9, D-10 va h.k.)" },
    { label: "Telefon raqam", name: "contact", placeholder: "01012345678 yoki 010-1234-5678" },
    { label: "Shahar", name: "location", placeholder: "Shahar (masalan, Seul)" },
  ];

  return (
    <main className="post-job-container">
      <h2 className="form-title">Ish eloni qo'shish</h2>

      {!isFormVisible && session && (
        <button
          onClick={handleButtonClick}
          className="upload-btn"
        >
          Elon yuklash
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
              Yuborish
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-btn"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
