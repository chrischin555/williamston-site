import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardsAndCommissions from './components/pages/BoardsAndCommissions';
import Departments from './components/pages/Departments';
import Community from './components/pages/Community';
import Business from './components/pages/Business';
import VisitUs from './components/pages/VisitUs';
import LogIn from './components/pages/LogIn';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route path='/' exact element={ <Home />}></Route>
        <Route path='/boards-and-commissions' exact element={ <BoardsAndCommissions />}></Route>
        <Route path='/departments' exact element={ <Departments />}></Route>
        <Route path='/community' exact element={ <Community />}></Route>
        <Route path='/business' exact element={ <Business />}></Route>
        <Route path='/visit-us' exact element={ <VisitUs />}></Route>
        <Route path='/log-in' exact element={ <LogIn />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;