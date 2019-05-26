import Immutable from 'immutable';
import { feedbacks } from 'schemas';
import { getBasicValue, getDenormalizedValue } from './baseSelectors';

export const getFeedbackResults = (state, resultKey = 'feedbacks') =>
  getDenormalizedValue({ schema: feedbacks.schemasArray })(state, resultKey);

export const getBoolean = ({ state, key, defaultValue = false }) =>
  getBasicValue({ state, key, defaultValue });

export const getMap = ({ state, key, defaultValue = Immutable.Map() }) =>
  getBasicValue({ state, key, defaultValue });

export const getList = ({ state, key, defaultValue = Immutable.List() }) =>
  getBasicValue({ state, key, defaultValue });
