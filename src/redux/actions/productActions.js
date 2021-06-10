import {
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_SERVICES,
  FETCH_ALL_FAQS,
  FETCH_FAQS_BY_ID,
  FETCH_ALL_FAQS_SUCCESS,
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_SERVICES_SUCCESS,
  HIDE_LOADER,
  FETCH_ALL_LOVS,
  FETCH_ALL_LOVS_SUCCESS,
} from './types';

const fetchAllLovs = ({onSuccess, onFail}) => ({
  type: FETCH_ALL_LOVS,
  onSuccess,
  onFail,
});

const fetchAllLovsSuccess = ({timeslots, config}) => ({
  type: FETCH_ALL_LOVS_SUCCESS,
  timeslots,
  config,
});

const fetchAllCategories = ({onSuccess, onFail}) => ({
  type: FETCH_ALL_CATEGORIES,
  onSuccess,
  onFail,
});

const fetchAllCategoriesSuccess = ({categories, paging}) => ({
  type: FETCH_ALL_CATEGORIES_SUCCESS,
  categories,
  paging
});

const fetchAllServices = ({params, onSuccess, onFail}) => ({
  type: FETCH_ALL_SERVICES,
  params,
  onSuccess,
  onFail,
});

const fetchAllServicesSuccess = ({services}) => ({
  type: FETCH_ALL_SERVICES_SUCCESS,
  services,
});

const fetchAllFAQs = ({onSuccess, onFail}) => ({
  type: FETCH_ALL_FAQS,
  onSuccess,
  onFail,
});

const fetchAllFAQsSuccess = ({faqs}) => ({
  type: FETCH_ALL_FAQS_SUCCESS,
  faqs,
});

const fetchFAQsById = ({params, onSuccess, onFail}) => ({
  type: FETCH_FAQS_BY_ID,
  params,
  onSuccess,
  onFail,
});

const hideLoader = () => ({
  type: HIDE_LOADER,
});

export default {
  fetchAllCategories,
  fetchAllCategoriesSuccess,
  fetchAllServices,
  fetchAllServicesSuccess,
  fetchAllFAQs,
  fetchAllFAQsSuccess,
  fetchFAQsById,
  hideLoader,
  fetchAllLovs,
  fetchAllLovsSuccess,
};
