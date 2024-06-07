import Header from '../../components/common/header/header';
import Footer from '../../components/favorite/footer/footer';
import FavoriteList from '../../components/favorite/favorite-list/favorite-list';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import Spinner from '../../components/common/spinner/spinner';
import { fetchFavoritesAction } from '../../store/api-action';
import EmptyFavorite from '../../components/favorite/emptyFavorite/empty';
import cn from 'classnames';


function Favorites():JSX.Element {
  const dispatch = useAppDispatch();

  const isFavoritesLoading = useAppSelector((store) => store.isFavoriteLoad);
  const favorites = useAppSelector((store) => store.favorites);
  const isEmptyFavorites = favorites.length === 0;

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (isFavoritesLoading) {
    return <Spinner />;
  }
  return (
    <div className={cn('page', { 'page--favorites-empty': isEmptyFavorites })}>
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length === 0 ? <EmptyFavorite /> : <FavoriteList places={favorites} />}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Favorites;
