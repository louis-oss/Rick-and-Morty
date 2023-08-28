import React, { useEffect, useState } from 'react';
import Favorites from './Favorites.js';
import Episodes from './Episodes.js';
import Characters from './Characters.js';
import colorPalette from '../../style/palette.js';
import { useSelector } from 'react-redux';

export default function MainPage() {
  const components = {
    favorites: <Favorites />,
    episodes: <Episodes />,
    characters: <Characters />,
  };

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const authenticated = useSelector((state) => state.Store.authenticated);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ height: `${windowHeight}px` }}>
      {authenticated ? (
        <div className='p-5'>
          <h2 className='m-5' style={{ color: colorPalette.primary }}>Favoris</h2>
          {components.favorites}
        </div>
      ) : (undefined)}

      <div className='p-5'>
        <h2 className='m-5' style={{ color: colorPalette.primary }}>Episodes</h2>
        {components.episodes}
      </div>
      <div className='p-5'>
        <h2 className='m-5' style={{ color: colorPalette.primary }}>Personnages</h2>
        {components.characters}
      </div>
    </div>
  );
}
