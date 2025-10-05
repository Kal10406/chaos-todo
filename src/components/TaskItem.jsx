import React from "react";

export default function TaskItem({task, displayTitle, onToggle, onDelete}){
  return (
    <div className={`flex items-center justify-between gap-4 p-3 rounded-lg ${task.completed ? "opacity-60 line-through" : "opacity-100"} bg-white/2 border border-white/4`}>
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <div>
          <div className="glitch jitter" data-text={displayTitle}>{displayTitle}</div>
          {task.meta?.noise && <div className="text-xs text-yellow-300">glitch: injected</div>}
        </div>
      </div>
      <button onClick={() => onDelete(task.id)} className="px-2 py-1 rounded bg-red-600/80">X</button>
    </div>
  );
}
