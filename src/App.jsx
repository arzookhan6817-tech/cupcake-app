import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function App() {
  const [notes, setNotes] = useState("");
  const [goals, setGoals] = useState(0);

  useEffect(() => {
    const today = new Date().toDateString();

    const savedNotes = localStorage.getItem("notes");
    const savedGoals = localStorage.getItem("goals");
    const savedDate = localStorage.getItem("date");

    if (savedNotes) setNotes(savedNotes);

    if (savedDate === today) {
      if (savedGoals) setGoals(Number(savedGoals));
    } else {
      localStorage.setItem("date", today);
      localStorage.setItem("goals", "0");
      setGoals(0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", notes);
    localStorage.setItem("goals", goals.toString());
  }, [notes, goals]);

  const completeGoal = () => {
    const newGoals = goals + 1;
    setGoals(newGoals);

    if (newGoals === 5) {
      confetti();
      alert("🎉 Your partner would be proud of you.");
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning ☀️";
    if (hour < 18) return "Good afternoon 🌸";
    return "Good evening 🌙";
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "sans-serif",
        background: "linear-gradient(135deg, #ffe4ec, #fff0f5)",
        minHeight: "100vh"
      }}
    >
      <h1 style={{ color: "#ff4d6d" }}>💖 Cupcake App</h1>
      <p>{getGreeting()}</p>

      <h2>📝 Daily Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={6}
        style={{
          width: "100%",
          borderRadius: 10,
          padding: 10,
          border: "1px solid #ffb3c1"
        }}
      />

      <h2>🎯 Goals</h2>
      <p>{goals}/5 completed</p>

      <button
        onClick={completeGoal}
        style={{
          padding: "10px 20px",
          borderRadius: 20,
          border: "none",
          background: "#ff4d6d",
          color: "white",
          cursor: "pointer"
        }}
      >
        Complete Goal
      </button>
    </div>
  );
}
