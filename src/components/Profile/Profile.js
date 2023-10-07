import { useState, useEffect, useContext } from 'react';

import Preloader from '../Preloader/Preloader';
import useFormWithValidation from '../../hooks/useValidationForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({
  message,
  onSignout,
  messageSetter,
  isPreloaderVisible,
  handleUpdateProfile,
}) {
  const user = useContext(CurrentUserContext);
  const { name, email } = user;
 
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [isSubmitButtonActive, setIsSubmitButtonActive] = useState(true);
  const { values, handleChange, errors, isValid } = useFormWithValidation(email , name);
  
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
          className={`profile__input ${errors.email ? 'profile__input_type_error' : ''}`}
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
      <span className='profile__message'>{message}</span>
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
    setIsSubmitButtonActive(isValid && (values.name !== '' || values.email!== '') && (values.name !== name || values.email !== email));
    
    // console.log({
    //   'values': values,
    //   'isValid': isValid,
    //   'values.name': values.name !== "",
    //   'values.email': values.email !== "",
    //   'values.name1': values.name !== name,
    //   'values.email1': values.email !== email,
    // });
  }, [values, isValid, name, email, isSubmitButtonActive])


  useEffect(() => {
    messageSetter('')
  }, []);
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