import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

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
import ProtectedRouteForAuthForm from '../ProtectedRouteForAuthForm';

import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';

import useWindowSizeX from '../../hooks/useWindowSizeX';
import {
  BIG_WINDOW_SIZE,
  MEDIUM_WINDOW_SIZE,
  SHORT_MOVIES_DURATION,
} from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useMoviesToShowCounter from '../../hooks/useMoviesToShowCounter';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentSizeX = useWindowSizeX();
  const footerAllowedRoutes = ['/', '/movies', '/saved-movies'];
  const headerAllowedRoutes = ['/', '/movies', '/saved-movies', '/profile'];
  const howManyMoviesToShowFirst = useMoviesToShowCounter(currentSizeX, BIG_WINDOW_SIZE, MEDIUM_WINDOW_SIZE);

  const [user, setUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  
  const [message, setMessage] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') || false);

  function messageSetter(newMessage) {
    setMessage(newMessage);
  };

  function getFilteredMovies(movies, textInputValue, isChecked) {
    if (isChecked) {
      return (movies.filter(movie =>
        (movie.nameRU.toLowerCase().includes(textInputValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(textInputValue.toLowerCase()))
        && movie.duration <= SHORT_MOVIES_DURATION))
    } else {
      return movies.filter(movie =>
        movie.nameRU.toLowerCase().includes(textInputValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(textInputValue.toLowerCase()))
    }
  };
  function filterMoviesByCheckbox(movies, textInputValue, isChecked) {
    const allMovies = JSON.parse(localStorage.getItem('movies'));
    if (movies !== null && allMovies !== null) {
      if (isChecked) {
        const filteredMovies = getFilteredMovies(movies, textInputValue, isChecked);
        setFilteredMovies(filteredMovies);
      } else {
        const filteredMovies = getFilteredMovies(allMovies, textInputValue, isChecked);
        setFilteredMovies(filteredMovies);
      }
    }
  }
  function filterSavedMoviesByCheckbox(movies, textInputValue, isChecked) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (movies !== null && savedMovies !== null) {
      if (isChecked) {
        const filteredSavedMovies = getFilteredMovies(savedMovies, textInputValue, isChecked);
        setFilteredSavedMovies(filteredSavedMovies);
      } else {
        const filteredSavedMovies = getFilteredMovies(savedMovies, textInputValue, isChecked);
        setFilteredSavedMovies(filteredSavedMovies);
      }
    }
  }

  function getAllMovies() {
    setIsPreloaderVisible(true);

    MoviesApi.getFilms()
      .then((moviesData) => {
        setMovies(moviesData);
        localStorage.setItem('movies', JSON.stringify(moviesData));
        const movieInputValue = localStorage.getItem('lastSearchMovies');
        const isMovieCheckboxChecked = JSON.parse(localStorage.getItem('lastCheckboxStateMovies'));

        const filteredMovies = getFilteredMovies(moviesData, movieInputValue, isMovieCheckboxChecked);

        setFilteredMovies(filteredMovies);
      })
      .catch((err) => setMessage(err))
      .finally(() => setIsPreloaderVisible(false))
  };
  function getSavedMovies() {
    setIsPreloaderVisible(true)

    MainApi.getSavedMovies()
      .then((savedMovies) => {
        const reversedSavedMovies = savedMovies.reverse();
        const savedMovieInputValue = localStorage.getItem('lastSearchSavedMovies');
        const isSavedMovieCheckboxChecked = JSON.parse(localStorage.getItem('lastCheckboxStateSavedMovies'));

        localStorage.setItem('savedMovies', JSON.stringify(reversedSavedMovies));

        const filteredSavedMovies = getFilteredMovies(reversedSavedMovies, savedMovieInputValue, isSavedMovieCheckboxChecked)

        setFilteredSavedMovies(filteredSavedMovies);
      })
      .catch((err) => {
        console.log(err)
        setMessage(err)
      })
      .finally(() => setIsPreloaderVisible(false))
  };
  function handleGetMovies() {
    if (movies.length !== 0) {
      const movieInputValue = localStorage.getItem('lastSearchMovies');
      const isMovieCheckboxChecked = JSON.parse(localStorage.getItem('lastCheckboxStateMovies'));

      const filteredMovies = getFilteredMovies(movies, movieInputValue, isMovieCheckboxChecked);

      setFilteredMovies(filteredMovies);
    } else {
      getSavedMovies()
      getAllMovies()
    }
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
  function handleRegister(values) {
    setIsPreloaderVisible(true);

    MainApi.register(values)
      .then((user) => {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', true);
        setMessage(`Успешная регистрация, ${user.name}`);
        setUser(user);
      })
      .then(() => navigate('/movies'))
      .catch((err) => {
        setMessage('При регистрации произошла ошибка');
        console.log(err);
      })
      .finally(() => setIsPreloaderVisible(false))
  };
  function handleAuthorize(values) {
    setIsPreloaderVisible(true);

    MainApi.authorize(values)
      .then((user) => {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', true);
        setUser(user);
      })
      .then(() => {
        navigate('/movies');
      })
      .catch((err) => {
        setMessage('При авторизации произошла ошибка');
        console.log(err)
      })
    .finally(() => setIsPreloaderVisible(false))
  };

  function handleLikeMovie(movie) {
    MainApi.likeMovie(movie)
      .then((likedMovie) => {
        setSavedMovies(savedMovies.concat([likedMovie]));
        setFilteredSavedMovies(filteredSavedMovies.concat([likedMovie]));
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies.concat([likedMovie])));
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function handleDeleteLike(movieId) {
    MainApi.deleteMovie(movieId)
      .then((deletedMovie) => {
        setSavedMovies(savedMovies.filter(item => item._id !== deletedMovie._id));
        setFilteredSavedMovies(filteredSavedMovies.filter(item => item._id !== deletedMovie._id));
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies.filter(item => item._id !== deletedMovie._id)));
      })
      .catch((err) => {
        console.log(err)
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
  };

  // useEffect(() => {
  //   setFilteredSavedMovies(savedMovies);
  // }, []);
  useEffect(() => {
    MainApi.checkToken()
      .then((user) => {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', true);
        setUser(user);
      })
      .then(() => {
      })
      .catch((err) => {
        console.log(err)
      })
  }, [loggedIn]);
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
            <Route path='/' element={<Main />} />

            <Route
              path='/profile'
              element={
                <ProtectedRouteElement
                  element={Profile}
                  message={message}
                  loggedIn={loggedIn}
                  onSignout={onSignout}
                  messageSetter={messageSetter}
                  isPreloaderVisible={isPreloaderVisible}
                  handleUpdateProfile={handleUpdateProfile}
                />
              }
            />

            <Route
              path='/saved-movies'
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  message={message}
                  loggedIn={loggedIn}
                  location={location}
                  messageSetter={messageSetter}
                  getSavedMovies={getSavedMovies}
                  handleLikeMovie={handleLikeMovie}
                  savedMovies={filteredSavedMovies}
                  handleDeleteLike={handleDeleteLike}
                  isPreloaderVisible={isPreloaderVisible}
                  filterSavedMoviesByCheckbox={filterSavedMoviesByCheckbox}
                />
              }
            />

            <Route
              path='/movies'
              element={
                <ProtectedRouteElement
                  element={Movies}
                  message={message}
                  location={location}
                  loggedIn={loggedIn}
                  movies={filteredMovies}
                  savedMovies={savedMovies}
                  messageSetter={messageSetter}
                  handleLikeMovie={handleLikeMovie}
                  handleGetMovies={handleGetMovies}
                  handleDeleteLike={handleDeleteLike}
                  isPreloaderVisible={isPreloaderVisible}
                  filterMoviesByCheckbox={filterMoviesByCheckbox}
                  howManyMoviesToShowFirst={howManyMoviesToShowFirst}
                />
              }
            />

            <Route path='/sign-in'
              element={<ProtectedRouteForAuthForm
                element={Login}
                message={message}
                loggedIn={loggedIn}
                location={location}
                onSubmit={handleAuthorize}
                messageSetter={messageSetter}
                isPreloaderVisible={isPreloaderVisible}
              />}
            />

            <Route path='/sign-up'
              element={<ProtectedRouteForAuthForm
                element={Register}
                message={message}
                loggedIn={loggedIn}
                location={location}
                onSubmit={handleRegister}
                messageSetter={messageSetter}
                isPreloaderVisible={isPreloaderVisible}
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
