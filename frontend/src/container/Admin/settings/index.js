import React from 'react';


import PanelHeader from '../../../components/PanelHeader/PanelHeader';


import { Switch, Route } from 'react-router-dom';
import SettingsPage from './SettingsPage';

function SettingsContainer() {
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Switch>
                    <Route exact path="/admin/settings" component={SettingsPage} />
                </Switch>
            </div>
        </>

    );
}
export default SettingsContainer;