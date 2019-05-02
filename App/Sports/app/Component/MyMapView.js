import React from 'react';
import {
    Alert,
    Platform,
    StyleSheet
} from 'react-native';
import MapView, {Marker} from 'react-native-maps'

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
    latitude: 37.492368, 
    longitude: 126.824571,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
let id = 1;

export class MyMapView extends React.Component { 
    constructor(props){
        super(props);
    }

    showDetailView(e) {
        this.props.showDetail("123");
    }

    hideDetailView(e) {
        this.props.hideDetail("123");
    }

    map = null;

    state = {
        region: {
            latitude: 37.504398,
            longitude: 126.951803,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        ready: true,
        filteredMarkers: [],
        markers: [
            {
                key: 0,
                coordinate: {
                    longitude: 126.949892,
                    latitude: 37.505539
                }
            }
        ],
        showDetail: this.props.showDetail
    };
    
    setRegion(region) {
        if(this.state.ready) {
        setTimeout(() => this.map.mapview.animateToRegion(region), 10);
        }
        //this.setState({ region });
    }

    componentDidMount() {
        console.log('Component did mount');
        this.getCurrentPosition();
    }

    getCurrentPosition() {
        try {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            };
            this.setRegion(region);
            },
            (error) => {
            //TODO: better design
            switch (error.code) {
                case 1:
                if (Platform.OS === "ios") {
                    Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Privacidad - Localización");
                } else {
                    Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Apps - ExampleApp - Localización");
                }
                break;
                default:
                Alert.alert("", "Error al detectar tu locación");
            }
            }
        );
        } catch(e) {
        alert(e.message || "");
        }
    };

    onMapReady = (e) => {
        if(!this.state.ready) {
            this.setState({ready: true});
        }
    };

    onRegionChange = (region) => {
        console.log('onRegionChange', region);
    };

    onRegionChangeComplete = (region) => {
        console.log('onRegionChangeComplete', region);
    };

    onMapPress(e) {
        this.hideDetailView(e);
        // this.setState({
        // markers: [
        //     ...this.state.markers,
        //     {
        //         coordinate: e.nativeEvent.coordinate,
        //         key: id++
        //     },
        // ],
        // });
    }

    onMarkerPress(e) {
        this.showDetailView(e);
    }

    render() {

        const { region } = this.state;
        //const { children, renderMarker, markers } = this.props;

        return (
        <MapView
            showsUserLocation
            ref={ map => { this.map = map }}
            region={this.state.region} 
            onMapReady={this.onMapReady}
            showsMyLocationButton={false}
            onRegionChange={this.onRegionChange}
            onRegionChangeComplete={this.onRegionChangeComplete}
            style={styles.map}
            textStyle={{ color: '#bc8b00' }}
            containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}
            onPress={(e) => this.onMapPress(e)}>

            {this.state.markers.map(marker => (
                <Marker
                    key={marker.key}
                    coordinate={marker.coordinate}
                    onPress={(e) => this.onMarkerPress(e)}
                />
            ))}
            
        </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
   