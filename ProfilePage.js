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

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            login: "",
            userContribution: [],
            userMarkContribution : [],
        }
    }

    goToHomePage () {
        this.props.navigator.pop();
    }

    getUserProfile(idUser) {
        fetch(GLOBALS.URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: "getUserProfile",
                idLogin: idUser,
            })
        }).then((responseData) => {
            responseData = JSON.parse(responseData._bodyInit);
            if (responseData.error !== null) {
                Alert.alert("Error !!", responseData.error);
            } else {
                if(responseData.data.userProfile.length === 0) {
                    Alert.alert("Wrong login !!", "This user doesn't exist !!");
                } else {
                    this.setState({firstName: responseData.data.userProfile[0].firstname});
                    this.setState({lastName: responseData.data.userProfile[0].lastname});
                    this.setState({login: responseData.data.userProfile[0].login});
                    if (responseData.data.userProfile[0].markContribution === null) {
                        this.setState({userMarkContribution: []});
                    }
                    var jsonDataUserCotribution = [];
                    for(var i = 0; i < responseData.data.userProfile.length; i++) {
                        jsonDataUserCotribution.push({
                            pokemon: responseData.data.userProfile[i].name,
                            date: responseData.data.userProfile[i].date,
                            score: responseData.data.userProfile[i].score,
                        });
                    }
                    this.setState({userContribution: jsonDataUserCotribution});
                    console.log(responseData.data.markContribution.length);
                    console.log(responseData.data.markContribution);
                }
            }
        }).catch((error) => {
            Alert.alert("Error", "Error while trying to get your profile !!" + error.message);
        }).done();
    }

    componentWillMount() {
        this.getUserProfile(this.props.id);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        Welcome to your profile Page !!
                    </Text>
                    <Button
                        onPress={this.goToHomePage.bind(this)}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Back to the Home Page
                    </Button>
                    <Text style={styles.text}>Lastname => </Text>
                    <Text style={styles.text}>Firstname => </Text>
                    <Text style={styles.text}>Login => </Text>
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

AppRegistry.registerComponent('Pokealert', () => ProfilePage);
module.exports = ProfilePage;