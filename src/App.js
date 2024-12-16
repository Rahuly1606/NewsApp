import './App.css';

import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route path="/" element={<News setProgress={setProgress} pageSize={8} category="general" />} />
          <Route path="/business" element={<News setProgress={setProgress} pageSize={8} category="business" />} />
          <Route path="/entertainment" element={<News setProgress={setProgress} pageSize={8} category="entertainment" />} />
          <Route path="/health" element={<News setProgress={setProgress} pageSize={8} category="health" />} />
          <Route path="/science" element={<News setProgress={setProgress} pageSize={8} category="science" />} />
          <Route path="/sports" element={<News setProgress={setProgress} pageSize={8} category="sports" />} />
          <Route path="/technology" element={<News setProgress={setProgress} pageSize={8} category="technology" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
