import { Link, useLocation } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useValidationForm';

function AuthForm({
  title,
  linkPath,
  linkText,
  errorText,
  submitText,
  paragraphText,
}) {
  const location = useLocation();
  const { values, handleChange, errors, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    
    //Здесь будет функция API запроса

    resetForm();
  }
  return (
    <section className="auth-form">
      <div className='auth-form__container'>
        <Link className="auth-form__logo" to='/' />
        <h2 className="auth-form__title">{title}</h2>

        <form className='auth-form__form' onSubmit={handleSubmit}>

          {location.pathname === '/sign-up' &&
            <label className='auth-form__label'>
              Имя
              <input
                id='name'
                name='name'
                type='name'
                minLength='3'
                value={values.name}
                onChange={handleChange}
                className={`auth-form__input ${errors.name ? 'auth-form__input_type_error' : ''}`}
              />
            </label>
          }
          <label className='auth-form__label'>
            E-mail
            <input
              id='email'
              name='email'
              type='email'
              maxLength='50'
              value={values.email}
              onChange={handleChange}
              className={`auth-form__input ${errors.email ? 'auth-form__input_type_error' : ''}`}
            />
          </label>
          <label className='auth-form__label'>
            Пароль
            <input
              minLength='5'
              id='password'
              name='password'
              type='password'
              onChange={handleChange}
              value={values.password}
              className={`auth-form__input ${errors.password ? 'auth-form__input_type_error' : ''}`}
            />
          </label>

          <span id="name-input-error" className="auth-form__error">
            {errorText}
          </span>
          <button className='auth-form__submit'>
            {submitText}
          </button>
        </form>

        <p className='auth-form__paragraph'>
          {paragraphText}
          <Link to={linkPath} className="auth-form__link">{linkText}</Link>
        </p>
      </div>
    </section>
  )
};

export default AuthForm;