
import React, { useEffect, useMemo, useState, useRef } from "react";
import { nanoid } from "nanoid";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ErrorOverlay from "./components/ErrorOverlay";
import { loadTasks, saveTasks } from "./utils/storage";
import { shuffleTasks, corruptText, sabotageOnce } from "./utils/chaosEngine";

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [chaosIntensity, setChaosIntensity] = useState(0.25);
  const [showError, setShowError] = useState(false);
  const [lastSabotageNote, setLastSabotageNote] = useState("");
  const [shuffleOnOpen, setShuffleOnOpen] = useState(true);
  const sabotageTimerRef = useRef(null);

  // apply shuffle on mount if enabled
  useEffect(() => {
    if (shuffleOnOpen) {
      setTasks(prev => shuffleTasks(prev));
    }

    // start sabotage interval
    sabotageTimerRef.current = setInterval(() => {
      if (Math.random() < 0.35) {
        setTasks(prev => {
          const updated = sabotageOnce(prev);
          setLastSabotageNote("System enacted a random sabotage.");
          setShowError(true);
          return updated;
        });
      }
    }, 15000); // every 15s tick
    return () => clearInterval(sabotageTimerRef.current);
  }, []);

  // persist tasks
  useEffect(() => saveTasks(tasks), [tasks]);

  // map of task.id -> corrupted title
  const displayMap = useMemo(() => {
    const m = {};
    for (const t of tasks) {
      m[t.id] = corruptText(t.title, chaosIntensity);
    }
    return m;
  }, [tasks, chaosIntensity]);

  // core actions
  function addTask(title) {
    const t = { id: nanoid(), title, completed: false, createdAt: Date.now() };
    setTasks(prev => [t, ...prev]);
  }

  function toggle(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function del(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function manualShuffle() {
    setTasks(prev => shuffleTasks(prev));
  }

  function manualCorrupt() {
    setTasks(prev => prev.map(t => ({ ...t, title: t.title + " ~ corrupted" })));
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-8 bg-gray-900">
      <div className="w-full max-w-3xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold glitch" data-text="CHAOS TODO">CHAOS TODO</h1>
          <div className="text-sm text-white/60">Protocol 404 · you vs entropy</div>
        </header>

        <main className="card">
          <div className="mb-4">
            <TaskInput onAdd={addTask} />
          </div>

          <div className="mb-4 flex items-center gap-3">
            <button onClick={manualShuffle} className="px-3 py-1 rounded bg-indigo-600/80">Manual Shuffle</button>
            <button onClick={() => setChaosIntensity(i => Math.min(0.9, i + 0.05))} className="px-3 py-1 rounded bg-yellow-600/80">Increase Chaos</button>
            <button onClick={() => setChaosIntensity(i => Math.max(0, i - 0.05))} className="px-3 py-1 rounded bg-green-600/80">Decrease Chaos</button>
            <div className="ml-auto text-sm">Chaos: {(chaosIntensity * 100).toFixed(0)}%</div>
          </div>

          <section className="mb-4">
            <TaskList tasks={tasks} displayMap={displayMap} onToggle={toggle} onDelete={del} />
          </section>

          <footer className="mt-4 text-xs text-white/60 flex items-center gap-3">
            <div>Hints: sabotage may delete or inject tasks.</div>
            <div className="ml-auto">Last: {lastSabotageNote || "none"}</div>
          </footer>
        </main>
      </div>

      <ErrorOverlay
        show={showError}
        title="System Glitch"
        msg="A sabotage event just occurred."
        onClose={() => setShowError(false)}
      />
    </div>
  );
}
