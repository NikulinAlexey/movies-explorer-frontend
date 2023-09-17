import { useEffect, useState } from 'react';

function Footer({
  loggedIn,
  location,
  allowedRoutes,
}) {
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  useEffect(() => {
    setIsFooterVisible(allowedRoutes.some(route => location.pathname === route)
    )
  }, [location.pathname, allowedRoutes]);

  return (
    isFooterVisible &&
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__info">
          <p className="footer__copyright">
            © 2020
          </p>
          <ul className="footer__list">
            <li className="footer__list-item">
                <a
                  target="blank"
                  className="footer__link"
                  href="https://practicum.yandex.ru/"
                >
                  Яндекс.Практикум
                </a>
            </li>
              <li className="footer__list-item">
                <a
                  target="blank"
                  className="footer__link"
                  href="https://github.com/NikulinAlexey"
                >
                  Github
                </a>
              
            </li>
          </ul>
        </div>
      </div>
      </footer>
  );
}

export default Footer;