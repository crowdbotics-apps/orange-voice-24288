import React from 'react';
// reactstrap components
import {Row, Col} from 'reactstrap';
import EditProfileForm from './EditProfileForm';
import {useSelector} from 'react-redux';
const EditProfile = () => {
  const user = useSelector((store) => store?.auth?.user);
  const profile = user?.profile;
  return (
    <div className="content">
      <Row>
        <Col md="12">
          {profile?.id ? <EditProfileForm profile={profile} /> : <div></div>}
        </Col>
      </Row>
    </div>
  );
};

export default EditProfile;
