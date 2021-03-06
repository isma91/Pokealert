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

class SearchProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            login: "",
            userContribution: [],
            userMarkContribution : [],
            userWantedList : [],
            jsonDataLogin: [],
            userSearch : "",
        }
    }

    goToHomePage () {
        this.props.navigator.pop();
    }

    findAllLoginByName(loginToFind) {
        if (loginToFind.trim() !== "") {
            fetch(GLOBALS.URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: "findAllLoginByName",
                    login: loginToFind
                })
            }).then((responseData) => {
                responseData = JSON.parse(responseData._bodyInit);
                if (responseData.error !== null) {
                    Alert.alert("Error while trying to get all login !!", responseData.error);
                } else {
                    this.state.jsonDataLogin = responseData.data;
                }
            }).catch((error) => {
                Alert.alert("Error", "Error while trying to get login name !!\n" + error.message);
            }).done();
        }
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
                this.setState({login: responseData.data.profile.login});
                this.setState({lastName: responseData.data.profile.lastname});
                this.setState({firstName: responseData.data.profile.firstname});
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
                    for (var j = 0; j < responseData.data.mark.length - 1; j++) {
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
            Alert.alert("Error", "Error while trying to get the profile !!" + error.message);
        }).done();
    }

    render() {
        var classInstance = this;
        contentUser = this.state.jsonDataLogin.map(function (user) {
            return (
                <View Key={user.id}>
                    <Button
                        style={styles.button}
                        containerStyle={styles.buttonContainer}
                        onPress={classInstance.getUserProfile.bind(classInstance, user.id)}>
                        {user.login}
                    </Button>
                </View>
            );
        });
        var login = this.state.login;
        var lastname = this.state.lastName;
        var firstname = this.state.firstName;
        var userMarkContribution = this.state.userMarkContribution;
        var userContribution = this.state.userContribution;
        contentUserContribution = <View></View>;
        contentUserMarkContribution = <View></View>;
        contentUserWantedList = <View></View>;
        if(lastname !== '') {
            contentUser = <View>
                <Text style={styles.textBold}>
                    here is the summary of the user you searched !!
                </Text>
                <Text style={styles.text}>
                    Lastname => {lastname}
                </Text>
                <Text style={styles.text}>
                    Firstname => {firstname}
                </Text>
                <Text style={styles.text}>
                    Login => {login}
                </Text>
            </View>;
            if(userMarkContribution.length !== 0) {
                contentUserContribution = userContribution.map(function(contribution) {
                    return (
                        <View Key={contribution.id}>
                            <Text style={styles.text}>
                                Contributed for the pokemon {contribution.pokemon} at {contribution.date} with an actuall score of {contribution.score}
                            </Text>
                        </View>
                    );
                });
            } else {
                contentUserContribution = <View>
                    <Text style={styles.textBold}>
                        No contribution yet !!
                    </Text>
                </View>;
            }
            if(userMarkContribution.length !== 0) {
                contentUserMarkContribution = userMarkContribution.map(function(markContribution) {
                    return (
                        <View Key={markContribution.id}>
                            <Text style={styles.text}>
                                voted for the contribution of {markContribution.login} who find a {markContribution.pokemon} at {markContribution.date}
                            </Text>
                        </View>
                    );
                });
            } else {
                contentUserMarkContribution = <View>
                    <Text style={styles.textBold}>
                        No vote on contribution yet !!
                    </Text>
                </View>;
            }
            var userWantedList = this.state.userWantedList;
            if(userWantedList.length !== 0) {
                contentUserWantedList = userWantedList.map(function(wantedList) {
                    return (
                        <View Key={wantedList.id}>
                            <Text style={styles.text}>
                                Wanted {wantedList.name}
                            </Text>
                        </View>
                    );
                });
            } else {
                contentUserWantedList = <View>
                    <Text style={styles.text}>
                        No pokemon in his wanted list !!
                    </Text>
                </View>;
            }
        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        Welcome to the search profile Page !!
                    </Text>
                    <Button
                        onPress={this.goToHomePage.bind(this)}
                        containerStyle={styles.buttonContainer}
                        style={styles.button}>
                        Back to the Home Page
                    </Button>
                    <Text style={styles.text}>
                        Write the user's login and click to his login to see his summary !!
                    </Text>
                    <TextInput
                        onChangeText={(userSearch) => this.setState({userSearch})}
                        onChange={this.findAllLoginByName(this.state.userSearch)}
                    />
                    {contentUser}
                    {contentUserContribution}
                    {contentUserMarkContribution}
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

AppRegistry.registerComponent('Pokealert', () => SearchProfilePage);
module.exports = SearchProfilePage;