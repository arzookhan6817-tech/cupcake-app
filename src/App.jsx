import { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState("");
  const [goals, setGoals] = useState(0);

  const today = new Date().toDateString();

  // Load data + reset check
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("notes");
      const savedGoals = localStorage.getItem("goals");
      const savedDate = localStorage.getItem("date");

      if (savedNotes) setNotes(savedNotes);

      if (savedDate === today) {
        if (savedGoals) setGoals(Number(savedGoals));
      } else {
        // New day → reset goals ONLY
        localStorage.setItem("date", today);
        localStorage.setItem("goals", "0");
        setGoals(0);
      }
    } catch (e) {
      console.log("Storage error", e);
    }
  }, [today]);

  // Save data
  useEffect(() => {
    try {
      localStorage.setItem("notes", notes);
      localStorage.setItem("goals", goals.toString());
    } catch (e) {
      console.log("Storage error", e);
    }
  }, [notes, goals]);

  const completeGoal = () => {
    const newGoals = goals + 1;
    setGoals(newGoals);

    if (newGoals === 5) {
      alert("🎉 100% done. Impressive… for once.");
    }
  };

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

      <h2>Goals</h2>
      <p>{goals}/5 completed</p>

      <button onClick={completeGoal}>
        Complete Goal
      </button>
    </div>
  );
}
