import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
} from 'react-native';
const accessToken = 'pk.eyJ1IjoiaXNtYTkxIiwiYSI6ImNpczA2bnl3NzAwMDEyem83NTQ0cHN0dTMifQ.grfJLqkKt9cjpAQusLI9_w';
Mapbox.setAccessToken(accessToken);
var Button = require('react-native-button');
var url = "http://192.168.56.1/pokealert_api/public_api/index.php";

class ConsultationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center : {
                //latitude : 48.9015,
                latitude : 0,
                //longitude : 2.32551
                longitude : 0
            },
            actualLatitude : 0,
            actualLongitude : 0,
        };
    }

    goToHomePage () {
        this.props.navigator.pop();
    }

    goToActualPosition () {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                position = JSON.stringify(position);
                position = JSON.parse(position);
                this._map.setCenterCoordinate(position.coords.latitude, position.coords.longitude, true);
            },
            (error) => alert("Looks like an error in your GPS : " + error.message),
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Welcome to the Consultation Page !!
                </Text>
                <Button
                    onPress={this.goToHomePage.bind(this)}
                    containerStyle={styles.buttonContainer}
                    style={styles.button}>
                    Back to the Home Page
                </Button>
                <Button
                    onPress={this.goToActualPosition.bind(this)}
                    containerStyle={styles.buttonContainer}
                    style={styles.button}>
                    Go to your position
                </Button>
                <MapView
                    ref={map => { this._map = map; }}
                    style={styles.map}
                    styleURL={Mapbox.mapStyles.streets}
                    showsUserLocation={false}
                    zoomEnabled={true}
                    initialZoomLevel={16}
                    initialCenterCoordinate={this.state.center}
                    logoIsHidden={true}
                    compassIsHidden={false}
                    onFinishLoadingMap={this.goToActualPosition.bind(this)}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    map: {
        flex : 1,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttonContainer : {
        marginTop: 10,
        padding:10,
        height:45,
        overflow:'hidden',
        borderRadius:4,
        backgroundColor: 'black',
        marginBottom: 10,
    },
    button: {
        color: "#FFFFFF",
    }
});

AppRegistry.registerComponent('Pokealert', () => ConsultationPage);
module.exports = ConsultationPage;