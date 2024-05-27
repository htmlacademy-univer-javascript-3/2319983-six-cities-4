import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { State } from '../store';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
