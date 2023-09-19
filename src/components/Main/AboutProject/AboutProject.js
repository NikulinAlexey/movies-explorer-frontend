function AboutProject() {
  return (
    <section className="about-project" id='about-project'>
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__info">
          <div className="about-project__info-item">
            <h3 className="about-project__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__paragraph">
              Составление плана, работу над бэкендом,
              вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__info-item">
            <h3 className="about-project__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__paragraph">
              У каждого этапа был мягкий и жёсткий дедлайн,
              которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <span className="about-project__timetable">
          <span className="about-project__timetable-item">
            <span className="about-project__time about-project__time_type_green">1 неделя</span>
            <span className="about-project__tech">Back-end</span>
          </span>
          <span className="about-project__timetable-item">
            <span className="about-project__time">4 недели</span>
            <span className="about-project__tech">Front-end</span>
          </span>
        </span>
      </div>
    </section>
  );
}

export default AboutProject;