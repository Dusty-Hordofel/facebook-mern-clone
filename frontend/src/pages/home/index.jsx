import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import SendVerification from '../../components/home/sendVerification';
import Stories from '../../components/home/stories';
import './style.css';
const Home = () => {
  const { user } = useSelector((state) => ({ ...state })); //now we can take many elements from state
  // const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;
