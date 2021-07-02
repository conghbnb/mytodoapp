import React from 'react'

const Footer = (props) => {
    const {statusFilter, setStatusFilter, clearCompletedTodo, numsOfTodoLeft, numsOfTodoCompleted} = props
    const filterBtns = [
        {
            title: 'All',
            isActive: statusFilter === 'All',
            onClick: () => setStatusFilter('All'),
            link: ''
        },

        {
            title: 'Active',
            isActive: statusFilter === 'Active',
            onClick: () => setStatusFilter('Active'),
            link: 'active'
        },

        {
            title: 'Complete',
            isActive: statusFilter === 'Complete',
            onClick: () => setStatusFilter('Complete'),
            link: 'complete'
        }
    ]

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{numsOfTodoLeft}</strong>
                <span>{ numsOfTodoLeft < 2 ? ' item' : ' items'}</span>
                <span> left</span>
            </span>
            <ul className="filters">
                {
                    filterBtns.map(btn => 
                        <FilterBtn key={btn.title} {...btn} />
                    )
                }
            </ul>
            {numsOfTodoCompleted !== 0 && <button className="clear-completed" onClick={clearCompletedTodo}>Clear Completed</button>}
        </footer>
    )
}

const FilterBtn = (props) => {
    const { title, onClick, isActive, link } = props
    return (
        <>
            <li>
                <a 
                    href={`#/${link}`}
                    className={isActive ? 'selected' : ''}   
                    onClick={onClick}
                >
                    {title}
                </a>
            </li>
        </>
    )
}

export default Footer