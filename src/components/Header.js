import React, { useState } from 'react'

const Header = (props) => {
    const [text, setText] = useState("")
    
    const onAddTodo = e => {
        if (e.key === 'Enter' && text) {
            e.target.value = ""
            props.addTodo({
                id: new Date().valueOf(),
                text: text,
                isCompleted: false
            })
        }
    }

    return (
        <header className="header">
            <h1>My todos</h1>
            <input 
                className="new-todo" 
                onChange={e => setText(e.target.value)}
                onKeyPress={e => onAddTodo(e)}
            />
        </header>
    )
}

export default Header