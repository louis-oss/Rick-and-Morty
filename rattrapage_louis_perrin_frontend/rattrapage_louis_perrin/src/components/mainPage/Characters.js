import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../style/charactersList.css'
import { IconButton } from '@mui/material';
import colorPalette from '../../style/palette';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.Store.favorites);
  const authenticated = useSelector((state) => state.Store.authenticated)

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => {
        const randomCharacters = getRandomCharacters(data.results, 5);
        setCharacters(randomCharacters);
        const iconsState = {};
        randomCharacters.forEach(character => {
          iconsState[character.id] = true;
        });
      });
  }, []);

  const getRandomCharacters = (charactersArray, count) => {
    const shuffledArray = [...charactersArray].sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, count);
  };

  function updateFavorites(id) {
    if (favorites.includes(id)) {
      dispatch({ type: 'REMOVE_FAVORITE', favoriteId: id });
    } else {
      dispatch({ type: 'ADD_FAVORITE', favorite: id });
    }
  }

  return (
    <div className="container">
      <div className="d-flex flex-row">
        {characters.map(character => (
          <div className="col-md-2.4 mb-4 mx-2" key={character.id}>
            <div className="card card-hover">
              <a href={character.url} className="card-link" id='card-link'>
                <div>
                  <img src={character.image} className="card-img-top" alt={character.name} />
                  <div className="card-body">
                    <h5 className="card-title">{character.name}</h5>
                    <p className="card-text">Status: {character.status}</p>
                    <p className="card-text">Species: {character.species}</p>
                  </div>
                </div>
              </a>
              {authenticated ? (
                <div className='card-footer' style={{ background: colorPalette.lightBackground }}>
                  <IconButton onClick={() => updateFavorites(character.id)}>
                    {favorites.includes(character.id) ? (
                      <FavoriteIcon style={{ color: 'red' }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </div>
              ) : undefined}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
