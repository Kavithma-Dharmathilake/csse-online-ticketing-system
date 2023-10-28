import { Route, Routes, BrowserRouter} from 'react-router-dom'

import Home from './Home';
import Login from './Login';
import DashBoard from './pages/manager/Dashboard';
import Driver from './pages/manager/Driver';
import Routes1 from './pages/manager/Routes';
import Schedule from './pages/manager/Schedule';

function App() {
  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/drivers" element={<Driver />} />
        <Route path="/routes" element={<Routes1 />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
