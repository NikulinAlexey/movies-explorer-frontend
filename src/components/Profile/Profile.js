import { useState } from 'react';
import useFormWithValidation from '../../hooks/useValidationForm';

function Profile({
  onSignout,
  name = 'Алексей',
  email = 'nikulin.aleksey.aleksandrovich@gmail.com',
}) {
  const { values, handleChange } = useFormWithValidation();
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);

  function handleEdit(e) {
    e.preventDefault();

    setIsEditButtonClicked(!isEditButtonClicked);
  }
  
  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">
          {`Привет, ${name}!`}
        </h1>
        <form className="profile__form" onSubmit={handleEdit}>
          <label className="profile__label">
            Имя
            {isEditButtonClicked ? 
              <input
                type='text'
                name='name'
                value={values.name || name}
                className="profile__input"
                onChange={handleChange}
              />
              :
              <input
                readOnly='readonly'
                type='text'
                name='name'
                value={values.name || name}
                className="profile__input"
                onChange={handleChange}
              />
            }
            
          </label>
          <label className="profile__label">
            E-mail
            {isEditButtonClicked ?
              <input
                type='email'
                name='email'
                value={values.email || email}
                className="profile__input"
                onChange={handleChange}
              />
              :
              <input
                readOnly='readonly'
                type='email'
                name='email'
                value={values.email || email}
                className="profile__input"
                onChange={handleChange}
              />
            }
          </label>

          <button className="profile__button" type='submit' >
            {isEditButtonClicked ? 'Сохранить' : 'Редактировать'}
          </button>
          <button type='button' className="profile__button profile__button_type_sign-out" onClick={onSignout}>Выйти из аккаунта</button>
        </form>
      </div>
    </section>
  );
}

export default Profile;