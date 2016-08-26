import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Navigator,
    Alert,
} from 'react-native';
var Button = require('react-native-button');
var GLOBALS = require('./Globals');

class WantedPokemonPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemonName: "",
            jsonDataPokemon: [],
            login: ""
        }
    }

    goToHomePage () {
        this.props.navigator.pop();
    }

    componentWillMount () {
        if(this.props.login === undefined) {
            this.setState({login: "anonymous"});
        } else {
            this.setState({login: this.props.login});
        }
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
                    Alert.alert("Error while trying to get pokemon name !!", responseData.error);
                } else {
                    this.state.jsonDataPokemon = responseData.data;
                }
            }).catch((error) => {
                Alert.alert("Error", "Error while trying to get pokemon name !!\n" + error.message);
            }).done();
        }
    }

    static addPokemonToWantedList(pokemon, login) {
        if (pokemon === null || isNaN(pokemon) || pokemon.trim() === "") {
            alert("The Pokemon name can't be empty !!");
        } else {
            fetch(GLOBALS.URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "addPokemonToWantedList",
                    user: login,
                    idPokemon: pokemon
                })
            }).then((responseData) => {
                responseData = JSON.parse(responseData._bodyInit);
                if (responseData.error !== null) {
                    Alert.alert("Error !!", responseData.error);
                } else {
                    Alert.alert("Success !!", "Pokemon added to the pokemon wanted list !!");
                }
            }).catch((error) => {
                Alert.alert("Error !!", "" + error.message);
            }).done();
        }
    };

    render() {
        var user = this.state.login;
        contentPokemon = this.state.jsonDataPokemon.map(function (pokemon) {
            return (
                <View Key={pokemon.id}>
                    <Button
                        style={styles.button}
                        containerStyle={styles.buttonContainer}
                        onPress={WantedPokemonPage.addPokemonToWantedList.bind(this, pokemon.id, user)}>
                        {pokemon.name}
                    </Button>
                </View>
            );
        });
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        Welcome to your wanted pokemon page !!
                    </Text>
                    <Button
                        onPress={this.goToHomePage.bind(this)}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Back to the Home Page
                    </Button>
                    <Text style={styles.text}>
                        Write the pokemon and click to his name to add to your wanted list !!
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
    text: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    textBold: {
        fontWeight: 'bold',
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

AppRegistry.registerComponent('Pokealert', () => WantedPokemonPage);
module.exports = WantedPokemonPage;