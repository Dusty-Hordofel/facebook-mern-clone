import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'; //Yup is a library used to validate form data
import LoginInput from '../../components/inputs/loginInput';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const loginInfos = {
  email: '',
  password: '',
};

export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  //console.log(login);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Must be a valid email.')
      .max(100),
    password: Yup.string().required('Password is required'),
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        // `${process.env.REACT_APP_BACKEND_URL}/login`,
        'http://localhost:8600/api/login',
        {
          email,
          password,
        }
      );
      dispatch({ type: 'LOGIN', payload: data });
      Cookies.set('user', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize //enableReinitialize is a Formik hook used to enable formik to reinitialize the form when the user navigates to a new page
            initialValues={{
              email,
              password,
            }} //initialValues is a Formik hook used to initialize the formik state
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to="/reset" className="forgot_password">
            Forgotten password?
          </Link>

          <ClipLoader color="#1876f2" loading={loading} size={30} />
          {error && <div className="error_text">{error}</div>}

          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}

// import { Formik, Form } from 'formik';
// import { Link } from 'react-router-dom';
// import LoginInput from '../../components/inputs/loginInput';
// import { useState } from 'react';
// import * as Yup from 'yup'; //Yup is a library used to validate form data

// const loginInfos = {
//   email: '',
//   password: '',
// };

// export default function LoginForm() {
//   const [login, setLogin] = useState(loginInfos);
//   const { email, password } = login;

//   //console.log(login);

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLogin({ ...login, [name]: value });
//   };

//   const loginValidation = Yup.object({
//     email: Yup.string()
//       .required('Email address is required.')
//       .email('Must be a valid email.')
//       .max(100),
//     password: Yup.string().required('Password is required'),
//   });

//   return (
//     <div className="login">
//       <div className="login_wrapper">
//         <div className="login_wrap">
//           <div className="login_1">
//             <img src="../../icons/facebook.svg" alt="" />
//             <span>
//               Facebook helps you connect and share with the people in your life.
//             </span>
//           </div>
//           <div className="login_2">
//             <div className="login_2_wrap">
//               <Formik
//                 enableReinitialize //enableReinitialize is a Formik hook used to enable formik to reinitialize the form when the user navigates to a new page
//                 initialValues={{
//                   email,
//                   password,
//                 }} //initialValues is a Formik hook used to initialize the formik state
//                 validationSchema={loginValidation}
//               >
//                 {(formik) => (
//                   <Form>
//                     <LoginInput
//                       type="text"
//                       name="email"
//                       placeholder="Email address or phone number"
//                       onChange={handleLoginChange}
//                     />
//                     <LoginInput
//                       type="password"
//                       name="password"
//                       placeholder="Password"
//                       onChange={handleLoginChange}
//                       bottom
//                     />
//                     <button type="submit" className="blue_btn">
//                       Log In
//                     </button>
//                   </Form>
//                 )}
//               </Formik>
//               <Link to="/forgot" className="forgot_password">
//                 Forgotten password?
//               </Link>
//               <div className="sign_splitter"></div>
//               <button className="blue_btn open_signup">Create Account</button>
//             </div>
//             <Link to="/" className="sign_extra">
//               <b>Create a Page</b> for a celebrity, brand or business.
//             </Link>
//           </div>
//         </div>
//         <div className="register"></div>
//       </div>
//     </div>
//   );
// }
