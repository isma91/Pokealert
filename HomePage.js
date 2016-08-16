import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
var Button = require('react-native-button');
var url = "http://192.168.56.1/pokealert_api/public_api/index.php";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Welcome to PokeAlert !!
                </Text>
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
    title: {
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

AppRegistry.registerComponent('Pokealert', () => HomePage);
module.exports = HomePage;