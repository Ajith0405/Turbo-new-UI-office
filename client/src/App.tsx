import React from 'react';
import './App.css';
import AllBoardNabar from './components/AllBoardSection/AllBoardNabar';
import { Route, Routes } from 'react-router-dom';
import Demo from './components/BoardSection/BoardNavbar';
import AllBoards from './components/AllBoardSection/AllBoards';
import BoardNavbar from './components/BoardSection/BoardNavbar';

function App() {
  return (
    <div className='App'>
      {/* <AllBoards/> */}
      {/* <BoardNavbar/> */}
      <Routes>
        <Route path='/' element={<AllBoards/>}></Route>
        <Route path='/board/:id' element={<BoardNavbar/>} ></Route>
        
      </Routes>
      
    </div>
  );
}

export default App;
