import './App.css';
import Header from './components/Header'
import TodoList from './components/Todo-list'
import Footer from './components/Footer';
import { PureComponent } from 'react';

const isNotCheckedAll = (todos) => todos.find(todo => !todo.isCompleted)
const filterTodoList = (todos, status) => {
  switch (status) {
    case 'All':
      return todos
     
    case 'Active': 
      return todos.filter(todo => !todo.isCompleted)
     
    default:
      return todos.filter(todo => todo.isCompleted)
     
  }
}

class App extends PureComponent {
  state = {
    todoList : [
      {
        id: '1',
        text: 'Todo 1',
        isCompleted: true 
      },

      {
        id: '2',
        text: 'Todo 2',
        isCompleted: true 
      }
    ],

    todoEditingId: '',

    isCheckedAll: true,
    statusFilter: 'All'
  }

  UNSAFE_componentWillMount() {
    this.setState({
      isCheckedAll: !isNotCheckedAll(this.state.todoList)
    })
  }

  addTodo = (todo) => {
    this.setState(preState => 
      ({ todoList: [...preState.todoList, todo] })
    )
  }

  getTodoEditingId = (id) => {
    this.setState({ todoEditingId: id })
  }

  onEditTodo = (todo, index) => {
      const {todoList : list} = this.state
      list.splice(index, 1, todo)
      this.setState({todoList: list, todoEditingId: ''})
  }

  markCompleted = (id) => {
    const updatedTodolist = this.state.todoList.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo)
    this.setState(({
      todoList: updatedTodolist,
      isCheckedAll: !isNotCheckedAll(updatedTodolist)
    }))
  }

  checkAllTodos = () => {
    const {todoList, isCheckedAll} = this.state
    this.setState({
      todoList: todoList.map(todo => ({ ...todo, isCompleted: !isCheckedAll })) ,
      isCheckedAll: !isCheckedAll
    })
  }

  setStatusFilter = (statusFilter) => {
    this.setState({statusFilter})
  }  

  clearCompletedTodo = () => {
    const {todoList} = this.state
    this.setState({
      todoList: filterTodoList(todoList, 'Active')
    })
  }

  removeTodo = (id) => {
    const {todoList} = this.state
    this.setState({
      todoList: todoList.filter(todo => todo.id !== id)
    })
  }

  render() {
    return (
      <div className="todoapp">
        <Header 
          addTodo={this.addTodo} 
        />
        <TodoList 
          todoList={filterTodoList(this.state.todoList, this.state.statusFilter)} 
          getTodoEditingId={this.getTodoEditingId}
          todoEditingId={this.state.todoEditingId}
          onEditTodo={this.onEditTodo}
          markCompleted={this.markCompleted}
          isCheckedAll={this.state.isCheckedAll}
          checkAllTodos={this.checkAllTodos}
          removeTodo={this.removeTodo}
        >
        </TodoList>
        <Footer
          setStatusFilter={this.setStatusFilter}
          statusFilter={this.state.statusFilter}
          clearCompletedTodo={this.clearCompletedTodo}
          numsOfTodoLeft={filterTodoList(this.state.todoList, 'Active').length}
          numsOfTodoCompleted={filterTodoList(this.state.todoList, 'Completed').length}
        />
      </div>
    );
  }  
}

export default App;
