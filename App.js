/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { List, ListItem, Header } from "react-native-elements";
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';


export default class App extends Component {

  state = {
    contactsArr: [],
  };

  componentDidMount() {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Contacts',
          'message': 'This app would like to view your contacts.'
        }
      ).then(() => {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            console.log(err);
          } else {
            this.setState({
              contactsArr: contacts
            })
          }
        })
      })
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    console.log(this.state.contactsArr);
    return (
      <View sty>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Contact List', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        {/* {
          this.state.contactsArr.map(item => (
            <ListItem
              subtitle={item.phoneNumbers[0]}
              title={`${item.givenName} ${item.familyName}`}
              avatar={{ uri: item.thumbnailPath || 'https://en.toppng.com/public/uploads/thumbnail//contacts-icon-galaxy-s6-11530957358ztr0pj3zte.png' }}
            />
          ))
        } */}
        {this.state.contactsArr && <FlatList
          keyExtractor={item => item.name}
          data={this.state.contactsArr}
          renderItem={({ item }) => (
            <ListItem
              key={item.givenName + '' + item.familyName}
              leftAvatar={{ source: { uri: item.thumbnailPath || 'https://en.toppng.com/public/uploads/thumbnail//contacts-icon-galaxy-s6-11530957358ztr0pj3zte.png' } }}
              title={`${item.givenName ? item.givenName : ''} ${item.familyName ? item.familyName : ''}`}
              subtitle={item.phoneNumbers.length > 0 ? item.phoneNumbers[0].number : 'Not Available'}
            />
          )}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
