import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'

import Home from './Home';
import Login from './Login';
import DashBoard from './pages/manager/Dashboard';

function App() {
  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
