import React from 'react';

function handleLargeScreen(setIsLargeScreen) {
  const mediaQuery = window.matchMedia('(min-width: 1200px)');

  if (mediaQuery.matches) {
    setIsLargeScreen(true);
  }

  const handleMediaQueryChange = (event) => {
    setIsLargeScreen(event.matches);
  };

  mediaQuery.addEventListener('change', handleMediaQueryChange);

  return () => {
    mediaQuery.removeEventListener('change', handleMediaQueryChange);
  };
}

export default handleLargeScreen;
