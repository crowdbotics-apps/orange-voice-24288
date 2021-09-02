import React, {useState} from 'react';
import 'react-datetime/css/react-datetime.css';
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Domain from './Domain';

import TimeSlot from './TimeSlot';

const SettingsPage = ({location}) => {
  const [hTabs, setHTabs] = useState('ht1');
  return (
    <div className="content">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between">
              <CardTitle tag="h4">Settings</CardTitle>
            </CardHeader>
            <CardBody style={{minHeight: '75vh'}}>
              <Nav pills className="nav-pills-primary">
                <NavItem>
                  <NavLink
                    className={hTabs === 'ht1' ? 'active' : ''}
                    onClick={() => setHTabs('ht1')}>
                    General
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={hTabs === 'ht2' ? 'active' : ''}
                    onClick={() => setHTabs('ht2')}>
                    Timeslots
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent
                activeTab={hTabs}
                style={{marginTop: 20}}
                className="tab-space">
                <TabPane tabId="ht1">
                  <Domain />
                </TabPane>
                <TabPane tabId="ht2">
                  <TimeSlot />
                </TabPane>
              </TabContent>
              <Row></Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
