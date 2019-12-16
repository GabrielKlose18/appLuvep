import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { 
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Text
} from 'react-native';

import Login from './login';
import RecuperarSenha from './recuperaSenha';
import Home from './home';
import Andamento from './andamento';
import Historico from './historico';
import Promocoes from './promocoes';
import Avaliacao from './avaliacao';
import Splash from './splash';

import PowerOff from '../components/powerOff';
import { fromLeft, fromRight, zoomIn, zoomOut } from 'react-navigation-transitions';
handleCreateAccountPress = () => {
    this.props.navigation.navigate('Login')
};
const handleCustomTransition = ({ scenes }) => {
    // const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];
    // console.log(prevScene.route.routeName);
    // console.log(nextScene.route.routeName);
    // Custom transitions go there
    if (nextScene && nextScene.route.routeName === 'Home') {
      return zoomIn(700);
    } else if (nextScene && nextScene.route.routeName === 'Login') {
      return zoomOut(700);
    }
    return fromRight(500);
  }

const TabNavigator = createBottomTabNavigator({
    Home :{
        screen: Home,
        navigationOptions : {
            title: 'Inicial',
            tabBarOptions: { 
                activeTintColor: '#4f88c4'
            },
            tabBarIcon: ({tintColor}) => 
                <Ionicons
                    name="md-home"
                    size={30}
                    color={tintColor}  
                />
            
            // title: 'Home',
        },
    },
    Andamento :{
        screen: Andamento,
        navigationOptions : {
            title: 'Andamento',
            tabBarOptions: { 
                activeTintColor: '#4f88c4'
            },
            tabBarIcon: ({tintColor}) => 
                <MaterialIcons
                    name="format-list-bulleted"
                    size={30}
                    color={tintColor}
                />
            
            // title: 'Home',
        },
    },
    Historico :{
        screen: Historico,
        navigationOptions : {
            title: 'Historico',
            tabBarOptions: { 
                activeTintColor: '#4f88c4'
            },
            tabBarIcon: ({tintColor}) => 
                <MaterialCommunityIcons
                    name="restore-clock"
                    size={30}
                    color={tintColor}
                />
            
            // title: 'Home',
        },
    },
    Promocoes :{
        screen: Promocoes,
        navigationOptions : {
            title: 'Promoções',
            tabBarOptions: { 
                activeTintColor: '#4f88c4'
            },
            tabBarIcon: ({tintColor}) => 
                <Ionicons
                    name="ios-pricetags"
                    size={26}
                    color={tintColor}
                />
            
            // title: 'Home',
        },
    },
});


const AppNavigator = createStackNavigator({
    
    Login : {
        screen: Login,
        navigationOptions : {
            header: null,
            // title: 'Home',
        },
    },
    RecuperarSenha : {
        screen: RecuperarSenha,
        navigationOptions : {
            header: null,
        },
    },
    Home :{
        screen: TabNavigator,
        navigationOptions : {
            headerLeft: <View/>,
            gesturesEnabled: false,
            headerStyle: {
                height: 91,
                backgroundColor: '#19286f'
            },
            headerTitle:        
                <View style={{flex: 1, alignItems: "center"}}>
                    <Image 
                        source={require('../images/logo_luvep_Branca.png')}
                        style={{ width: 163, height: 70 }}
                    />
                </View>,
            headerRight: 
                <PowerOff/>,
            headerBackTitle:'Voltar',
            
            
                
        },
    },
    Avaliacao : {
        screen: Avaliacao,
        navigationOptions : {
            headerStyle: {
                height: 91,
                backgroundColor: '#19286f'
            },
            headerTitle:                 
                <View style={{flex: 1, alignItems: "center"}}>
                    <Image 
                        source={require('../images/logo_luvep_Branca.png')}
                        style={{ width: 163, height: 70 }}
                    />
                </View>,
            // headerLeft: <View/>,
            headerRight: <View/>,
            headerBackTitleStyle: {
                color: 'white'
            },
            headerTintColor: '#fff',
        },
    },
    Splash : {
        screen: Splash,
        navigationOptions : {
            header: null,
        },
    },
    
  
    
},{
    initialRouteName: 'Splash',
    transitionConfig: (nav) => handleCustomTransition(nav)
});


const Routes = createAppContainer(AppNavigator, TabNavigator);

export default Routes;
