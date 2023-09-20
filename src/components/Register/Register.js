import AuthForm from '../AuthForm/AuthForm';

function Register() {
  return (
    <section>
      <AuthForm
        linkText='Войти'
        linkPath='/sign-in'
        title='Добро пожаловать!'
        errorText='Ошибка регистрации'
        submitText='Зарегистрироваться'
        paragraphText='Уже зарегистрированы?'
      />
    </section>
  );
}

export default Register;