import { Comments } from '../../../types/comment';
import ReviewItem from '../review-item/review-item';

type ReviewListProps = {
    list: Comments;
    children?:React.ReactNode;
}

function ReviewList({list, children}: ReviewListProps) {
  return (

    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{list.length}</span></h2>
      <ul className="reviews__list">
        {
          list.map((review) =>(
            <ReviewItem review = {review} key = {review.id}/>
          ))
        }

      </ul>
      {children}
    </section>

  );
}

export default ReviewList;
