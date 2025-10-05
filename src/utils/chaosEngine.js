const GLITCH_SYMS = ["⚡","Ø","✖","◐","•","∿","≈","☢","✶","💥"];

export function shuffleTasks(tasks){
  const arr = [...tasks];
  for (let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function corruptText(text, intensity = 0.25){
  if (!text) return text;
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++){
    if (Math.random() < intensity*0.12 && i < chars.length-1){
      [chars[i], chars[i+1]] = [chars[i+1], chars[i]];
    }
    if (Math.random() < intensity*0.22){
      chars[i] = GLITCH_SYMS[Math.floor(Math.random() * GLITCH_SYMS.length)];
    } else if (Math.random() < intensity*0.08){
      chars[i] = chars[i].toUpperCase();
    }
  }
  if (Math.random() < intensity*0.12){
    chars.push(GLITCH_SYMS[Math.floor(Math.random() * GLITCH_SYMS.length)]);
  }
  return chars.join("");
}

export function sabotageOnce(tasks){
  if (!tasks || tasks.length === 0) return tasks;
  const r = Math.random();
  const copy = [...tasks];
  if (r < 0.25 && copy.length >= 2){
    const i = Math.floor(Math.random()*copy.length);
    let j = Math.floor(Math.random()*copy.length);
    if (i===j) j = (j+1) % copy.length;
    [copy[i], copy[j]] = [copy[j], copy[i]];
  } else if (r < 0.45){
    const idx = Math.floor(Math.random()*copy.length);
    copy.splice(idx,1);
  } else if (r < 0.7){
    const noise = { id: `noise-${Date.now()}`, title: "?? Strange errand", completed: false, meta: { noise: true } };
    const pos = Math.floor(Math.random()*(copy.length+1));
    copy.splice(pos,0,noise);
  } else {
    const idx = Math.floor(Math.random()*copy.length);
    copy[idx] = {...copy[idx], completed: !copy[idx].completed};
  }
  return copy;
}
