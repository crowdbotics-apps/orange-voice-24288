
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
    Badge,
} from 'reactstrap';
// core components
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux';
import { VoucherActions } from '../../../store/actions/VoucherActions';
import DeleteModal from '../../../components/Modals/DeleteModal';
import moment from 'moment';



function Vouchers({ history }) {


    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const openDeleteModal = useSelector(store => store?.voucher?.openDelModal);
    const isProgressList = useSelector(store => store?.voucher?.isProgressList);
    const isProgress = useSelector(store => store?.voucher?.isProgress);
    const voucher = useSelector(store => store?.voucher?.voucher);
    const vouchers = useSelector(store => store?.voucher?.vouchers);
    const paging = useSelector(store => store?.voucher?.paging);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(VoucherActions.getVouchers());
    }, [dispatch]);


    const onTableChange = useCallback((type, newState) => {
        if (type === 'pagination')
            dispatch(VoucherActions.getVouchers(newState?.page, undefined, search));
    }, [dispatch, search]);

    const onSearch = useCallback((e) => {
        e.preventDefault();
        if (search) {
            setIsSearch(true);
            dispatch(VoucherActions.getVouchers(undefined, undefined, search));
        }
    }, [dispatch, search]);

    useEffect(() => {
        if (isSearch && search === '') {
            setIsSearch(false);
            dispatch(VoucherActions.getVouchers(undefined, undefined, search));
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
            dataField: 'code',
            text: 'Coupon Code'
        },
        {
            dataField: 'validFrom',
            text: 'Valid From',
            // eslint-disable-next-line react/display-name
            formatter: (cell, ) => {
                return (<span>{moment(cell).format('DD/MM/YYYY')}</span>);
            }
        },
        {
            dataField: 'validTo',
            text: 'Valid Till',
            // eslint-disable-next-line react/display-name
            formatter: (cell, ) => {
                return (<span>{moment(cell).format('DD/MM/YYYY')}</span>);
            }
        },
        {
            dataField: 'offerValue',
            text: 'Offer Value',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row) => {
                if (row.offerType === 'Amount')
                    return (<span>${cell}</span>);
                else if (row.offerType === 'Percentage')
                    return (<span>{cell}%</span>);
            }
        },
        {
            dataField: 'minProduct',
            text: 'Min Products'
        },
        {
            dataField: 'minAmount',
            text: 'Min Amount',
            // eslint-disable-next-line react/display-name
            formatter: (cell) => {
                return (<span>${cell}</span>);
            }
        },
        {
            dataField: 'couponType',
            text: 'Coupon Type'
        },
        {
            dataField: 'offerType',
            text: 'Offer Type'
        },
        {
            dataField: 'numberRedeem',
            text: 'Number Redeem'
        },
        {
            dataField: 'maxRedeem',
            text: 'Max Redeem'
        },
        {
            dataField: 'isActive',
            text: 'Status',
            // eslint-disable-next-line react/display-name
            formatter: (cell) => {
                return (

                    cell ? 'Active' : 'InActive'
                );
            }
        },
        {
            dataField: 'action',
            text: 'Action',
            // eslint-disable-next-line react/display-name
            formatter: (cell, row, rowIndex) => {
                return (
                    <div style={{ width: '4.8rem' }} >
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`edit-order-${rowIndex}`}
                            type="button"
                            onClick={() => history.push({
                                pathname: '/admin/vouchers/update',
                                state: {
                                    voucher: vouchers[rowIndex]
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
                            onClick={() => dispatch(VoucherActions.toggleDelVoucherModal(rowIndex))}
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
                            <CardTitle tag="h4">Vouchers
                                <Button
                                    className="btn-primary btn-add ml-2"
                                    onClick={() => history.push('/admin/vouchers/add')} >
                                    <i className="fas fa-plus"></i>
                                </Button>
                            </CardTitle>
                            <form className="col-md-8 align-self-center " onSubmit={onSearch} >
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

                            {isProgressList ?
                                <div className='spinner-lg' ></div>

                                :
                                <>
                                    <Badge color="primary">{paging.totalCount} Vouchers</Badge>
                                    <ToolkitProvider
                                        keyField='id'
                                        data={vouchers}
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
            {openDeleteModal && <DeleteModal isOpen={openDeleteModal} toggle={() => dispatch(VoucherActions.toggleDelVoucherModal())} isProgress={isProgress} delFunc={() => dispatch(VoucherActions.delVoucher(voucher?.id))} />}

        </>
    );
}
Vouchers.propTypes = {
    baseProps: PropTypes.object,
    history: PropTypes.object
};

export default Vouchers;
