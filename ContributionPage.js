import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Navigator,
} from 'react-native';
var Button = require('react-native-button');
var url = "http://192.168.56.1/pokealert_api/public_api/index.php";

class ContributionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemonName : ""
        };
    }

    goToHomePage () {
        this.props.navigator.pop();
    }

    sendPokemon() {
        date = new Date();
        console.log(date);
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: "test",
                date: "une date",
                location: "X Y Z",
                pokemon: "ratata"
            })
        })
        //.then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
            })
            .catch((error) => {
                console.warn(error);
            })
            .done();

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to PokeAlert !!
                </Text>
                <Text style={styles.instructions}>
                    Send the form if you see a pokemon !
                </Text>
                <TextInput
                    onChangeText={(pokemon_name) => this.setState({pokemon_name})}
                />
                <Button
                    style={{fontSize: 20, color: 'green'}}
                    styleDisabled={{color: 'red'}}
                    onPress={this.sendPokemon}>
                    Send
                </Button>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    pokemonInput: {
        color: '#000000',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('Pokealert', () => ContributionPage);
module.exports = ContributionPage;