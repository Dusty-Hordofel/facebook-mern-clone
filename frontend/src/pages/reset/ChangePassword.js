import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../../components/inputs/loginInput';
import * as Yup from 'yup'; //yup is a library that validates the form data
import axios from 'axios';
export default function ChangePassword({
  password,
  setPassword,
  conf_password,
  setConf_password,
  error,
  laoding,
  setLoading,
  userInfos,
  setError,
}) {
  const navigate = useNavigate();
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &).'
      )
      .min(6, 'Password must be atleast 6 characters.')
      .max(36, "Password can't be more than 36 characters"),

    conf_password: Yup.string()
      .required('Confirm your password.')
      .oneOf([Yup.ref('password')], 'Passwords must match.'), //oneOf is a validation rule that checks if the value of the field is the same as the value of another field
  });

  const { email } = userInfos;
  const changePassword = async () => {
    try {
      setLoading(true);
      // `${process.env.REACT_APP_BACKEND_URL}/changePassword`
      await axios.post('http://localhost:8600/api/changePassword', {
        email,
        password,
      });
      setError('');
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form" style={{ height: '310px' }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Pick a strong password</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          conf_password,
        }} //initialValues is the default value of the form
        validationSchema={validatePassword} //validationSchema is the validation of the form
        onSubmit={() => {
          changePassword();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
            <LoginInput
              type="password"
              name="conf_password"
              onChange={(e) => setConf_password(e.target.value)}
              placeholder="Confirm new password"
              bottom
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
