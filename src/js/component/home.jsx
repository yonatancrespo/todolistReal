import React, { useState, useRef, useEffect } from "react";
import ToDoList from './ToDoList'
import { v4 as uuidv4 } from 'uuid';
uuidv4();
//include images into your bundle


//create your first component
const LOCAL_STORAGE_KEY = 'todoHome.todos'

const Home = () => {
	const [todos, setTodos] = useState([])
	const todoNameRef = useRef ()

	useEffect (() =>{
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		if (storedTodos) setTodos(storedTodos)
	}, [])

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
	}, [todos])

	function toggleTodo(id) {
		const newTodos = [...todos]
		const todo = newTodos.find(todo => todo.id === id)
		todo.complete = !todo.complete
		setTodos(newTodos)
	}

function handleAddTodo(e) {
	 const name = todoNameRef.current.value
	 if (name === '') return
	 setTodos(prevTodos => {
	 return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
})
	 todoNameRef.current.value = null
}

	function handleClearTodos(){
		const newTodos = todos.filter(todo => !todo.complete)
		setTodos(newTodos)
	}

	return (
	<>
		<ToDoList todos={todos} toggleTodo={toggleTodo}/>
		<input  ref={todoNameRef} type="text" />
		<button onClick={handleAddTodo}>Add todo</button>
		<button onClick={handleClearTodos}>Clear Completed</button>
		<div>{todos.filter(todo => !todo.complete).length} Left To do</div>
	</>
		)
};

export default Home;
