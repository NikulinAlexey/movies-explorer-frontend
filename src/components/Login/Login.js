import AuthForm from '../AuthForm/AuthForm';

function Login({ onSubmit, message, messageSetter }) {

  return (
    <AuthForm
      message={message}
      submitText='Войти'
      linkPath='/sign-up'
      onSubmit={onSubmit}
      title='Рады видеть!'
      linkText='Регистрация'
      messageSetter={messageSetter}
      paragraphText='Ещё не зарегистрированы?'
    />
  );
}

export default Login;