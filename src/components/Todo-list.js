import React from 'react'
import Todo from './Todo'

const TodoList = (props) => {
    const showTodoList = props.todoList.map((todo, index) => 
        <Todo 
            {...todo}
            key={todo.id}  
            index={index} 
            getTodoEditingId={props.getTodoEditingId}
            todoEditingId={props.todoEditingId} 
            onEditTodo={props.onEditTodo}  
            markCompleted={props.markCompleted}
            removeTodo={props.removeTodo}
        />
    )
    return (
        <section className="main">
            <input type="checkbox" className="toggle-all" checked={props.isCheckedAll}></input>
            <label htmlFor="toggle-all" onClick={props.checkAllTodos}></label>
            <ul className="todo-list">
                {showTodoList}
            </ul>
        </section>
    )
}

export default TodoList