import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: null
    };
  }

  showData = () => {
    axios
      .get('localhost:9000/api/posts/')
      .then(data => {
        console.log(data);
        this.setState({ posts: data });
      })
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div>
        <button onClick={() => this.showData()}>Click me!</button>
      </div>
    );
  }
}

export default App;
