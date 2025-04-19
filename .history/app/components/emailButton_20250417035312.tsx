import { useState } from "react";

const EmailButton = () => {
  const [status, setStatus] = useState<string | null>(null);

  const handleSendEmail = async () => {
    try {
      const res = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON formatida yuborish
        },
        body: JSON.stringify({
          to: "recipient@example.com",  // Email manzilingiz
          subject: "Test Email",
          text: "This is a test email sent from the React component!",
        }),
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
