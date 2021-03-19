
import React, { useEffect, useCallback, useState } from 'react';
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
// core components
import PanelHeader from '../../../components/PanelHeader/PanelHeader';
// import { categoryData } from '../../../variables/general';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AddCategoryModal from '../../../components/Modals/AddCategoryModal';
import EditCategoryModal from '../../../components/Modals/EditCategoryModal';
import DeleteModal from '../../../components/Modals/DeleteModal';
import { useSelector, useDispatch } from 'react-redux';
import { CategoryActions } from '../../../store/actions/CategoryActions';
import { API_URL } from '../../../store/services/Config';


function Categories() {
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const openDeleteModal = useSelector(store => store?.category?.openDelModal);
    const isProgress = useSelector(store => store?.category?.isProgressList);
    const category = useSelector(store => store?.category?.category);
    const categories = useSelector(store => store?.category?.categories);
    const paging = useSelector(store => store?.category?.paging);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CategoryActions.getCategories());
    }, [dispatch]);


    const remote = {
        filter: false,
        pagination: true,
        sort: false,
        cellEdit: false
    };
    const onTableChange = useCallback((type, newState) => {
        if (type === 'pagination')
            dispatch(CategoryActions.getCategories(newState?.page, undefined, search));
    }, [dispatch, search]);


    const onSearch = useCallback((e) => {
        e.preventDefault();
        if (search) {
            setIsSearch(true);
            dispatch(CategoryActions.getCategories(undefined, undefined, search));
        }
    }, [dispatch, search]);


    useEffect(() => {
        if (isSearch && search === '') {
            setIsSearch(false);
            dispatch(CategoryActions.getCategories(undefined, undefined, search));
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
            classes: 'w-50'
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
                            onClick={() => dispatch(CategoryActions.toggleEditCategoryModal(rowIndex))}
                        >
                            <i className=" fas fa-edit"></i>
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
                            onClick={() => dispatch(CategoryActions.toggleDelCategoryModal(rowIndex))}
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
                                <CardTitle tag="h4">Categories
                                <Button
                                        className="btn-primary btn-add ml-2"
                                        onClick={() => dispatch(CategoryActions.toggleAddCategoryModal())} >
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
                                        <Badge color="primary">{paging.totalCount} Categories</Badge>
                                        <ToolkitProvider
                                            keyField={'id'}
                                            data={categories}
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
                <AddCategoryModal />
                <EditCategoryModal />
                {openDeleteModal && <DeleteModal isOpen={openDeleteModal} toggle={() => dispatch(CategoryActions.toggleDelCategoryModal())} isProgress={isProgress} delFunc={() => dispatch(CategoryActions.delCategory(category?.id))} />}
            </div>

        </>
    );
}
Categories.propTypes = {
    baseProps: PropTypes.object
};

export default Categories;
