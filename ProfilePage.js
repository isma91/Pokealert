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
            ownFirstName: "",
            ownLastName: "",
            ownLogin: "",
            ownUserContribution: [],
            ownUserMarkContribution : [],
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
                this.setState({ownFirstName: responseData.data.profile.firstname});
                this.setState({ownLastName: responseData.data.profile.lastname});
                this.setState({ownLogin: responseData.data.profile.login});
                var jsonDataUserContribution = [];
                var jsonDataUserMarkContribution = [];
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
                    this.setState({ownUserMarkContribution: jsonDataUserMarkContribution});
                }
                this.setState({ownUserContribution: jsonDataUserContribution});
                //console.log(this.state);
            }
        }).catch((error) => {
            Alert.alert("Error", "Error while trying to get your profile !!" + error.message);
        }).done();
    }

    componentWillMount() {
        this.getUserProfile(this.props.id);
    }

    render() {
        var userContribution = this.state.ownUserContribution;
        if (userContribution.length === 0) {
            contentUserContribution = <View>
                <Text style={styles.text}>
                    You don't contribute yet !!
                </Text>
            </View>;
        } else {
            contentUserContribution = userContribution.map(function(contribution) {
                return (
                    <View Key={contribution.id}>
                        <Text style={styles.text}>
                            You contribute the pokemon {contribution.pokemon} at {contribution.date} with an actuall score of {contribution.score}
                        </Text>
                    </View>
                );
            });
        }
        var userMarkContribution = this.state.ownUserMarkContribution;
        if(userMarkContribution.length === 0) {
            contentUserMarkContribution = <View>
                <Text style={styles.text}>
                    You don't vote to a contribution yet !!
                </Text>
            </View>;
        } else {
            contentUserMarkContribution = userMarkContribution.map(function(markContribution) {
                return (
                    <View Key={markContribution.id}>
                        <Text style={styles.text}>
                            You vote the contribution of {markContribution.login} who find a {markContribution.pokemon} at {markContribution.date}
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
                    <Text style={styles.text}>Lastname => {this.state.ownFirstName}</Text>
                    <Text style={styles.text}>Firstname => {this.state.ownLastName}</Text>
                    <Text style={styles.text}>Login => {this.state.ownLogin}</Text>
                    <Text style={styles.text}>
                        Here is the list of all your contribution !!
                    </Text>
                    {contentUserContribution}
                    <Text style={styles.text}>
                        Here is the list of all your vote on contributions !!
                    </Text>
                    {contentUserMarkContribution}
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