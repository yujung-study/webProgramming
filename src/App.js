import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import LetterForm from './components/LetterForm';
import LetterList from './components/LetterList';
import LetterView from './components/LetterView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/write/:id" element={<LetterForm />} />
        <Route path="/write" element={<LetterForm />} />
        <Route path="/list" element={<LetterList />} />
        <Route path="/view/:id" element={<LetterView />} />
      </Routes>
    </Router>
  );
}

export default App;
