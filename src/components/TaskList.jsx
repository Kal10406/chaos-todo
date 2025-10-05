import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, displayMap, onToggle, onDelete }){
  if (!tasks.length) return <div className="text-white/60">Nothing here. The system ate your tasks.</div>;
  return (
    <div className="flex flex-col gap-3">
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} displayTitle={displayMap[t.id] || t.title} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
