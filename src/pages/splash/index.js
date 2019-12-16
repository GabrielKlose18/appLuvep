import React, {Component} from 'react';
import {StackActions, NavigationActions } from 'react-navigation';
import { 
    StyleSheet, 
    View, 
    ImageBackground, 
    Image,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component{

    async componentDidMount(){     
      const usuas = JSON.parse(await AsyncStorage.getItem('@LuvepApp:usuas'));
      if(usuas){
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });
        setTimeout(() => {this.props.navigation.navigate('Home')}, 1000); // show toast after 2s
        
      }else{
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
          });
          setTimeout(() => {this.props.navigation.navigate('Login')}, 1000); // show toast after 2s
      }
    }
    
  render() {
    return (
      <View>
        <ImageBackground source={require('../../images/background_login.jpg')} style={styles.imgBackGround}>
            <View style={styles.container}>
                <Image 
                source={require('../../images/logo_luvep.png')} 
                style={styles.logo}
              />
            </View>
          </ImageBackground>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
    height: '100%'
  },
  logo: {
    width:260, 
    height: 110,
    marginVertical: 30
  },
  imgBackGround: {
    width: '100%', 
    height: '100%'
  },
});
