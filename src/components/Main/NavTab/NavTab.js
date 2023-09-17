import { Link } from 'react-router-dom';

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__link-list">
        <li className="nav-tab__list-item">
          О проекте
        </li>
        <li className="nav-tab__list-item">
          Технологии
        </li>
        <li className="nav-tab__list-item">
          Студент
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;