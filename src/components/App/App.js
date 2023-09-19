import { useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Main from '../Main/Main';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const footerAllowedRoutes = ['/', '/movies', '/saved-movies'];
  const headerAllowedRoutes = ['/', '/movies', '/saved-movies', '/profile'];

  const [loggedIn, setLoggedIn] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);

  function handleSaveMovies(movies) {
    setSavedMovies(movies);
  }

  function onSignout() {
    setLoggedIn(false);
    navigate('/');
  }

  return (
    <div className="page">
      <Header
        loggedIn={loggedIn}
        location={location}
        allowedRoutes={headerAllowedRoutes}
      />
      <main className="content">
        <Routes>
          <Route path="/" element={<Main />} />

          <Route
            path='/movies'
            element={
              <Movies
              handleSaveMovies={handleSaveMovies}
              isPreloaderVisible={isPreloaderVisible}
              />}
          />

          <Route path='/profile' element={<Profile onSignout={onSignout} />} />

          <Route path='/sign-in' element={<Login />} />

          <Route path='/sign-up' element={<Register />} />

          <Route path='/saved-movies' element={<SavedMovies movies={savedMovies} />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </main>


      <Footer
        loggedIn={loggedIn}
        location={location}
        allowedRoutes={footerAllowedRoutes}
      />
    </div>
  );
}

export default App;
