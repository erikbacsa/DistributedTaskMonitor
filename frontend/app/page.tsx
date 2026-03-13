"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:8000/tasks/');
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        setTasks([]); 
      }
    } catch (err) {
      console.error("Connection failed:", err);
      setTasks([]); 
    }
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    await fetch('http://localhost:8000/tasks/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: "Created from dashboard", is_urgent: false }),
    });
    setTitle("");
    fetchTasks();
  };

  const clearAll = async () => {
    await fetch('http://localhost:8000/tasks/', { method: 'DELETE' });
    fetchTasks();
  };

  const addMultiple = async () => {
    try {
      await fetch('http://localhost:8000/tasks/bulk', { method: 'POST' });
      fetchTasks(); // Refresh the list immediately
    } catch (err) {
      console.error("Bulk create failed", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 2000);
    return () => clearInterval(interval);
  }, []);

return (
    <main className="p-10 bg-black min-h-screen text-zinc-100 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Clean Header */}
        <header className="mb-12 border-b border-zinc-800 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tighter">Task Monitor</h1>
          <p className="text-zinc-500 font-medium">Distributed System v1.0</p>
        </header>

        {/* Primary Input */}
        <form onSubmit={createTask} className="mb-4 flex gap-4">
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?" 
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 transition-all text-white text-lg"
          />
          <button type="submit" className="bg-blue-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 active:scale-95">
            Add Task
          </button>
        </form>

        {/* Big Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-16">
          <button 
            onClick={addMultiple} 
            className="group flex flex-col items-center justify-center bg-blue-500/10 border-2 border-blue-500/20 py-6 rounded-3xl hover:bg-blue-600 hover:border-blue-500 transition-all active:scale-95"
          >
            <span className="text-blue-400 group-hover:text-white text-2xl font-black">+ 4 TASKS</span>
            <span className="text-blue-500/60 group-hover:text-blue-100 text-[10px] uppercase tracking-widest font-bold">Bulk Injector</span>
          </button>

          <button 
            onClick={clearAll} 
            className="group flex flex-col items-center justify-center bg-red-500/10 border-2 border-red-500/20 py-6 rounded-3xl hover:bg-red-600 hover:border-red-500 transition-all active:scale-95"
          >
            <span className="text-red-500 group-hover:text-white text-2xl font-black">CLEAR ALL</span>
            <span className="text-red-500/60 group-hover:text-red-100 text-[10px] uppercase tracking-widest font-bold">System Wipe</span>
          </button>
        </div>
        
        {/* Task Feed */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-zinc-800"></div>
            <span className="text-zinc-600 text-xs font-black uppercase tracking-widest">Active Worker Feed</span>
            <div className="h-px flex-1 bg-zinc-800"></div>
          </div>

          {tasks.length > 0 ? (
            tasks.map((task: any) => (
              <div key={task.id} className="p-8 bg-zinc-900/50 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-sm">
                <div className="flex justify-between mb-6 items-center">
                  <h2 className="text-2xl font-bold text-white tracking-tight">{task.title}</h2>
                  <span className={`text-[11px] uppercase font-black px-3 py-1 rounded-full ${
                    task.status === 'completed' ? 'text-green-400 bg-green-400/10' : 'text-blue-400 bg-blue-400/10'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <div className="overflow-hidden h-3 flex rounded-full bg-zinc-800">
                  <div 
                    style={{ width: `${task.progress}%` }} 
                    className="bg-blue-500 transition-all duration-1000 ease-in-out shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  ></div>
                </div>
                <div className="flex justify-between mt-3 text-[11px] text-zinc-500 font-black uppercase tracking-tighter">
                  <span>Processing...</span>
                  <span>{Math.round(task.progress)}%</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 border-2 border-dashed border-zinc-900 rounded-3xl">
              <p className="text-zinc-700 font-bold uppercase tracking-widest text-sm">Waiting for incoming tasks...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}