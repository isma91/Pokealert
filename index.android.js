import React, { Component } from 'react';
import {
    AppRegistry,
    Navigator,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
var HomePage = require("./HomePage");
var ContributionPage = require('./ContributionPage');
var ConsultationPage = require('./ConsultationPage');
var InscriptionPage = require('./InscriptionPage');
var ConnexionPage = require('./ConnexionPage');

class Pokealert extends Component {

    renderScene(route, navigation) {
        if (route.pageName === "HomePage") {
            return <HomePage navigator={navigation} {...route.passProps}/>
        } else if (route.pageName === "ContributionPage") {
            return <ContributionPage navigator={navigation} {...route.passProps}/>
        } else if (route.pageName === "ConsultationPage") {
            return <ConsultationPage navigator={navigation} {...route.passProps}/>
        } else if (route.pageName === "InscriptionPage") {
            return <InscriptionPage navigator={navigation} {...route.passProps}/>
        } else if (route.pageName === "ConnexionPage") {
            return <ConnexionPage navigator={navigation} {...route.passProps}/>
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Navigator
                    initialRoute={{pageName: "HomePage"}}
                    renderScene={this.renderScene.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

AppRegistry.registerComponent('Pokealert', () => Pokealert);