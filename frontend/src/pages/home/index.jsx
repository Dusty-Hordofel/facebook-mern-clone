import { useRef, useState } from 'react';
import Header from '../../components/header';
import useClickOutside from '../../helpers/clickOutside';
import './style.css';

const Home = () => {
  const [visible, setVisible] = useState(true);
  const el = useRef(null);
  useClickOutside(el, () => {
    //el.current.style.display = 'none';
    setVisible(false);
    console.log('You click outside the element');
  });
  return (
    <div>
      <Header />

      {/* {visible && <div className="card" ref={el}></div>} */}
    </div>
  );
};

export default Home;
