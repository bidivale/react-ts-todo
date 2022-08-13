//This component is tagged in App.tsx. The props (todo, setTodo, and handleAdd) are also passed from App.tsx
// This component contains code for the input field - 
//The typing area for creating a new todo and the Go button and submitting by enter(handleAdd)


import React, { useRef } from 'react';
import "./styles.css";

// defining the types of the props we got from App.tsx
// The type of setTodo here is copied from what was showing while hovering on setTodo in App.tsx(where it is originally created)
// we define the type of function like how we defined the hadleAdd here. As this handleAdd fuction doesnot return anything, the return type is void
interface Props{
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void
};


//passing the props and defining the props' type. We can do it 2 ways
// const InputField = ({ todo, setTodo }: Props) => {
//or
const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {

 // using useRef as after pressing enter, when input field gets empty, it doesnot remove the focus colour
 // to solve this, we are getting the reference and removing the focus after pressing enter
 const inputRef = useRef<HTMLInputElement>(null);


  return (
    // handleAdd function is originally created at App.tsx. By handleAdd, the input value will be submitted by pressing enter / tab/ mouse click
    <form className='input' onSubmit={(e) => { 
        handleAdd(e)
        // the blur shifts the focus from this input field
        inputRef.current?.blur()
        }}>
        {/* The typing area for input goes here */}
        <input 
        ref={inputRef}
        type='input'
        value={todo}
        onChange={
            (e)=>setTodo(e.target.value)
        }
         placeholder='Enter a task'
         className='input__box'></input>
        {/* The go button goes here */}
        <button className='input__submit' type='submit' >Go</button>
    </form>
  );
};

export default InputField;

