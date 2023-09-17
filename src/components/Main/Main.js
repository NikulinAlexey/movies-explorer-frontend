import Techs from "./Techs/Techs";
import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from './Portfolio/Portfolio'
import AboutProject from "./AboutProject/AboutProject";

function Main() {
  return (
    <main className="content">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;