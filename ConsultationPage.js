import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Picker,
} from 'react-native';
var GLOBALS = require('./Globals');
var Button = require('react-native-button');
Mapbox.setAccessToken(GLOBALS.MAPTOKEN);

class ConsultationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center : {
                latitude : 0,
                longitude : 0
            },
            interval : 10,
            annotations: [],
        };
    }

    goToHomePage () {
        this.props.navigator.pop();
    }

    goToActualPosition (key, value) {
        if (value == undefined) {
            value = 10;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                position = JSON.stringify(position);
                position = JSON.parse(position);
                fetch(GLOBALS.URL, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: "findAllPokemonByLocation",
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        interval: value,
                    })
                }).then((responseData) => {
                    responseData = JSON.parse(responseData._bodyInit);
                    this.setState({annotations: []});
                    if (responseData.error !== null) {
                        alert(responseData.error);
                    } else {
                        if (responseData.data.length == 0) {
                            alert("No pokemon in this area !!");
                        } else {
                            for (var i = 0; i < responseData.data.length; i++) {
                                this.setState({
                                    annotations: [...this.state.annotations, {
                                        coordinates: [parseFloat(responseData.data[i].latitude), parseFloat(responseData.data[i].longitude)],
                                        type: "point",
                                        title: responseData.data[i].name,
                                        subtitle: "found at " + responseData.data[i].date,
                                        id: responseData.data[i].id
                                    }]
                                })
                            }
                        }
                        this.setState({
                            annotations: [...this.state.annotations, {
                                coordinates : [[position.coords.latitude - 0.0002, position.coords.longitude + 0.0002],
                                    [position.coords.latitude, position.coords.longitude + 0.0002],
                                    [position.coords.latitude + 0.0002, position.coords.longitude + 0.0002],
                                    [position.coords.latitude + 0.0002, position.coords.longitude],
                                    [position.coords.latitude + 0.0002, position.coords.longitude - 0.0002],
                                    [position.coords.latitude, position.coords.longitude - 0.0002],
                                    [position.coords.latitude - 0.0002, position.coords.longitude - 0.0002],
                                    [position.coords.latitude - 0.0002, position.coords.longitude],
                                    [position.coords.latitude - 0.0002, position.coords.longitude + 0.0002]],
                                type: "polyline",
                                strokeColor: "#000000",
                                strokeAlpha: 1,
                                strokeWidth: 5,
                                id: "area"
                            }]
                        });
                    }
                }).catch((error) => {
                    alert("Error while trying to get all pokemon in your area !!\n" + error);
                }).done();
                this._map.setCenterCoordinate(position.coords.latitude, position.coords.longitude, true);
                setTimeout(() => {this._map.easeTo({ pitch : 80})}, 1000);
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
                <Picker
                    selectedValue={this.state.interval}
                    onValueChange={this.goToActualPosition.bind(this, "interval")}
                >
                    <Picker.Item label="less than 10 min" value={10} />
                    <Picker.Item label="less than 20 min" value={20} />
                    <Picker.Item label="less than 30 min" value={30} />
                </Picker>
                <MapView
                    ref={map => { this._map = map; }}
                    style={styles.map}
                    annotations={this.state.annotations}
                    annotationsAreImmutable={true}
                    styleURL={Mapbox.mapStyles.streets}
                    showsUserLocation={false}
                    zoomEnabled={true}
                    initialZoomLevel={19}
                    initialCenterCoordinate={this.state.center}
                    logoIsHidden={true}
                    compassIsHidden={false}
                    onFinishLoadingMap={this.goToActualPosition.bind(this, this.state.interval)}
                    onUpdateUserLocation={this.goToActualPosition.bind(this, "interval")}
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