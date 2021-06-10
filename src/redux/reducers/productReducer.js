import {
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_SERVICES,
  FETCH_ALL_SERVICES_SUCCESS,
  HIDE_LOADER,
  FETCH_ALL_FAQS,
  FETCH_ALL_FAQS_SUCCESS,
  FETCH_FAQS_BY_ID,
  FETCH_ALL_LOVS_SUCCESS,
} from '../actions/types';
import SeamlessImmutable from 'seamless-immutable';
import {isUndefined} from 'lodash';

const INITIAL_STATE = SeamlessImmutable({
  access_token: null,
  meta: {loading: false, loaded: false},
  categories: [],
  services: [],
  faqs: [],
  pagination: {},
  config: {
    system: {},
    timeslots: [],
  },
});

const products = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_CATEGORIES:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );

    case FETCH_ALL_LOVS_SUCCESS:
      return state.merge(
        {
          config: {
            system: {
              ...action.config,
            },
            timeslots: action.timeslots,
          },
          meta: {loading: false, loaded: true},
        },
        {deep: true},
      );

    case FETCH_ALL_CATEGORIES_SUCCESS:
      if (isUndefined(action.categories)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            categories: action.categories,
            pagination: action.meta,
            meta: {loading: false, loaded: true},
          },
          {deep: true},
        );
      }
    case FETCH_ALL_SERVICES:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case FETCH_ALL_SERVICES_SUCCESS:
      if (isUndefined(action.services)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            services: action.services.map((service) => ({
              serviceTitle: service.title,
              serviceImage: service.image,
              serviceCategory: service.categoryId,
              serviceDesc: service.description,
              serviceCharges: '$' + service.price,
              minQty: service.minQty || 0,
              id: service.id,
            })),
            pagination: action.meta,
            meta: {loading: false, loaded: true},
          },
          {deep: true},
        );
      }
    case FETCH_ALL_FAQS:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case FETCH_FAQS_BY_ID:
      return state.merge(
        {
          meta: {loaded: false, loading: true},
        },
        {deep: true},
      );
    case FETCH_ALL_FAQS_SUCCESS:
      if (isUndefined(action.faqs)) {
        return state.merge(
          {meta: {loading: false, loaded: true}},
          {deep: true},
        );
      } else {
        return state.merge(
          {
            faqs: action.faqs.map((faq) => ({
              title: faq.question,
              body: faq.answer,
              id: faq.id,
            })),
            pagination: action.meta,
            meta: {loading: false, loaded: true},
          },
          {deep: true},
        );
      }

    case HIDE_LOADER:
      return state.merge({meta: {loading: false, loaded: true}}, {deep: true});

    default:
      return state;
  }
};

export default products;
