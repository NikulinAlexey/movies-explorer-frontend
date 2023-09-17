import AuthForm from '../AuthForm/AuthForm';

function Login() {
  return (
    <AuthForm
      submitText='Войти'
      linkPath='/sign-up'
      title='Рады видеть!'
      linkText='Регистрация'
      errorText='Ошибка авторизации'
      paragraphText='Ещё не зарегистрированы?'
    />
  );
}

export default Login;