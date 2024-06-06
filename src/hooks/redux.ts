import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { State } from '../store';
import { Dispatch } from '../store';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch = () => useDispatch<Dispatch>();

