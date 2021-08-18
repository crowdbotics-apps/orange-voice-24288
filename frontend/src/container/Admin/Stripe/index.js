import React from 'react';


import PanelHeader from '../../../components/PanelHeader/PanelHeader';


import { Switch, Route } from 'react-router-dom';
import StripeConnect from './StripeConnect';

function StripeContainer() {
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Switch>
                    <Route exact path="/admin/stripe-connect" component={StripeConnect} />
                    <Route path="/admin/stripe-connect/:id" component={StripeConnect} />
                </Switch>
            </div>
        </>

    );
}
export default StripeContainer;