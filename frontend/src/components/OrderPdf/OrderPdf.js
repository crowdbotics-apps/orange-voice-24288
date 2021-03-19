import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,

    // Image
} from '@react-pdf/renderer';
// import moment from 'moment';
import PropTypes from 'prop-types';
import moment from 'moment';

// const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        width: '100%'
    },
    section: {
        margin: 10,
        padding: 10,
        flex: 1
    },
    title1: {
        fontSize: 22
    },
    title2: {
        fontSize: 12
    },
    title3: {
        marginTop: 20,
        marginBottom: 10
    },
    ColumnNames: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#EB8725',
        color: 'white',
        paddingTop: 10,
        paddingBottom: 10
    },
    TableEntry: {
        fontSize: 12,
        borderRight: 2,
        padding: 5,
        borderColor: '#EB8725',
        width: '100%'
    },
    Table: {
        flexDirection: 'row',
        border: 2,
        borderColor: '#EB8725'
    },
    driverInstruction: {
        flex: 1,
        marginTop: 25
    }
});

function PdfDocument({ order }) {
    const listDetail = order?.listDetail;
    const address = order?.deliveryAddress;
    const orderNumber = order?.orderNumber;
    const firstName = order?.firstName;
    const lastName = order?.lastName;

    return (
        <Document filename={`${orderNumber}.pdf`} >
            <Page size="A3" style={styles.page} >
                <View style={styles.section}>
                    <Text style={styles.title1}>LaundrEZ</Text>
                    <Text style={styles.title2}>Date:{moment(new Date(order?.orderDate)).format('DD-MM-YYYY')}</Text>
                    <Text style={styles.title3}>Order Details:</Text>
                    <View style={styles.ColumnNames}>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>Name</Text>
                        <Text style={[styles.TableEntry, { flex: 2, }]}>Order#</Text>
                        <Text style={[styles.TableEntry, { flex: 7 }]}>Address</Text>
                        <Text style={[styles.TableEntry, { flex: 1.65 }]}>Order</Text>
                        <Text style={[styles.TableEntry, { flex: 0.7 }]}>Qty</Text>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>PickUp</Text>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>DropOff</Text>
                    </View>
                    <View style={styles.Table}>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>{firstName} {lastName}</Text>
                        <Text style={[styles.TableEntry, { flex: 2 }]}>{orderNumber}</Text>
                        <Text style={[styles.TableEntry, { flex: 7 }]}> {address} </Text>
                        <View style={{ flex: 3 }}>
                            {
                                listDetail?.map((detail, i) => {
                                    return (
                                        <View key={i} style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text style={[styles.TableEntry, { flex: 2 }]}>{detail?.service?.title}</Text>
                                            <Text style={[styles.TableEntry, { flex: 1 }]}>{detail?.quantity}</Text>
                                        </View>
                                    );
                                })
                            }
                        </View>
                        <Text style={[styles.TableEntry, { flex: 2 }]}> {order?.pickupTime} {moment(new Date(order?.pickupDate)).format('DD-MM-YYYY')} </Text>
                        <Text style={[styles.TableEntry, { flex: 2, borderRight: 0 }]}> {order?.dropoffTime} {moment(new Date(order?.dropoffDate)).format('DD-MM-YYYY')} </Text>
                    </View>
                    <View style={styles.driverInstruction} >
                        <Text>Driver Instruction:</Text>
                        <Text>{order?.description}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
PdfDocument.displayName = 'PdfDocument';
PdfDocument.propTypes = {
    order: PropTypes.object,
};
export default PdfDocument;