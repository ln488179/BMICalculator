import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, TextInput, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const key = '@MyApp:key';

export default class App extends Component {
  state = {
    weight: 0,
    height: 0,
    bmi: 0,
    storedValue: 0,
  };

  //componentWillMount() {
    constructor(props){
      super(props);
        this.onLoad();
  }

  onLoad = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      this.setState({ storedValue });
      this.setState({ height: storedValue })
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  }

  onSave = async () => {
    const { height } = this.state;
    const { weight } = this.state;
    const bmi = ((weight / (height * height)) * 703);
    this.setState({ bmi: bmi.toFixed(1) }) 
    try {
      await AsyncStorage.setItem(key, height);
      //Alert.alert('Saved', 'Successfully saved on device'+bmi);
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
  }

  onChangeW = (weight) => {
    this.setState({ weight });
  }
  onChangeH = (height) => {
    this.setState({ height });
  }

  render() {
    const { weight, height , bmi} = this.state;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.toolbar}>BMI Calculator</Text>
      <ScrollView style={styles.body}>
        <TextInput
            style={styles.input}
            onChangeText={this.onChangeW}
            value={weight}
            placeholder="Weight in Pounds"
        />
        <TextInput
            style={styles.input}
            onChangeText={this.onChangeH}
            value={height}
            placeholder="Height in Inches"
        />
        <TouchableOpacity onPress={this.onSave} >
            <Text style={styles.button}>Compute BMI</Text>
        </TouchableOpacity>
        <Text style={styles.result}>{bmi > 0 ? 'Body Mass Index is ' + bmi : ''}</Text>
        <Text style={styles.assessmentHeader}>Assessing Your BMI</Text>
        <Text style={styles.assessmentBody}>Underweight : less than 18.5</Text>
        <Text style={styles.assessmentBody}>Healthy: 18.5 to 24.9</Text>
        <Text style={styles.assessmentBody}>Overweight: 25.0 to 29.9</Text>
        <Text style={styles.assessmentBody}>Obese: 30.0 or higher</Text>
      </ScrollView>
    </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    padding: 5,
  },
  toolbar: {
    backgroundColor: '#f4511e',
    color: '#fff',
    textAlign: 'center',
    padding: 25,
    fontSize: 28,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    height: 40,
    padding: 10,
    marginBottom: 10,
    fontSize: 24,
  },
  button: {
    backgroundColor: '#34495e',
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
    fontSize: 24,
  },
  result: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 28,
  },
  assessmentHeader: {
    padding: 10,
    paddingTop: 50,
    fontSize: 20,
  },
  assessmentBody: {
    paddingLeft: 30,
    fontSize: 20,
  },
});
