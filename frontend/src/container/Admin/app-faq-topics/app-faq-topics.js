
import React, { useEffect } from 'react';
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

import { useDispatch, useSelector } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


function AppFaqTopics() {

    const dispatch = useDispatch();
    const users = useSelector(store => store?.sampleReducer.posts);
    useEffect(() => {
        // dispatch(SampleActions.sampleReq());
    }, [dispatch]);


    const remote = {
        filter: false,
        pagination: false,
        sort: false,
        cellEdit: false
    };
    const columns = [
        {
            dataField: 'id',
            text: 'Id'
        },
        {
            dataField: 'userId',
            text: 'User Id'
        },
        {
            dataField: 'title',
            text: 'Title'
        },
        // {
        //     dataField: 'email',
        //     text: 'Email'
        // },
        // {
        //     dataField: 'website',
        //     text: 'Website',
        // sort: true,
        // sortValue: (cell, row) => {
        //     return cell
        // },
        // formatter: (cell, row) => {
        //     return cell
        // },
        // },
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
                            id={`edit-order-${rowIndex}`}
                            type="button"
                        >
                            <i className="now-ui-icons ui-2_settings-90" />
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`edit-order-${rowIndex}`}
                        >
                            Edit Task
                  </UncontrolledTooltip>
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip923217206"
                            type="button"
                        >
                            <i className="now-ui-icons ui-1_simple-remove" />
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target="tooltip923217206"
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
                                <CardTitle tag="h4">App Faq Topics
                                <Button
                                        className="btn-primary btn-add ml-2"
                                        onClick={e => e.preventDefault()} >
                                        <i className="fas fa-plus"></i>
                                    </Button>
                                </CardTitle>
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
                                    data={users}
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

AppFaqTopics.propTypes = {
    baseProps: PropTypes.object
};

export default AppFaqTopics;
