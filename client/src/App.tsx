import React from 'react';
import './App.css';
import Login from './components/User/Login';
import AgentForm from './components/Agent/AgentForm';
import ListAgent from './components/Agent/ListAgent';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/agent/create" element={<AgentForm />} />
        <Route path="/agent/list" element={<ListAgent />} />
      </Routes>
    </div>
  );
}

export default App;
