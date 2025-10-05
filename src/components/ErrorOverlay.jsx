import React from "react";

export default function ErrorOverlay({show, title="Error 404", msg="The system is broken." , onClose}){
  if (!show) return null;
  return (
    <div className="error-overlay">
      <div className="error-card">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="mb-4">{msg}</p>
        <button className="px-3 py-1 bg-white/10 rounded" onClick={onClose}>Dismiss</button>
      </div>
    </div>
  );
}
