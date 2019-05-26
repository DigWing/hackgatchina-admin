import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, withState, withHandlers, withProps } from 'recompose';
import moment from 'moment';
import GoogleMapReact from 'google-map-react';
import { feedbacksApiHOC } from 'components/apiHOCs';
import FilterButton from 'components/FilterButton';
import MapMarker from 'components/MapMarker';
import FeedbackCard from 'components/FeedbackCard';
import Spoiler from 'components/Spoiler';
import SwitchButton from 'components/SwitchButton';
import { buttons, heatMapData } from 'consts';

moment.locale('ru');

const apiKey = 'AIzaSyBnmv7jvtOTeZ5EF3-3JvSlOqeXEy1DsH4';

import './style.scss';

const HomeScreen = ({ addFilter, filters, feedbacks, filteredFeedbacks, groupedFeedbacks, filterValue, setFilterValue }) => (
  <div className="home-layout">
    {console.log(groupedFeedbacks)}
    <span className="home-layout__caption">Заявки</span>
    <div className="home-layout__container">
      <div className="home-layout__feedbacks">
        <div className="home-layout__filters">
          {
            buttons.map(button => (
              <FilterButton
                isChosen={filters.some(F => F === button.tag)}
                onClick={() => addFilter(button.tag)}
                {...button}
              />
            ))
          }
        </div>
        <SwitchButton
          input={{ value: filterValue, onChange: setFilterValue }}
          valueLeft="spoiler"
          valueRight="default"
          textLeft="Группы"
          textRight="Список"
          value={filterValue}
        />
        {
          filterValue === 'spoiler' ? (
            <div className="home-layout__feed">
              {
                Object.keys(groupedFeedbacks).map(K => (
                  <Spoiler
                    initialOpen={groupedFeedbacks[K].length === 1}
                    title={`Адрес: ${K}`}
                  >
                    {groupedFeedbacks[K].map(feedback => (
                      <FeedbackCard
                        comment={(feedback.comments && feedback.comments.length) ? feedback.comments[0] : ''}
                        date={moment(feedback.createdAt).fromNow()}
                        {...feedback}
                      />
                    ))}
                  </Spoiler>
                ))
              }
              {
                !!(filters.length && !filteredFeedbacks.length)
                && <div className="home-layout__empty">По данным фильтрам результатов не найдено :(</div>
              }
            </div>
          ) : (
            <div className="home-layout__feed">
              {
                (filters.length ? filteredFeedbacks : feedbacks).map(feedback => (
                  <FeedbackCard
                    comment={(feedback.comments && feedback.comments.length) ? feedback.comments[0] : ''}
                    date={moment(feedback.createdAt).fromNow()}
                    {...feedback}
                  />
                ))
              }
              {
                !!(filters.length && !filteredFeedbacks.length)
                && <div className="home-layout__empty">По данным фильтрам результатов не найдено :(</div>
              }
            </div>
          )
        }
      </div>
      <div className="home-layout__map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={{
            lat: 59.57639,
            lng: 30.12833
          }}
          defaultZoom={11}
          heatmapLibrary={true}
          heatmap={{
            positions: (filters.length ? filteredFeedbacks : feedbacks).map(M => ({ lat: M.lat, lng: M.lng })),
            options: {
              radius: 20,
              opacity: 0.6,
            }
          }}
        >
          {(filters.length ? filteredFeedbacks : feedbacks).map(M => (
            <MapMarker
              lat={M.lat}
              lng={M.lng}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  </div>
);

HomeScreen.propTypes = {
  redditPosts: PropTypes.object.isRequired,
};

export default compose(
  feedbacksApiHOC(),
  withState('filters', 'setFilters', []),
  withState('filterValue', 'setFilterValue', 'spoiler'),
  withProps(({ filters, feedbacks }) => ({
    filteredFeedbacks: !filters.length
      ? feedbacks
      : feedbacks.filter((feedback) =>
        filters.some(filter =>
          feedback.tags.some(T => T === filter)))
  })),
  withProps(({ filters, filteredFeedbacks, feedbacks }) => ({
    groupedFeedbacks: (!filters.length ? feedbacks : filteredFeedbacks)
      .reduce((acc, I) => {
        if (!acc[I.geo]) {
          acc[I.geo] = [I];
        } else {
          acc[I.geo].push(I);
        }
        return acc;
      }, {}),
  })),


  withHandlers({
    addFilter: ({ filters, setFilters }) => (tag) => {
      const newFilters = filters.filter(item => item !== tag);
      if (filters.length === newFilters.length) {
        newFilters.push(tag);
      }
      setFilters(newFilters);
    },
  }),

  lifecycle({
    componentDidMount() {
      this.props.getFeedbacks();
    },
  }),
)(HomeScreen);
