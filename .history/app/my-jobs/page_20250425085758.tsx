"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from 'styles/my-jobs.module.css';
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!session?.user?.id) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/my-jobs`);
        const data = await res.json();
        setJobs(data);
      } catch {
        setErrorMessage("E'lonlarni yuklab bo'lmadi");
      } finally {
        setLoading(false);
      }
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
    } catch {
      console.error("Unexpected error during update");
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
    } catch {
      console.error("Unexpected error during delete");
      setErrorMessage("O‘chirishda xatolik yuz berdi ❌");
    }
  };

  if (status === "loading" || loading) return <p className={styles.loadingText}>Yuklanmoqda...</p>;

  if (!session)
    return (
      <main className={styles.myJobsContainer}>
        <h2 className={styles.pageTitle}>Mening e’lonlarim</h2>
        <p className={styles.errorMessage}>Iltimos, tizimga kiring.</p>
      </main>
    );

  return (
    <main className={styles.myJobsContainer}>
      <button
        onClick={() => router.back()}
        className={styles.backButton}
      >
        🔙 Ortga qaytish
      </button>
      
      <Link href="/post" className={styles.addJobLink}>
        ➕ E’lon berish
      </Link>

      <h2 className={styles.pageTitle}>Mening e’lonlarim</h2>

      {errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}

      {jobs.length === 0 ? (
        <p className={styles.noJobsText}>Hozircha e’lon yo‘q.</p>
      ) : (
        <ul className={styles.jobsList}>
          {jobs.map((job) => (
            <li key={job._id} className={styles.jobCard}>
              <div className={styles.jobDetail}>
                <strong>Ish turi:</strong>
                <span>{job.work_type}</span>
              </div>
              <div className={styles.jobDetail}>
                <strong>Ish kunlari:</strong>
                <span>{job.work_days}</span>
              </div>
              <div className={styles.jobDetail}>
                <strong>Soatlar:</strong>
                <span>{job.work_hours}</span>
              </div>
              <div className={styles.jobDetail}>
                <strong>Maosh:</strong>
                <span>{job.salary}</span>
              </div>
              <div className={styles.jobDetail}>
                <strong>Til:</strong>
                <span>{job.language}</span>
              </div>
              <div className={styles.jobDetail}>
                <strong>Viza:</strong>
                <span>{job.visa_type}</span>
              </div>
              <div className={styles.jobDetail}>
                <strong>Kontakt:</strong>
                <span>{job.contact}</span>
              </div>
              <div className={styles.jobDetail}>
                <strong>Shahar:</strong>
                <span>{job.location}</span>
              </div>

              <div className={styles.jobActions}>
                <button
                  onClick={() => handleDelete(job._id)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                >
                  O‘chirish
                </button>
                <button
                  onClick={() => setEditingJob(job)}
                  className={`${styles.actionButton} ${styles.editButton}`}
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
          className={styles.editForm}
        >
          <h3 className={styles.formTitle}>E’lonni tahrirlash</h3>

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
            <div key={field.name} className={styles.formGroup}>
              <label className={styles.formLabel}>{field.label}</label>
              <input
                type="text"
                value={editingJob[field.name as keyof Job] || ''}
                onChange={(e) =>
                  setEditingJob({ ...editingJob, [field.name]: e.target.value })
                }
                className={styles.formInput}
              />
            </div>
          ))}

          <div className={styles.formActions}>
            <button type="submit" className={`${styles.actionButton} ${styles.saveButton}`}>
              Saqlash
            </button>
            <button
              type="button"
              onClick={() => setEditingJob(null)}
              className={`${styles.actionButton} ${styles.cancelButton}`}
            >
              Bekor qilish
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
