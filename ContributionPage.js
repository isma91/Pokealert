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
        console.log(this.state.pokemonName);
        /*if (this.pokemonName.trim() === "") {
            alert("The Pokemon name can't be empty !!");
        } else {
            date = new Date();
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
        }*/
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Welcome to the Contribution Page !!
                </Text>
                <Button
                    onPress={this.goToHomePage.bind(this)}
                    containerStyle={styles.buttonContainer}
                    style={styles.button}>
                    Back to the Home Page
                </Button>
                <Text style={styles.text}>
                    Send the form if you see a pokemon !
                </Text>
                <Text>
                    {this.state.pokemonName}
                </Text>
                <TextInput
                    onChangeText={(pokemonName) => this.setState({pokemonName})}
                />
                <Button
                    style={styles.button}
                    containerStyle={styles.buttonContainer}
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
    pokemonInput: {
        color: '#000000',
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