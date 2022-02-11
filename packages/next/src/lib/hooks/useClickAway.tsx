import { RefObject, useEffect } from 'react';

export const useClickAway = (ref: RefObject<HTMLElement>, onClickAway: any, ignoreClassName?: string) => {
  const handleClickOutside = (event: Event) => {
    if (event.target instanceof HTMLElement && ref.current && !ref.current.contains(event.target)) {
      if (ignoreClassName && event.target.closest(`.${ignoreClassName}`)) {
        return;
      }

      onClickAway(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  });
};
