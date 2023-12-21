import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Admin/AdminDashboard';
import Lecture from './Components/Admin/Lecture';
import Sidebar from './Components/Admin/Sidebar';
import Student from './Components/Admin/Students';
import Header from './Components/Admin/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/sidebar' element={<Dashboard/>}/>
            <Route path='/lecture' element={<Lecture/>}/>
            <Route path='/student' element={<Student/>}/>
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;
