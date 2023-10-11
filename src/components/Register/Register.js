import AuthForm from '../AuthForm/AuthForm';

function Register({
  message,
  onSubmit,
  messageSetter,
  isPreloaderVisible,
}) {
  return (
    <AuthForm
      linkText='Войти'
      message={message}
      linkPath='/sign-up'
      onSubmit={onSubmit}
      title='Добро пожаловать!'
      messageSetter={messageSetter}
      submitText='Зарегистрироваться'
      paragraphText='Уже зарегистрированы?'
      isPreloaderVisible={isPreloaderVisible}
    />
  );
}

export default Register;