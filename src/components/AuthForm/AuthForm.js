import { useEffect, useState } from 'react';

import Preloader from '../Preloader/Preloader';

import { Link, useLocation } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useValidationForm';

function AuthForm({
  title,
  message,
  linkPath,
  linkText,
  onSubmit,
  submitText,
  messageSetter,
  paragraphText,
  isPreloaderVisible,
}) {
  const location = useLocation();
  const [isActiveSubmit, setIsActiveSubmit] = useState(false);
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function showActiveSubmitButton() {
    return <button type='submit' className='auth-form__submit'>
      {submitText}
    </button>
  }
  function showDisabledSubmitButton() {
    return <button disabled type='submit' className='auth-form__submit auth-form__submit_type_disabled'>
      {submitText}
    </button>
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(values);
  }

  useEffect(() => {
    location.pathname === '/sign-in' ?
      setIsActiveSubmit(isValid && values.password && values.email)
      :
      setIsActiveSubmit(isValid && values.name && values.email && values.password)

  }, [values, location.pathname, isValid]);

  useEffect(() => {
    messageSetter('');
  }, [location.pathname]);
  return (
    <section className="auth-form">
      <Preloader isPreloaderVisible={isPreloaderVisible} />
      {!isPreloaderVisible &&
        <div className='auth-form__container'>
          <Link className="auth-form__logo" to='/' />
          <h1 className="auth-form__title">{title}</h1>

          <form className='auth-form__form' onSubmit={handleSubmit}>

            {location.pathname === '/sign-up' &&
              <>
                <label className='auth-form__label'>
                  Имя
                  <input
                    id='name'
                    name='name'
                    type='text'
                    minLength='3'
                    maxLength='20'
                    value={values.name || ''}
                    onChange={handleChange}
                    placeholder='Введите ваше имя'
                    className={`auth-form__input ${errors.name ? 'auth-form__input_type_error' : ''}`}
                  />
                </label>
                <span className='auth-form__error'>{errors.name}</span>
              </>
            }
            <>
              <label className='auth-form__label'>
                E-mail
                <input
                  id='email'
                  name='email'
                  type='email'
                  minLength='6'
                  maxLength='50'
                  value={values.email || ''}
                  onChange={handleChange}
                  placeholder='Введите ваш email'
                  className={`auth-form__input ${errors.email ? 'auth-form__input_type_error' : ''}`}
                />
              </label>
              <span className='auth-form__error'>{errors.email}</span>
            </>

            <>
              <label className='auth-form__label'>
                Пароль
                <input
                  minLength='5'
                  id='password'
                  name='password'
                  type='password'
                  onChange={handleChange}
                  value={values.password || ''}
                  placeholder='Введите ваш пароль'
                  className={`auth-form__input ${errors.password ? 'auth-form__input_type_error' : ''}`}
                />
              </label>
              <span className='auth-form__error'>{errors.password}</span>
            </>

            <span id="name-input-error" className="auth-form__error">
              {message}
            </span>
            {isActiveSubmit ?
              showActiveSubmitButton()
              :
              showDisabledSubmitButton()
            }
          </form>

          <p className='auth-form__paragraph'>
            {paragraphText}
            <Link to={linkPath} className="auth-form__link">{linkText}</Link>
          </p>
        </div>
      }
    </section>
  )
};

export default AuthForm;