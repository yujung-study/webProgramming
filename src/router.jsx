import React from 'react'
import { BrowserRouter as AppRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/main';

const Router = () => {
    return (
      <AppRouter>
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </AppRouter>
    );
  };

export default Router
