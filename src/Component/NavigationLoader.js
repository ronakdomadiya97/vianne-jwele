import React, { useEffect, useState } from 'react';

const LOADER_THRESHOLD = 250;

export default function NavigationLoader(props) {
  const { text = "Loading..." } = props;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let timer;

    const start = () => {
      timer = setTimeout(() => setLoading(true), LOADER_THRESHOLD);
    };

    const end = () => {
      if (timer) {
        clearTimeout(timer);
      }
      setLoading(false);
    };

    // Replace the router-related code with your own navigation logic
    const handleNavigationStart = () => start();
    const handleNavigationEnd = () => end();

    // Attach event listeners to your navigation events
    document.addEventListener('yourNavigationStartEvent', handleNavigationStart);
    document.addEventListener('yourNavigationEndEvent', handleNavigationEnd);

    return () => {
      // Remove event listeners during cleanup
      document.removeEventListener('yourNavigationStartEvent', handleNavigationStart);
      document.removeEventListener('yourNavigationEndEvent', handleNavigationEnd);

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []); // The empty dependency array ensures that the effect runs only once

  if (!isLoading) return null;

  return (
    <div className="navigation-loader">{text}</div>
  );
}
