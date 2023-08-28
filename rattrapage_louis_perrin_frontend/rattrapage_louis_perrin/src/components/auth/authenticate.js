import React, { useState } from 'react';
import colorPalette from '../../style/palette';
import { useDispatch } from 'react-redux';

export default function LoginForm({ handleOpen, handleRegisterOpen }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 200) {
        dispatch({ type: 'SET_AUTHENTICATED', authenticated: true })
        dispatch({ type: 'SET_USERNAME', username: username })
        handleOpen();
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label" style={{ color: colorPalette.primary }}>Nom d'utilisateur</label>
          <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{ color: colorPalette.primary }}>Mot de passe</label>
          <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className='d-flex flex-direction-row justify-content-around'>
          <button type="submit" className="btn" style={{ background: colorPalette.primary }}>Se connecter</button>
          <button
            type="button"
            className="btn"
            style={{ border: `1px solid ${colorPalette.primary}`, color: colorPalette.titleText }}
            onClick={() => { handleOpen(); handleRegisterOpen(); }}
          >
            Vous n'êtes pas encore inscrit ?
          </button>
        </div>
      </form>
    </>
  );
}
