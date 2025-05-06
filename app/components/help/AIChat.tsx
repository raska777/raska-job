
// components/Help/AIChat.tsx
'use client';

import { useState, useRef } from 'react';
import styles from './AIChat.module.css';
import SuggestedQuestions from './SuggestedQuestions';

export default function AIChat() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const controllerRef = useRef<AbortController | null>(null);

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError('Iltimos, savolingizni yozing');
      return;
    }

    setLoading(true);
    setResponse('');
    setError('');

    try {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      controllerRef.current = new AbortController();

      const res = await fetch('/api/ai-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
        signal: controllerRef.current.signal,
      });

      if (!res.ok) throw new Error('So‘rov muvaffaqiyatsiz yakunlandi');

      const data = await res.json();
      setResponse(data.answer || 'Javob olinmadi.');
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.');
      }
    } finally {
      setLoading(false);
      controllerRef.current = null;
    }
  };

  const handleSuggestedClick = (q: string) => {
    setQuestion(q);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <SuggestedQuestions onSelect={handleSuggestedClick} />

      <label htmlFor="ai-question" className={styles.srOnly}>
        Savolingizni yozing
      </label>
      <textarea
        id="ai-question"
        className={styles.textarea}
        rows={4}
        placeholder="Savolingizni shu yerga yozing..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />

      <div className={styles.controls}>
        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={loading || !question.trim()}
          aria-busy={loading}
        >
          {loading ? 'javob yozilmoqda...' : 'Javob olish'}
        </button>
        {question && (
          <button
            className={styles.secondaryButton}
            onClick={() => setQuestion('')}
            disabled={loading}
          >
            Tozalash
          </button>
        )}
      </div>

      {response && (
  <div className={styles.responseBox} aria-live="polite">
    <strong>Javob:</strong>
    <p style={{ whiteSpace: 'pre-wrap' }}>{response}</p>
    <div className={styles.responseControls}>
      <button
        className={styles.copyButton}
        onClick={() => navigator.clipboard.writeText(response)}
      >
        Nusxa olish
      </button>
      <button
        className={styles.secondaryButton}
        onClick={() => {
          setResponse('');
          setQuestion('');
        }}
      >
        Javobni tozalash
      </button>
    </div>
  </div>
)}


      {error && (
        <div className={styles.errorBox} role="alert">
          <strong>Xatolik:</strong> {error}
        </div>
      )}
    </div>
  );
}