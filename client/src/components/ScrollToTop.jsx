import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Always scroll to top on route change
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  // Handle logo clicks when already on home page
  useEffect(() => {
    const handleLogoClick = (e) => {
      // Check if clicking on logo/home link
      const logoLink = e.target.closest('a[href="/"]');
      if (logoLink && pathname === '/') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    // Add global click listener for logo clicks
    document.addEventListener('click', handleLogoClick);
    return () => document.removeEventListener('click', handleLogoClick);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
