import { createContext,useContext,useReducer } from "react";
import todoreducer from "../reducer/todoreducer";

export const todosContext = createContext([]);

export const TodosProvider=({children})=>{
    const [Todos, dispatch] = useReducer(todoreducer, []);

  return(
    <todosContext.Provider value={{Todos,dispatch}}>
      {children}
    </todosContext.Provider>
  )
}

export const useTodos = ()=>{
  return useContext(todosContext)
}