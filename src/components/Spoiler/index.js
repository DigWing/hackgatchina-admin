import React from 'react';
import PropTypes from 'prop-types';
import { compose, withState } from 'recompose';
import arrowDownIcon from 'assets/img/arrowDownIcon.png';

import './style.scss';

const Spoiler = ({
  title,
  openSpoiler,
  setOpenSpoiler,
  children,
}) => (
  <div className={`spoiler${openSpoiler ? ' spoiler_open' : ''}`}>
    <button
      className="spoiler__button"
      onClick={() => setOpenSpoiler(!openSpoiler)}
      type="button"
    >
      {title}
      <img
        className="spoiler__button__right-icon"
        src={arrowDownIcon}
        alt="question"
      />
    </button>
    <div className="spoiler__content">
      {children}
    </div>
  </div>
);

Spoiler.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  openSpoiler: PropTypes.bool.isRequired,
  setOpenSpoiler: PropTypes.func.isRequired,
};

Spoiler.defaultProps = {
  type: '',
};

export default compose(
  withState('openSpoiler', 'setOpenSpoiler', ({ initialOpen }) => initialOpen),
)(Spoiler);
