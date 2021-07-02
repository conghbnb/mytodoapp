import React, { useState } from 'react'

const Todo = (props) => {
    const {id, text, isCompleted, getTodoEditingId, todoEditingId, onEditTodo, markCompleted, removeTodo} = props
    const isEditing = todoEditingId === id
    const [textEdit, setTextEdit] = useState(text)

    const editTodo = () => {
        onEditTodo({
            id : id,
            text : textEdit,
            isCompleted : isCompleted
        }, props.index)
    }

    return (
        <li className={`${isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
            {
                !isEditing ?
                    <div className="view">
                        <input 
                            type="checkbox" 
                            className="toggle" 
                            checked={isCompleted}
                            onClick={() => markCompleted(id)}
                        />
                        <label onDoubleClick={() => getTodoEditingId(id)}>{text}</label>
                        <button className="destroy" onClick={() => removeTodo(id)}></button>
                    </div>
                :
                    <input 
                        className="edit" 
                        type='text'
                        value={textEdit}
                        onChange={e => setTextEdit(e.target.value)}
                        onBlur={() => editTodo()}
                        onKeyPress={ (e) => {
                            if (e.key === 'Enter') editTodo()
                        }}
                            
                    />
            }
        </li>
    )
}

export default Todo