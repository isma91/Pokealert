import React, { Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    Picker,
    Alert,
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
                if (responseData.error !== null) {
                    Alert.alert("Error !!", responseData.error);
                } else {
                    this.state.jsonDataUserMarkContribution = responseData.data;
                }
            }).catch((error) => {
                Alert.alert("Error", "Error while trying to get all your mark on contributions !!" + error.message);
            }).done();
        }
    }

    addMark(idContribution) {
        if (this.state.login !== "anonymous") {
            fetch(GLOBALS.URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "addMark",
                    idLogin: this.state.loginId,
                    idContribution: idContribution,
                    tokenLogin: this.state.loginToken
                })
            }).then((responseData) => {
                responseData = JSON.parse(responseData._bodyInit);
                if (responseData.error !== null) {
                    Alert.alert("Error !!", responseData.error);
                } else {
                    this.goToActualPosition.bind(this, "interval");
                }
            }).catch((error) => {
                Alert.alert("Error", "Error while trying to add your mark on contributions !!" + error.message);
            }).done();
        }
        console.log(idContribution);
    }

    removeMark(idContribution) {
        if (this.state.login !== "anonymous") {
            fetch(GLOBALS.URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "removeMark",
                    idLogin: this.state.loginId,
                    idContribution: idContribution,
                    tokenLogin: this.state.loginToken
                })
            }).then((responseData) => {
                responseData = JSON.parse(responseData._bodyInit);
                if (responseData.error !== null) {
                    Alert.alert("Error !!", responseData.error);
                } else {
                    this.goToActualPosition.bind(this, "interval");
                }
            }).catch((error) => {
                Alert.alert("Error", "Error while trying to remove your mark on contributions !!" + error.message);
            }).done();
        }
    }

    sendMark = (annotation) => {
        if (this.state.login === "anonymous") {
            Alert.alert("Not connected !!", 'Pokemon => ' + annotation.title + ", " + annotation.subtitle);
        } else {
            var canContribuateMark = true;
            var canContribuateContribution = true;
            var userContributions = [];
            var userMarkContribution = [];
            if (this.state.jsonDataUserMarkContribution.length > 0) {
                if (this.state.jsonDataUserMarkContribution[0].contributionId !== null) {
                    userContributions = this.state.jsonDataUserMarkContribution[0].contributionId.split(';').filter(value => value != "");
                }
                if (this.state.jsonDataUserMarkContribution[0].markContribution !== null) {
                    userMarkContribution = this.state.jsonDataUserMarkContribution[0].markContribution.split(';').filter(value => value != "");
                }
            }
            if (userMarkContribution.length == 0) {
                canContribuateMark = true;
            } else {
                for (var i = 0; i < userMarkContribution.length; i++) {
                    console.log(userMarkContribution[i]);
                    if(userMarkContribution[i] == annotation.id) {
                        canContribuateMark = false;
                    }
                }
            }
            if (userContributions.length == 0) {
                canContribuateContribution = true;
            } else {
                for (var i = 0; i < userContributions.length; i++) {
                    if(userContributions[i] == annotation.id) {
                        canContribuateContribution = false;
                    }
                }
            }
            if(canContribuateMark === true && canContribuateContribution === true) {
                Alert.alert("Mark a contribution", "Pokemon => " + annotation.title + ", " + annotation.subtitle, [{text: "+ 1", onPress: () => this.addMark(annotation.id)}, {text: "- 1", onPress: () => this.RemoveMark(annotation.id)}]);
            } else if (canContribuateMark === true) {
                Alert.alert("This contribution is yours or you already voted !!", "Pokemon => " + annotation.title + ", " + annotation.subtitle);
            }
        }
    }

    goToActualPosition (key, value) {
        this.getAllUserMarkOnContribution();
        if (value == undefined) {
            value = 10;
        }
        var userContributions = [];
        var userMarkContribution = [];
        if (this.state.jsonDataUserMarkContribution.length > 0) {
            if (this.state.jsonDataUserMarkContribution[0].contributionId !== null) {
                userContributions = this.state.jsonDataUserMarkContribution[0].contributionId.split(';').filter(value => value != "");
            }
            if (this.state.jsonDataUserMarkContribution[0].markContribution !== null) {
                userMarkContribution = this.state.jsonDataUserMarkContribution[0].markContribution.split(';').filter(value => value != "");
            }
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
                        Alert.alert("Error !!", responseData.error);
                    } else {
                        if (responseData.data.length == 0) {
                            Alert.alert("No pokemon in this area !!", "Need to go elsewhere !!");
                        } else {
                            if (userContributions.length > 0) {
                                for (var j = 0; j < userContributions.length; j++) {
                                    for (var i = 0; i < responseData.data.length; i++) {
                                        if (userContributions[j] == responseData.data[i].id) {
                                            subtitleMarker = "You found him at " + responseData.data[i].date  + "\n Score => " + responseData.data[i].score;
                                        } else {
                                            subtitleMarker = "found at " + responseData.data[i].date + " by " + responseData.data[i].username + "\n Score => " + responseData.data[i].score;
                                        }
                                        this.setState({
                                            annotations: [...this.state.annotations, {
                                                coordinates: [parseFloat(responseData.data[i].latitude), parseFloat(responseData.data[i].longitude)],
                                                type: "point",
                                                title: responseData.data[i].name,
                                                subtitle: subtitleMarker,
                                                id: responseData.data[i].id
                                            }]
                                        });
                                    }
                                }
                            } else {
                                for (var i = 0; i < responseData.data.length; i++) {
                                    this.setState({
                                        annotations: [...this.state.annotations, {
                                            coordinates: [parseFloat(responseData.data[i].latitude), parseFloat(responseData.data[i].longitude)],
                                            type: "point",
                                            title: responseData.data[i].name,
                                            subtitle: "found at " + responseData.data[i].date + " by " + responseData.data[i].username + "\n Score => " + responseData.data[i].score,
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
                    Alert.alert("Error while trying to get all pokemon in your area !!", error);
                }).done();
                this._map.setCenterCoordinate(position.coords.latitude, position.coords.longitude, true);
                setTimeout(() => {this._map.easeTo({ pitch : 80})}, 1000);
            },
            (error) => Alert.alert("Error !!", "Looks like an error in your GPS" + error.message),
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
                    onOpenAnnotation={this.sendMark.bind(this)}
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