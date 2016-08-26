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
            userWantedList : [],
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
                this.setState({firstName: responseData.data.profile.firstname});
                this.setState({lastName: responseData.data.profile.lastname});
                this.setState({login: responseData.data.profile.login});
                var jsonDataUserContribution = [];
                var jsonDataUserMarkContribution = [];
                var jsonDataWantedList = [];
                if (responseData.data.contribution.length !== 0) {
                    for(var i = 0; i < responseData.data.contribution.length; i++) {
                        jsonDataUserContribution.push({
                            id: responseData.data.contribution[i][0].id,
                            pokemon: responseData.data.contribution[i][0].name,
                            date: responseData.data.contribution[i][0].date,
                            score: responseData.data.contribution[i][0].score,
                        });
                    }
                }
                if(responseData.data.mark.length !== 0) {
                    for (var j = 0; j < responseData.data.mark.length; j++) {
                        jsonDataUserMarkContribution.push({
                            id: responseData.data.mark[j][0].id,
                            login: responseData.data.mark[j][0].username,
                            date: responseData.data.mark[j][0].date,
                            pokemon: responseData.data.mark[j][0].name,
                        });
                    }
                    this.setState({userMarkContribution: jsonDataUserMarkContribution});
                }
                if(responseData.data.wanted.length !== 0) {
                    for (var k = 0; k < responseData.data.wanted.length; k++) {
                        jsonDataWantedList.push({
                            id: responseData.data.wanted[k][0].id,
                            name: responseData.data.wanted[k][0].name,
                        });
                    }
                    this.setState({userWantedList: jsonDataWantedList});
                }
                this.setState({userContribution: jsonDataUserContribution});
            }
        }).catch((error) => {
            Alert.alert("Error", "Error while trying to get your profile !!" + error.message);
        }).done();
    }

    componentWillMount() {
        this.getUserProfile(this.props.id);
    }

    render() {
        var userContribution = this.state.userContribution;
        if (userContribution.length === 0) {
            contentUserContribution = <View>
                <Text style={styles.text}>
                    You didn't have contributed yet !!
                </Text>
            </View>;
        } else {
            contentUserContribution = userContribution.map(function(contribution) {
                return (
                    <View Key={contribution.id}>
                        <Text style={styles.text}>
                            You contributed for the pokemon {contribution.pokemon} at {contribution.date} with an actuall score of {contribution.score}
                        </Text>
                    </View>
                );
            });
        }
        var userMarkContribution = this.state.userMarkContribution;
        if(userMarkContribution.length === 0) {
            contentUserMarkContribution = <View>
                <Text style={styles.text}>
                    You didn't have voted to a contribution yet !!
                </Text>
            </View>;
        } else {
            contentUserMarkContribution = userMarkContribution.map(function(markContribution) {
                return (
                    <View Key={markContribution.id}>
                        <Text style={styles.text}>
                            You voted for the contribution of {markContribution.login} who found a {markContribution.pokemon} at {markContribution.date}
                        </Text>
                    </View>
                );
            });
        }
        var userWantedList = this.state.userWantedList;
        if(userWantedList.length === 0) {
            contentUserWantedList = <View>
                <Text style={styles.text}>
                    You didn't add a pokemon in your wanted list !!
                </Text>
            </View>;
        } else {
            contentUserWantedList = userWantedList.map(function(wantedList) {
                return (
                    <View Key={wantedList.id}>
                        <Text style={styles.text}>
                            You wanted {wantedList.name}
                        </Text>
                    </View>
                );
            });
        }
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
                    <Text style={styles.text}>Lastname => {this.state.firstName}</Text>
                    <Text style={styles.text}>Firstname => {this.state.lastName}</Text>
                    <Text style={styles.text}>Login => {this.state.login}</Text>
                    <Text style={styles.textBold}>
                        Here is the list of all your contribution !!
                    </Text>
                    {contentUserContribution}
                    <Text style={styles.textBold}>
                        Here is the list of all your vote on contributions !!
                    </Text>
                    {contentUserMarkContribution}
                    <Text style={styles.textBold}>
                        Here is the list of your pokemon wanted list !!
                    </Text>
                    {contentUserWantedList}
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
        fontWeight : 'bold',
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