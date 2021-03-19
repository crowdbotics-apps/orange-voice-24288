
import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../../../assets/img/no-image.png';

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


import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DeleteModal from '../../../components/Modals/DeleteModal';
import { ServiceActions } from '../../../store/actions/ServiceActions';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../../../store/services/Config';


function Services({ history }) {

    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const openDeleteModal = useSelector(store => store?.service?.openDelModal);
    const isProgress = useSelector(store => store?.service?.isProgressList);
    const service = useSelector(store => store?.service?.service);
    const services = useSelector(store => store?.service?.services);
    const paging = useSelector(store => store?.service?.paging);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ServiceActions.getServices());
    }, [dispatch]);




    const onTableChange = useCallback((type, newState) => {
        if (type === 'pagination')
            dispatch(ServiceActions.getServices(newState?.page, undefined, search));
    }, [dispatch, search]);


    const onSearch = useCallback((e) => {
        e.preventDefault();
        if (search) {
            setIsSearch(true);
            dispatch(ServiceActions.getServices(undefined, undefined, search));
        }
    }, [dispatch, search]);


    useEffect(() => {
        if (isSearch && search === '') {
            setIsSearch(false);
            dispatch(ServiceActions.getServices(undefined, undefined, search));
        }

    }, [search, onSearch, isSearch, dispatch]);




    const remote = {
        filter: false,
        pagination: true,
        sort: false,
        cellEdit: false
    };
    const columns = [
        {
            dataField: 'id',
            text: '#',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row, rowIndex) => {
                return (
                    <span>{rowIndex + 1}</span>
                );
            }
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
            dataField: 'title',
            text: 'Title',
        },
        {
            dataField: 'description',
            text: 'Description',
            // eslint-disable-next-line react/display-name
            formatter: (cell) => {
                return (
                    <span className="text-center" >{cell}</span>
                );
            },
            classes: 'w-50'
        },
        {
            dataField: 'minQty',
            text: 'Min QTY',
            classes: 'text-center'
        },
        {
            dataField: 'price',
            text: 'Price',
            // eslint-disable-next-line react/display-name
            formatter: (cell) => {
                return (
                    <span className="text-center" >${cell}</span>
                );
            },

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
                            id={`edit-order-${rowIndex}`}
                            type="button"
                            onClick={() => history.push({
                                pathname: '/admin/services/update',
                                state: {
                                    service: services[rowIndex]
                                }
                            })}
                        >
                            <i className=" fas fa-edit"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={5}
                            target={`edit-order-${rowIndex}`}
                        >
                            Edit
              </UncontrolledTooltip>
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`del-${rowIndex}`}
                            type="button"
                            onClick={() => dispatch(ServiceActions.toggleDelServiceModal(rowIndex))}
                        >
                            <i className="fas fa-trash-alt" />
                        </Button>
                        <UncontrolledTooltip
                            delay={5}
                            target={`del-${rowIndex}`}
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

            <Row>
                <Col xs={12}>
                    <Card>
                        <CardHeader className="d-flex justify-content-between" >
                            <CardTitle tag="h4">Services
                                <Button
                                    className="btn-primary btn-add ml-2"
                                    onClick={() => { history.push('/admin/services/add'); }} >
                                    <i className="fas fa-plus"></i>
                                </Button>
                            </CardTitle>
                            <form onSubmit={onSearch} className="col-md-8 align-self-center " >
                                <InputGroup className=" no-border">
                                    <Input className="" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                    <InputGroupAddon addonType="append" onClick={onSearch} >
                                        <InputGroupText>
                                            <i className="now-ui-icons ui-1_zoom-bold " />
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
                                    <Badge color="primary">{paging.totalCount} Services</Badge>
                                    <ToolkitProvider
                                        keyField='id'
                                        data={services}
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
                                                        noDataIndication={() => <div className="text-center" >{'No results found'}</div>}
                                                        onTableChange={onTableChange}
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
            {openDeleteModal && <DeleteModal isOpen={openDeleteModal} toggle={() => dispatch(ServiceActions.toggleDelServiceModal())} isProgress={isProgress} delFunc={() => dispatch(ServiceActions.delService(service?.id))} />}

        </>
    );
}

Services.propTypes = {
    baseProps: PropTypes.object,
    history: PropTypes.object
};
export default Services;
