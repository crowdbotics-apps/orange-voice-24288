import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
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
  FormGroup,
  Label,
  Badge,
} from 'reactstrap';
import ToolkitProvider /* Search  */ from 'react-bootstrap-table2-toolkit';
import PanelHeader from '../../../components/PanelHeader/PanelHeader';

import {useDispatch, useSelector /* useSelector  */} from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {ExportToCsv} from 'export-to-csv';

import AssignModal from '../../../components/Modals/AssignModal';
import EditOrderModal from '../../../components/Modals/EditOrderDetailModal';
import OrderPdfModal from '../../../components/Modals/OrderPdfModal';
import {OrderActions} from '../../../store/actions/OrderActions';
import {OrderStatusArray} from '../../../store/constants/OrderConstants';
import moment from 'moment';
import StatusChangeConfModal from '../../../components/Modals/StatusChangeConfModal';
import {getPage} from '../../../utils';

function Orders({history}) {
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [statusObj, setStatusObj] = useState({newStatus: '', prevStatus: ''});
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [orderDate, setOrderDate] = useState(null);
  const [notValid, setNotValid] = useState({
    error: false,
    type: '',
    message: '',
  });

  const isProgressList = useSelector((store) => store?.order?.isProgressList);
  const isProgress = useSelector((store) => store?.order?.isProgress);
  const isProgressCSV = useSelector((store) => store?.order?.isProgressCSV);
  const orders = useSelector((store) => store?.order?.orders);
  const csvData = useSelector((store) => store?.order?.csvData);
  const paging = useSelector((store) => store?.order?.paging);
  const openEditModal = useSelector((store) => store?.order?.openEditModal);
  const openPdfModal = useSelector((store) => store?.order?.openPdfModal);
  const openStatusModal = useSelector((store) => store?.order?.openStatusModal);
  const dispatch = useDispatch();
  // const users = useSelector(store => store?.sampleReducer.posts);
  useEffect(() => {
    dispatch(OrderActions.getOrders());
  }, [dispatch]);

  const toggleAssignModal = useCallback(() => {
    setOpenAssignModal(!openAssignModal);
  }, [openAssignModal]);

  const getOrder = useCallback(
    (orderId, openPdf = false) => {
      dispatch(OrderActions.getOrder(orderId, openPdf));
    },
    [dispatch],
  );

  const toggleOrderPdfModal = useCallback(() => {
    dispatch(OrderActions.togglePdfOrderModal());
  }, [dispatch]);

  const onTableChange = useCallback(
    (type, newState) => {
      if (type === 'pagination')
        dispatch(
          OrderActions.getOrders(
            newState?.page,
            undefined,
            search,
            filterStatus,
          ),
        );
    },
    [dispatch, filterStatus, search],
  );

  const onSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (search) {
        setIsSearch(true);
        dispatch(OrderActions.getOrders(undefined, undefined, search));
      }
    },
    [dispatch, search],
  );

  useEffect(() => {
    if (isSearch && search === '') {
      setIsSearch(false);
      dispatch(OrderActions.getOrders(undefined, undefined, search));
    }
  }, [search, onSearch, isSearch, dispatch]);

  const getOrderByStatus = useCallback(
    (value) => {
      setFilterStatus(value);
      dispatch(
        OrderActions.getOrders(
          undefined,
          undefined,
          undefined,
          value,
          orderDate,
        ),
      );
    },
    [dispatch, orderDate],
  );

  const getOrderByDate = useCallback(
    (value) => {
      setFilterDate(value);
      let orderDate = {
        startDate: '',
        endDate: '',
      };
      if (value === 'Today') {
        orderDate['startDate'] = `${moment(new Date()).format('YYYY-MM-DD')}`;
        orderDate['endDate'] = `${moment(new Date()).format('YYYY-MM-DD')}`;
      } else if (value === 'Tomorrow') {
        orderDate['startDate'] = `${moment(new Date())
          .add(1, 'day')
          .format('YYYY-MM-DD')}`;
        orderDate['endDate'] = `${moment(new Date())
          .add(1, 'day')
          .format('YYYY-MM-DD')}`;
      } else if (value === 'This Week') {
        const today = moment();
        orderDate['startDate'] = `${today
          .startOf('week')
          .format('YYYY-MM-DD')}`;
        orderDate['endDate'] = `${today.endOf('week').format('YYYY-MM-DD')}`;
      } else {
        orderDate = null;
      }
      setOrderDate(orderDate);
      dispatch(
        OrderActions.getOrders(
          undefined,
          undefined,
          undefined,
          filterStatus,
          orderDate,
        ),
      );
    },
    [dispatch, filterStatus],
  );

  const onClickExportToCSV = useCallback(() => {
    if (notValid.error) {
      setNotValid({error: false, type: '', message: ''});
    }
   
    dispatch(OrderActions.getCSVData(filterStatus));
  }, [dispatch, filterStatus, notValid]);

  useEffect(() => {
    if (csvData) {
      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Orders',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        filename: 'orders',
      };

      const csvExporter = new ExportToCsv(options);

      csvExporter.generateCsv(csvData.map(item => {
        delete item.order_details
        delete item.address
        delete item.created_on
        delete item.modified_on
        delete item.driver
        return {
          ...item,
          deliveryAddress: item.deliveryAddress.replace(',', '')
        }
      }));
      dispatch(OrderActions.clearCSVData());
    }
  }, [csvData, dispatch]);

  const remote = {
    filter: false,
    pagination: true,
    sort: false,
    cellEdit: false,
  };
  const columns = [
    {
      dataField: 'id',
      text: '#',
    },
    {
      dataField: '',
      text: 'Customer',
      // eslint-disable-next-line react/display-name
      formatter: (cell, row) => {
        return (
          <div className="d-flex flex-column">
            <span>
              {row?.firstName} {row?.lastName}{' '}
            </span>
            <span>{row?.email}</span>
            <span>{row?.deliveryAddress}</span>
          </div>
        );
      },
      classes: 'w-25',
    },
    {
      dataField: 'pickupTime',
      text: 'Pickup Time',
      // eslint-disable-next-line react/display-name
      formatter: (cell, row) => {
        return (
          <div className="d-flex flex-column">
            <span> {cell}</span>
            <span>
              {' '}
              {row?.pickupDate && moment(row.pickupDate).format('DD-MM-YYYY')}
            </span>
          </div>
        );
      },
    },
    {
      dataField: 'dropoffTime',
      text: 'Dropoff Time',
      // eslint-disable-next-line react/display-name
      formatter: (cell, row) => {
        return (
          <div className="d-flex flex-column">
            <span> {cell}</span>
            <span>
              {' '}
              {row?.dropoffDate && moment(row.dropoffDate).format('DD-MM-YYYY')}
            </span>
          </div>
        );
      },
    },
    {
      dataField: 'totalAmount',
      text: 'Amount',
      // eslint-disable-next-line react/display-name
      formatter: (cell) => {
        return (
          <div className="d-flex flex-column">
            <span>${cell}</span>
          </div>
        );
      },
    },
    {
      dataField: 'status',
      text: 'Status',
      // eslint-disable-next-line react/display-name
      formatter: (cell, row, rowIndex) => {
        // let statusIndex;
        let statuses = {...OrderStatusArray};
        // Object.keys(OrderStatusArray).filter(function(key, i) {
        //     if(key === cell)
        //         statusIndex = i;
        //     if(statusIndex === undefined)
        //         delete statuses[key];
        // });
        return (
          <div>
            <FormGroup>
              <Input
                type="select"
                value={cell}
                onChange={(e) => {
                  setStatusObj({
                    newStatus: e.target.value,
                    prevStatus: cell,
                  });
                  dispatch(OrderActions.toggleStatusModal(rowIndex));
                }}
                name="select">
                {Object.keys(statuses).map((key, i) => (
                  <option key={i} value={key}>
                    {statuses[key]}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </div>
        );
      },
    },
    {
      dataField: 'action',
      text: 'Action',
      // eslint-disable-next-line react/display-name
      formatter: (cell, row, rowIndex) => {
        return (
          <div className="d-flex">
            <Button
              className="btn-round btn-icon btn-icon-mini btn-neutral"
              color="info"
              id={`edit-order-${rowIndex}`}
              type="button"
              onClick={() => getOrder(row?.id)}>
              <i className=" far fa-edit"></i>
            </Button>
            <UncontrolledTooltip delay={0} target={`edit-order-${rowIndex}`}>
              Edit Task
            </UncontrolledTooltip>
            <Button
              className="btn-round btn-icon btn-icon-mini btn-neutral"
              color="info"
              id={`pdf-order-${rowIndex}`}
              type="button"
              onClick={() => getOrder(row?.id, true)}>
              <i className=" fas fa-file-pdf"></i>
            </Button>
            <UncontrolledTooltip delay={0} target={`pdf-order-${rowIndex}`}>
              Download PDF
            </UncontrolledTooltip>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card className="">
              <CardHeader className="">
                <Row>
                  <Col lg="2">
                    <CardTitle tag="h4">
                      Orders
                      <Button
                        className="btn-primary btn-add ml-2"
                        onClick={() => history.push('/admin/customers')}>
                        <i className="fas fa-plus"></i>
                      </Button>
                    </CardTitle>
                  </Col>
                  <Col lg="2">
                    <FormGroup className="col-md-12">
                      <Label for="exampleSelect">Status</Label>
                      <Input
                        type="select"
                        value={filterStatus}
                        onChange={(e) => getOrderByStatus(e.target.value)}
                        name="select"
                        id="exampleSelect">
                        <option value={''}>All</option>
                        {Object.keys(OrderStatusArray).map((key, i) => (
                          <option key={i} value={key}>
                            {OrderStatusArray[key]}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                    {notValid.error && notValid.type === 'orderStatus' && (
                      <label className=" ml-3 text-danger">
                        {notValid.message}
                      </label>
                    )}
                  </Col>
                  <Col lg="2">
                    <FormGroup className="col-md-12">
                      <Label for="exampleSelect">Time</Label>
                      <Input
                        type="select"
                        value={filterDate}
                        onChange={(e) => getOrderByDate(e.target.value)}
                        name="select"
                        id="exampleSelect">
                        <option value={''}>All</option>
                        <option value="Today">Today</option>
                        <option value={'Tomorrow'}>Tomorrow</option>
                        <option value={'This Week'}>This Week</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col lg="4" className="">
                    <form onSubmit={onSearch} className=" col-md-12 mt-3">
                      <InputGroup className=" no-border">
                        <Input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className=""
                          placeholder="Search..."
                        />
                        <InputGroupAddon addonType="append" onClick={onSearch}>
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_zoom-bold" />
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </form>
                  </Col>
                  <Col
                    lg="2"
                    className="d-flex justify-content-center align-items-start mt-2">
                    <Button
                      size={'md'}
                      onClick={onClickExportToCSV}
                      type={'button'}
                      className=" btn-primary btn-round">
                      {isProgressCSV ? (
                        <div className="spinner spinner-danger"></div>
                      ) : (
                        'Export to CSV'
                      )}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {isProgressList ? (
                  <div className="spinner-lg"></div>
                ) : (
                  <>
                    <Badge color="primary">{paging.count} Orders</Badge>
                    <ToolkitProvider
                      keyField="id"
                      data={orders}
                      columns={columns}
                      bootstrap4={true}
                      responsive>
                      {(props) => (
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
                            pagination={paginationFactory({
                              page: getPage(paging),
                              sizePerPage: 10,
                              totalSize: paging.count,
                              hideSizePerPage: true,
                            })}
                          />
                        </div>
                      )}
                    </ToolkitProvider>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <AssignModal isOpen={openAssignModal} toggle={toggleAssignModal} />
        <EditOrderModal
          isOpen={openEditModal}
          toggle={() => dispatch(OrderActions.toggleEditOrderModal())}
        />
        <OrderPdfModal
          isOpen={openPdfModal}
          toggle={toggleOrderPdfModal}
          style={{maxWidth: '1600px', width: '80%'}}
        />

        <StatusChangeConfModal
          isOpen={openStatusModal}
          toggle={() => dispatch(OrderActions.toggleStatusModal())}
          isProgress={isProgress}
          newStatus={statusObj.newStatus}
          prevStatus={statusObj.prevStatus}
        />
      </div>
    </>
  );
}
Orders.propTypes = {
  baseProps: PropTypes.object,
  history: PropTypes.object,
};

export default Orders;
