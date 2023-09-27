import { useEffect, useState } from 'react';
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
import ProtectedRouteElement from '../ProtectedRouteElement';

import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const footerAllowedRoutes = ['/', '/movies', '/saved-movies'];
  const headerAllowedRoutes = ['/', '/movies', '/saved-movies', '/profile'];

  const [user, setUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesToShow, setSavedMoviesToShow] = useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
 
  function messageSetter(newMessage) {
    setMessage(newMessage);
  }
  function handleGetMovies() {
    setIsPreloaderVisible(true);

    MoviesApi.getFilms()
      .then((moviesData) => {
        setMovies(moviesData);
        localStorage.setItem('movies', JSON.stringify(moviesData));
      })
      .catch((err) => setMessage(err))
      .finally(() => setIsPreloaderVisible(false))
  };

  function getSavedMovies() {
    MainApi.getSavedMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies);
      })
      .catch((err) => {
        console.log(err)
        setMessage(err)
      })
  }
  useEffect(() => {
    MainApi.checkToken()
      .then((user) => {
        setLoggedIn(true);
        setUser(user);
      })
      .then(() => {
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleRegister(values) {
    MainApi.register(values)
      .then(({name}) => {
        setMessage(`Успешная регистрация, ${name}`);
      })
      .then(() => navigate('/sign-in'))
      .catch((err) => {
        setMessage(err)
        console.log(err)
      });
  };
  function handleAuthorize(values) {
    MainApi.authorize(values)
      .then((user) => {
        setUser(user);
        console.log(user)
        setLoggedIn(true);
      })
      .then(() => {
        navigate('/movies');
      })
      .catch((err) => {
        setMessage(err);
        console.log(err)
      });
  };
  function onSignout() {
    MainApi.signOut()
      .then(() => {
        setLoggedIn(false);
        localStorage.clear();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      })
  };
  function handleUpdateProfile(name, email) {
    setIsPreloaderVisible(true);

    MainApi.updateProfile(name, email)
      .then((refreshedUser) => {
        setMessage('Профиль успешно отредактирован');
        setUser(refreshedUser);
      })
      .catch((err) => {
        setMessage(err);
        console.log(err);
      })
      .finally(() => {
        setIsPreloaderVisible(false);
      })
  }

  function changeLikeMovieStatus(movie, isLiked) {
    if (isLiked) {
      MainApi.deleteMovie(movie._id)
        .then((deletedMovie) => {
          setSavedMovies(savedMovies.filter(item => item._id !== deletedMovie._id));
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      MainApi.likeMovie(movie)
        .then((likedMovie) => {
          setSavedMovies(savedMovies.concat([likedMovie]));
          
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  useEffect(() => {
    setMessage('');
  }, [location])

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          location={location}
          allowedRoutes={headerAllowedRoutes}
        />
        <main className="content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={
              <ProtectedRouteElement
                element={Profile}
                user={user}
                message={message}
                loggedIn={loggedIn}
                onSignout={onSignout}
                isPreloaderVisible={isPreloaderVisible}
                handleUpdateProfile={handleUpdateProfile}
              />}
            />
            <Route path="/saved-movies" element={
              <ProtectedRouteElement
                element={SavedMovies}
                message={message}
                loggedIn={loggedIn}
                location={location}
                savedMovies={savedMovies}
                messageSetter={messageSetter}
                getSavedMovies={getSavedMovies}
                savedMoviesToShow={savedMoviesToShow}
                isPreloaderVisible={isPreloaderVisible}
                changeLikeMovieStatus={changeLikeMovieStatus}
              />}
            />
            <Route path="/movies" element={
              <ProtectedRouteElement
                element={Movies}
                movies={movies}
                message={message}
                location={location}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                messageSetter={messageSetter}
                getSavedMovies={getSavedMovies}
                handleGetMovies={handleGetMovies}
                isPreloaderVisible={isPreloaderVisible}
                changeLikeMovieStatus={changeLikeMovieStatus}
              />}
            />

            <Route
              path='/sign-in'
              element={<Login
                message={message}
                location={location}
                onSubmit={handleAuthorize}
                messageSetter={messageSetter}
              />}
            />
            <Route
              path='/sign-up'
              element={<Register
                message={message}
                location={location}
                onSubmit={handleRegister}
                messageSetter={messageSetter}
              />}
            />

            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>


        <Footer
          loggedIn={loggedIn}
          location={location}
          allowedRoutes={footerAllowedRoutes}
        />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
