import React from 'react';
import * as firebase from 'firebase';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: {}
    };

    this.addTodo = this.addTodo.bind(this);
  }
  componentDidMount() {
    const dbTodosRef = firebase.database().ref().child('todos');

    dbTodosRef.on('value', (snapshot) => {
      this.setState({ todos: snapshot.val() });
    });
  }
  addTodo() {
    const dbTodosRef = firebase.database().ref().child('todos');

    dbTodosRef.push(this.todoInput.value, (err) => {
      if (!err) {
        this.todoInput.value = '';
      }
    });
  }
  render() {
    return (
      <div>
        <h3><b>Todos:</b></h3>
        <input type="text" ref={(todoInput) => { this.todoInput = todoInput; }} /><button onClick={this.addTodo}>Add todo</button>
        {Object.keys(this.state.todos).map(todo => <div key={todo}>{this.state.todos[todo]}</div>)}
      </div>
    );
  }
}
