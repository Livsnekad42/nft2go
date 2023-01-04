import React from 'react';
import {
    Link
  } from "react-router-dom";
import authStore from "../stores/authStore";


export default function Navigation() {

    function handleLogOut(event: React.MouseEvent) {
        event.preventDefault();
        authStore.logOut();
    }

    return (
      <div id="navbar">
          { localStorage.getItem('isAuthorized') === 'true' ?  <a href='/auth' onClick={handleLogOut}>Выйти</a> : <Link to="/auth" className="navbar-link">Войти</Link> }
          <Link to="/home" className="navbar-link">Домой</Link>
          <Link to="/profile" className="navbar-link">Профиль</Link>
      </div>
    );
  }
  