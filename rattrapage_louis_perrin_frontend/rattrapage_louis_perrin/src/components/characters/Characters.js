import React, { useEffect, useState } from "react";
import '../../style/charactersList.css'
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import colorPalette from "../../style/palette";
import { Button } from "react-bootstrap";

export default function Characters_Page() {
  const [characters, setCharacters] = useState([]);
  const chunkedCharacters = [];
  const chunkSize = 5;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.Store.favorites);
  const authenticated = useSelector((state) => state.Store.authenticated)
  // const username = useSelector((state) => state.Store.username)

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results);
      });
  }, []);

  function updateFavorites(id) {
    if (favorites.includes(id)) {
      dispatch({ type: 'REMOVE_FAVORITE', favoriteId: id });
      // fetch('http://localhost:5000/remove_favorite', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     username: username,
      //     id: id
      //   })
      // })
      //   .catch((error) => { console.log(error) })
    } else {
      dispatch({ type: 'ADD_FAVORITE', favorite: id });
      // fetch('http://localhost:5000/add_favorite', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     username: username,
      //     id: id
      //   })
      // })
      //   .catch((error) => { console.log(error) })
    }
  }

  const getEpisodeNumber = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  for (let i = 0; i < characters.length; i += chunkSize) {
    chunkedCharacters.push(characters.slice(i, i + chunkSize));
  }

  return (
    <div className="container">
      {chunkedCharacters.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((character) => (
            <div className="col-md-2.4 mb-4 mx-2 p-4" key={character.id}>
              <div className="card card-hover">
                <a href={character.url} className="card-link" id='card-link'>
                  <div>
                    <img src={character.image} className="card-img-top" alt={character.name} />
                    <div className="card-body" style={{ height: '45vh' }}>
                      <h5 className="card-title">{character.name}</h5>
                      <p className="card-text">Statut: {character.status}</p>
                      <p className="card-text">Genre: {character.gender}</p>
                      <p className="card-text">Espèce: {character.species}</p>
                      <p className="card-text">Origine: {character.origin.name}</p>
                      <span>Episodes:</span>
                      <div style={{
                        maxWidth: '20vw',
                        height: character.episode.length > 1 ? '8vh' : '5vh',
                        overflowY: character.episode.length > 1 ? 'scroll' : 'hidden'
                      }}>
                        <table>
                          <tbody>
                            {character.episode.map((episode) => (
                              <tr key={episode}>
                                <td>Episode: {getEpisodeNumber(episode)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </a>
                {authenticated ? (
                  <div className='card-footer' style={{ background: colorPalette.lightBackground }}>
                    <Button className='btn d-flex flex-direction-row' style={{ background: 'transparent', border: 'none', width: '100%' }} onClick={() => updateFavorites(character.id)}>
                      {favorites.includes(character.id) ? (
                        <><FavoriteIcon style={{ color: 'red', marginRight: '10px' }} /> <p>Retirer des favoris</p></>
                      ) : (
                        <><FavoriteBorderIcon style={{ marginRight: '10px' }} /> <p>Ajouter aux favoris</p></>
                      )}
                    </Button>
                  </div>
                ) : undefined}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
