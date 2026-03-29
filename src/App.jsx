import { useState, useEffect } from "react";

export default function App() {
  const todayKey = new Date().toDateString();

  const [dayData, setDayData] = useState({
    notes: "",
    goals: 0,
  });

  const [history, setHistory] = useState({});

  const MAX_GOALS = 5;

  // LOAD ALL DATA
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("history");

      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);

        if (parsed[todayKey]) {
          setDayData(parsed[todayKey]);
        }
      }
    } catch (e) {
      console.log("Load error", e);
    }
  }, []);

  // SAVE ALL DATA
  useEffect(() => {
    try {
      const updatedHistory = {
        ...history,
        [todayKey]: dayData,
      };

      setHistory(updatedHistory);
      localStorage.setItem("history", JSON.stringify(updatedHistory));
    } catch (e) {
      console.log("Save error", e);
    }
  }, [dayData]);

  const completeGoal = () => {
    if (dayData.goals >= MAX_GOALS) {
      alert("You’ve already completed all goals 😌");
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

  const resetGoals = () => {
    setDayData({
      ...dayData,
      goals: 0,
    });
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
          marginRight: 10,
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
          cursor: "pointer",
        }}
      >
        Reset
      </button>

      {/* HISTORY SECTION */}
      <h2 style={{ marginTop: 30 }}>📅 History</h2>

      {Object.keys(history).length === 0 && <p>No history yet</p>}

      {Object.entries(history).map(([date, data]) => (
        <div
          key={date}
          style={{
            background: "white",
            padding: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <strong>{date}</strong>
          <p>Goals: {data.goals}/{MAX_GOALS}</p>
          <p>Notes: {data.notes || "No notes"}</p>
        </div>
      ))}
    </div>
  );
}
