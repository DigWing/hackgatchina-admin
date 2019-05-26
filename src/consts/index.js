import adsIcon from 'assets/img/adsIcon.svg';
import architectureIcon from 'assets/img/architectureIcon.svg';
import cafeIcon from 'assets/img/cafeIcon.svg';
import carIcon from 'assets/img/carIcon.svg';
import graffitiIcon from 'assets/img/graffitiIcon.svg';
import roadIcon from 'assets/img/roadIcon.svg';
import trashIcon from 'assets/img/trashIcon.svg';
import endpoints from './endpoints';

export {
  endpoints,
};

export const buttons = [
  {
    id: 'road',
    tag: 'road',
    text: 'Дорога',
    icon: roadIcon,
  },
  {
    id: 'garbage',
    tag: 'garbage',
    text: 'Мусор',
    icon: trashIcon,
  },
  {
    id: 'ads',
    tag: 'ads',
    text: 'Реклама',
    icon: adsIcon,
  },
  {
    id: 'cafe',
    tag: 'cafe',
    text: 'Магазины и кафе',
    icon: cafeIcon,
  },
  {
    id: 'car',
    tag: 'car',
    text: 'Транспорт',
    icon: carIcon,
  },
  {
    id: 'building',
    tag: 'building',
    text: 'Архитектура',
    icon: architectureIcon,
  },
  {
    id: 'graffiti',
    tag: 'graffiti',
    text: 'Граффити',
    icon: graffitiIcon,
  },
];
