
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
import DeleteModal from '../../../components/Modals/DeleteModal';
import { useSelector, useDispatch } from 'react-redux';
import { FaqActions } from '../../../store/actions/FaqActions';
import AddFaqModal from '../../../components/Modals/AddFaqModal';
import EditFaqModal from '../../../components/Modals/EditFaqModal';

function AppFaq() {
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const openDeleteModal = useSelector(store => store?.faq?.openDelModal);
    const isProgress = useSelector(store => store?.faq?.isProgressList);
    const faq = useSelector(store => store?.faq?.faq);
    const faqs = useSelector(store => store?.faq?.faqs);
    const paging = useSelector(store => store?.faq?.paging);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FaqActions.getFaqs());
    }, [dispatch]);





    const remote = {
        filter: false,
        pagination: true,
        sort: false,
        cellEdit: false
    };
    const onTableChange = useCallback((type, newState) => {
        if (type === 'pagination')
            dispatch(FaqActions.getFaqs(newState?.page, undefined, search));
    }, [dispatch, search]);


    const onSearch = useCallback((e) => {
        e.preventDefault();
        if (search) {
            setIsSearch(true);
            dispatch(FaqActions.getFaqs(undefined, undefined, search));
        }

    }, [dispatch, search]);


    useEffect(() => {
        if (isSearch && search === '') {
            setIsSearch(false);
            dispatch(FaqActions.getFaqs(undefined, undefined, search));
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
            dataField: 'question',
            text: 'Title',
            classes: 'w-25'
        },
        {
            dataField: 'answer',
            text: 'Description',
            classes: 'w-50'

        },
        {
            dataField: 'action',
            text: 'Action',
            // eslint-disable-next-line react/display-name
            formatter: (_cell, _row, rowIndex) => {
                return (
                    <div>
                        <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id={`edit-order-${rowIndex}`}
                            type="button"
                            onClick={() => dispatch(FaqActions.toggleEditFaqModal(rowIndex))}
                        >
                            <i className="fas fa-edit" />
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
                            id={`tooltip-${rowIndex}`}
                            type="button"
                            onClick={() => dispatch(FaqActions.toggleDelFaqModal(rowIndex))}
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
                                <CardTitle tag="h4">App Faqs
                                <Button
                                        className="btn-primary btn-add ml-2"
                                        onClick={() => dispatch(FaqActions.toggleAddFaqModal())} >
                                        <i className="fas fa-plus"></i>
                                    </Button>
                                </CardTitle>
                                <form onSubmit={onSearch} className="col-md-8 align-self-center " >
                                    <InputGroup className=" no-border">
                                        <Input value={search} onChange={(e) => setSearch(e.target.value)} className="" placeholder="Search..." />
                                        <InputGroupAddon addonType="append" onClick={onSearch} >
                                            <InputGroupText>
                                                <i className="now-ui-icons ui-1_zoom-bold  " />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </form>
                            </CardHeader>
                            <CardBody>
                                {isProgress ?
                                    <div className='spinner-lg' ></div> :
                                    <>
                                        <Badge color="primary">{paging.totalCount}{' Faq\'s'}</Badge>
                                        <ToolkitProvider
                                            keyField='id'
                                            data={faqs}
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
                <AddFaqModal />
                <EditFaqModal />
                {openDeleteModal && <DeleteModal isOpen={openDeleteModal} toggle={() => dispatch(FaqActions.toggleDelFaqModal())} isProgress={isProgress} delFunc={() => dispatch(FaqActions.delFaq(faq?.id))} />}

            </div>
        </>
    );
}

AppFaq.propTypes = {
    baseProps: PropTypes.object
};
export default AppFaq;
