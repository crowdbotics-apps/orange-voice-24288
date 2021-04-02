import React from 'react';
import {useHistory} from 'react-router-dom';
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
  Table,
} from 'reactstrap';

import {useSelector} from 'react-redux';

const Profile = () => {
  const history = useHistory();
  const user = useSelector((store) => store?.auth?.user);
  const profile = user?.profile;
  return (
    <div className="content">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader className="d-flex justify-content-between">
              <CardTitle tag="h4">
                Your Profile
                <Button
                  className="btn-primary btn-add ml-2"
                  title="Edit profile"
                  onClick={() => {
                    history.push('/admin/profile/1');
                  }}>
                  <i className=" fas fa-edit"></i>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive className="table-shopping">
                <tbody>
                  <tr>
                    <td className="td-name no-top-border">
                      <small>Name</small>
                    </td>
                    <td className="no-top-border">{profile?.fullname}</td>
                  </tr>
                  <tr>
                    <td className="td-name">
                      <small>Business name</small>
                    </td>
                    <td>{profile?.businessName}</td>
                  </tr>
                  <tr>
                    <td className="td-name">
                      <small>Business Phone Number</small>
                    </td>
                    <td>{profile?.phoneNo}</td>
                  </tr>
                  <tr>
                    <td className="td-name">
                      <small>Email Address</small>
                    </td>
                    <td>{profile?.email}</td>
                  </tr>
                  <tr>
                    <td className="td-name">
                      <small>Postal Code</small>
                    </td>
                    <td>{profile?.postalCode}</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
