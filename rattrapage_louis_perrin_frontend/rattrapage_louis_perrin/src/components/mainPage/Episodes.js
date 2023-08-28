import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../../style/episodesList.css'
import colorPalette from "../../style/palette";

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode')
      .then(response => response.json())
      .then(data => {
        setEpisodes(data.results);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des épisodes :', error);
      });
  }, []);

  return (
    <div className='container'>
      <div className='table-container'>
        <table className='table'>
          <thead className="table-head">
            <tr>
              <th style={{ background: colorPalette.lightBackground, color: colorPalette.primary }} scope='col'>Id</th>
              <th style={{ background: colorPalette.lightBackground, color: colorPalette.primary }} scope='col'>Nom</th>
              <th style={{ background: colorPalette.lightBackground, color: colorPalette.primary }} scope='col'>Date de sortie</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {episodes.map((episode, index) => (
              <tr key={episode.id}>
                <th style={{ backgroundColor: colorPalette.titleText }} scope='row'>{index + 1}</th>
                <td style={{ backgroundColor: colorPalette.titleText }}>{episode.name}</td>
                <td style={{ backgroundColor: colorPalette.titleText }}>{episode.air_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
