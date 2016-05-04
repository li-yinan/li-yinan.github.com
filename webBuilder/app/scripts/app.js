import React from 'react';
import ReactDOM from "react-dom";
import { Provider, connect } from 'react-redux';
import Timer from "./ui/Timer";
import WbCanvas from "./ui/WbCanvas";
import Toolbar from "./ui/Toolbar";
import store from "./ui/Store";
import propsMap from "./ui/propsMap";
import {addTodo} from "./ui/action";

var mountNode = document.getElementById("app");

var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    dispatch(addTodo());
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    const {value} = this.props;
    return (
      <div>
        <Toolbar></Toolbar>
        <h3>TODO</h3>
        <h3>{value}</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        <Timer />
        <WbCanvas/>
      </div>
    );
  }
});


var TodoApp = connect(propsMap)(TodoApp);


ReactDOM.render(
    <Provider store={store}>
        <TodoApp/>
    </Provider>,
    mountNode
);
