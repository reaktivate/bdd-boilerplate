import React from 'react';

function useOutsideClick(ref: any) {
  const [isOutsideClick, setOutsideClick] = React.useState(true);
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOutsideClick(true);
      } else {
        setOutsideClick(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return [isOutsideClick];
}

export default useOutsideClick;
