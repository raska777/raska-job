import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<string | null>(null);

  const handleSendEmail = async () => {
    try {
      const res = await fetch("/api/test-email", {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        setStatus(data.message); // Statusni yangilash
      } else {
        setStatus("Xatolik yuz berdi");
      }
    } catch (error) {
      setStatus("Xatolik yuz berdi");
    }
  };

  return (
    <div>
      <h1>Test Email Yuborish</h1>
      <button onClick={handleSendEmail}>Email yuborish</button>
      {status && <p>{status}</p>}
    </div>
  );
}
