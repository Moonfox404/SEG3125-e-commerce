type RatingProps = {
  rating: number,
};


const Rating = ({ rating }: RatingProps) => {
  rating = Math.round(rating);

  return <div className="rating">
    {[1, 2, 3, 4, 5].map((value) => {
      return <div
        key={value}
        className={`mask mask-star bg-accent`}
        aria-label={`${value} star`}
        aria-current={rating === value}>
      </div>
    })}
  </div>
};

export default Rating;
