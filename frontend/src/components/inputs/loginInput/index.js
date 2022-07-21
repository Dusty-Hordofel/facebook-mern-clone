import './style.css';
import { useField } from 'formik';
export default function LoginInput({ placeholder, ...props }) {
  const [field, meta] = useField(props); //useField() is a hook used to get access to the formik state and props
  return (
    <div className="input_wrap">
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
    </div>
  );
}
