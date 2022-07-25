import { useRef, useState } from 'react';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import useClickOutside from '../../helpers/clickOutside';
import { useSelector } from 'react-redux';
import './style.css';

const Home = () => {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div>
      <Header />
      <LeftHome user={user} />
    </div>
  );
};

export default Home;
