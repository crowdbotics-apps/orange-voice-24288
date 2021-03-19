
import React, { useState, useEffect, useCallback } from 'react';
import defaultImage from '../../../assets/img/no-image.png';
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
    UncontrolledTooltip,
    Badge
} from 'reactstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// core components

// import { driversData } from '../../../variables/general';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux';
import DeleteModal from '../../../components/Modals/DeleteModal';
import { DriverActions } from '../../../store/actions/DriverActions';
import { API_URL } from '../../../store/services/Config';


function Drivers({ history }) {
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const openDeleteModal = useSelector(store => store?.driver?.openDelModal);
    const isProgress = useSelector(store => store?.driver?.isProgressList);
    const driver = useSelector(store => store?.driver?.driver);
    const drivers = useSelector(store => store?.driver?.drivers);
    const paging = useSelector(store => store?.driver?.paging);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(DriverActions.getDrivers());
    }, [dispatch]);


    const remote = {
        filter: false,
        pagination: true,
        sort: false,
        cellEdit: false
    };
    const onTableChange = useCallback((type, newState) => {
        if (type === 'pagination')
            dispatch(DriverActions.getDrivers(newState?.page, undefined, search));
    }, [dispatch, search]);


    const onSearch = useCallback((e) => {
        e.preventDefault();
        if (search) {
            setIsSearch(true);
            dispatch(DriverActions.getDrivers(undefined, undefined, search));
        }
    }, [dispatch, search]);


    useEffect(() => {
        if (isSearch && search === '') {
            setIsSearch(false);
            dispatch(DriverActions.getDrivers(undefined, undefined, search));
        }
    }, [search, onSearch, isSearch, dispatch]);
    const columns = [
        // {
        //     dataField: 'id',
        //     text: '#'
        // },
        {
            dataField: 'name',
            text: 'Name'
        },
        {
            dataField: 'image',
            text: 'Image',
            // eslint-disable-next-line react/display-name
            formatter: (cell) => {
                if (cell)
                    return (
                        <img src={`${API_URL}/${cell}`} alt={'img'} className="img-thumbnail table-image" />
                    );
                else {
                    return (
                        <img src={defaultImage} alt={'img'} className="img-thumbnail table-image" />
                    );
                }
            }
        },
        {
            dataField: 'contactNumber',
            text: 'Contact#',
        },
        // {
        //     dataField: 'orders',
        //     text: 'Orders For Today'
        // },
        {
            dataField: 'action',
            text: 'Action',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row, rowIndex) => {
                return (
                    <div className="d-flex" >
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`edit-order-${rowIndex}`}
                            type="button"
                            onClick={() => history.push({
                                pathname: '/admin/drivers/update',
                                state: {
                                    driver: row
                                }
                            })}
                        >
                            <i className=" fas fa-edit"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`edit-order-${rowIndex}`}
                        >
                            Edit
                         </UncontrolledTooltip>

                        {/* <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`location-${rowIndex}`}
                            type="button"
                        >
                            <i className="fas fa-map-marker-alt"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`location-${rowIndex}`}
                        >
                            Location
                        </UncontrolledTooltip> */}

                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`history-${rowIndex}`}
                            type="button"
                            onClick={() => history.push(`/admin/drivers/history/${row?.id}`)}

                        >
                            <i className="fas fa-eye"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`history-${rowIndex}`}
                        >
                            View History
                        </UncontrolledTooltip>

                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`delete-${rowIndex}`}
                            type="button"
                            onClick={() => dispatch(DriverActions.toggleDelDriverModal(rowIndex))}
                        >
                            <i className="fas fa-trash-alt" aria-hidden="true"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`delete-${rowIndex}`}
                        >
                            Delete
                        </UncontrolledTooltip>
                    </div>
                );
            }
        }
    ];
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Drivers
                                <Button
                                    className="btn-primary btn-add ml-2"
                                    onClick={() => history.push('/admin/drivers/add')} >
                                    <i className="fas fa-plus"></i>
                                </Button>
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
                                    <Badge color="primary">{paging.totalCount} Drivers</Badge>
                                    <ToolkitProvider
                                        keyField={'id'}
                                        data={drivers}
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
            {/* <AddDriverModal isOpen={openAddDriverModal} toggle={() => toggleAddDriverModal(!openAddDriverModal)} />
            <EditDriverModal isOpen={openEditDriverModal} toggle={() => toggleEditDriverModal(!openEditDriverModal)} /> */}
            {openDeleteModal && <DeleteModal isOpen={openDeleteModal} toggle={() => dispatch(DriverActions.toggleDelDriverModal())} isProgress={isProgress} delFunc={() => dispatch(DriverActions.delDriver(driver?.id))} />}

        </>
    );
}

Drivers.propTypes = {
    baseProps: PropTypes.object,
    history: PropTypes.object
};
export default Drivers;
