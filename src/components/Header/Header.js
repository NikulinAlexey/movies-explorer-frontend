import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header({
  loggedIn,
  location,
  allowedRoutes,
}) {
  const isMainPage = location.pathname === '/';
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  function handleBurgerClick() {
    setIsBurgerClicked(!isBurgerClicked);
  };

  useEffect(() => {
    setIsHeaderVisible(allowedRoutes.some(route => location.pathname === route)
    )
  }, [location.pathname, allowedRoutes]);

  return (
    isHeaderVisible &&
    <header className={`header ${!isMainPage ? 'header_type_dark' : ''}`}>
      <div className="header__container">

        <NavLink className="header__logo" to='/' />

        {loggedIn ?
          <>
            <nav className={`header__nav ${isBurgerClicked ? 'active' : ''}`}>
              <ul className='header__nav-list'>
                <li className='header__nav-item header__nav-item_type_main'>
                  <NavLink
                    to='/'
                    onClick={handleBurgerClick}
                    className='header__nav-link header__nav-link_type_main'
                  >
                    Главная
                  </NavLink>
                </li>
                <li className='header__nav-item'>
                  <NavLink
                    to='/movies'
                    onClick={handleBurgerClick}
                    className='header__nav-link'
                  >
                    Фильмы
                  </NavLink>
                </li>
                <li className='header__nav-item'>
                  <NavLink
                    to='/saved-movies'
                    onClick={handleBurgerClick}
                    className='header__nav-link'
                  >
                    Сохраненные фильмы
                  </NavLink>
                </li>
                <li className='header__nav-item'>
                  <NavLink
                    to='/profile'
                    onClick={handleBurgerClick}
                    className='header__nav-link header__nav-link_type_profile'
                  >
                    Аккаунт
                    <div
                      className={
                        `header__icon
                         ${isMainPage ? '' : 'header__icon_type_dark'}`
                      }
                    />
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div
              onClick={handleBurgerClick}
              className={`header__burger ${isBurgerClicked ? 'active' : ''}`}
            >
              <span />
            </div>
          </>
          :
          <nav className='header__unlogged-nav'>
            <ul className='header__unlogged-list'>
              <li className='header__unlogged-item'>
                  <NavLink className='header__unlogged-link' to='/sign-up'>Регистрация</NavLink>
              </li>
              <li className='header__unlogged-item header__unlogged-item_type_sign-in'>
                  <NavLink className='header__unlogged-link' to='/sign-in'>Войти</NavLink>
              </li>
            </ul>
          </nav>
        }

      </div>
    </header>


  );
}

export default Header;