import SeamlessImmutable from 'seamless-immutable';
import {FETCH_DOMAIN_SUCCESS} from '../actions/types';

const INITIAL_STATE = SeamlessImmutable({
  domain: {},
  meta: {loading: false, loaded: false},
});

const domain = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DOMAIN_SUCCESS:
      return state.merge(
        {
          domain: action.payload,
        },
        {deep: true},
      );

    default:
      return state;
  }
};

export default domain;
