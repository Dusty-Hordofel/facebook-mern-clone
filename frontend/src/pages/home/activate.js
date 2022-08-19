import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import ActivateForm from './ActivateForm';
import './style.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Activate = () => {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((user) => ({ ...user }));
  console.log(user);
  console.log(error);
  console.log(success);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  console.log(token);
  //console.log(process.env.REACT_APP_BACKEND_URL);

  useEffect(() => {
    activateAccount();
  }, []);

  const activateAccount = async () => {
    try {
      setLoading(true);
      // `${process.env.REACT_APP_BACKEND_URL}/activate`
      const { data } = await axios.post(
        'http://localhost:8600/api/activate',
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set('user', JSON.stringify({ ...user, verified: true })); //JSON.stringify is use to convert object to string.
      dispatch({
        type: 'VERIFY',
        payload: true,
      });

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  console.log('Token', token);

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeded."
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed."
          text={error}
          loading={loading}
        />
      )}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Activate;
