import AuthForm from '../AuthForm/AuthForm';

function Login() {
  return (
    <section>
      <AuthForm
        submitText='Войти'
        linkPath='/sign-up'
        title='Рады видеть!'
        linkText='Регистрация'
        errorText='Ошибка авторизации'
        paragraphText='Ещё не зарегистрированы?'
      />
    </section>
  );
}

export default Login;