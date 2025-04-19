"use client";
import { useState } from "react";
import { useSession } from "next-auth/react"; // 🔐 Auth session

// Formaning tipini aniqlaymiz
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

  // Agar session mavjud bo'lmasa, foydalanuvchiga login qilishni so'rang
  if (!session) {
    return (
      <main className="p-8">
        <h2 className="text-3xl font-bold mb-6">Ish eloni qo'shish</h2>
        <p className="text-red-600 text-lg font-semibold">
          Elon berish uchun iltimos, avval{" "}
          <a href="/login" className="underline text-blue-600">
            login
          </a>{" "}
          qiling.
        </p>
      </main>
    );
  }

  // Inputlarni o'zgartirish
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
      setError("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    if (isNaN(Number(cleanedForm.salary))) {
      setError("Maosh faqat raqam bo‘lishi kerak!");
      return;
    }

    const phoneRegex = /^01[0|1]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(cleanedForm.contact)) {
      setError(
        "Iltimos, to‘g‘ri Koreya raqam kiriting! (01012345678 yoki 010-1234-5678)"
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
        creator: session?.user?.id, // ✅ to‘g‘ri nom bilan
      }),
    });

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
      alert("Xatolik! Saqlanmadi! ❌");
    }
  };

  // Formani ko'rsatish va o'chirish
  const handleButtonClick = () => {
    setIsFormVisible(true); // Formani ko'rsatish
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

  // Input maydonlarini yaratish uchun fieldlar
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
    <main className="p-8">
      <h2 className="text-3xl font-bold mb-6">Ish eloni qo'shish</h2>

      {/* Agar foydalanuvchi tizimga kirmagan bo'lsa, faqat login qilishni so'rang */}
      {!isFormVisible && session && (
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Elon yuklash
        </button>
      )}

      {/* Formani ko'rsatish */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 font-semibold">{error}</p>}

          {fields.map((field) => (
            <div className="flex flex-col" key={field.name}>
              <label className="mb-2 font-semibold">{field.label}</label>
              
            </div>
          ))}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
            >
              Yuborish
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
            >
              Bekor qilish
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
