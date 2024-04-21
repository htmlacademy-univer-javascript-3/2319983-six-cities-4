import Header from '../../components/common/header/header';
import { OffersProps } from '../../types/list-offers';
import Footer from '../../components/favorite/footer/footer';
import FavoriteList from '../../components/favorite/favorite-list/favorite-list';

type FavoriteProps = {
  places: OffersProps;
}

function Favorites({places}: FavoriteProps):JSX.Element {
  return (
    <div className="page">
      <Header isActive = {false}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteList places={places}/>

          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Favorites;
