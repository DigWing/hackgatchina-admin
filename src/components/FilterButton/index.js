import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from 'assets/img/closeIcon.svg';

import './style.scss';

const FilterButton = ({
  onClick,
  icon,
  text,
  tag,
  isChosen,
}) => (
  <div
    className={`filter-button${isChosen ? ' filter-button__chosen' : ''}`}
    onClick={onClick}
  >
    <img src={icon} alt={tag} />
    <span>{text}</span>
    {isChosen && <img className="filter-button__close" src={closeIcon} alt="close" />}
  </div>
);

FilterButton.propTypes = {
  fullSize: PropTypes.bool,
  isPageLoader: PropTypes.bool,
  style: PropTypes.object,
  small: PropTypes.bool,
  white: PropTypes.bool,
};

FilterButton.defaultProps = {
  fullSize: false,
  isPageLoader: false,
  style: {},
  small: false,
  white: false,
};

export default FilterButton;
