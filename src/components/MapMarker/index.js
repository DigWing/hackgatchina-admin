import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const MapMarker = ({ onClick }) => (
  <div
    onClick={onClick}
    className="map-marker"
  />
);

export default MapMarker;
