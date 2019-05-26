import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { compose, withHandlers } from 'recompose';

const SwitchButtonField = ({
  styleWrapper,
  styleInput,
  input,
  handleChange,
  isDisabled,
  value,
  textLeft,
  textRight,
  valueLeft,
  valueRight,
}) => (
  <div
    style={styleWrapper}
    className={`switch-button-field ${isDisabled ? 'switch-button-field_disabled' : ''}`}
  >
    <div
      className={
        `switch-button-field__input ${value === valueLeft ? 'switch-button-field__input_active' : ''}
        ${isDisabled ? 'switch-button-field__input_disabled' : ''}`
      }
    >
      <span>
        {textLeft}
      </span>
      <input
        name="type"
        {...input}
        value={valueLeft}
        defaultChecked={value === valueLeft}
        onChange={handleChange}
        style={styleInput}
        type="radio"
        disabled={isDisabled}
      />
    </div>
    <div className={`switch-button-field__input ${value === valueRight ? 'switch-button-field__input_active' : ''}`}>
      <span>
        {textRight}
      </span>
      <input
        name="type"
        {...input}
        value={valueRight}
        defaultChecked={value === valueRight}
        onChange={handleChange}
        style={styleInput}
        type="radio"
        disabled={isDisabled}
      />
    </div>
  </div>
);

SwitchButtonField.propTypes = {
  input: PropTypes.object.isRequired,
  styleWrapper: PropTypes.any,
  styleInput: PropTypes.any,
  handleChange: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  textLeft: PropTypes.string.isRequired,
  textRight: PropTypes.string.isRequired,
  valueLeft: PropTypes.string,
  valueRight: PropTypes.string,
};

SwitchButtonField.defaultProps = {
  styleWrapper: null,
  styleInput: null,
  isDisabled: false,
  valueLeft: 'sell',
  valueRight: 'buy',
};

export default compose(
  withHandlers({
    handleChange: ({ input: { onChange, value } }) => ({ target }) => {
      onChange(target.validity.valid ? target.value : value);
    },
  }),
)(SwitchButtonField);
