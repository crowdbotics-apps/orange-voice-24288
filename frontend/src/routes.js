
import Orders from './container/Admin/orders/orders';
import Categories from './container/Admin/categories/categories';
import CustomersContainer from './container/Admin/customers';
import AppFaq from './container/Admin/app-faq/app-faq';
import DriverContainer from './container/Admin/drivers';
import ServicesContainer from './container/Admin/services';
import VouchersContainer from './container/Admin/vouchers';
import Locations from './container/Admin/locations/locations';

import { createBrowserHistory } from 'history';
const hist = createBrowserHistory();
export { hist };

var dashRoutes = [
  {
    path: '/orders',
    name: 'Orders',
    icon: 'fas fa-shopping-basket',
    component: Orders,
    layout: '/admin'
  },
  {
    path: '/drivers',
    name: 'Drivers',
    icon: 'fa fa-truck',
    component: DriverContainer,
    layout: '/admin'
  },
  {
    path: '/services',
    name: 'Services',
    icon: 'fas fa-university',
    component: ServicesContainer,
    layout: '/admin'
  },
  {
    path: '/categories',
    name: 'Categories',
    icon: 'fas fa-th-list',
    component: Categories,
    layout: '/admin'
  },
  {
    path: '/locations',
    name: 'Locations',
    icon: 'fas fa-map-marker-alt',
    component: Locations,
    layout: '/admin'
  },
  {
    path: '/customers',
    name: 'Customers',
    icon: 'fas fa-users',
    component: CustomersContainer,
    layout: '/admin'
  },
  {
    path: '/vouchers',
    name: 'Vouchers',
    icon: 'fas fa-tags',
    component: VouchersContainer,
    layout: '/admin'
  },
  {
    path: '/app-faq',
    name: 'App FAQs',
    icon: 'fas fa-question',
    component: AppFaq,
    layout: '/admin'
  }
];
export default dashRoutes;
