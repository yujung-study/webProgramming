import React from 'react';
import { BrowserRouter as AppRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../src/pages/NotFound/NotFound';
import Main from '../src/pages/Main/Main';

const Router = () => {
  return (
    <AppRouter>
      <Routes>
        {/* <Route path='/' element={<App />} /> */}
        <Route path='/' element={<Main />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AppRouter>
  );
};

export default Router;