import Logo from '../logo/logo';
import Navigation from './navigation';


type HeaderProps = {
  isActive?: boolean;
  nav?:boolean;
}
function Header({isActive = true, nav = true}:HeaderProps):JSX.Element {
  return(
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo isActive = {isActive}/>
          </div>
          {nav && <Navigation />}
        </div>
      </div>
    </header>
  );
}

export default Header;
