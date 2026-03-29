import { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState("");
  const [goals, setGoals] = useState(0);
  const [date] = useState(new Date().toDateString());
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) setQuote("🌅 Good morning, don’t ignore me today.");
    else if (hour < 18) setQuote("🌞 Stay productive… I’m watching.");
    else setQuote("🌙 Evening already? Still not done?");
  }, []);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    const savedGoals = localStorage.getItem("goals");
    const savedDate = localStorage.getItem("date");

    if (savedNotes) setNotes(savedNotes);
    if (savedGoals) setGoals(Number(savedGoals));

    if (savedDate !== date) {
      localStorage.setItem("date", date);
      localStorage.setItem("goals", "0");
      setGoals(0);
    }
  }, [date]);

  useEffect(() => {
    localStorage.setItem("notes", notes);
    localStorage.setItem("goals", goals.toString());
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

      <p>{quote}</p>

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
