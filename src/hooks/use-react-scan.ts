import { scan } from 'react-scan';
import { useEffect } from 'react';
import { env } from '~/env';

const REACT_SCAN_COLLAPSED_KEY = 'react-scan-widget-collapsed-v1';
const REACT_SCAN_COLLAPSED_DEFAULT = { corner: 'bottom-left', orientation: 'horizontal' };

export const useReactScan = () => {
  useEffect(() => {
    localStorage.setItem(REACT_SCAN_COLLAPSED_KEY, JSON.stringify(REACT_SCAN_COLLAPSED_DEFAULT));
    scan({
      enabled: false,
      showToolbar: env.VITE_ENABLE_REACT_SCAN,
    });
  }, []);
};
