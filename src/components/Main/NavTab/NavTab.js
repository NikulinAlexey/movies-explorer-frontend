import { HashLink as Link } from 'react-router-hash-link';

function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__link-list">
        
        <li className="nav-tab__list-item">
          <Link
            to='/#about-project'
            className='nav-tab__link'
          >
            О проекте
          </Link>
        </li>

        <li className="nav-tab__list-item">
          <Link
            to='/#techs'
            className='nav-tab__link'
          >
            Технологии
          </Link>
        </li>

        <li className="nav-tab__list-item">
          <Link
            to='/#student'
            className='nav-tab__link'
          >
            Студент
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default NavTab;