import { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("notes");
      if (saved) setNotes(saved);
    } catch (e) {
      console.log("Storage error", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("notes", notes);
    } catch (e) {
      console.log("Storage error", e);
    }
  }, [notes]);

  return (
    <div style={{ padding: 20 }}>
      <h1>💖 Cupcake App</h1>

      <h2>Daily Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={6}
        style={{ width: "100%" }}
      />
    </div>
  );
}
