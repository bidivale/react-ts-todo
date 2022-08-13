import React from 'react';
import './App.css';
import InputField from './components/InputField';
import { useState } from 'react';
import { Todo } from "./model";
import TodoList from './components/TodoList';


const App: React.FC = () => {
  // todo state is for storing the todo (a single todo) from input field
  const [todo, setTodo] = useState<string>("");
  // todos state for keeping the colection of all todos together in an arrey
  // The type is interface Todo that we created in model.ts, and the todos will be stored in an arrey. Hence the arrey sign
  const [todos, setTodos] = useState<Todo[]>([]);

  // handleAdd fuction to submit the input
  // Always define the type of e as React.FormEvent
  const handleAdd = (e: React.FormEvent) => {
  // the page is getting refreshed everytime we press the button. To prevent this using e.preventDefault
    e.preventDefault();
  //  whenever we submit the form, it should add the input (todo) to the todos arrey
  // first we check if there is a value in todo (the input value). Then only we set the todos
  if(todo)
  // ... todos means take whatever inside of the todos arrey already
  //then we will add another todo with 3 fields - id, todo and isDone
  //Date.now generates a random id for id field
  // in todo field, we are keeping the todo(the input)
  // isDone field is boolean. When it will be done, it should be true
  setTodos([...todos, {id: Date.now(), todo:todo, isDone:false}])
  // after it is submitted, empty the input field
  setTodo("");
  
}

  console.log(todo);
  
  return (
    <div className="App">

      {/* The app heading */}
      <span className="heading">TODO LIST WITH REACT-TS</span>

      {/* InputField component is tagged here */}
      {/* InputField component contains the form - the typing area and the "Go" button*/}
      {/*  We passed todo, setTodo and handleAdd as props from this component to Input field component */}
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      {/* TodoList component is tagged here */}
      {/* TodoList component contains the todo list placed below the input form */}
      {/* TodoList component displays each todo from todos array, and edit and delete functionality */}
      {/* Passing todos and setTodos as props from this component to TodoList component */}
      <TodoList todos={todos} setTodos={setTodos} />
      
    </div>
  );
}

export default App;
