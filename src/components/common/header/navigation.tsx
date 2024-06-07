import { Link } from 'react-router-dom';
import { useAppSelector,useAppDispatch } from '../../../hooks/redux';
import { AppRoute } from '../../../const';
import { AuthorizationStatus } from '../../../const';
import { logout } from '../../../store/api-action';

function Navigation(): JSX.Element {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state)=>state.userInfo);
  const authorizationStatus = useAppSelector((state) => state.authStat);
  const favoriteCount = useAppSelector((state) => state.favorites).length;
  const isLogin = authorizationStatus === AuthorizationStatus.Auth;

  const handleLogout = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault();
    dispatch(logout());

  };


  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={isLogin ? AppRoute.Favorite : AppRoute.Login}>
            <div className="header__avatar-wrapper user__avatar-wrapper" style={{...userInfo?.avatarUrl && isLogin ? { backgroundImage: `url(${userInfo?.avatarUrl})`} : {}, borderRadius: '50%'}}></div>
            {isLogin &&
                    <>
                      <span className="header__user-name user__name">{userInfo?.email}</span>
                      <span className="header__favorite-count">{favoriteCount}</span>
                    </>}
          </Link>
        </li>
        <li className="header__nav-item">
          {isLogin ?
            <Link
              className="header__nav-link"
              onClick={handleLogout}
              to={AppRoute.Main}
            >
              <span className="header__signout">Sign out</span>
            </Link>
            :
            <Link className="header__nav-link" to={AppRoute.Login}>
              <span className="header__login">Sign in</span>
            </Link>}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
