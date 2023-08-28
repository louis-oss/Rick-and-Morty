import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import colorPalette from "../../style/palette";

export default function Favorites() {
  const favorites = useSelector((state) => state.Store.favorites);
  const [lastFiveFavoriteCharacters, setLastFiveFavoriteCharacters] = useState([]);
  console.log(favorites)

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

    const getLastFiveFavoriteCharacters = async () => {
      const lastFiveFavoriteIds = favorites.slice(-5);
      const lastFiveFavoriteCharactersDetails = [];

      for (const id of lastFiveFavoriteIds) {
        const character = await fetchCharacterDetails(id);
        if (character !== null) {
          lastFiveFavoriteCharactersDetails.push(character);
        }
      }

      setLastFiveFavoriteCharacters(lastFiveFavoriteCharactersDetails);
    };

    getLastFiveFavoriteCharacters();
  }, [favorites]);

  return (
    <div className="container">
      {lastFiveFavoriteCharacters.length === 0 ? (
        <span style={{ color: "#FFF" }}>Aucun personnage favori trouvé</span>
      ) : (
        <div className="container d-flex flex-direction-row justify-content-around">
          {lastFiveFavoriteCharacters.map((character) => (
            <div className="d-flex flex-direction-row" style={{ width: '18%', height: '22vh', background: colorPalette.lightBackground, borderRadius: '10px' }}>
              <div>
                <img src={character.image} alt={character.name} style={{ width: '100%', height: '100%' }} />
              </div>
              <div className="d-flex justify-content-center align-items-center p-2">
                <h6 className="text-center" style={{ color: colorPalette.titleText }}>{character.name}</h6>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
