import {api} from './api';
import {API_URL_SUFFIX} from './config';

const allCategories = () => {
  return api.get(`${API_URL_SUFFIX}category/`);
};

// response:
// title: "Service 1"
// image: "images/LaundryService/20160903_135322.jpg"
// imageFile: null
// categoryId: 33
// description: "Test desc"
// shortDescription: "test short desc"
// price: 12.33
// minQty: 1
// isActive: false
// id: 2

const allServices = (params) => {
  return api.get(`${API_URL_SUFFIX}service/?category=${params.categoryId}`);
};

// {
//   "id": "string",
// }
const getCategory = (params) => {
  return api.get(`${API_URL_SUFFIX}category/${params.id}`);
};

// {
//   "id": "string"
// }
const getService = (params) => {
  return api.get(`${API_URL_SUFFIX}service/${params.id}`);
};

const getAllFAQs = () => {
  return api.get(`${API_URL_SUFFIX}FAQ?page[number]=1&page[size]=1000`);
};

const getFAQsById = (id) => {
  return api.get(
    `${API_URL_SUFFIX}faq/?page[number]=1&page[size]=1000&filters[serviceId]=${id}`,
  );
};

const getLovs = () => {
  return api.get(`${API_URL_SUFFIX}lov/all`);
};

export default {
  allCategories,
  allServices,
  getCategory,
  getService,
  getAllFAQs,
  getFAQsById,
  getLovs,
};
