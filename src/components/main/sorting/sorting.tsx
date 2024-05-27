import { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { useDispatch } from 'react-redux';
import { NameSort } from '../../../const';
import { changeSort } from '../../../store/action';
import cn from 'classnames';

function Sorting():JSX.Element {

  const [open, setOpen] = useState(false);
  const toggleSortingOptions = () => setOpen((state) => !state);
  const selectSort = useAppSelector((store) => store.selectSort);
  const dispatch = useDispatch();


  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleSortingOptions}>
        {selectSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn('places__options','places__options--custom',{ 'places__options--opened': open })}>
        {Object.values(NameSort).map((sort) => (
          <li
            key={sort}
            tabIndex={0}
            className={cn(
              'places__option',
              {['places__option--active']: sort === selectSort}
            )}
            onClick={() => {
              dispatch(changeSort(sort));
              setOpen(false);
            }}
          >
            {sort}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
