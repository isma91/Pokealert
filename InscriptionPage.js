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

class InscriptionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            login: "",
            password: "",
            confirmPassword: ""
        }
    }

    goToHomePage () {
        this.props.navigator.pop();
    }

     signUp () {
         errorSignUp = "";
         if (this.state.firstName.trim() === "") {
             errorSignUp = errorSignUp + "Firstname empty !!\n";
         }
         if (this.state.lastName.trim() === "") {
             errorSignUp = errorSignUp + "Lastname empty !!\n";
         }
         if (this.state.login.trim() === "") {
             errorSignUp = errorSignUp + "Login empty !!\n";
         }
         if (this.state.login.trim() === "anonymous") {
             errorSignUp = errorSignUp + "This login can't be taked !!\n";
         }
         if (this.state.password === "") {
             errorSignUp = errorSignUp + "Password empty !!\n";
         }
         if (this.state.confirmPassword === "") {
             errorSignUp = errorSignUp + "Confirm Password empty !!\n";
         }
         if (errorSignUp !== "") {
             Alert.alert("Some trouble here !!", errorSignUp);
         } else {
             if (this.state.password !== this.state.confirmPassword) {
                 Alert.alert("Some trouble here !!", "Password and Confirm Password are not the same !!");
             } else {
                 fetch(GLOBALS.URL, {
                     method: 'POST',
                     headers: {
                         'Accept': 'application/json',
                         'Content-Type': 'application/json'
                     },
                     body: JSON.stringify({
                         action: "signUp",
                         lastname: this.state.lastName,
                         firstname: this.state.firstName,
                         login: this.state.login,
                         password: this.state.password,
                         confirmPassword: this.state.confirmPassword,
                     })
                 }).then((responseData) => {
                     responseData = JSON.parse(responseData._bodyInit);
                     if(responseData.error !== null) {
                         Aert.alert("Error !!", responseData.error);
                     } else {
                         Alert.alert("Success !!", "You are successfully registred !! You are now redirected to the Home page !!");
                         this.props.navigator.pop();
                     }
                 }).catch((error) => {
                     Alert.alert("Error !!", "Error while trying to add the account to the server !!" + error.message);
                 }).done();
             }
         }
     }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        Welcome to the Inscription Page !!
                    </Text>
                    <Button
                        onPress={this.goToHomePage.bind(this)}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Back to the Home Page
                    </Button>
                    <Text style={styles.text}></Text>
                    <Text style={styles.text}>Lastname</Text>
                    <TextInput
                        onChangeText={(lastName) => this.setState({lastName})}
                        value={this.state.lastName}
                    />
                    <Text style={styles.text}>Firstname</Text>
                    <TextInput
                        onChangeText={(firstName) => this.setState({firstName})}
                        value={this.state.firstName}
                    />
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
                    <Text style={styles.text}>Confirm your Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                        value={this.state.confirmPassword}
                    />
                    <Button
                        onPress={this.signUp.bind(this)}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Sign Up
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

AppRegistry.registerComponent('Pokealert', () => InscriptionPage);
module.exports = InscriptionPage;