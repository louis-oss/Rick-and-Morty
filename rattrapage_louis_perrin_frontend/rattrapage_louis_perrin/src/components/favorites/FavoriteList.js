import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import colorPalette from "../../style/palette";
import { Button } from "react-bootstrap";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function FavoritesList() {
  const favorites = useSelector((state) => state.Store.favorites);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const username = useSelector((state) => state.Store.username);

  useEffect(() => {
    const fetchCharacterDetails = async (id) => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching character details:", error);
        return null;
      }
    };

    const getFavoriteCharacters = async () => {
      const favoriteCharactersDetails = [];

      for (const id of favorites) {
        const character = await fetchCharacterDetails(id);
        if (character !== null) {
          favoriteCharactersDetails.push(character);
        }
      }
      setFavoriteCharacters(favoriteCharactersDetails);
    };

    getFavoriteCharacters();
  }, [favorites]);

  function updateFavorites(id) {
    if (favorites.includes(id)) {
      fetch('http://localhost:5000/remove_favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          id: id
        })
      })
        .catch((error) => { console.log(error) })
    } else {
      fetch('http://localhost:5000/add_favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          id: id
        })
      })
        .catch((error) => { console.log(error) })
    }
  }

  return (
    favoriteCharacters.length === 0 ? (
      <span style={{ color: "#FFF" }}>Aucun personnage favori trouvé</span>
    ) : (
      <div className="container">
        {favoriteCharacters.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((character) => (
              <div className="col-md-2.4 mb-4 mx-2 p-4" key={character.id}>
                <div className="card card-hover">
                  <a href={character.url} className="card-link" id='card-link'>
                    <div>
                      <img src={character.image} className="card-img-top" alt={character.name} />
                      <div className="card-body" style={{ height: '45vh' }}>
                        <h5 className="card-title">{character.name}</h5>
                      </div>
                    </div>
                  </a>

                  <div className='card-footer' style={{ background: colorPalette.lightBackground }}>
                    <Button className='btn d-flex flex-direction-row' style={{ background: 'transparent', border: 'none', width: '100%' }} onClick={() => updateFavorites(character.id)}>
                      {favorites.includes(character.id) ? (
                        <><FavoriteIcon style={{ color: 'red', marginRight: '10px' }} /> <p>Retirer des favoris</p></>
                      ) : (
                        <><FavoriteBorderIcon style={{ marginRight: '10px' }} /> <p>Ajouter aux favoris</p></>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  );
}
