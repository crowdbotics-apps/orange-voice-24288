import {
    FETCH_ALL_CARDS,
    FETCH_ALL_CARDS_SUCCESS,
    ADD_CARD,
    ADD_CARD_SUCCESS,
    DELETE_CARD,
    DELETE_CARD_SUCCESS
  } from './types';
  
  const fetchAllCards = ({onSuccess, onFail}) => ({
    type: FETCH_ALL_CARDS,
    onSuccess,
    onFail,
  });

  const fetchAllCardsSuccess = ({cards, paging}) => ({
    type: FETCH_ALL_CARDS_SUCCESS,
    cards,
    paging
  });

  const deleteCard = ({params, onSuccess, onFail}) => ({
    type: DELETE_CARD,
    onSuccess,
    onFail,
    params
  });

  const deleteCardSuccess = ({ id }) => ({
    type: DELETE_CARD_SUCCESS,
    id
  });

  const addCard = ({params, onSuccess, onFail}) => ({
    type: ADD_CARD,
    onSuccess,
    onFail,
    params
  });

  const addCardSuccess = ({response}) => ({
    type: ADD_CARD_SUCCESS,
    response
  });


  export default {
    fetchAllCards,
    deleteCard,
    addCard,
    fetchAllCardsSuccess,
    deleteCardSuccess,
    addCardSuccess
  };
  