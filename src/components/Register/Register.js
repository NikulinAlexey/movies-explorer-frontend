import AuthForm from '../AuthForm/AuthForm';

function Register() {
  return (
    <AuthForm
      linkText='Войти'
      linkPath='/sign-in'
      title='Добро пожаловать!'
      errorText='Ошибка регистрации'
      submitText='Зарегистрироваться'
      paragraphText='Уже зарегистрированы?'
    />
  );
}

export default Register;