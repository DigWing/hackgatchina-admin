import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { endpoints } from 'consts';
import { querySelectors } from '@digitalwing.co/redux-query-immutable';
import { connect } from 'react-redux';
import { getFeedbacks } from 'actions/feedbacks';

import { getFeedbackResults } from './selectors';

const feedbacksApiHOC = () => WrappedComponent => compose(
  connect(
    state => ({
      feedbacks: getFeedbackResults(state, 'feedbacks').toJS(),
      feedbacksIsFetching: querySelectors.isPending(
        state.get('queries'),
        { queryKey: endpoints.getFeedbacksUrl() },
      ),
    }),
    dispatch => ({
      ...bindActionCreators({
        getFeedbacks,
      }, dispatch),
    }),
  ),
)(WrappedComponent);

export default feedbacksApiHOC;
