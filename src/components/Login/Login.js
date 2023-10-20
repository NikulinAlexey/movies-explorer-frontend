import AuthForm from '../AuthForm/AuthForm';

function Login({
  message,
  onSubmit,
  messageSetter,
  isPreloaderVisible,
}) {
  return (
    <AuthForm
      message={message}
      submitText='Войти'
      linkPath='/sign-in'
      onSubmit={onSubmit}
      title='Рады видеть!'
      linkText='Регистрация'
      messageSetter={messageSetter}
      paragraphText='Ещё не зарегистрированы?'
      isPreloaderVisible={isPreloaderVisible}
    />
  );
}

export default Login;