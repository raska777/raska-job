"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Link } from "react-router-dom";

interface Job {
  _id: string;
  work_type: string;
  work_days: string;
  work_hours: string;
  salary: string;
  language: string;
  visa_type: string;
  contact: string;
  location: string;
}

export default function MyJobsPage() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!session?.user?.id) return;

      setLoading(true);
      const res = await fetch(`/api/my-jobs`);
      const data = await res.json();
      setJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, [session]);

  const handleUpdate = async () => {
    if (!editingJob) return;

    try {
      const res = await fetch(`/api/my-jobs/${editingJob._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingJob),
      });

      if (res.ok) {
        alert("E’lon yangilandi ✅");
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === editingJob._id ? editingJob : job
          )
        );
        setEditingJob(null);
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.message || "Xatolik yuz berdi ❌");
      }
    } catch (error) {
      console.error("Unexpected error during update:", error);
      setErrorMessage("Xatolik yuz berdi ❌");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Ushbu e’lonni o‘chirmoqchimisiz?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/my-jobs/${id}`, { method: "DELETE" });

      if (res.ok) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        alert("E’lon o‘chirildi ✅");
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.message || "O‘chirishda xatolik yuz berdi ❌");
      }
    } catch (error) {
      console.error("Unexpected error during delete:", error);
      setErrorMessage("O‘chirishda xatolik yuz berdi ❌");
    }
  };

  if (status === "loading" || loading) return <p className="p-8">Yuklanmoqda...</p>;

  if (!session)
    return (
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Mening e’lonlarim</h2>
        <p className="text-red-600 font-semibold">Iltimos, tizimga kiring.</p>
      </main>
    );

  return (
    <main className="p-8">
      <h2 className="text-2xl font-bold mb-6">Mening e’lonlarim</h2>

      {errorMessage && (
        <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>
      )}

      {jobs.length === 0 ? (
        <p>Hozircha e’lon yo‘q.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id} className="border p-4 rounded-lg shadow-md">
              <p><strong>Ish turi:</strong> {job.work_type}</p>
              <p><strong>Ish kunlari:</strong> {job.work_days}</p>
              <p><strong>Soatlar:</strong> {job.work_hours}</p>
              <p><strong>Maosh:</strong> {job.salary}</p>
              <p><strong>Til:</strong> {job.language}</p>
              <p><strong>Viza:</strong> {job.visa_type}</p>
              <p><strong>Kontakt:</strong> {job.contact}</p>
              <p><strong>Shahar:</strong> {job.location}</p>

              <div className="mt-2 flex gap-4">
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-red-600 font-semibold hover:underline"
                >
                  O‘chirish
                </button>
                <button
                  onClick={() => setEditingJob(job)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Tahrirlash
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingJob && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
          className="mt-6 space-y-4 border p-4 rounded-lg shadow"
        >
          <h3 className="text-xl font-semibold">E’lonni tahrirlash</h3>

          {[
            { name: "work_type", label: "Ish turi" },
            { name: "work_days", label: "Ish kunlari" },
            { name: "work_hours", label: "Ish soatlari" },
            { name: "salary", label: "Maosh" },
            { name: "language", label: "Til" },
            { name: "visa_type", label: "Viza turi" },
            { name: "contact", label: "Kontakt" },
            { name: "location", label: "Shahar" },
          ].map((field) => (
            <input
              key={field.name}
              type="text"
              value={editingJob[field.name as keyof Job]}
              onChange={(e) =>
                setEditingJob({ ...editingJob, [field.name]: e.target.value })
              }
              placeholder={field.label}
              className="w-full p-2 border rounded"
            />
          ))}

          <div className="flex gap-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Saqlash
            </button>
            <button
              type="button"
              onClick={() => setEditingJob(null)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Bekor qilish
            </button>
            <Link href="/post">
  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
    ➕ yangi elon berish
  </button>
</Link>

          </div>
        </form>
      )}
    </main>
  );
}
