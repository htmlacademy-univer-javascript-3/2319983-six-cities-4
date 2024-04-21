import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

export type LogoProp = {
    isActive: boolean;
}

function Logo(isActive:LogoProp):JSX.Element {
  const className = `header__logo-link ${isActive ? 'header__logo-link--active' : ''}`;
  return (
    <div className="header__left">
      <Link className = {className} to = {AppRoute.Main}>
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
      </Link>

    </div>

  );
}

export default Logo;
