import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts/TodoContext' // CRITICAL FIX: Explicit path to TodoContext file
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'


function App() {     
  const [todos, setTodos] = useState([])


/*================================ADD FUNCTION=================================*/
                                                                               
  const addTodo = (todo) => {                                                  
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )                  
  }                                                                            
                                                                               
/*=============================================================================*/

/*==============================UPDATE FUNCTION=============================== */
                                                                               
  const updateTodo = (id, newTodo) => {                                           
    setTodos((prev) =>                                                         
                prev.map((prevTodo) =>                                                
                  (prevTodo.id === id ? newTodo : prevTodo))) 
  }                                                                            
                                                                               
/*============================================================================ */

/*==============================DELETE FUNCTION=============================== */
                                                                               
  const deleteTodo = (id) => {                                                 
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))                        
  }                                                                            
                                                                               
/*============================================================================ */

/*==============================TOGGLE FUNCTION=============================== */
                                                                               
  const toggleComplete = (id) => {                                             
    setTodos((prev) =>                                                         
                prev.map((prevTodo) =>                                                
                  prevTodo.id === id ? {...prevTodo, 
                    completed: !prevTodo.completed} : prevTodo)) 
  }                                                                            
                                                                               
/*============================================================================ */


useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"))

  if (todos && todos.length > 0){
    setTodos(todos)
  }
}, [])

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])

  const openCount = todos.filter((t) => !t.completed).length
  const doneCount = todos.length - openCount

  return (

    <TodoProvider value={{todos, addTodo, updateTodo, 
    deleteTodo, toggleComplete}}>

      <div className="relative min-h-screen bg-[#0b0f14] text-slate-200 py-14 px-4 selection:bg-amber-400/30 overflow-hidden">

        {/* Ambient background: ruled paper texture + drifting glows + watermark */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, transparent, transparent 27px, #64748b 28px)',
            }}
          />
          <div className="absolute -top-40 -left-32 w-[34rem] h-[34rem] rounded-full bg-amber-500/10 blur-[110px] animate-glow-a" />
          <div className="absolute -bottom-40 -right-24 w-[30rem] h-[30rem] rounded-full bg-emerald-500/10 blur-[110px] animate-glow-b" />
          <span
            className="absolute select-none -bottom-16 -right-10 text-[13rem] sm:text-[18rem] leading-none text-slate-100/[0.025] -rotate-6 whitespace-nowrap"
            style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
            aria-hidden="true"
          >
            NOTES
          </span>
        </div>

        <div className="relative z-10 w-full max-w-xl mx-auto">

          {/* Masthead */}
          <div className="mb-8">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-500 mb-2">
              Daily record &middot; No. {String(todos.length).padStart(3, '0')}
            </p>
            <h1
              className="text-4xl text-slate-50 font-semibold tracking-tight"
              style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
            >
              Manage Your Worklog
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="h-px flex-1 bg-gradient-to-r from-slate-700 via-slate-700 to-transparent" />
              <p className="font-mono text-xs text-slate-400 whitespace-nowrap">
                <span className="text-amber-400">{openCount}</span> open &middot;{' '}
                <span className="text-emerald-400">{doneCount}</span> closed
              </p>
            </div>
          </div>

          {/* Ledger card */}
          <div className="bg-[#11161d] border border-slate-800 rounded-2xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="px-5 sm:px-6 pt-5">
              <TodoForm />
            </div>

            <div className="mt-5 border-t border-slate-800/80">
              {todos.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p
                    className="text-slate-500 text-sm"
                    style={{ fontFamily: "'Fraunces', 'Georgia', serif" }}
                  >
                    The page is blank. Write the first line above.
                    <span className="inline-block w-2 ml-0.5 text-amber-400 animate-pulse">|</span>
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800/80">
                  {todos.map((todo, index) => (
                    <TodoItem key={todo.id} todo={todo} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="font-mono text-[11px] text-slate-600 text-center mt-6">
            entries save automatically to this browser
          </p>
        </div>
      </div>
    </TodoProvider>

  )
}

export default App