import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import Header from "./components/Layout/Header";
import About from "./components/pages/About";
// import { v4 as uuid } from "uuid";
import axios from "axios";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get("https://5fa97367c9b4e90016e6a7ec.mockapi.io/api/todos")
      .then((res) => this.setState({ todos: res.data }));
  }

  // Toggle task complete
  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      }),
    });
  };

  // Filter out deleted task
  deleteTodo = (id) => {
    axios
      .delete(`https://5fa97367c9b4e90016e6a7ec.mockapi.io/api/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );
  };

  // Add Todo
  addTodo = (title, user) => {
    axios
      .post("https://5fa97367c9b4e90016e6a7ec.mockapi.io/api/todos", {
        title,
        isDone: false,
        
      })
      .then((res) =>
        this.setState({
          todos: [...this.state.todos, res.data],
        })
      );
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    toggleComplete={this.toggleComplete}
                    deleteTodo={this.deleteTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
