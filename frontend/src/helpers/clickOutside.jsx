import { useEffect } from 'react';

const useClickOutside = (ref, fun) => {
  useEffect(() => {
    const listener = (e) => {
      //if element does not exist or we are inside the element, we are not run everything
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      fun(); //if we are outside the element, we run the function
    };
    document.addEventListener('mousedown', listener); //mousedown is when we click on the document.it's capture all the events or click you have in your mouse
    document.addEventListener('touchstart', listener); //touchstart is used to detect when we are touching the screen.

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, fun]);
};

export default useClickOutside;
