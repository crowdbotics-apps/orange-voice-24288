import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PanelHeader from '../../../components/PanelHeader/PanelHeader';

import Vouchers from './vouchers';
import AddVoucher from './add-voucher';
import EditVoucher from './edit-voucher';

function VouchersContainer() {
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Switch>
                    <Route exact path="/admin/vouchers" component={Vouchers} />
                    <Route path="/admin/vouchers/add" component={AddVoucher} />
                    <Route path="/admin/vouchers/update" component={EditVoucher} />
                </Switch>
            </div>
        </>

    );
}
export default VouchersContainer;