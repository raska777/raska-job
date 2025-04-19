// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import "styles/global.css"

// export default function RegisterPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('/api/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert('Ro‘yxatdan o‘tildi! ✅');
//         router.push('/login');
//       } else {
//         alert(data.error || 'Xatolik! ❌');
//       }
//     } catch (err) {
//       console.error("Xatolik:", err);
//       alert("Tarmoq yoki server xatosi");
//     }
//   };

//   return (
//     <main className="p-8 max-w-md mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Ro‘yxatdan o‘tish</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Ismingiz"
//           value={form.name}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Parol"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full p-3 border rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Ro‘yxatdan o‘tish
//         </button>
//       </form>
//     </main>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import "styles/global.css";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    return strength;
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', password: '' };

    if (!form.name.trim()) {
      newErrors.name = 'Ism kiritilishi shart';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email kiritilishi shart';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Noto‘g‘ri email formati';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Parol kiritilishi shart';
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Parol kamida 6 belgidan iborat bo‘lishi kerak';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (attempts >= 3) {
      alert("Juda ko'p urinishlar! Iltimos, birozdan keyin urinib ko'ring.");
      return;
    }
    
    if (!validateForm()) {
      setAttempts(prev => prev + 1);
      return;
    }
    
    if (!agreedToTerms) {
      alert("Iltimos, shartlar va maxfiylik siyosatiga roziligingizni bildiring");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRF-Token': await getCsrfToken() 
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.requiresVerification) {
          router.push(`/verify-email?email=${encodeURIComponent(form.email)}`);
        } else {
          alert('Ro‘yxatdan o‘tildi! ✅');
          router.push('/login');
        }
      } else {
        alert(data.error || 'Xatolik! ❌');
      }
    } catch (err) {
      console.error("Xatolik:", err);
      alert("Tarmoq yoki server xatosi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-4 md:p-8 max-w-md mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Ro‘yxatdan o‘tish</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Ismingiz"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Parol"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className={`h-1 flex-1 ${i <= passwordStrength ? 
                  passwordStrength >= 3 ? 'bg-green-500' : 
                  passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-red-500' 
                  : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="terms" className="text-sm">
            <a href="/terms" className="text-blue-500 hover:underline">Shartlar</a> va 
            <a href="/privacy" className="text-blue-500 hover:underline">Maxfiylik siyosati</a>ga roziman
          </label>
        </div>
        
        <button
          type="submit"
          disabled={!agreedToTerms || isLoading}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors ${
            !agreedToTerms || isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Yuklanmoqda...
            </span>
          ) : 'Ro‘yxatdan o‘tish'}
        </button>
        
        <div className="relative flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">yoki</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        <button 
          type="button"
          onClick={() => router.push('/api/auth/google')}
          className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 w-full"
        >
          <span>Google</span> orqali ro'yxatdan o'tish
        </button>
        
        <p className="text-center text-sm text-gray-600">
          Hisobingiz bormi?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Tizimga kirish
          </a>
        </p>
      </form>
    </main>
  );
}

// CSRF token olish funktsiyasi (misol)
async function getCsrfToken() {
  // Bu sizning backend APIingizga bog'liq
  const res = await fetch('/api/csrf');
  const data = await res.json();
  return data.csrfToken;
}