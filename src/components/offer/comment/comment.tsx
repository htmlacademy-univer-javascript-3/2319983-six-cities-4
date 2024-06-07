import { useState,Fragment } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { postReviewAction } from '../../../store/api-action';
import { Rating } from '../../../const';


type CommentProps = {
  offerId: string;
}

function Comment({offerId}: CommentProps): JSX.Element {

  const dispatch = useAppDispatch();


  const [invalid, setInvalid] = useState(true);

  const validate = (commentLength: number, newRating: number) => {
    const isInvalid = !(
      commentLength >= 50 &&
      commentLength <= 300 &&
      newRating !== 0
    );
    setInvalid(isInvalid);
  };

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const handleChangeStar = (evt: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    const newRating = Rating[evt.currentTarget.title];
    setRating(newRating);
    validate(comment.length, newRating);
  };

  const resetForm = (evt: React.FormEvent<HTMLFormElement>) => {
    setComment('');
    setRating(0);
    setInvalid(true);
    evt.currentTarget.reset();
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postReviewAction({comment, rating, offerId}));
    resetForm(evt);
  };

  const handleComment = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value: text } = evt.target;
    setComment(text);
    validate(text.length, rating);
  };

  const ratingFormMarkup = (
    Object.entries(Rating).map(([title, ratingStar]) => (
      <Fragment key={title}>
        <input className="form__rating-input visually-hidden" name="rating" defaultValue={ratingStar} id={`${ratingStar}-stars`} type="radio" required/>
        <label htmlFor={`${ratingStar}-stars`} className="reviews__rating-label form__rating-label" title={title} onClick={handleChangeStar}>
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </Fragment>
    ))
      .reverse()
  );


  return(
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingFormMarkup}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} required onChange={handleComment}/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
                    To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={invalid}>Submit</button>
      </div>
    </form>

  );
}

export default Comment;
