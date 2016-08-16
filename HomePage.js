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
    navigate (pageName) {
        this.props.navigator.push({
            pageName: pageName
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Welcome to PokeAlert !!
                </Text>
                <Text style={styles.text}>
                    To add a Pokemon, click to the "Contribution" button !!
                </Text>
                <Button
                    onPress={this.navigate.bind(this, "ContributionPage")}
                    containerStyle={styles.buttonContainer}
                    style={styles.button}>
                    Contribution
                </Button>
                <Text style={styles.text}>
                    To add see all Pokemon in your area, click to the "Consultation" button !!
                </Text>
                <Button
                    onPress={this.navigate.bind(this, "ConsultationPage")}
                    containerStyle={styles.buttonContainer}
                    style={styles.button}>
                    Consultation
                </Button>
                <Text style={styles.text}>
                    To sign up, click to the "Inscription" button !!
                </Text>
                <Button
                    onPress={this.navigate.bind(this, "InscriptionPage")}
                    containerStyle={styles.buttonContainer}
                    style={styles.button}>
                    Inscription
                </Button>
                <Text style={styles.text}>
                    To login, click to the "Connexion" button !!
                </Text>
                <Button
                    onPress={this.navigate.bind(this, "ConnexionPage")}
                    containerStyle={styles.buttonContainer}
                    style={styles.button}>
                    Connexion
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

AppRegistry.registerComponent('Pokealert', () => HomePage);
module.exports = HomePage;
