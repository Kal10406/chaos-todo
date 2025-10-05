const KEY = "chaos_todo_v1";

export function loadTasks(){
  try {
    const s = localStorage.getItem(KEY);
    if(!s) return [];
    return JSON.parse(s);
  } catch (e) {
    console.error("loadTasks failed", e);
    return [];
  }
}

export function saveTasks(tasks){
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  } catch(e){
    console.error("saveTasks failed", e);
  }
}
