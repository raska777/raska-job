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
import styles from './register.module.css';

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
    
    if (!validateForm()) return;
    
    if (!agreedToTerms) {
      alert("Iltimos, shartlar va maxfiylik siyosatiga roziligingizni bildiring");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Ro‘yxatdan o‘tildi!');
        router.push('/login');
      } else {
        alert(data.error || 'Xatolik yuz berdi');
      }
    } catch (err) {
      console.error("Xatolik:", err);
      alert("Tarmoq yoki server xatosi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Ro‘yxatdan o‘tish</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder="Ismingiz"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        
        <div className={styles.inputGroup}>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Parol"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.togglePassword}
            >
              {showPassword ? 'Yashirish' : 'Ko‘rsatish'}
            </button>
          </div>
          {errors.password && <span className={styles.error}>{errors.password}</span>}
          <div className={styles.strengthMeter}>
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className={`${styles.strengthBar} ${
                  i <= passwordStrength ? 
                    passwordStrength >= 3 ? 'filled' : 
                    passwordStrength >= 2 ? 'filled medium' : 'filled weak' 
                    : ''
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className={styles.checkbox}
          />
          <label htmlFor="terms">
            <a href="/terms" className={styles.loginLink}>Shartlar</a> va 
            <a href="/privacy" className={styles.loginLink}>Maxfiylik siyosati</a>ga roziman
          </label>
        </div>
        
        <button
          type="submit"
          disabled={!agreedToTerms || isLoading}
          className={styles.submitButton}
        >
          {isLoading ? 'Yuklanmoqda...' : 'Ro‘yxatdan o‘tish'}
        </button>
        
        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerText}>yoki</span>
          <div className={styles.dividerLine} />
        </div>
        
        <button 
          type="button"
          onClick={() => router.push('/api/auth/google')}
          className={styles.socialButton}
        >
          Google orqali ro'yxatdan o'tish
        </button>
        
        <p className={styles.loginLink}>
          Hisobingiz bormi?{' '}
          <a href="/login">Tizimga kirish</a>
        </p>
      </form>
    </main>
  );
}