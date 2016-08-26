import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
} from 'react-native';
var Button = require('react-native-button');

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    navigate (pageName) {
        this.props.navigator.push({
            pageName: pageName,
            passProps: {
                login: this.props.login,
                token: this.props.token,
                id: this.props.id,
            }
        })
    }

    logout () {
        this.props.navigator.push({
            pageName: "HomePage",
            passProps: {
                id: undefined,
                login: undefined,
                token: undefined,
            }
        });
    }

    displayButton () {
        if (this.props.id === undefined) {
            return (
                <View>
                    <Button
                        onPress={this.navigate.bind(this, "ConnexionPage")}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Connexion
                    </Button>
                </View>
            );
        } else {
            return (
                <View>
                    <Button
                        onPress={this.logout.bind(this)}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Logout
                    </Button>
                    <Button
                        onPress={this.navigate.bind(this, "ProfilePage")}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Profile
                    </Button>
                    <Button
                        onPress={this.navigate.bind(this, "SearchProfilePage")}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Search Profile
                    </Button>
                    <Button
                        onPress={this.navigate.bind(this, "WantedPokemonPage")}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Wanted Pokemon List
                    </Button>
                </View>
            );
        }
    }

    render() {
        if (this.props.id === undefined) {
            welcomeUser = "You're not loged yet !!";
        } else {
            welcomeUser = "Welcome " + this.props.login + " !!";
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        Welcome to PokeAlert !!
                    </Text>
                    <Text style={styles.text}>{welcomeUser}</Text>
                    <Button
                        onPress={this.navigate.bind(this, "ContributionPage")}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Add Pokemon
                    </Button>
                    <Button
                        onPress={this.navigate.bind(this, "ConsultationPage")}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        See Map
                    </Button>
                    <Button
                        onPress={this.navigate.bind(this, "InscriptionPage")}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Inscription
                    </Button>
                    {this.displayButton()}
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

AppRegistry.registerComponent('Pokealert', () => HomePage);
module.exports = HomePage;
