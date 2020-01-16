import React from 'react'

import styles from './TodoList.module.css'

import NewTodo from "./components/NewTodo.js";
import Todo from "./components/Todo.js";

const API = 'http://localhost:3001'
const URL = `${API}/todos`

class TodoList extends React.Component {

  state = {
    todos : [], // {id:'test1', ticked : true, name : "test1" }
    textValue : ''
  }

  async getData(cb){
    const response = await fetch(URL)
    const data = await response.json() 
    this.setState({todos: data},cb) 
  }


  componentDidMount() {
    this.getData()
  }
  /*async componentDidMount(){
    const response = await fetch(URL)
    const data = await response.json() 
    this.setState({todos: data})
  }*/
  async componentDidUpdate() { 
   }


  handleTick = item => async  () => {
    // หลังจาก save ค่่าแล้วควรจะ fetch ข้อมูลมาใหม่เสมอ 
    item.ticked = !item.ticked
    await fetch(`${URL}/${item.id}` ,
          {
            method: 'PUT',
            headers:  { 'content-type': 'application/json' },
            body: JSON.stringify(item) 
          })
    
    /*this.setState(state => ({
        todos : state.todos.map((todo,idx) =>  
          //item.id === todo.id ? { ... todo, ticked : !todo.ticked } : todo )
          item.id === todo.id ? item : todo )
      }) 
    )*/ 
    this.getData()
  } 
  handleDelete =  (item) => async () => { 
    await fetch(`${URL}/${item.id}`,
              {
                method : 'DELETE' 
              })
    /*this.setState(state => ({
      todos : state.todos.filter((todo,idx) =>  todo.id !== item.id ) 
    }))*/ 
    this.getData()
  }  
  handleAdd = async (e) => {
    if (this.state.textValue) {
      // id ไม่ต้อง set ก็ได้ ใช้ auto จาก json-server ได้เลย และถ้าไม่set id ต้อง fetch ค่าdataใหม่
      const newTodo = {
        id : Math.random().toString(36).substr(2, 5),
        ticked : false,
        name : this.state.textValue
      }
      await fetch(URL,
              {
                method : 'POST',
                headers:  { 'content-type': 'application/json' },
                body: JSON.stringify(newTodo)
              })
      this.getData(() => this.setState({textValue : ''}))
      /*
      this.setState((state,props) => ({
          todos : state.todos.concat(newTodo)
        }),() => this.setState({textValue : ''}) ) */
    } 
  }  
  handleValue = e => {
    this.setState({
      textValue : e.target.value
    })
  }

  render = () => {
    return <div className={styles.Root}>
        <NewTodo 
          onValue = { this.handleValue } 
          onAdd = { this.handleAdd } 
          value = { this.state.textValue } 
          onEnter = { e => { if ( e.key === "Enter" ){ this.handleAdd(e) }  }}
        />  
        { this.state.todos.map((todo,idx) => ( 
          <Todo  
            key = { todo.id }
            ticked = { todo.ticked } 
            name = { todo.name } 
            onTick = { this.handleTick(todo) } 
            onDelete = { this.handleDelete(todo) } 
          /> 
          ) 
        )} 
    </div>
  }
}

export default TodoList
