import React, { useState } from 'react' 
// CRITICAL FIX: Changing path back to explicit file name + extension
import { useTodo } from '../contexts/TodoContext.js'
import { Plus } from 'lucide-react'

function TodoForm() {
    // 1. Add the missing local state for the input field
    const [todo, setTodo] = useState("") 
    
    const {addTodo} = useTodo()

    // 2. Define the 'add' function correctly to handle the event 'e'
    const add = (e) => {
        e.preventDefault()

        if (!todo) return

        addTodo({ todo, completed: false })
        setTodo("")
    }

    return (
        // The form now calls the corrected 'add' function
        <form onSubmit={add} className="flex items-center gap-3 pb-4">
            <span className="font-mono text-xs text-slate-600 shrink-0 w-5 text-right select-none">
                &gt;
            </span>
            <input
                type="text"
                placeholder="Add a new entry..."
                className="w-full bg-transparent border-0 border-b border-slate-700 pb-1.5 text-slate-100 placeholder:text-slate-600 outline-none focus:border-amber-400 transition-colors duration-200"
                value={todo}
                onChange={(e)=> setTodo(e.target.value)}
            />
            <button
                type="submit"
                aria-label="Add task"
                className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-400 text-[#11161d] hover:bg-amber-300 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none"
                disabled={!todo.trim()}
            >
                <Plus size={16} strokeWidth={2.5} />
            </button>
        </form>
    );
}

export default TodoForm;