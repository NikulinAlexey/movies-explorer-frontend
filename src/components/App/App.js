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
  const [filteredMoviesData, setFilteredMoviesData] = useState([]);
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
        setMovies(filteredMovies);
      } else {
        const filteredMovies = getFilteredMovies(allMovies, textInputValue, isChecked);
        setMovies(filteredMovies);
      }
    }
  }
  function filterSavedMoviesByCheckbox(movies, textInputValue, isChecked) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (movies !== null && savedMovies !== null) {
      if (isChecked) {
        const filteredMovies = getFilteredMovies(movies, textInputValue, isChecked);
        setSavedMovies(filteredMovies);
      } else {
        const filteredMovies = getFilteredMovies(savedMovies, textInputValue, isChecked);
        setSavedMovies(filteredMovies);
      }
    }
  }

  function getSavedMovies() {
    MainApi.getSavedMovies()
      .then((savedMovies) => {
        const reversedSavedMovies = savedMovies.reverse();
        const savedMovieInputValue = localStorage.getItem('lastSearchSavedMovies');
        const isSavedMovieCheckboxChecked = JSON.parse(localStorage.getItem('lastCheckboxStateSavedMovies'));
        
        localStorage.setItem('savedMovies', JSON.stringify(reversedSavedMovies));

        const filteredSavedMovies = getFilteredMovies(reversedSavedMovies, savedMovieInputValue, isSavedMovieCheckboxChecked)
        
        setSavedMovies(filteredSavedMovies);
      })
      .catch((err) => {
        console.log(err)
        setMessage(err)
      })
  };
  function getAllMovies() {
    setIsPreloaderVisible(true);

    MoviesApi.getFilms()
      .then((moviesData) => {
        localStorage.setItem('movies', JSON.stringify(moviesData));
        const movieInputValue = localStorage.getItem('lastSearchMovies');
        const isMovieCheckboxChecked = JSON.parse(localStorage.getItem('lastCheckboxStateMovies'));

        const filteredMovies = getFilteredMovies(moviesData, movieInputValue, isMovieCheckboxChecked);
        setFilteredMoviesData(filteredMovies);
        setMovies(filteredMovies);
      })
      .catch((err) => setMessage(err))
      .finally(() => setIsPreloaderVisible(false))
  };
  function handleGetMovies() {
    if (savedMovies) {
      getAllMovies()
    } else {
      getSavedMovies()
        .then(() => {
          getAllMovies()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  };

  function handleRegister(values) {
    MainApi.register(values)
      .then((user) => {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', true);
        setMessage(`Успешная регистрация, ${user.name}`);
        setUser(user);
      })
      .then(() => navigate('/movies'))
      .catch((err) => {
        setMessage(err)
        console.log(err)
      });
  };
  function handleAuthorize(values) {
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
  };
  function handleDeleteLike(movieId) {
    MainApi.deleteMovie(movieId)
      .then((deletedMovie) => {
        setSavedMovies(savedMovies.filter(item => item._id !== deletedMovie._id));

        return deletedMovie;
      })
      .then((deletedMovie) => {
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies.filter(item => item._id !== deletedMovie._id)));
      })
      .catch((err) => {
        console.log(err)
      })
  };

  function handleLikeMovie(movie) {
    MainApi.likeMovie(movie)
      .then((likedMovie) => {
        setSavedMovies(savedMovies.concat([likedMovie]));

        return likedMovie;
      })
      .then((likedMovie) => {
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies.concat([likedMovie])));
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
                  savedMovies={savedMovies}
                  messageSetter={messageSetter}
                  getSavedMovies={getSavedMovies}
                  handleLikeMovie={handleLikeMovie}
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
                  movies={movies}
                  message={message}
                  location={location}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  messageSetter={messageSetter}
                  handleGetMovies={handleGetMovies}
                  handleLikeMovie={handleLikeMovie}
                  handleDeleteLike={handleDeleteLike}
                  isPreloaderVisible={isPreloaderVisible}
                  filterMoviesByCheckbox={filterMoviesByCheckbox}
                  howManyMoviesToShowFirst={howManyMoviesToShowFirst}
                />
              }
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
