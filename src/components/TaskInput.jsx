import React, { useState } from "react";

export default function TaskInput({ onAdd }){
  const [text, setText] = useState("");
  function submit(e){
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  }
  return (
    <form onSubmit={submit} className="flex gap-3">
      <input
        className="flex-1 rounded-lg px-4 py-2 bg-white/5 border border-white/6 placeholder:text-white/60"
        placeholder="Add a task... (e.g. finish lab report)"
        value={text}
        onChange={e=>setText(e.target.value)}
      />
      <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-semibold">Add</button>
    </form>
  );
}
