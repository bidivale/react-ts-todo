// this component is tagged in App.tsx
// Props - todos and setTodos are passed from App.tsx
// This component is for displaying each todo from todos array and edit, delete and isDone icon

import React from 'react';
import "./styles.css";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";


// defning the types of the props we passed from App.tsx
interface Props{
    // todos are an arrey of tyoe Todo(that we created at model.tsx and imported here)
    todos: Todo[];
    //found the type of setTodos hovering on setTodos on App.tsx
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

// the main component starts here
const TodoList: React.FC<Props > = ({todos, setTodos}) => {
  return (
    <div className='todos'>
        {/* mapping all the todos to display */}
        {/* we mapped todos and got each todo */}
        {/* todo that we got after mapping todos is sent to singleTodo as prop */}
        {todos.map(todo => (
            <SingleTodo todo={todo} key={todo.id}
            todos={todos}
            setTodos={setTodos}
            />
           
        ))}
      
    </div>
  )
}

export default TodoList

