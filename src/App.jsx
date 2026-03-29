import { useState, useEffect } from "react";

export default function App() {
  const todayKey = new Date().toDateString();

  const [dayData, setDayData] = useState({
    notes: "",
    goals: 0,
  });

  const MAX_GOALS = 5;

  // LOAD DATA
  useEffect(() => {
    try {
      const saved = localStorage.getItem(todayKey);

      if (saved) {
        setDayData(JSON.parse(saved));
      } else {
        const freshData = { notes: "", goals: 0 };
        localStorage.setItem(todayKey, JSON.stringify(freshData));
        setDayData(freshData);
      }
    } catch (e) {
      console.log("Load error", e);
    }
  }, []);

  // SAVE DATA
  useEffect(() => {
    try {
      localStorage.setItem(todayKey, JSON.stringify(dayData));
    } catch (e) {
      console.log("Save error", e);
    }
  }, [dayData]);

  // COMPLETE GOAL (WITH LIMIT)
  const completeGoal = () => {
    if (dayData.goals >= MAX_GOALS) {
      alert("You’ve already completed all goals today 😌");
      return;
    }

    const newGoals = dayData.goals + 1;

    setDayData({
      ...dayData,
      goals: newGoals,
    });

    if (newGoals === MAX_GOALS) {
      alert("🎉 100% done. Your partner would be proud.");
    }
  };

  // RESET GOALS (optional but powerful)
  const resetGoals = () => {
    setDayData({
      ...dayData,
      goals: 0,
    });
  };

  // GREETING
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
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#ff4d6d" }}>💖 Cupcake App</h1>
      <p>{getGreeting()}</p>

      <h2>📝 Daily Notes</h2>
      <textarea
        value={dayData.notes}
        onChange={(e) =>
          setDayData({ ...dayData, notes: e.target.value })
        }
        rows={6}
        style={{
          width: "100%",
          borderRadius: 10,
          padding: 10,
          border: "1px solid #ffb3c1",
        }}
      />

      <h2>🎯 Goals</h2>
      <p>{dayData.goals}/{MAX_GOALS} completed</p>

      <button
        onClick={completeGoal}
        style={{
          padding: "10px 20px",
          borderRadius: 20,
          border: "none",
          background: "#ff4d6d",
          color: "white",
          cursor: "pointer",
          marginRight: 10
        }}
      >
        Complete Goal
      </button>

      <button
        onClick={resetGoals}
        style={{
          padding: "10px 20px",
          borderRadius: 20,
          border: "none",
          background: "#ccc",
          cursor: "pointer"
        }}
      >
        Reset
      </button>
    </div>
  );
}
