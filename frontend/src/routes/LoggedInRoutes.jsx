import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'; //outlet is a component that renders the component that is matched by the route
import Login from '../pages/login';

const LoggedInRoutes = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Outlet /> : <Login />; //Outlet element allows us to access the element inside another route .
};

export default LoggedInRoutes;
