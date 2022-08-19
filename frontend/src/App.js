import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home';
import Activate from './pages/home/activate';
import Login from './pages/login';
import Profile from './pages/profile';
import Reset from './pages/reset';
import LoggedInRoutes from './routes/LoggedInRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activate/:token" element={<Activate />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
};

export default App;
