import React from 'react';
import './App.css';
import Login from './components/User/Login';
import AgentForm from './components/Agent/AgentForm';
import ListAgent from './components/Agent/ListAgent';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import useToken from './components/User/hooks/useToken';
import CaseForm from './components/Case/CaseForm';
import ListCase from './components/Case/ListCase';
import { Box } from '@mui/material';

function App() {
  const { setToken } = useToken();
  const { token } = useToken();

  const logout = () => {
    localStorage.removeItem('token');
    return <Navigate replace={true} to='/home' />
  }
  return (
    <div>
      {/* Navigation */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          typography: 'body1',
          '& > :not(style) + :not(style)': {
            ml: 2,
          },
        }}
      >
        <Link to="/home">Home</Link>
        <Link to="/login">Agent Sign In</Link>
        {token?.role.name === 'admin' &&
          <>
            <Link to="/agent/list">Agent List</Link>
            <Link to="/login">Logout</Link>
          </>
        }
        {token?.role.name === 'agent' &&
          <>
            <Link to="/case/list">Case List</Link>
            <Link to="/home" onClick={() => { logout(); }}>Logout</Link>
          </>
        }
      </Box>

      {/* Routes */}
      <Routes>
        <Route path="/home" element={<CaseForm />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/agent/create" element={<AgentForm />} />
        <Route path="/agent/list" element={<ListAgent />} />
        <Route path={`/agent/edit/:id`} element={<AgentForm />} />
        <Route path={`/case/list`} element={<ListCase />} />
      </Routes>
    </div>
  );
}

export default App;
