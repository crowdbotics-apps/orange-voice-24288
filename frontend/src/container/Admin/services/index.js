import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PanelHeader from '../../../components/PanelHeader/PanelHeader';
import Services from './services';
import AddService from './add-service';
import EditSerivce from './edit-service';

function ServicesContainer() {
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Switch>
                    <Route exact path="/admin/services" component={Services} />
                    <Route path="/admin/services/add" component={AddService} />
                    <Route path="/admin/services/update" component={EditSerivce} />
                </Switch>
            </div>
        </>

    );
}
export default ServicesContainer;