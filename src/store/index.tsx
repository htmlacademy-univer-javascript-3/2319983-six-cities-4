import { configureStore } from '@reduxjs/toolkit';
import {PayloadAction} from '@reduxjs/toolkit';

import { reducer } from './reducer';
import { createAPI } from '../server/api';
import {Middleware} from 'redux';
import {createBrowserHistory} from 'history';


export const api = createAPI();

export const history = createBrowserHistory();
const redirect: Middleware<unknown, ReturnType<typeof reducer>> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'redirect') {
          history.push(action.payload);
        }

        return next(action);
      };

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect)
});
export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

