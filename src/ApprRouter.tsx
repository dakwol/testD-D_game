import React from 'react';
import PersonePage from './pages/PersonePage/PersonePage';
import FightPage from './pages/FightPage/FightPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';

export interface IAppRouterPRops {}

const AppRouter: React.FC<IAppRouterPRops> = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PersonePage/>}/>
          <Route path='/fight' element={<FightPage/>}/>
          <Route element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
};

export default AppRouter;
