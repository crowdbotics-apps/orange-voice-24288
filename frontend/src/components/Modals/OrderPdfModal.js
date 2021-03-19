import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, Row, Col, Container, ModalFooter, ModalHeader, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from '../OrderPdf/OrderPdf';
import { useSelector } from 'react-redux';


const OrderPdfModal = ({ isOpen, toggle }) => {

    const [openPdf, setOpenPdf] = useState(false);
    const order = useSelector(store => store?.order?.order);

    useEffect(() => {

        if (isOpen) {
            setTimeout(() => {
                setOpenPdf(true);
            }, 100);
        }
        else {
            setOpenPdf(false);
        }
    }, [isOpen]);

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

    return (
        <Modal isOpen={isOpen} centered={true} toggle={toggle} size={'lg'}>
            <ModalHeader toggle={toggle} close={closeBtn}>
                Order Pdf
            </ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col md={12}>
                            {openPdf && <PDFViewer className='w-100' style={{ height: '30rem' }} ><PdfDocument order={order} /></PDFViewer>}
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter>
                {openPdf && <Button color='primary'><PDFDownloadLink document={<PdfDocument order={order} />} style={{ color: 'white' }} fileName={`${order?.orderNumber}.pdf`}>
                    {({ /* blob, url, */ loading,/*  error */ }) => (loading ? 'Loading document...' : 'Download Pdf')}
                </PDFDownloadLink></Button>}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

OrderPdfModal.displayName = 'OrderPdfModal';
OrderPdfModal.propTypes = {
    isOpen: PropTypes.bool,
    toggle: PropTypes.func
};

export default OrderPdfModal;