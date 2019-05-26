import { normalize } from 'normalizr';
import { endpoints } from 'consts';
import { requestAsync } from '@digitalwing.co/redux-query-immutable';
import Immutable from 'immutable';
import { feedbacks } from 'schemas';

export default () => requestAsync({
  url: endpoints.getFeedbacksUrl(),
  transform: response => normalize(response, feedbacks.schemasArray).entities,
  transformResult: response => ({
    feedbacks: normalize(response, feedbacks.schemasArray).result,
  }),
  queryKey: endpoints.getFeedbacksUrl(),
  // meta: {
  //   authToken: true
  // },
  options: {
    headers: {
      Accept: 'application/json',
    },
  },
  update: {
    feedbacks: (prevEntities = Immutable.Map(), newEntities) => prevEntities.mergeDeep(newEntities),
  },
  updateResult: {
    feedbacks: (prevResult = Immutable.List(), result) => result
  },
});
