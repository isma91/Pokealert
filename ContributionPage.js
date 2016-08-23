import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Navigator,
} from 'react-native';
var Button = require('react-native-button');
var GLOBALS = require('./Globals');

class ContributionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemonName : "",
            jsonDataPokemon : [],
            login: "",
        };
    }

    componentWillMount () {
        if(this.props.login === undefined) {
            this.setState({login: "anonymous"});
        } else {
            this.setState({login: this.props.login});
        }
    }

    goToHomePage () {
        this.props.navigator.pop();
    }

    findPokemonByName(pokemonName) {
        if (pokemonName.trim() !== "") {
            fetch(GLOBALS.URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "findAllPokemonByName",
                    pokemon: pokemonName
                })
            }).then((responseData) => {
                responseData = JSON.parse(responseData._bodyInit);
                if (responseData.error !== null) {
                    alert("Error while trying to get pokemon name !!\n" + responseData.error);
                } else {
                    this.state.jsonDataPokemon = responseData.data;
                }
            }).catch((error) => {
                alert("Error while trying to get pokemon name !!\n" + error);
            }).done();
        }
    }

    static sendPokemon(pokemon, login) {
        if (pokemon === null || isNaN(pokemon) || pokemon.trim() === "") {
            alert("The Pokemon name can't be empty !!");
        } else {
            date = new Date();
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
                            action: "sendPokemon",
                            user: login,
                            date: new Date().toISOString().slice(0, 19).replace('T', ' '),
                            latitude: parseFloat(position.coords.latitude.toString().substr(0, 7)),
                            longitude: parseFloat(position.coords.longitude.toString().substr(0, 6)),
                            idPokemon: pokemon
                        })
                    }).then((responseData) => {
                        responseData = JSON.parse(responseData._bodyInit);
                        if (responseData.error !== null) {
                            alert(responseData.error);
                        } else {
                            alert("Contribution done successfully !!");
                        }
                    }).catch((error) => {
                        console.warn(error);
                    }).done();
                },
                (error) => alert("Looks like an error in your GPS : " + error.message),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            );
        }
    };

    render() {
        var user = this.state.login;
        if(user === "anonymous") {
            userWarning = <Text style={styles.textWarning}>You're not connected !! All you're contribution are gonna be added as anonymous</Text>;
        } else {
            userWarning = <Text style={styles.text}>Let's contribute {user} !!</Text>;
        }
        contentPokemon = this.state.jsonDataPokemon.map(function (pokemon) {
            return (
                <View Key={pokemon.id}>
                    <Button
                        style={styles.button}
                        containerStyle={styles.buttonContainer}
                        onPress={ContributionPage.sendPokemon.bind(this, pokemon.id, user)}>
                        {pokemon.name}
                    </Button>
                </View>
            );
        });
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        Welcome to the Contribution Page !!
                    </Text>
                    {userWarning}
                    <Button
                        onPress={this.goToHomePage.bind(this)}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Back to the Home Page
                    </Button>
                    <Text style={styles.text}>
                        Write the pokemon and click to his name to send !!
                    </Text>
                    <TextInput
                        onChangeText={(pokemonName) => this.setState({pokemonName})}
                        onChange={this.findPokemonByName(this.state.pokemonName)}
                    />
                    <View>
                        {contentPokemon}
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('Pokealert', () => ContributionPage);
module.exports = ContributionPage;