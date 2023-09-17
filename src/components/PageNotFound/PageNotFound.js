import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';

function PageNotFound() {
  return (
    <section className="page-not-found">
      <h2 className="page-not-found__title">404</h2>
      <p className='page-not-found__paragraph'>Страница не найдена</p>

      <Link
        to={-1}
        className='page-not-found__button'
      >
        Назад
      </Link>
    </section>
  )
};

export default PageNotFound;