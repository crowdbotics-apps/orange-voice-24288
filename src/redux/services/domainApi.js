import {api} from './api';
import {BASE_URL, DEFAULT_LAUNDRY_BUSINESS} from './config';

const getDomainById = () => {
  return api.get(`${BASE_URL}api/v1/get_domain/${DEFAULT_LAUNDRY_BUSINESS}/`);
};

export default {
  getDomainById,
};
