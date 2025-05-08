// components/Help/AIChat.tsx
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import SuggestedQuestions from './SuggestedQuestions';
import { FaCopy, FaPaperPlane, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa';
import { MdClear, MdHistory, MdAutoFixHigh } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';
import styles from './AIChat.module.css';

type Message = {
  id: string;
  question: string;
  answer: string;
  timestamp: number;
  feedback?: 'like' | 'dislike';
};

interface AIChatProps {
  compact?: boolean;
  initialMessages?: Message[];
}

export default function AIChat({ compact = false, initialMessages = [] }: AIChatProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedFollowups, setSuggestedFollowups] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Xabarlar tarixini saqlash
  useEffect(() => {
    const savedMessages = localStorage.getItem('aiChatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aiChatMessages', JSON.stringify(messages));
  }, [messages]);

  // Textarea va scrollni boshqarish
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    scrollToBottom();
  }, [input, messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Scroll holatini kuzatish
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 10);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError('Iltimos, savolingizni yozing');
      return;
    }

    setIsLoading(true);
    setIsTyping(true);
    setError('');
    
    const newMessage: Message = {
      id: Date.now().toString(),
      question: input,
      answer: '',
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    try {
      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      const response = await fetch('/api/ai-help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: newMessage.question, history: messages }),
        signal: controllerRef.current.signal,
      });

      if (!response.ok) throw new Error(response.status === 429 
        ? "Juda ko'p so'rovlar! Iltimos, biroz kutib turing" 
        : 'Xatolik yuz berdi');

      const data = await response.json();
      const answer = data.answer || "Aniq javob olinmadi. 1345 Immigratsiya Markaziga murojaat qiling.";

      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, answer } : msg
      ));

      if (data.followupQuestions) {
        setSuggestedFollowups(data.followupQuestions);
      }
    } catch (err: any) {
      setError(err.message);
      setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
    } finally {
      setIsLoading(false);
      setIsTyping(false);
      controllerRef.current = null;
    }
  };

  const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback: type } : msg
    ));
    toast.success('Rahmat! Bahoyingiz qabul qilindi');
  };

  const rephraseQuestion = () => {
    if (!input.trim()) return;
    setIsLoading(true);
    fetch('/api/rephrase', {
      method: 'POST',
      body: JSON.stringify({ question: input })
    })
    .then(res => res.json())
    .then(data => {
      setInput(data.rephrased);
      textareaRef.current?.focus();
    })
    .catch(() => toast.error('Qayta formulalashda xatolik'))
    .finally(() => setIsLoading(false));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearChat = () => {
    if (window.confirm('Suhbat tarixini tozalashni istaysizmi?')) {
      setMessages([]);
      setSuggestedFollowups([]);
      setError('');
      localStorage.removeItem('aiChatMessages');
      toast.success('Suhbat tozalandi!');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Nusxa olindi!'))
      .catch(() => toast.error('Nusxa olishda xatolik'));
  };

  return (
    <div className={`${styles.chatContainer} ${compact ? styles.compact : ''}`}>
      <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />

      <div className={styles.chatWrapper}>
        <div className={styles.header}>
          <h3>Yordamchi AI</h3>
          {messages.length > 0 && (
            <button 
              onClick={clearChat}
              className={styles.clearButton}
              aria-label="Suhbatni tozalash"
            >
              <MdClear /> Tozalash
            </button>
          )}
        </div>

        <SuggestedQuestions 
          onSelect={(question) => {
            setInput(question);
            setTimeout(() => textareaRef.current?.focus(), 0);
          }} 
          questions={[]} 
        />

        <div 
          ref={messagesContainerRef}
          className={styles.messagesContainer}
        >
          {messages.length === 0 && (
            <div className={styles.welcomeMessage}>
              <h4>Immigratsiya boʻyicha yordamchi AI</h4>
              <p>Savolingizni yozing yoki quyidagi takliflardan birini tanlang</p>
              <p>현재 이 페이지는 우즈베크어만 지원됩니다. 곧 다국어 기능이 업데이트될 예정입니다!</p>
              </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={styles.messageGroup}>
              <div className={styles.questionBubble}>
                <div className={styles.messageContent}>
                  {message.question}
                </div>
              </div>
              <div className={styles.answerBubble}>
                <div className={styles.messageContent}>
                  {message.answer}
                </div>
                <div className={styles.messageActions}>
                  <button 
                    onClick={() => copyToClipboard(message.answer)}
                    className={styles.actionButton}
                    aria-label="Nusxa olish"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={() => handleFeedback(message.id, 'like')}
                    className={`${styles.actionButton} ${message.feedback === 'like' ? styles.activeLike : ''}`}
                    aria-label="Yoqdi"
                  >
                    <FaRegThumbsUp />
                  </button>
                  <button
                    onClick={() => handleFeedback(message.id, 'dislike')}
                    className={`${styles.actionButton} ${message.feedback === 'dislike' ? styles.activeDislike : ''}`}
                    aria-label="Yoqmadi"
                  >
                    <FaRegThumbsDown />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className={styles.typingIndicator}>
              <span>Javob yozilmoqda</span>
              <div className={styles.typingDots}>
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}

          {suggestedFollowups.length > 0 && (
            <div className={styles.followupQuestions}>
              <h4>Keyingi savollar:</h4>
              <div className={styles.followupGrid}>
                {suggestedFollowups.map((q, i) => (
                  <button
                    key={i}
                    className={styles.followupButton}
                    onClick={() => {
                      setInput(q);
                      textareaRef.current?.focus();
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className={`${styles.inputContainer} ${isScrolled ? styles.scrolled : ''}`}>
          <div className={styles.inputGroup}>
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              rows={1}
              placeholder="Savolingizni yozing..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <div className={styles.buttonGroup}>
              <button
                className={styles.secondaryButton}
                onClick={rephraseQuestion}
                disabled={isLoading || !input.trim()}
                aria-label="Qayta formulalash"
              >
                <MdAutoFixHigh />
              </button>
              {input && (
                <button
                  className={styles.secondaryButton}
                  onClick={() => setInput('')}
                  disabled={isLoading}
                  aria-label="Tozalash"
                >
                  <MdClear />
                </button>
              )}
              <button
                className={styles.primaryButton}
                onClick={handleSubmit}
                disabled={isLoading || !input.trim()}
                aria-label="Javob olish"
              >
                {isLoading ? <span className={styles.spinner}></span> : <FaPaperPlane />}
              </button>
            </div>
          </div>
          <div className={styles.suggestionHint}>
            <MdHistory /> Oldingi suhbatlar avtomatik saqlanadi
          </div>
        </div>

        {error && (
          <div className={styles.errorBox} role="alert">
            <strong>Xatolik:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
}