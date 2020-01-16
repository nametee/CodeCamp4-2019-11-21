import React from 'react'

import styles from './Todo.module.css'

function Todo(props){
    const { ticked = false, name = "default", onTick, onDelete } = props
    return (
        <span className = { styles.Root } >
            <span 
                className = { styles.Tick }
                style ={ { backgroundColor : ticked ? '#a8d097' : undefined } } 
                onClick = { onTick }
            />
            <div 
                className = { styles.Text } 
                style = { { textDecoration : ticked ? 'line-through' : undefined } }
                onClick = { onTick }
            >
                { name }
            </div>
            <span  
                className = { styles.Delete }
                onClick = { onDelete } 
            >
                x
            </span>
        </span>
    )
}

// declare default params
/*Todo.defaultProps = {
    ticked : false,
    name : 'default'
}*/

export default Todo
