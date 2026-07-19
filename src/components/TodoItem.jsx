import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'; // CRITICAL FIX: Explicit path to TodoContext file
import { Check, Pencil, Trash2, FolderCheck } from 'lucide-react'

function TodoItem({ todo, index }) {

  const [isTodoEditable, setIsTodoEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  
  // FIX: The useTodo hook must be called with parentheses ()
  const {updateTodo, deleteTodo, toggleComplete} = useTodo() 


  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false)
  }
  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }

    return (
        <div
            className={`group relative flex items-center gap-3 px-5 sm:px-6 py-3.5 transition-colors duration-200 ${
                todo.completed ? "bg-emerald-400/[0.03]" : "hover:bg-slate-800/30"
            }`}
        >
            {/* Line number */}
            <span className="font-mono text-xs text-slate-600 shrink-0 w-5 text-right select-none">
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* Custom checkbox stamp */}
            <button
                type="button"
                role="checkbox"
                aria-checked={todo.completed}
                onClick={toggleCompleted}
                className={`shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150 ${
                    todo.completed
                        ? "bg-emerald-400 border-emerald-400"
                        : "border-slate-600 hover:border-amber-400"
                }`}
            >
                {todo.completed && <Check size={13} strokeWidth={3} className="text-[#0b0f14]" />}
            </button>

            <input
                type="text"
                className={`flex-1 min-w-0 bg-transparent outline-none rounded-md transition-colors duration-150 ${
                    isTodoEditable
                        ? "border border-slate-700 px-2 py-1 text-slate-100"
                        : "border border-transparent px-0 py-1"
                } ${todo.completed ? "line-through text-slate-500" : "text-slate-200"}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            {todo.completed && (
                <span className="hidden sm:flex items-center gap-1 shrink-0 font-mono text-[10px] uppercase tracking-widest text-emerald-400/70 border border-emerald-400/30 rounded px-1.5 py-0.5 -rotate-3 select-none">
                    done
                </span>
            )}

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150">
                <button
                    className="inline-flex w-8 h-8 rounded-lg items-center justify-center text-slate-500 hover:text-amber-400 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors duration-150"
                    onClick={() => {
                        if (todo.completed) return;

                        if (isTodoEditable) {
                            editTodo();
                        } else setIsTodoEditable((prev) => !prev);
                    }}
                    disabled={todo.completed}
                    aria-label={isTodoEditable ? "Save entry" : "Edit entry"}
                >
                    {isTodoEditable ? <FolderCheck size={15} /> : <Pencil size={15} />}
                </button>
                <button
                    className="inline-flex w-8 h-8 rounded-lg items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors duration-150"
                    onClick={() => deleteTodo(todo.id)}
                    aria-label="Delete entry"
                >
                    <Trash2 size={15} />
                </button>
            </div>
        </div>
    );
}

export default TodoItem;