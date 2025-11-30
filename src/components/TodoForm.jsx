import React, { useState } from 'react' 
// CRITICAL FIX: Changing path back to explicit file name + extension
import { useTodo } from '../contexts/TodoContext.js'

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
        <form onSubmit={add}  className="flex">
            <input
                type="text"
                placeholder="What's your plan !"
                className="w-full border border-black/60 rounded-l-lg px-3 outline-none duration-150 bg-gray-600 py-1.5"
                value={todo}
                onChange={(e)=> setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg border px-3 py-1 border-black/60 bg-cyan-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;