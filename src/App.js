import './App.css';

import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<News pageSize={8} category="general" />} />
            <Route path="/business" element={<News pageSize={8} category="business" />} />
            <Route path="/entertainment" element={<News pageSize={8} category="entertainment" />} />
            <Route path="/health" element={<News pageSize={8} category="health" />} />
            <Route path="/science" element={<News pageSize={8} category="science" />} />
            <Route path="/sports" element={<News pageSize={8} category="sports" />} />
            <Route path="/technology" element={<News pageSize={8} category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
