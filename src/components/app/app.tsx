import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import { ListProps } from '../main/list-places/list-places';
import { AppRoute, AuthorizationStatus } from '../../const';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../common/private-route/private-route';
import { comments } from '../../mocks/comments';


function App({places}: ListProps): JSX.Element {
  const favoriteplaces = places.filter((place) => place.isFavorite);
  return(
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Main}
          element = {<Main places={places} type={'cities'}/>}
        />
        <Route
          path= {AppRoute.Login}
          element = {<Login/>}
        />
        <Route
          path= {AppRoute.Favorite}
          element = {
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <Favorites places = {favoriteplaces}/>
            </PrivateRoute>
          }
        />
        <Route
          path= {AppRoute.Offer}
          element = {<Offer review={comments}/>}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
