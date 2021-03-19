
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// reactstrap components
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Badge
} from 'reactstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// core components

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux';
import { DriverActions } from '../../../store/actions/DriverActions';
import { useParams } from 'react-router-dom';
import moment from 'moment';


function DriverHistory() {
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    const isProgress = useSelector(store => store?.driver?.isProgressList);
    const driverHistory = useSelector(store => store?.driver?.driverHistory);
    const paging = useSelector(store => store?.driver?.paging);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(DriverActions.getDriverHistory(id));
    }, [dispatch, id]);


    const remote = {
        filter: false,
        pagination: true,
        sort: false,
        cellEdit: false
    };
    const onTableChange = useCallback((type, newState) => {
        if (type === 'pagination')
            dispatch(DriverActions.getDriverHistory(id, newState?.page, undefined, search));
    }, [dispatch, search, id]);


    const onSearch = useCallback((e) => {
        e.preventDefault();
        if (search) {
            setIsSearch(true);
            dispatch(DriverActions.getDriverHistory(id, undefined, undefined, search));
        }
    }, [dispatch, search, id]);


    useEffect(() => {
        if (isSearch && search === '') {
            setIsSearch(false);
            dispatch(DriverActions.getDriverHistory(id, undefined, undefined, search));
        }
    }, [search, onSearch, isSearch, dispatch, id]);
    const columns = [
        {
            dataField: 'orderNumber',
            text: '#'
        },
        {
            dataField: 'pickupTime',
            text: 'Pickup Time',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row) => {
                return (
                    <div className="d-flex flex-column" >
                        <span> {cell}</span>
                        <span> {row?.pickupDate && moment(row.pickupDate).format('DD-MM-YYYY')}</span>
                    </div>
                );
            }
        },
        {
            dataField: 'dropoffTime',
            text: 'Dropoff Time',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row) => {
                return (
                    <div className="d-flex flex-column" >
                        <span> {cell}</span>
                        <span> {row?.dropoffDate && moment(row.dropoffDate).format('DD-MM-YYYY')}</span>
                    </div>
                );
            }
        },

        {
            dataField: 'totalAmount',
            text: 'Amount'
        },


    ];
    return (
        <>

            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Driver History</CardTitle>
                            <form onSubmit={onSearch} className="col-md-8 align-self-center " >
                                <InputGroup className="no-border ">
                                    <Input
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className=""
                                        placeholder="Search..." />
                                    <InputGroupAddon addonType="append" onClick={onSearch}   >
                                        <InputGroupText  >
                                            <i className="now-ui-icons ui-1_zoom-bold  " />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </form>
                        </CardHeader>
                        <CardBody>
                            {isProgress ?
                                <div className='spinner-lg' ></div>
                                :
                                <>
                                    <Badge color="primary">{paging.totalCount} Driver History</Badge>
                                    <ToolkitProvider
                                        keyField={'id'}
                                        data={driverHistory}
                                        columns={columns}
                                        bootstrap4

                                    >{
                                            props => (
                                                <div>
                                                    <BootstrapTable
                                                        remote={remote}
                                                        wrapperClasses={'table-responsive'}
                                                        classes=""
                                                        headerWrapperClasses="text-primary text-left"
                                                        bordered={false}
                                                        headerClasses=""
                                                        bodyClasses="text-left"
                                                        {...props.baseProps}
                                                        onTableChange={onTableChange}
                                                        noDataIndication={() => <div className="text-center" >{'No results found'}</div>}
                                                        pagination={paginationFactory({
                                                            page: paging.pageNumber,
                                                            sizePerPage: 10,
                                                            totalSize: paging.totalCount,
                                                            hideSizePerPage: true,

                                                        })}
                                                    />
                                                </div>
                                            )

                                        }
                                    </ToolkitProvider>
                                </>
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </>
    );
}

DriverHistory.propTypes = {
    baseProps: PropTypes.object
};
export default DriverHistory;
