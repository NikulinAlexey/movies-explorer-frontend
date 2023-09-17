function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__list-item">
            <a
              target="blank"
              className="portfolio__link"
              href="https://nikulinalexey.github.io/how-to-learn/"
            >
              <p className="portfolio__link-text">Статичный сайт</p>
              <div className="portfolio__link-icon"></div>
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              target="blank"
              className="portfolio__link"
              href="https://nikulinalexey.github.io/russian-travel/index.html"
            >
              <p className="portfolio__link-text">Адаптивный сайт</p>
              <div className="portfolio__link-icon"></div>
            </a>
          </li>
          <li className="portfolio__list-item">
            <a
              target="blank"
              className="portfolio__link"
              href="https://alekseynikulin-front15.nomoreparties.co/sign-in"
            >
              <p className="portfolio__link-text">Одностраничное приложение</p>
              <div className="portfolio__link-icon"></div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;