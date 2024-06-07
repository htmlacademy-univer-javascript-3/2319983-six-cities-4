import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../common/private-route/private-route';
import { useAppSelector } from '../../hooks/redux';
import Spinner from '../common/spinner/spinner';
import HistoryRouter from './history-router';
import { history } from '../../store';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const.ts';

type RedirectRouteProps = {
  children: JSX.Element;
  authStatus: AuthorizationStatus;
}

function App(): JSX.Element {

  const places = useAppSelector((state) => state.places);
  const isLoad = useAppSelector((state) => state.isLoad);
  const AuthStatus = useAppSelector((state) => state.authStat);

  const RedirectRoute = ({ children, authStatus }: RedirectRouteProps): JSX.Element => authStatus === AuthorizationStatus.Auth ? <Navigate to={AppRoute.Main}/> : children;

  if (isLoad) {
    return (
      <Spinner />
    );
  }

  const favoriteplaces = places.filter((place) => place.isFavorite);
  return(
    <HistoryRouter history={history}>
      <Routes>
        <Route
          index
          path = {AppRoute.Main}
          element = {<Main />}
        />
        <Route
          path= {AppRoute.Login}
          element = {
            <RedirectRoute authStatus={AuthStatus}>
              <Login/>
            </RedirectRoute>
          }
        />
        <Route
          path= {AppRoute.Favorite}
          element = {
            <PrivateRoute
              authorizationStatus={AuthStatus}
            >
              <Favorites places = {favoriteplaces}/>
            </PrivateRoute>
          }
        />
        <Route
          path= {AppRoute.Offer}
          element = {<Offer/>}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </HistoryRouter>


  );
}


export default App;


