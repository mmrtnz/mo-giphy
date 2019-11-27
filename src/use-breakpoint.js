// External Dependencies
import debounce from 'debounce';
import { useState, useEffect } from 'react';

export const BREAKPOINTS = {
  XL: 'xl',
  LG: 'lg',
  MD: 'md',
  SM: 'sm',
  XS: 'xs',
};

/* eslint-disable no-nested-ternary */
const getDeviceSize = w =>
  w >= 1920 ? BREAKPOINTS.XL :
  w >= 1280 ? BREAKPOINTS.LG :
  w >= 960 ? BREAKPOINTS.MD :
  w >= 600 ? BREAKPOINTS.SM :
  BREAKPOINTS.XS;
/* eslint-enable no-nested-ternary */

const useBreakpoint = () => {
  const initialSize = getDeviceSize(window.innerWidth);
  const [breakpoint, setBreakpoint] = useState(initialSize);

  useEffect(() => {
    const updateBreakpoint = () => setBreakpoint(getDeviceSize(window.innerWidth));
    const debouncedUpdateBreakpoint = debounce(updateBreakpoint, 200);

    window.addEventListener('resize', debouncedUpdateBreakpoint);
    const cleanup = () => window.removeEventListener('resize', updateBreakpoint);
    return cleanup;
  }, []);

  return breakpoint;
};

export default useBreakpoint;
