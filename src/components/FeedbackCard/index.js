import React from 'react';
import PropTypes from 'prop-types';
import { getImageByTag } from 'helpers';

import './style.scss';

const FeedbackCard = ({
  tags,
  title,
  image,
  date,
  geo,
  comment,
}) => (
  <div className="feedback-card">
    <div className="feedback-card__text">
      <div className="feedback-card__top">
        <div className="feedback-card__tags">
          {tags.map(tag => <img className="feedback-card__tag" src={getImageByTag(tag)} alt={tag} /> )}
        </div>
        <span className="feedback-card__date">
          {date}
        </span>
      </div>
      <span className="feedback-card__address">{geo}</span>
      {
        comment
          ? <span className="feedback-card__comment">{`— "${comment}"`}</span>
          : <span className="feedback-card__no-comment">Без комментария</span>
      }
    </div>
    <img className="feedback-card__img" src={image} alt={title} />
  </div>
);

FeedbackCard.propTypes = {
  tags: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  geo: PropTypes.string.isRequired,
  comment: PropTypes.string,
};

FeedbackCard.defaultProps = {
  comment: '',
};

export default FeedbackCard;
