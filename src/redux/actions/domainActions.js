import {FETCH_DOMAIN, FETCH_DOMAIN_SUCCESS} from './types';

const fetchDomainSuccess = ({payload}) => ({
  type: FETCH_DOMAIN_SUCCESS,
  payload,
});

const fetchDomain = ({onSuccess, onFail}) => ({
  onFail,
  onSuccess,
  type: FETCH_DOMAIN,
});

export default {
  fetchDomain,
  fetchDomainSuccess,
};
