import { useState, useEffect } from 'react';
import useFormWithValidation from '../../hooks/useValidationForm';

import Preloader from '../Preloader/Preloader';

function Profile({
  user,
  message,
  onSignout,
  isPreloaderVisible,
  handleUpdateProfile,
}) {
  const { name, email } = user;
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const { values, handleChange, errors, isValid } = useFormWithValidation(email, name);
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(true);

  function isValidEmail(email) {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  }

  function onUpdateUser(e) {
    e.preventDefault();
    
    handleUpdateProfile(values.name || name, values.email || email)
    
    setIsEditButtonClicked(false);
  }
 
  function showEditChildren() {
    return <>
      <label className="profile__label">
        Имя
        <input
          type='text'
          name='name'
          minLength='2'
          maxLength='30'
          value={values.name}
          onChange={handleChange}
          className={`profile__input ${errors.name ? 'profile__input_type_error' : ''}`}
        />
      </label>
      <label className="profile__label">
        E-mail
        <input
          type='email'
          name='email'
          minLength='5'
          maxLength='80'
          value={values.email}
          onChange={handleChange}
          className={`profile__input ${errors.email ? 'profile__input_type_error' : '' }`}
        />
      </label>
      {isSubmitButtonActive ?
        <button
          type='submit'
          className='profile__button profile__button_type_edit'
        >
          Сохранить
        </button>
        :
        <button
          disabled
          className='profile__button profile__button_type_edit profile__button_type_disabled'
        >
          Сохранить
        </button>
      }
    </>
  }
  function showDefaultChildren() {
    return <>
      <label className="profile__label">
        Имя
        <input
          type='text'
          name='name'
          value={name}
          minLength='2'
          maxLength='30'
          readOnly='readonly'
          className="profile__input"
        />
      </label>
      <label className="profile__label">
        E-mail
        <input
          type='email'
          name='email'
          minLength='5'
          maxLength='80'
          value={email}
          readOnly='readonly'
          className="profile__input"
        />
      </label>
      <span className='profile__error'>{message}</span>
      <button
        className="profile__button"
        onClick={() => setIsEditButtonClicked(true)}
      >
        Редактировать
      </button>
      <button
        type='button'
        onClick={onSignout}
        className="profile__button profile__button_type_sign-out"
      >
        Выйти из аккаунта
      </button>
    </>
  }



  useEffect(() => {
    const isValidEmailInput = isValidEmail(values.email)
    setIsSubmitButtonActive(isValid && (values.name.length !== 0 || values.email.length !== 0) && (values.name !== name || values.email !== email));
    
    console.log('isSubmitButtonActive', isSubmitButtonActive)
    console.log({
      'values': values,
      'isValid': isValid,
      'isValidEmailInput': isValidEmailInput,
      'values.name': values.name !== "",
      'values.email': values.email !== "",
      'values.name1': values.name !== name,
      'values.email1': values.email !== email,
    });
  }, [values, isValid, name, email, isSubmitButtonActive])

  return (
    <section className="profile">
      <Preloader isPreloaderVisible={isPreloaderVisible} />
      {!isPreloaderVisible &&
        <div className="profile__container">
          <h1 className="profile__title">
            {`Привет, ${name}!`}
          </h1>
          <form
            noValidate
            onSubmit={onUpdateUser}
            className="profile__form"
          >
            {isEditButtonClicked ? showEditChildren() : showDefaultChildren()}
          </form>
        </div>
      }
    </section>
  );
}

export default Profile;