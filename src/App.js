import "./App.css";
import TodoList from "./components/TodoList";
import { TodosProvider } from "./contexts/todoContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";

function App() {
  return (
    <TodosProvider>
      <SnackbarProvider>
        <div className="App">
          <TodoList />
        </div>
      </SnackbarProvider>
    </TodosProvider>
  );
}

export default App;
