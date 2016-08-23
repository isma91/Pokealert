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

class ConnexionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
        }
    }

    goToHomePage () {
        this.props.navigator.pop();
    }

    logIn () {
        errorLogIn = "";
        if (this.state.login === "") {
            errorLogIn = errorLogIn + "Login empty !!\n";
        }
        if (this.state.password === "") {
            errorLogIn = errorLogIn + "Password empty !!\n";
        }
        if (errorLogIn !== "") {
            alert(errorLogIn);
        } else {
            fetch(GLOBALS.URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "logIn",
                    login: this.state.login,
                    password: this.state.password
                })
            }).then((responseData) => {
                responseData = JSON.parse(responseData._bodyInit);
                if(responseData.error !== null) {
                    alert(responseData.error);
                } else {
                    alert("You are successfully loged !! You are now redirected to the Home page !!");
                    this.props.navigator.push({
                        pageName: "HomePage",
                        passProps: {
                            id: responseData.data.id,
                            login: responseData.data.login,
                            token: responseData.data.token
                        }
                    });
                }
            }).catch((error) => {
                alert("Error while trying to log in !!\n" + error);
            }).done();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        Welcome to the Connexion Page !!
                    </Text>
                    <Button
                        onPress={this.goToHomePage.bind(this)}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Back to the Home Page
                    </Button>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text}>Login</Text>
                    <TextInput
                        onChangeText={(login) => this.setState({login})}
                        value={this.state.login}
                    />
                    <Text style={styles.text}>Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <Button
                        onPress={this.logIn.bind(this)}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Log In
                    </Button>
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

AppRegistry.registerComponent('Pokealert', () => ConnexionPage);
module.exports = ConnexionPage;