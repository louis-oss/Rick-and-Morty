import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/NavBar.js';
import MainPage from './components/mainPage/index.js';
import background from './images/background.jpg'
import Episodes from './components/episodes/EpisodesList.js';
import Characters from './components/characters/Characters.js';
import FavoritesList
 from './components/favorites/FavoriteList.js';
export default function App() {

  const components = {
    'Accueil': <MainPage />,
    'Episodes': <Episodes />,
    'Personnages': <Characters />,
    'Favoris': <FavoritesList />
  }

  const [activeComponent, setActiveComponent] = useState(components['Accueil']);

  function switchComponent(component) {
    setActiveComponent(components[component]);
  }

  document.body.style.backgroundImage = `url(${background})`;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Navbar switchComponent={switchComponent} />
      {activeComponent}
    </div>
  );
}