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

class Pokealert extends Component {

   renderScene(route, navigation) {
     if (route.pageName === "HomePage") {
      return <HomePage navigator={navigation}/>
    } else if (route.pageName === "ContributionPage") {
      return <ContributionPage navigator={navigation}/>
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
  welcome: {
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

AppRegistry.registerComponent('Pokealert', () => Pokealert);