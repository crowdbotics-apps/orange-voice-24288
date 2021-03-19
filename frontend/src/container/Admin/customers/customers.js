
import React, { useEffect, useState, useCallback } from 'react';
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
    Badge,
    Button
} from 'reactstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// core components


import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux';
import { AuthActions } from '../../../store/actions/AuthActions';


function Customers({ history }) {

    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const isProgress = useSelector(store => store?.auth?.isProgressList);
    const users = useSelector(store => store?.auth?.users);
    const paging = useSelector(store => store?.auth?.paging);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthActions.getAllUsers());
    }, [dispatch]);


    const remote = {
        filter: false,
        pagination: true,
        sort: false,
        cellEdit: false
    };
    const onTableChange = useCallback((type, newState) => {
        if (type === 'pagination')
            dispatch(AuthActions.getAllUsers(newState?.page, undefined, search));
    }, [dispatch, search]);


    const onSearch = useCallback((e) => {
        e.preventDefault();
        if (search) {
            setIsSearch(true);
            dispatch(AuthActions.getAllUsers(undefined, undefined, search));
        }
    }, [dispatch, search]);


    useEffect(() => {
        if (isSearch && search === '') {
            setIsSearch(false);
            dispatch(AuthActions.getAllUsers(undefined, undefined, search));
        }
    }, [search, onSearch, isSearch, dispatch]);

    const columns = [
        {
            dataField: 'firstName',
            text: 'First Name'
        },
        {
            dataField: 'lastName',
            text: 'Last Name'
        },
        {
            dataField: 'email',
            text: 'Email'
        },
        {
            dataField: 'phoneNo',
            text: 'Phone Number'
        },
        {
            dataField: 'postalCode',
            text: 'Postal Code'
        },
        {
            dataField: '',
            text: 'Action',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row) => {
                return (
                    <Button
                        className="btn-primary btn-sm"
                        onClick={() => history.push(`/admin/customers/createorder/${row?.id}`)}
                    >
                        Create Order
                    </Button >
                );
            }
        },

    ];
    return (
        <>

            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Customers
                                </CardTitle>
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
                                    <Badge color="primary">{paging.totalCount} Customers</Badge>
                                    <ToolkitProvider
                                        keyField={'id'}
                                        data={users}
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

Customers.propTypes = {
    baseProps: PropTypes.object,
    history: PropTypes.object
};

export default Customers;
