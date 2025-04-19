// app/login/page.tsx
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (result?.ok) {
      router.push("/"); // yoki dashboard sahifasi
    } else {
      setError("Email yoki parol noto‘g‘ri!");
    }
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6">Tizimga kirish</h2>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            placeholder="Foydalanuvchi emaili"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Parol</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            placeholder="Parol"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
        >
          Kirish
        </button>
      </form>
    </main>
  );
}
