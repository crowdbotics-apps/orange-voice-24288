
import React, { useEffect, useCallback, useState } from 'react';
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
import PanelHeader from '../../../components/PanelHeader/PanelHeader';


import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AddLocationModal from '../../../components/Modals/AddLocationModal';
import EditLocationModal from '../../../components/Modals/EditLocationModal';
import DeleteModal from '../../../components/Modals/DeleteModal';
import { useSelector, useDispatch } from 'react-redux';
import { LocationActions } from '../../../store/actions/LocationActions';


function Locations() {
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const openDeleteModal = useSelector(store => store?.location?.openDelModal);
    const isProgress = useSelector(store => store?.location?.isProgressList);
    const location = useSelector(store => store?.location?.location);
    const locations = useSelector(store => store?.location?.locations);
    const paging = useSelector(store => store?.location?.paging);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LocationActions.getLocations());
    }, [dispatch]);

    const remote = {
        filter: false,
        pagination: true,
        sort: false,
        cellEdit: false
    };

    const onTableChange = useCallback((type, newState) => {
        if (type === 'pagination')
            dispatch(LocationActions.getLocations(newState?.page, undefined, search));
    }, [dispatch, search]);


    const onSearch = useCallback((e) => {
        e.preventDefault();
        if (search) {
            setIsSearch(true);
            dispatch(LocationActions.getLocations(undefined, undefined, search));
        }
    }, [dispatch, search]);

    useEffect(() => {
        if (isSearch && search === '') {
            setIsSearch(false);
            dispatch(LocationActions.getLocations(undefined, undefined, search));
        }
    }, [search, onSearch, isSearch, dispatch]);

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
            dataField: 'name',
            text: 'Area Name',
        },
        {
            dataField: 'postalCode',
            text: 'Code',
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
                            onClick={() => dispatch(LocationActions.toggleEditLocationModal(rowIndex))}
                        >
                            <i className="fas fa-edit"></i>
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
                            target={`edit-order-${rowIndex}`}
                        >
                            Edit
                  </UncontrolledTooltip>
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`del-${rowIndex}`}
                            type="button"
                            onClick={() => dispatch(LocationActions.toggleDelLocationModal(rowIndex))}
                        >
                            <i className="fas fa-trash-alt" />
                        </Button>
                        <UncontrolledTooltip
                            delay={0}
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
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardHeader className="d-flex justify-content-between" >
                                <CardTitle tag="h4">Locations
                                <Button
                                        className="btn-primary btn-add ml-2"
                                        onClick={() => dispatch(LocationActions.toggleAddLocationModal())} >
                                        <i className="fas fa-plus"></i>
                                    </Button>
                                </CardTitle>
                                <form onSubmit={onSearch} className="col-md-8 align-self-center " >
                                    <InputGroup className=" no-border">
                                        <Input
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            className=""
                                            placeholder="Search..." />
                                        <InputGroupAddon addonType="append" onClick={onSearch} >
                                            <InputGroupText>
                                                <i className="now-ui-icons ui-1_zoom-bold" />
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
                                        <Badge color='primary'>{paging.totalCount} Locations</Badge>
                                        <ToolkitProvider
                                            keyField={'id'}
                                            data={locations}
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
                                                            onTableChange={onTableChange}
                                                            noDataIndication={() => <div className="text-center">{'No results found'}</div>}
                                                            pagination={paginationFactory({
                                                                page: paging.pageNumber,
                                                                sizePerPage: 10,
                                                                totalSize: paging.totalCount,
                                                                hideSizePerPage: true
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
                <AddLocationModal />
                <EditLocationModal />
                {openDeleteModal && <DeleteModal isOpen={openDeleteModal} toggle={() => dispatch(LocationActions.toggleDelLocationModal())} isProgress={isProgress} delFunc={() => dispatch(LocationActions.delLocation(location?.id))} />}
            </div>
        </>
    );
}

Locations.propTypes = {
    baseProps: PropTypes.object
};
export default Locations;
