import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: null,
      currentPostId: null,
      message: null
    };
  }

  showData = () => {
    this.setState({ message: null });
    axios
      .get('http://localhost:9000/api/posts/')
      .then(posts => {
        this.setState({ posts: posts.data });
      })
      .catch(error => console.log(error));
  };

  deleteData = id => {
    this.setState({ message: null });
    axios
      .delete(`http://localhost:9000/api/posts/${id}`)
      .then(data => {
        this.setState({ message: data.data.message });
      })
      .catch(error => console.log(error));
  };

  render() {
    const { posts, message } = this.state;
    return (
      <div>
        <div>POSTS</div>
        <br />
        <button onClick={() => this.showData()}>Click me!</button>
        {message && <div>{message}</div>}
        <div>
          {posts &&
            posts.map(post => {
              return (
                <div className="post-container" key={post.id}>
                  <div>
                    Title: <span className="span-container">{post.title}</span>
                  </div>
                  <div>
                    Post: <span className="span-container">{post.contents}</span>
                  </div>
                  <button onClick={() => this.deleteData(post.id)}>Delete</button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default App;
