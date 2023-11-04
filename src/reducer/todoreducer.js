import { v4 as uuidv4 } from "uuid";

export default function reducer(curentTodos, action) {
  switch (action.type) {
    case "added": {
      const addTodo = [
        ...curentTodos,
        {
          id: uuidv4(),
          title: action.payload.newtitle,
          detailes: action.payload.newtitle,
          iscompleated: false,
        },
      ];
      localStorage.setItem("todos", JSON.stringify(addTodo));
      return addTodo;
    }
    case "delete": {
          const delettodo = curentTodos.filter((t) => {
            return t.id !== action.payload.id;
          });
          localStorage.setItem("todos", JSON.stringify(delettodo));
      return delettodo;
    }
    case "uppdated" : {
          const newTodo = curentTodos.map((t) => {
            // eslint-disable-next-line eqeqeq
            if (t.id == action.payload.id) {
              return {
                ...t,
                title: action.payload.title,
                detailes: action.payload.detailes,
              };
            }
            return t;
          });
          localStorage.setItem("todos", JSON.stringify(newTodo));
          return newTodo
    }
    case"cheked":{
          const updatetodo = curentTodos.map((t) => {
            if (t.id === action.payload.id) {
              const updatecheked = { ...t, iscompleated:!t.iscompleated };
              return updatecheked;
            }
            return t;
          });
          localStorage.setItem("todos", JSON.stringify(updatetodo));
      return updatetodo;

    }
    case "loade":{
          const updatetodos = JSON.parse(localStorage.getItem("todos")) ?? [];

      return updatetodos;
    }

    default: {
      throw Error("un");
    }
  }
}
