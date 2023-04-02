import React from 'react';
import './App.css';
import Login from './components/User/Login';
import CreateAgent from './components/Agent/CreateAgent';
import ListAgent from './components/Agent/ListAgent';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<CreateAgent />} />
        <Route path="/admin/list" element={<ListAgent />} />
      </Routes>
    </div>
  );
}

export default App;
