'use client';

import { useState } from 'react';
import styles from '@/styles/admin.module.css';

interface Job {
  _id: string;
  work_name: string;
  work_type: string;
  location: string;
  salary: string;
  accepts_foreigners: boolean;
}

interface EditJobModalProps {
  job: Job;
  onClose: () => void;
  onSave: () => void;
}

export default function EditJobModal({ job, onClose, onSave }: EditJobModalProps) {
  const [form, setForm] = useState<Job>({ ...job });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setErrorMsg('');

    try {
      const res = await fetch(`/api/admin/jobs/${job._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Yangilashda xatolik');
      }

      onSave();
      onClose();
    } catch (error) {
      setErrorMsg((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>✏️ E’lonni tahrirlash</h2>

        <label>Nom</label>
        <input type="text" name="work_name" value={form.work_name} onChange={handleChange} />

        <label>Ish turi</label>
        <input type="text" name="work_type" value={form.work_type} onChange={handleChange} />

        <label>Joylashuv</label>
        <input type="text" name="location" value={form.location} onChange={handleChange} />

        <label>Oylik</label>
        <input type="text" name="salary" value={form.salary} onChange={handleChange} />

        <label>
          <input
            type="checkbox"
            name="accepts_foreigners"
            checked={form.accepts_foreigners}
            onChange={handleChange}
          />
          Chet elliklar uchun
        </label>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        <div className={styles.modalButtons}>
          <button onClick={onClose} className={styles.secondaryButton}>Bekor qilish</button>
          <button onClick={handleSubmit} className={styles.primaryButton} disabled={isSaving}>
            {isSaving ? 'Saqlanmoqda...' : 'Yangilash'}
          </button>
        </div>
      </div>
    </div>
  );
}
