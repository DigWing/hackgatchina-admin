import _ from 'lodash';
import { buttons } from 'consts';

export default (tag) => _.get(buttons.find(B => B.tag === tag), 'icon');
