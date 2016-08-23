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
            login: "",
            loginToken: "",
            loginId: 0,
            jsonDataUserMarkContribution : [],
        };
    }

    componentWillMount () {
        if(this.props.login === undefined) {
            this.setState({login: "anonymous"});
            this.setState({loginToken: ""});
            this.setState({loginId: 0});
        } else {
            this.setState({login: this.props.login});
            this.setState({loginToken: this.props.token});
            this.setState({loginId: this.props.id});
        }
    }

    goToHomePage () {
        this.props.navigator.pop();
    }

    getAllUserMarkOnContribution () {
        if (this.state.login !== "anonymous") {
            fetch(GLOBALS.URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "getAllUserMarkOnContribution",
                    id: this.state.loginId,
                    token: this.state.loginToken,
                })
            }).then((responseData) => {
                responseData = JSON.parse(responseData._bodyInit);
                this.setState({jsonDataUserMarkContribution: responseData.data[0].contributionId});
                if (responseData.error !== null) {
                    alert(responseData.error);
                } else {
                }
            }).catch((error) => {
                alert("Error while trying to get all your mark on contributions !!\n" + error);
            }).done();
        }
    }

    goToActualPosition (key, value) {
        this.getAllUserMarkOnContribution();
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
                                //convert string to array of explode ";" and check if id = data[i].id => can't voted, else he can vote
                                if (this.state.jsonDataUserMarkContribution !== null) {
                                    this.setState({
                                        annotations: [...this.state.annotations, {
                                            coordinates: [parseFloat(responseData.data[i].latitude), parseFloat(responseData.data[i].longitude)],
                                            type: "point",
                                            title: responseData.data[i].name,
                                            subtitle: "found at " + responseData.data[i].date + " by " + responseData.data[i].username,
                                            id: responseData.data[i].id
                                        }]
                                    });
                                }
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
        var user = this.state.login;
        if(user === "anonymous") {
            userWarning = <Text style={styles.textWarning}>You're not connected !! You can't add or remove a mark on contributions !!!</Text>;
        } else {
            userWarning = <Text style={styles.text}>Here's the list of pokemon in your area {user} !!</Text>;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Welcome to the Consultation Page !!
                </Text>
                {userWarning}
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
                    initialZoomLevel={18}
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

    textWarning : {
        textAlign: 'center',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
        color: "#FF0000",
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
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