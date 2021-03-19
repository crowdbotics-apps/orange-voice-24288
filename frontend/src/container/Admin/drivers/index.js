import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Drivers from './drivers';
import DriverHistory from './driver-history';
import PanelHeader from '../../../components/PanelHeader/PanelHeader';
import AddDriver from './add-driver';
import EditDriver from './edit-driver';

function DriverContainer() {
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Switch>
                    <Route exact path="/admin/drivers" component={Drivers} />
                    <Route  path="/admin/drivers/add" component={AddDriver} />
                    <Route path="/admin/drivers/update" component={EditDriver} />
                    <Route path="/admin/drivers/history/:id" component={DriverHistory} />
                </Switch>
            </div>
        </>

    );
}
export default DriverContainer;