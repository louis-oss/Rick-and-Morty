import 'bootstrap/dist/css/bootstrap.css';
import colorPalette from '../style/palette';
import React, { useState } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { Modal } from 'react-bootstrap'
import LoginForm from './auth/authenticate';
import CreateAccountForm from './auth/register';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';

export default function Navbar({ switchComponent }) {
  const authenticated = useSelector((state) => state.Store.authenticated)
  let items = [];
  if (authenticated) {
    items = ['Accueil', 'Episodes', 'Personnages', 'Favoris'];
  } else {
    items = ['Accueil', 'Episodes', 'Personnages'];
  }
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(items[0]);
  const [open, setOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const username = useSelector((state) => state.Store.username)

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  function handleOpen() {
    setOpen(!open);
  }

  const handleRegisterOpen = () => {
    setShowRegisterModal(true);
  };

  const handleRegisterClose = () => {
    setShowRegisterModal(false);
  };

  function handleLogout() {
    dispatch({ type: 'SET_AUTHENTICATED', authenticated: false })
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ background: colorPalette.primary, position: 'fixed', width: '100%', zIndex: 1000 }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {items.map((item) => (
                <li key={item} className={`nav-item ${activeItem === item ? 'active' : ''}`}>
                  <a
                    className="nav-link"
                    href={`#${item.toLowerCase()}`}
                    onClick={() => {
                      handleItemClick(item);
                      switchComponent(item);
                    }}
                    style={{
                      color: colorPalette.text,
                      borderBottom: activeItem === item ? '2px solid black' : 'none',
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {authenticated ? (
            <div>
              <span>Bonjour, {username}</span>
              <IconButton style={{ marginLeft: '20px' }} onClick={() => handleLogout()}>
                <LogoutIcon style={{ color: 'red' }} />
              </IconButton>
            </div>
          ) : (
            <div className="d-flex">
              <button className="btn mx-3" onClick={handleOpen}><AccountBoxIcon />Connexion</button>
            </div>
          )}
        </div>
      </nav>

      <Modal show={open} onHide={handleOpen}>
        <Modal.Header closeButton style={{ background: colorPalette.lightBackground, borderBottom: `1px solid ${colorPalette.lightBackground}` }}>
          <Modal.Title style={{ color: colorPalette.titleText }}>Connexion</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: colorPalette.lightBackground, }}>
          <LoginForm handleOpen={handleOpen} handleRegisterOpen={handleRegisterOpen} />
        </Modal.Body>
      </Modal>

      <Modal show={showRegisterModal} onHide={handleRegisterClose}>
        <Modal.Header closeButton style={{ background: colorPalette.lightBackground, borderBottom: `1px solid ${colorPalette.lightBackground}` }}>
          <Modal.Title style={{ color: colorPalette.titleText }}>Inscription</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: colorPalette.lightBackground }}>
          <CreateAccountForm handleRegisterClose={handleRegisterClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
