import {api} from './api';

const allCards = () => {
  return api.get('api/v1/cards/');
};

const addCard = (params) => {
  return api.post('api/v1/cards/', params);
};

const deleteCard = (params) => {
  return api.delete(`api/v1/cards/${params.id}/`);
};

export default {
  allCards,
  addCard,
  deleteCard,
};
