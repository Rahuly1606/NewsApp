import './App.css';

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  setProgress = (progress) => {
    this.setState({ progress:progress});
  };

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}

          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress}    pageSize={8} category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress}  pageSize={8} category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress}  pageSize={8} category="entertainment" />} />
            <Route path="/health" element={<News setProgress={this.setProgress}  pageSize={8} category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress}  pageSize={8} category="science" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress}  pageSize={8} category="sports" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress}  pageSize={8} category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
