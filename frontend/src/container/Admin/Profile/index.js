import React from 'react';


import PanelHeader from '../../../components/PanelHeader/PanelHeader';


import { Switch, Route } from 'react-router-dom';
import Profile from './Profile';
import EditProfile from './EditProfile';

function ProfileContainer() {
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Switch>
                    <Route exact path="/admin/profile" component={Profile} />
                    <Route path="/admin/profile/:id" component={EditProfile} />
                </Switch>
            </div>
        </>

    );
}
export default ProfileContainer;