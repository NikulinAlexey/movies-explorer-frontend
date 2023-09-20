import avatar from '../../../images/avatar.png';

function AboutMe() {
  return (
    <section className="about-me" id='student'>
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__profile">
          <div className="about-me__info">
            <h3 className="about-me__subtitle">Алексей</h3>
            <p className="about-me__job">Фронтенд-разработчик, 26 лет</p>
            <p className="about-me__paragraph">
              Я родился в городе Новый Уренгой. Закончил мужской татарско-турецкий лицей в
              городе Казань. Получил высшее образование по специальности конструктор
              радиоэлектроники в Санкт-петербурге.
              Работал портным около 5 лет перед тем, как начал учиться в ЯПрактикуме.
            </p>
            <a
              href="https://github.com/NikulinAlexey"
              target='blank'
              className="about-me__link"
            >
              Github
            </a>
          </div>
          <img className="about-me__avatar" alt={avatar} src={avatar} />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;