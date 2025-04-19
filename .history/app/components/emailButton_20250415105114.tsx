import { useState } from "react";

const EmailButton = () => {
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
      <button onClick={handleSendEmail}>Email yuborish</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default EmailButton;
