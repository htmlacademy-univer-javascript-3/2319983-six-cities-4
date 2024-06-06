import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import Header from '../../components/common/header/header.tsx';
import { useAppDispatch } from '../../hooks/redux.ts';
import { loginAction } from '../../store/api-action.ts';

function Login(): JSX.Element {
  const logRef = useRef<HTMLInputElement | null>(null);
  const pasRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const login = logRef.current;
    const password = pasRef.current;

    if (login !== null && password !== null) {
      dispatch(loginAction({
        login: login.value.trim(),
        password: password.value.trim()
      }));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header isActive = {false} nav = {false}/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required ref={logRef}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required ref={pasRef}/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
