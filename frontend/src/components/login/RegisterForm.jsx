import { Form, Formik } from 'formik';
import { useState } from 'react';
import RegisterInput from '../inputs/registerInput';
import * as Yup from 'yup';
import DateOfBirthSelect from './DateOfBirthSelect';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import GenderSelect from './GenderSelect';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const userInfos = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1, //getMonth() returns the month of the date as a number between 0 and 11, where 0 is January and 11 is December
  bDay: new Date().getDate(),
  gender: '',
};
export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(userInfos);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const yearTemp = new Date().getFullYear();

  //we want years begins in 1915: current Year(2022) - startingPoint(1915) + 1 = 108
  const years = Array.from(new Array(108), (val, index) => yearTemp - index); //Array.from() is a built-in function that creates an array from an array-like object
  //const years = Array.from(new Array(108), (val, index) => index);//(108) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1...], it will give you all indexes of the array after iteration

  const months = Array.from(new Array(12), (val, index) => 1 + index);

  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  //console.log(user);

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, 'Fisrt name must be between 2 and 16 characters.')
      .max(16, 'Fisrt name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'), ///^[aA-zZ\s]+$/to allow spaces
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, 'Last name must be between 2 and 16 characters.')
      .max(16, 'Last name must be between 2 and 16 characters.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email('Enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
      )
      .min(6, 'Password must be atleast 6 characters.')
      .max(36, "Password can't be more than 36 characters"),
  });

  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        // `${process.env.REACT_APP_BACKEND_URL}/user/register`,
        'http://localhost:8600/api/user/register',
        // '/user/register',
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError('');
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('user', JSON.stringify(rest));
        navigate('/');
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };

  return (
    //blur className allow RegisterForm to be accross of all screen, above the login form.It's cover all the screen.
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          //enableReinitialize is a prop that allows you to reinitialize the form when the user changes the values of the inputs
          enableReinitialize
          //initialValues is a prop that allows you to set the initial values of the inputs
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          // validationSchema is a prop that allows you to manage the validation
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError(
                'it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth.'
              );
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                'it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth.'
              );
            } else if (gender === '') {
              setDateError('');
              setGenderError(
                'Please choose a gender. You can change who can see this later.'
              );
            } else {
              setDateError('');
              setGenderError('');
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{' '}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup">Sign Up</button>
              </div>
              <ClipLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
