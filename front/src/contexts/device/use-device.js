import { useEffect, useState } from 'react';
import { DEVICE_TYPES } from '~constants';

const { MOBILE, TABLET, DESKTOP, WIDE } = DEVICE_TYPES;

/**
 * Provides a real time device type value,
 * based on window.innerWidth value.
 */
const useDevice = () => {
  const [device, setDevice] = useState('');

  // Resize event handler
  // Compares window's innerWidth with the braekpoints'
  // values and sets the resulting device type
  const handleResize = () => {
    const { innerWidth: width } = window;
    let type = MOBILE;

    if (width >= 700 && width < 960) {
      type = TABLET;
    } else if (width >= 960 && width < 1200) {
      type = DESKTOP;
    } else if (width >= 1200) {
      type = WIDE;
    }

    setDevice(type);
  };

  // Effect to trigger an initial calculation
  // and to add a window's resize event listener
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    // Remove listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    device,
  };
};

export default useDevice;
