import './style.css';
import { useField, ErrorMessage } from 'formik';
//import { useMediaQuery } from 'react-responsive';
export default function LoginInput({ placeholder, bottom, ...props }) {
  const [field, meta] = useField(props); //useField() is a hook used to get access to the formik state and props
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            desktopView ? 'input_error input_error_desktop' : 'input_error'
          }
          style={{ transform: 'translateY(3px)' }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? 'error_arrow_left' : 'error_arrow_top'}
            ></div>
          )}
        </div>
      )}
      {/* <div className="input_error">
        {meta.touched && meta.error && <ErrorMessage name={field.name} />} 
        // if the field is touched and has an error, display the error message 
      </div> */}
      <input
        className={meta.touched && meta.error ? 'input_error_border' : ''} //if the field is touched and has an error, add the error border
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && bottom && (
        <div
          className={
            desktopView ? 'input_error input_error_desktop' : 'input_error'
          }
          style={{ transform: 'translateY(2px)' }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? 'error_arrow_left' : 'error_arrow_bottom'
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView ? '63%' : '15px'}` }}
        ></i>
      )}
    </div>
  );
}
