import {createContext, useContext} from 'react'

export const TodoContext = createContext({
    todos:[
        {
            id: 1,
            todo: " Todo msg ",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})


export const useTodo = () => {       /* Ye Hook banaya hai useTodo,taaki  */
    return useContext(TodoContext);   /* TodoContext naam ka jo function hai that will */
}                                    /* help to design api logic, usko useContext ke */
                                     /* sath milkar istemaal kar sake. */


export const TodoProvider = TodoContext.Provider;  /* Todoprovider likhne se hi kaam 
                                                     chal jayega ab TodoContext.Provider 
                                                     likhne ki zarurat nhi padegi baar baar  */