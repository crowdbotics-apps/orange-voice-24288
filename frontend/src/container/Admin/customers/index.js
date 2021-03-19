import React from 'react';


import PanelHeader from '../../../components/PanelHeader/PanelHeader';

import Customers from './customers';
import { Switch, Route } from 'react-router-dom';
import CreateCustomerOrder from './create-customer-order';

function CustomersContainer() {
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Switch>
                    <Route exact path="/admin/customers" component={Customers} />
                    <Route path="/admin/customers/createorder/:id" component={CreateCustomerOrder} />
                </Switch>
            </div>
        </>

    );
}
export default CustomersContainer;