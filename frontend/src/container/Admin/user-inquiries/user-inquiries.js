
import React from 'react';
import PropTypes from 'prop-types';

// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    UncontrolledTooltip
} from 'reactstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// core components
import PanelHeader from '../../../components/PanelHeader/PanelHeader';
import { userInquiryData } from '../../../variables/general';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


function UserInquiries() {




    const remote = {
        filter: false,
        pagination: false,
        sort: false,
        cellEdit: false
    };
    const columns = [
        {
            dataField: 'id',
            text: '#'
        },
        {
            dataField: 'date',
            text: 'Date'
        },
        {
            dataField: 'orderId',
            text: 'Order ID'
        },
        {
            dataField: 'userName',
            text: 'User Name'
        },
        {
            dataField: 'email',
            text: 'Email'
        },
        {
            dataField: 'issue',
            text: 'Issue Title'
        },
        {
            dataField: 'message',
            text: 'Message'
        },
        {
            dataField: 'action',
            text: 'Action',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row, rowIndex) => {
                return (
                    <div>
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`tooltip-${rowIndex}`}
                            type="button"
                        >
                            <i className="fas fa-trash-alt" />
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`tooltip-${rowIndex}`}
                        >
                            Remove
                  </UncontrolledTooltip>
                    </div>
                );
            }
        }
    ];
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader className="d-flex justify-content-between" >
                                <CardTitle tag="h4">User Inquiries</CardTitle>
                                <form className="col-md-8 align-self-center " >
                                    <InputGroup className=" no-border">
                                        <Input className="" placeholder="Search..." />
                                        <InputGroupAddon addonType="append">
                                            <InputGroupText>
                                                <i className="now-ui-icons ui-1_zoom-bold" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </form>
                            </CardHeader>
                            <CardBody>
                                <ToolkitProvider
                                    keyField='id'
                                    data={userInquiryData}
                                    columns={columns}
                                    bootstrap4

                                >{
                                        props => (
                                            <div>
                                                {/* <SearchBar className={"float-right col-md-4 p-3"} {...props.searchProps} /> */}
                                                <BootstrapTable
                                                    remote={remote}
                                                    wrapperClasses={'table-responsive'}
                                                    classes=""
                                                    headerWrapperClasses="text-primary text-left"
                                                    bordered={false}
                                                    headerClasses=""
                                                    bodyClasses="text-left"
                                                    {...props.baseProps}
                                                    // keyField='name'
                                                    // data={products}
                                                    // columns={columns}
                                                    pagination={paginationFactory({
                                                        page: 1,
                                                        sizePerPage: 10,
                                                        hideSizePerPage: true
                                                    })}
                                                />
                                            </div>
                                        )

                                    }
                                </ToolkitProvider>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
UserInquiries.propTypes = {
    baseProps: PropTypes.object
};
export default UserInquiries;
