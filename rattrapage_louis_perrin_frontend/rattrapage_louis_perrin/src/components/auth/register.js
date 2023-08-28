import React, { useState } from 'react';
import colorPalette from '../../style/palette';

export default function CreateAccountForm({ handleRegisterClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    if (!isValidEmail(newEmail)) {
      setEmailError('Adresse mail');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (newPassword.length < 8) {
      setPasswordError('Le mot de passe doit contenir minimum 8 caractères');
    } else {
      setPasswordError('');
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
        }),
      });

      if (response.status === 201) {
        handleRegisterClose();
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label" style={{ color: colorPalette.primary }}>Nom d'utilisateur</label>
        <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label" style={{ color: colorPalette.primary }}>Email</label>
        <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} placeholder='example@example.com' />
        {emailError && <div className="text-danger">{emailError}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label" style={{ color: colorPalette.primary }}>Mot de passe</label>
        <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
        {passwordError && <div className="text-danger">{passwordError}</div>}
      </div>
      <button type="submit" className="btn" style={{ background: colorPalette.primary }}>Créer un compte</button>
    </form>
  );
}
