import { useState } from "react";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export default function App() {
  const [notes, setNotes] = useState("");
  const [goals, setGoals] = useState(0);

  const saveData = async () => {
    await setDoc(doc(db, "users", "testUser"), {
      notes,
      goals
    });

    alert("Saved to Firebase ✅");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Firebase Test</h1>

      <input
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <br /><br />

      <button onClick={() => setGoals(goals + 1)}>
        Goals: {goals}
      </button>

      <br /><br />

      <button onClick={saveData}>
        Save to Firebase
      </button>
    </div>
  );
}
