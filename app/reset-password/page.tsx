

"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from "styles/reset-password.module.css";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(searchParams.get('token'));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus("❌ 비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    setStatus('');
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("✅ 비밀번호가 성공적으로 변경되었습니다!");
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setStatus(`❌ 오류: ${data.error || '비밀번호를 변경하는 중 오류가 발생했습니다.'}`);
      }
    } catch (error) {
      console.error("비밀번호 재설정 중 오류:", error);
      setStatus("❌ 서버 오류가 발생했습니다.");
    }
    setLoading(false);
  };

  if (token === null) {
    return <p className={styles.resetPasswordStatus}>❌ 토큰이 없습니다. 링크를 다시 확인해주세요.</p>;
  }

  return (
    <div className={styles.resetPasswordContainer}>
      <h1 className={styles.resetPasswordTitle}>새 비밀번호 설정</h1>
      <form onSubmit={handleSubmit} className={styles.resetPasswordForm}>
        <input
          type="password"
          placeholder="새 비밀번호 입력"
          className={styles.resetPasswordInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className={styles.resetPasswordInput}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={styles.resetPasswordButton}
        >
          {loading ? '전송 중...' : '비밀번호 변경'}
        </button>
        {status && (
          <p
            className={`${styles.resetPasswordStatus} ${
              status.includes('✅') ? styles.success : styles.error
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>⏳ 로딩 중...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
