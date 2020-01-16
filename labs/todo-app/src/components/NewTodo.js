import React from 'react'

import styles from './NewTodo.module.css'

function NewTodo(props){
    const { onValue, onAdd, value, onEnter } = props
    return (
        <span className={ styles.Root }>
            <input 
                id = "textTodo" 
                className = { styles.Input } 
                placeholder = "Enter todo" 
                value = { value }
                onChange = { onValue } 
                onKeyPress = { onEnter }
            />
            <div 
                id = "addTodo" 
                className = { styles.Button } 
                onClick={ onAdd } 
            >
                ADD
            </div>
        </span>
    )
}

export default NewTodo
