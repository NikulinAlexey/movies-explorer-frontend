import AuthForm from '../AuthForm/AuthForm';

function Register({ onSubmit, message, messageSetter }) {
  return (
    <AuthForm
      message={message}
      linkText='Войти'
      linkPath='/sign-in'
      onSubmit={onSubmit}
      title='Добро пожаловать!'
      messageSetter={messageSetter}
      submitText='Зарегистрироваться'
      paragraphText='Уже зарегистрированы?'
    />
  );
}

export default Register;