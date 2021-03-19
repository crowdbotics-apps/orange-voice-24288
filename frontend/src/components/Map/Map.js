import React, { Component } from 'react';
import { compose, withProps } from 'recompose';
import PropTypes from 'prop-types';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: -1, lng: -1,
            mLat: -1,
            mLng: -1,
            showMarker: false,
        };

    }
    componentDidMount() {
        this.handlePermission();
    }
    handlePermission = () => {

        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
        });
    }
    addMarker = (e) => {
        let lat = e.latLng.lat();
        let lng = e.latLng.lng();
        this.props.onLocationSelect(lat, lng);
        this.setState({ showMarker: true, lat: lat, lng: lng });
    }
    MyMapComponent = compose(
        withProps({
            googleMapURL:
                'https://maps.googleapis.com/maps/api/js?key=AIzaSyDlMHMsN_lc1NDamUBcsyBvd2mh_UEoDfo&v=3.0exp&libraries=geometry,drawing,places',
            loadingElement: <div style={{ height: '100%' }} />,
            containerElement: <div style={{ height: `${this.props.height}` }} />,
            mapElement: <div style={{ height: '100%' }} />
        }),
        withGoogleMap
    )(props => {
        return (<GoogleMap defaultZoom={props.defaultZoom} defaultCenter={props.defaultCenter} onClick={props.onClick}  >
            {props.children}
        </GoogleMap>);
    }
    );

    render() {
        if (!this.props.lat)
            return (
                <>
                    {this.state.lat > 0 ?
                        <this.MyMapComponent defaultZoom={12} defaultCenter={{ lat: this.state.lat, lng: this.state.lng }} onClick={this.addMarker}>
                            {this.state.showMarker && (
                                <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
                            )}
                        </this.MyMapComponent>
                        :
                        <this.MyMapComponent defaultZoom={12} defaultCenter={{ lat: 24.892755, lng: 67.072342 }} onClick={this.addMarker}>
                            {this.state.showMarker && (
                                <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />
                            )}
                        </this.MyMapComponent>
                    }
                </>
            );
        else if (this.props.lat) {
            return (
                <>
                    <this.MyMapComponent defaultZoom={12} defaultCenter={{ lat: this.props.lat, lng: this.props.lng }} onClick={this.addMarker}>
                        {this.props.showMarker && (
                            <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />
                        )}
                    </this.MyMapComponent>
                </>
            );
        }
    }
}
Map.displayName = 'Map';
Map.propTypes = {
    showMarker: PropTypes.bool,
    lat: PropTypes.number,
    lng: PropTypes.number,
    height: PropTypes.string,
    onLocationSelect: PropTypes.func
};
export default Map;
