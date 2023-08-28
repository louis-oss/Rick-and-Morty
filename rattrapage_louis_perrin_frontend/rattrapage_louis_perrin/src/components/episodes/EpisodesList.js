import React, { useEffect, useState } from "react";
import { Card, Carousel } from "react-bootstrap";
import colorPalette from "../../style/palette";

export default function EpisodesList() {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode')
      .then(response => response.json())
      .then(data => {
        console.log(getCharacters(data.results[0].characters));
        setEpisodes(data.results);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des épisodes :', error);
      });
  }, []);

  async function getCharacters(currentCharacters) {
    try {
      const characterPromises = currentCharacters.map(characterURL => (
        fetch(characterURL)
          .then(response => response.json())
      ));

      const characterData = await Promise.all(characterPromises);
      setCharacters(characterData);
    } catch (err) {
      console.log(err)
    }
  }

  async function handleCarouselSelect(selectedIndex) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/${selectedIndex}`);
      const episodeData = await response.json();
      setCurrentEpisode(selectedIndex);

      const characterPromises = episodeData.characters.map(characterURL => (
        fetch(characterURL)
          .then(response => response.json())
      ));

      const characterData = await Promise.all(characterPromises);
      setCharacters(characterData);
    } catch (error) {
      console.error('Erreur lors de la récupération de l épisode :', error);
    }
    setCurrentEpisode(selectedIndex);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div style={{ width: '85%', height: '50%' }}>
        {episodes.length > 0 && (
          <Carousel
            activeIndex={currentEpisode}
            onSelect={handleCarouselSelect}
            interval={null}
            style={{ border: '1px solid black', width: '90vw' }}
          >
            {episodes.map((episode, index) => (
              <Carousel.Item key={index} style={{ width: '90vw', border: '1px solid black', }}>
                <Card style={{ width: '90vw', border: '1px solid black' }}>
                  <Card.Body style={{ width: '85vw', }}>
                    <Card.Title style={{ color: colorPalette.primary }}>{episode.name}</Card.Title>
                    <Card.Text>{`Episode: ${episode.episode}`}</Card.Text>
                    <Card.Text>{`Date de sortie: ${episode.air_date}`}</Card.Text>
                    <div className="d-flex justify-content-center align-items-center">
                      <div style={{ width: '75%', overflow: 'auto', borderRadius: '5px' }}>
                        <table className="table" >
                          <tbody className="table-body">
                            {characters.map((character, index) => (
                              <tr key={index}>
                                <td>{character.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
    </div>

  );
}
