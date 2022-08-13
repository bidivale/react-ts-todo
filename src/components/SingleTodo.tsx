// This component is tagged in TodoList component

import React, { useEffect, useState, useRef } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete} from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";


// defining the typeof props we passed from TodoList.tsx
type Props = {
    // The type of todo is interface Todo we created at model.tsx
    todo: Todo,
    // the type of todos is arrey of todo
    todos: Todo[],
    // the type of setTodos is copied from what it is shown when hovering on it at App.tsx where it is originally created
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}


//the main component starts here
//the props are passed from TodoList component
const SingleTodo = ({todo, todos, setTodos}: Props) => {


    // for edit function - we need 2 states. one state to check whether the edit mode is on. Another state is to capture the edit value

    //this state checks whether the edit mode is on. When false - the edit mode is off. When true - the edit mode is on
    const [edit, setEdit] = useState<boolean>(false);
    //this state is to hold the input value of editing a todo
    //the initial value of editTodo already contains the todo before editing
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    // After editing, when pressed enter, changing the todo property, and updating the todos array
    // if a todo.id matches with the passed id, take all of the properties of the todo
    // and change the todo property of todo with the value of editTodo
    // else just return the todo
    const handleEdit = (e:React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
    };


    

    // the fuction for changing the isDone property of a completed todo from false to true 
    const handleDone = (id: number) => {
        // mapping through the todos arrey and whichever todo id matches to the id we are sending, isDone property will be true for that todo
        // By {{...todo, isDone: !todo.isDone}} - we are taking todo(all of the properties) and inverting the isDone property
        // Otherwise we are going to return the todo - ":todo"
        setTodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} :todo))
    };


    // this function is to delete the selected todo
    const handleDelete = (id: number) => {
        //return all the todo that doesnot match the id we are passing
        // if todo.id is not equal to the id we are passing here, return it
        //that also means - do not return the todo whose id matches to the id we are passing
        setTodos(todos.filter((todo) => todo.id !== id));
}



   // after the edit portion coding is completed, problem - after clicking edit botton, it does not go to typing mode automatically
   // to focus it (to go to the typing mode without clickng it again) we will use useRef
   const inputRef = useRef<HTMLInputElement>(null)

   //useEffect for whenever the edit changes, it is going to fire off this
   useEffect(() => {
    inputRef.current?.focus()
   },[edit]);
   


  return (
    // it is a form because it will have edit functionality
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
        {/* displaying the todos here */}
        {/* condition 1 - if edit mode is on, its going to display the input box */}
        {/* condition 2 - if isDone is true (that means if the todo is completed), it will be displayed in strike (like cut) */}
        {/* Otherwise - it will display normally in span */}
        {/* todo.todo explaination - first todo is the each index of todos arrey (as we mapped though todos in TodoList.tsx, it gave each index) */}
        {/* todo.todo explaination - the first todo contains 3 field as we set previously - id, todo and isComplete */}
        {/* todo.todo explaination - the 2nd todo is the field of first todo object. This todo field contains the input value */}
        
        {
            edit? (
                <input
                    ref={inputRef}
                    value={editTodo} 
                    onChange={(e) => setEditTodo(e.target.value)} 
                    className="todos__single--text" />
            ): 
                todo.isDone ? (
                    <s className='todos__single--text'>{todo.todo}</s>
                ) : (
                    <span className='todos__single--text'>{todo.todo}</span>
            )}
        


        {/* all the icons (edit, delete, complete) are here that will be displayed right side of each todo)  */}
        <div>
            <span 
                className='icon' 
                onClick={() => {
                // will only edit if the edit mode is on and if the todo is not completed 
                if(!edit && !todo.isDone) {
                    setEdit(!edit);
                }
            }}
            >
            <AiFillEdit />
            </span>
            <span className='icon'>
                < AiFillDelete />
            </span>
            <span className='icon' onClick={()=>handleDone(todo.id)}>
                < MdDone />
            </span>

        </div>
        

    </form>
  )
}


export default SingleTodo;
